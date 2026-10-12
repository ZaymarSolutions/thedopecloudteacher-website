const crypto = require('crypto');
const OFFER_END = Date.parse('2027-01-01T05:00:00Z');
const OFFER_START = Date.parse('2026-10-12T00:00:00-04:00');
const REGULAR = {'cloud-fundamentals-101':97,'az-900-azure-fundamentals':297,'az-104-azure-administrator':597,'ai-901-azure-ai-fundamentals':297};
const SLUGS = ['cloud-fundamentals-101','az-900-azure-fundamentals','az-104-azure-administrator','az-305-azure-solutions-architect','ai-901-azure-ai-fundamentals','ai-fundamentals-everyday-ai','cloud-security','ai-security-responsible-governance','cyber-basics-stay-safer-online'];
function promotionActive(now=Date.now()){return now>=OFFER_START && now<OFFER_END;}
function coursePrice(slug,now=Date.now()){return SLUGS.includes(slug)?(promotionActive(now)?25:REGULAR[slug]??null):null;}
function sections(html){return [...html.matchAll(/<h2\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].filter(m=>!['course-overview','enrollment-full-course'].includes(m[1])).map(m=>({id:m[1],title:m[2].replace(/<[^>]+>/g,'').replace(/&amp;/g,'&')}));}
const playlist=(title,id)=>({title,url:`https://www.youtube.com/playlist?list=${id}`,embed:`https://www.youtube-nocookie.com/embed/videoseries?list=${id}`});
const gen=(title,ep)=>({title,url:`https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/${ep}`,embed:`https://learn-video.azurefd.net/vod/player?show=generative-ai-for-beginners&ep=${ep}`});
const security=playlist('Microsoft Security, Compliance and Identity Fundamentals','PLahhVEj9XNTc3cKjd28NUDFPrV4QcfxH5');
const VIDEOS={
 'cloud-fundamentals-101':[playlist('Azure Fundamentals: cloud concepts and core services','PLahhVEj9XNTd6H2vpsvm_kBSMsMw9EMUL')],
 'az-900-azure-fundamentals':[playlist('Microsoft Azure Fundamentals course videos','PLahhVEj9XNTd6H2vpsvm_kBSMsMw9EMUL')],
 'az-104-azure-administrator':[playlist('Microsoft Azure Administrator course videos','PLahhVEj9XNTcj4dwEwRHozO3xcxI_UHYG')],
 'az-305-azure-solutions-architect':[playlist('Designing Microsoft Azure Infrastructure Solutions','PLahhVEj9XNTejs0fgXT6HXaj_a_qsUoKa')],
 'ai-901-azure-ai-fundamentals':[playlist('Introduction to AI in Azure course videos','PLahhVEj9XNTfH73kzXxgQe8_hiOmH_foL')],
 'ai-fundamentals-everyday-ai':[playlist('Explore Microsoft 365 Copilot Chat','PLahhVEj9XNTdeR1auLJEeP3EwI7oK51iO'),gen('Understanding prompt engineering','understanding-prompt-engineering-fundamentals-generative-ai-for-beginners')],
 'cloud-security':[security],
 'ai-security-responsible-governance':[gen('Using generative AI responsibly','using-generative-ai-responsibly-generative-ai-for-beginners'),gen('Securing generative AI applications','securing-your-generative-ai-applications-generative-ai-for-beginners')],
 'cyber-basics-stay-safer-online':[security]
};
function guide(slug,html){return {description:'Watch, read, practice and check your understanding. DCT supplies original explanations, activities and assessments. Provider videos are free supplementary resources, hosted by their publishers. Use captions where offered; the written DCT lesson remains an alternative. Exams, cloud usage and live instructor-led programs are separate.',videos:VIDEOS[slug]||[],sections:sections(html),source:'https://learn.microsoft.com/en-us/training/course-videos-on-shows'};}
function initLearning(db){db.exec(`
 CREATE TABLE IF NOT EXISTS community_enrollments (user_id INTEGER NOT NULL,course_id TEXT NOT NULL,community TEXT NOT NULL,zip_code TEXT NOT NULL,source TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'active',created_at DATETIME DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(user_id,course_id),FOREIGN KEY(user_id) REFERENCES users(id),FOREIGN KEY(course_id) REFERENCES courses(id));
 CREATE TABLE IF NOT EXISTS learning_progress (user_id INTEGER NOT NULL,course_id TEXT NOT NULL,section_id TEXT NOT NULL,completed INTEGER NOT NULL DEFAULT 0,updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(user_id,course_id,section_id));
 CREATE TABLE IF NOT EXISTS learning_completions (user_id INTEGER NOT NULL,course_id TEXT NOT NULL,completion_code TEXT NOT NULL UNIQUE,quiz_score INTEGER NOT NULL,created_at DATETIME DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(user_id,course_id));
 CREATE TABLE IF NOT EXISTS seat_sponsorships (payment_id TEXT PRIMARY KEY,sponsor_user_id INTEGER NOT NULL,seats INTEGER NOT NULL,allocated INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'paid',created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
 `);}
function communityGrant(db,userId,slug){return db.prepare("SELECT source FROM community_enrollments WHERE user_id=? AND course_id=? AND status='active'").get(userId,slug);}
function communityEnroll(db,userId,body,now=Date.now()){
 if(!promotionActive(now))return {error:'The year-end community enrollment offer has ended.',status:409};
 const {courseId,community,zipCode,needsAssistance,attestation}=body;
 if(!SLUGS.includes(courseId)||!['dc-ward-7','dc-ward-8','prince-georges'].includes(community)||typeof zipCode!=='string'||!/^\d{5}$/.test(zipCode)||needsAssistance!==true||attestation!==true)return {error:'Select your eligible community, enter a five-digit ZIP and confirm that you need fee assistance. ZIP codes alone do not establish ward or county residence.',status:400};
 const content=db.prepare('SELECT html FROM private_course_content WHERE course_id=?').get(courseId);
 if(!content||sections(content.html).length<2)return {error:'This full course is not yet ready for enrollment.',status:503};
 return db.transaction(()=>{
  const existing=communityGrant(db,userId,courseId);if(existing)return {enrolled:true,source:existing.source};
  const sponsor=db.prepare("SELECT payment_id FROM seat_sponsorships WHERE status='paid' AND allocated<seats ORDER BY created_at,payment_id LIMIT 1").get();
  const source=sponsor?'sponsor':'dct-bridge';
  if(sponsor)db.prepare('UPDATE seat_sponsorships SET allocated=allocated+1 WHERE payment_id=?').run(sponsor.payment_id);
  db.prepare('INSERT INTO community_enrollments (user_id,course_id,community,zip_code,source) VALUES (?,?,?,?,?)').run(userId,courseId,community,zipCode,source);
  return {enrolled:true,source};
 })();
}
function checkoutReady(stripe,env=process.env){return !!stripe && !!env.STRIPE_WEBHOOK_SECRET && !!env.JWT_SECRET && env.HUB_CHECKOUT_ENABLED!=='false';}
async function verifySponsorPayment(stripe,paymentId,amount){
 if(!stripe||typeof paymentId!=='string')return false;
 const p=await stripe.paymentIntents.retrieve(paymentId);
 if(p.livemode!==true||p.status!=='succeeded'||p.currency!=='usd'||p.amount_received<amount||!p.latest_charge||p.metadata?.productType!=='seat-sponsorship')return false;
 const c=await stripe.charges.retrieve(typeof p.latest_charge==='string'?p.latest_charge:p.latest_charge.id);
 return c.livemode===true&&c.paid===true&&!c.refunded&&!c.disputed&&c.amount_refunded===0;
}
function setupLearningOffer(app,db,stripe,authenticateToken,verifyPaidAccess){
 initLearning(db);
 const hasAccess=async(userId,slug)=>{
  const grant=communityGrant(db,userId,slug);if(grant)return grant.source;
  const course=db.prepare('SELECT * FROM courses WHERE id=?').get(slug);if(!course)return null;
  for(const purchase of db.prepare("SELECT * FROM purchases WHERE user_id=? AND product_id=? AND product_type='course' AND status='active'").all(userId,slug)){if(await verifyPaidAccess({purchase,course,stripe}))return 'paid';}
  return null;
 };
 app.post('/api/hub/confirm-checkout',authenticateToken,async(req,res)=>{
  try{
   if(!stripe||typeof req.body.sessionId!=='string'||!/^cs_(live|test)_[A-Za-z0-9]+$/.test(req.body.sessionId))return res.status(400).json({error:'A valid checkout reference is required.'});
   const session=await stripe.checkout.sessions.retrieve(req.body.sessionId);
   if(session.livemode!==true||session.mode!=='payment'||session.payment_status!=='paid'||session.currency!=='usd'||String(session.metadata?.userId)!==String(req.user.userId))return res.status(409).json({error:'Your payment has not been confirmed yet. Please retry shortly.'});
   if(session.metadata.productType==='seat-sponsorship'){
    const seats=Number(session.metadata.seats);if(![1,5,10,20].includes(seats)||session.amount_total!==seats*2500)return res.status(400).json({error:'Sponsorship payment does not match the selected seats.'});
    if(!await verifySponsorPayment(stripe,session.payment_intent,session.amount_total))return res.status(409).json({error:'Sponsorship payment is pending or reversed.'});
    fulfillSponsorship(db,session);return res.json({confirmed:true,source:'sponsorship',seats});
   }
   const slug=session.metadata.courseId;
   if(!SLUGS.includes(slug)||slug!==req.body.courseId||!Number.isInteger(session.amount_total)||session.amount_total<2500||typeof session.payment_intent!=='string')return res.status(400).json({error:'This payment does not match the selected course.'});
   const course=db.prepare('SELECT * FROM courses WHERE id=?').get(slug);
   const purchase={user_id:req.user.userId,product_type:'course',product_id:slug,status:'active',stripe_payment_id:session.payment_intent,amount:session.amount_total/100};
   if(!course||!await verifyPaidAccess({purchase,course,stripe}))return res.status(409).json({error:'Payment verification is pending or the payment was reversed.'});
   db.transaction(()=>{const existing=db.prepare('SELECT id FROM purchases WHERE stripe_payment_id=? AND user_id=? AND product_id=?').get(session.payment_intent,req.user.userId,slug);if(!existing)db.prepare("INSERT INTO purchases (user_id,product_type,product_id,stripe_payment_id,amount,status) VALUES (?,'course',?,?,?,'active')").run(req.user.userId,slug,session.payment_intent,session.amount_total/100);})();
   res.set('Cache-Control','no-store').json({confirmed:true,source:'paid'});
  }catch(_){res.status(503).json({error:'We could not verify checkout yet. Keep your receipt and retry shortly.'});}
 });
 app.post('/api/hub/community-enroll',authenticateToken,async(req,res)=>{
  try{
   // Recheck funded seats before assigning one. If verification is unavailable,
   // DCT bridges access instead of representing an unverified payment as sponsorship.
   const candidates=db.prepare("SELECT payment_id,seats FROM seat_sponsorships WHERE status='paid' AND allocated<seats").all();
   for(const sponsor of candidates){let valid=false;try{valid=await verifySponsorPayment(stripe,sponsor.payment_id,sponsor.seats*2500);}catch(_){}if(!valid)db.prepare("UPDATE seat_sponsorships SET status='review' WHERE payment_id=?").run(sponsor.payment_id);}
   const result=communityEnroll(db,req.user.userId,req.body);
   if(result.error)return res.status(result.status).json({error:result.error});
   res.set('Cache-Control','no-store').json({...result,classroomUrl:`/hub/classroom.html?course=${req.body.courseId}`});
  }catch(_){res.status(503).json({error:'Enrollment was not saved. Please try again shortly.'});}
 });
 app.get('/api/hub/enrollments',authenticateToken,async(req,res)=>{
  try{const rows=db.prepare('SELECT c.id,c.title FROM courses c JOIN private_course_content p ON p.course_id=c.id').all();const courses=[];for(const c of rows){if(!SLUGS.includes(c.id))continue;const source=await hasAccess(req.user.userId,c.id);if(source)courses.push({...c,source});}res.set('Cache-Control','no-store').json({courses});}
  catch(_){res.status(503).json({error:'We could not verify your course access. Try again shortly.'});}
 });
 app.post('/api/hub/sponsor-checkout',authenticateToken,async(req,res)=>{
  try{const seats=req.body.seats;if(![1,5,10,20].includes(seats))return res.status(400).json({error:'Choose 1, 5, 10 or 20 seats.'});if(!promotionActive()||!checkoutReady(stripe))return res.status(503).json({error:'Seat sponsorship checkout is not available right now.'});
   const session=await stripe.checkout.sessions.create({mode:'payment',line_items:[{price_data:{currency:'usd',product_data:{name:'DCT community learning seats',description:'Support fee-free self-paced training for Wards 7 and 8 and Prince George’s County. Not a charitable tax-deductible donation.'},unit_amount:2500},quantity:seats}],client_reference_id:String(req.user.userId),metadata:{productType:'seat-sponsorship',userId:String(req.user.userId),seats:String(seats)},payment_intent_data:{metadata:{productType:'seat-sponsorship',userId:String(req.user.userId),seats:String(seats)}},success_url:'https://thedopecloudteacher.org/hub/enroll.html?sponsored=1&session_id={CHECKOUT_SESSION_ID}',cancel_url:'https://thedopecloudteacher.org/hub/enroll.html?sponsor=1'});res.json({url:session.url});
  }catch(_){res.status(503).json({error:'We could not start sponsorship checkout. Nothing has been charged.'});}
 });
 const contentFor=async(req,res)=>{
  if(!SLUGS.includes(req.params.slug)){res.status(404).json({error:'Course not found'});return null;}
  if(!await hasAccess(req.user.userId,req.params.slug)){res.status(403).json({error:'Enroll in this course to save progress.'});return null;}
  const c=db.prepare('SELECT html FROM private_course_content WHERE course_id=?').get(req.params.slug);if(!c){res.status(503).json({error:'Full course content is unavailable.'});return null;}return c;
 };
 const progress=(user,slug,html)=>{const ids=sections(html).map(s=>s.id);const completed=db.prepare('SELECT section_id FROM learning_progress WHERE user_id=? AND course_id=? AND completed=1').all(user,slug).map(r=>r.section_id).filter(id=>ids.includes(id));return {completed,total:ids.length,certificateEligible:ids.length>0&&completed.length===ids.length};};
 app.get('/api/hub/courses/:slug/progress',authenticateToken,async(req,res)=>{try{const c=await contentFor(req,res);if(c)res.set('Cache-Control','no-store').json(progress(req.user.userId,req.params.slug,c.html));}catch(_){res.status(503).json({error:'Progress could not be loaded.'});}});
 app.post('/api/hub/courses/:slug/progress',authenticateToken,async(req,res)=>{try{const c=await contentFor(req,res);if(!c)return;if(!sections(c.html).some(s=>s.id===req.body.sectionId)||typeof req.body.completed!=='boolean')return res.status(400).json({error:'Invalid course section or completion value.'});db.prepare('INSERT INTO learning_progress (user_id,course_id,section_id,completed) VALUES (?,?,?,?) ON CONFLICT(user_id,course_id,section_id) DO UPDATE SET completed=excluded.completed,updated_at=CURRENT_TIMESTAMP').run(req.user.userId,req.params.slug,req.body.sectionId,req.body.completed?1:0);res.json(progress(req.user.userId,req.params.slug,c.html));}catch(_){res.status(503).json({error:'Progress was not saved. Try again.'});}});
 app.post('/api/hub/courses/:slug/complete',authenticateToken,async(req,res)=>{try{const c=await contentFor(req,res);if(!c)return;const score=req.body.quizScore;if(!progress(req.user.userId,req.params.slug,c.html).certificateEligible||!Number.isInteger(score)||score<70||score>100)return res.status(400).json({error:'Complete every section and record a knowledge-check score of at least 70%.'});const code='DCT-'+crypto.randomBytes(6).toString('hex').toUpperCase();db.prepare('INSERT OR IGNORE INTO learning_completions (user_id,course_id,completion_code,quiz_score) VALUES (?,?,?,?)').run(req.user.userId,req.params.slug,code,score);const r=db.prepare('SELECT completion_code FROM learning_completions WHERE user_id=? AND course_id=?').get(req.user.userId,req.params.slug);res.json({completed:true,completionCode:r.completion_code,assessmentBasis:'Learner-reported completion and knowledge check; not a proctored vendor certification.'});}catch(_){res.status(503).json({error:'Completion could not be recorded.'});}});
 return {hasAccess};
}
function fulfillSponsorship(db,session){if(session.metadata?.productType!=='seat-sponsorship')return false;const seats=Number(session.metadata.seats);if(session.livemode!==true||session.payment_status!=='paid'||session.currency!=='usd'||![1,5,10,20].includes(seats)||session.amount_total!==seats*2500||typeof session.payment_intent!=='string'||!Number.isInteger(Number(session.metadata.userId)))return true;db.prepare('INSERT OR IGNORE INTO seat_sponsorships (payment_id,sponsor_user_id,seats) VALUES (?,?,?)').run(session.payment_intent,Number(session.metadata.userId),seats);return true;}
module.exports={promotionActive,coursePrice,sections,guide,initLearning,communityGrant,communityEnroll,checkoutReady,setupLearningOffer,fulfillSponsorship,verifySponsorPayment,OFFER_END};
