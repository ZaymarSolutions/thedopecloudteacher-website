const content = require('./wellness-toolkits.json');
const offers = {
  'food-with-purpose': {price:'price_1UPkQfKIgUcEXwKXwDNcc6jM',link:'plink_1UPkR4KIgUcEXwKXHNAFnet0',url:'https://buy.stripe.com/5kQ4gA7Uq1YQ7wccZg0sU08'},
  'proactive-days': {price:'price_1UPkQgKIgUcEXwKXNLtryDPi',link:'plink_1UPkR5KIgUcEXwKXKWduain3',url:'https://buy.stripe.com/fZu5kEcaG0UMdUA3oG0sU09'}
};
function init(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS wellness_orders (
    session_id TEXT PRIMARY KEY, offer TEXT NOT NULL, payment_intent TEXT NOT NULL,
    amount INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'paid', fulfilled_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
}
function assertSession(session, offer) {
  const item=offers[offer];
  const link=typeof session.payment_link==='string'?session.payment_link:session.payment_link?.id;
  const lines=session.line_items?.data || [];
  if(!item || session.livemode!==true || session.mode!=='payment' || session.payment_status!=='paid' || session.currency!=='usd' || session.amount_total!==2500 || session.metadata?.wellnessOffer!==offer || link!==item.link || lines.length!==1 || lines[0].quantity!==1 || lines[0].price?.id!==item.price) throw new Error('This payment does not provide access to this toolkit.');
}
async function verify(stripe,sessionId,expectedOffer) {
  if(!/^cs_live_[A-Za-z0-9]+$/.test(sessionId||''))throw new Error('Use the access link supplied after checkout.');
  const session=await stripe.checkout.sessions.retrieve(sessionId,{expand:['line_items']});
  const offer=expectedOffer || session.metadata?.wellnessOffer;
  assertSession(session,offer);
  const intent=await stripe.paymentIntents.retrieve(typeof session.payment_intent==='string'?session.payment_intent:session.payment_intent?.id,{expand:['latest_charge']});
  const charge=intent.latest_charge;
  if(intent.livemode!==true || intent.status!=='succeeded' || intent.currency!=='usd' || intent.amount_received!==2500 || intent.metadata?.wellnessOffer!==offer || !charge || typeof charge==='string' || charge.livemode!==true || charge.paid!==true || charge.refunded===true || Number(charge.amount_refunded||0)>0 || charge.disputed===true)throw new Error('Payment is not currently eligible for toolkit access.');
  return {session,offer,intent};
}
function setupWellnessAccess(app,db,stripe,env=process.env) {
  init(db);
  const ready=()=>!!stripe && !!env.STRIPE_WEBHOOK_SECRET;
  async function fulfill(sessionId,expectedOffer) {
    const verified=await verify(stripe,sessionId,expectedOffer);
    db.prepare('INSERT OR IGNORE INTO wellness_orders(session_id,offer,payment_intent,amount) VALUES (?,?,?,?)').run(sessionId,verified.offer,verified.intent.id,2500);
    return verified;
  }
  app.get('/api/askdogood/offers',async(req,res)=>{
    let available=ready();
    if(available)try {
      const prices=await Promise.all(Object.values(offers).map(o=>stripe.prices.retrieve(o.price)));
      available=prices.every(p=>p.active && p.livemode && p.currency==='usd' && p.unit_amount===2500 && p.type==='one_time');
    }catch(error){available=false;console.warn('AskDoGood Stripe price verification:',error.code || error.type || 'unavailable');}
    res.set('Cache-Control','no-store');
    res.json({ready:available,offers:Object.entries(offers).map(([id,value])=>({id,name:content[id].title,price:25,checkoutUrl:available?value.url:null}))});
  });
  app.post('/api/askdogood/toolkit-access',async(req,res)=>{
    res.set('Cache-Control','private, no-store');
    if(!ready())return res.status(503).json({error:'Toolkit access is temporarily unavailable. Please keep your payment reference.'});
    try {
      const result=await fulfill(req.body.sessionId,req.body.offer);
      res.json({confirmed:true,offer:result.offer,orderReference:result.session.id,toolkit:content[result.offer]});
    } catch(error) {res.status(403).json({error:error.message || 'Payment could not be verified. Do not pay again; keep your order reference and contact AskDoGood.'});}
  });
  return {fulfill};
}
module.exports={setupWellnessAccess,assertSession,verify,init,offers};
