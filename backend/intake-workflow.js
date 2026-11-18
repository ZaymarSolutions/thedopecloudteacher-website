'use strict';
// DCT inquiry intake, founder-controlled. No student accounts, payments,
// hiring decisions, scholarships or career referrals are approved here.
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { transporter } = require('./email-service');
const CATEGORIES = new Set(['learner','instructor','staff','partner','support']);
const CASE_STATES = new Set(['New','Reviewing','Contacted','Scheduled','Proposal','On Hold','Closed']);
const REFERRAL_STATES = new Set(['New','Contacted','Scheduled','In Progress','Completed','Closed']);
const OWNER_OPTIONS = new Set(['Founder review','Operations review','Learning support']);
const DEFAULT_OWNER = { learner:'Learning support', instructor:'Founder review',
  staff:'Founder review', partner:'Founder review', support:'Learning support' };
const clean = (v,max=250) => typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,max) : '';
function normalizeInquiry(input={}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {error:'Invalid request.'};
  const d = {
    submissionKey:clean(input.submissionKey,64),
    name:clean(input.name,120), email:clean(input.email,254).toLowerCase(),
    category:clean(input.category,25), organization:clean(input.organization,120),
    interest:clean(input.interest,160), format:clean(input.format,60),
    timing:clean(input.timing,120), message:clean(input.message,2400),
    careerConsent:input.careerConsent === true,
    contactConsent:input.contactConsent === true,
    website:clean(input.website,120)
  };
  if (d.website) return {honeypot:true};
  if (!/^[a-z0-9-]{20,64}$/i.test(d.submissionKey)) return {error:'Refresh the page and retry your request.'};
  if (d.name.length < 2) return {error:'Please enter your name.'};
  if (d.email.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return {error:'Enter a valid email address.'};
  if (!CATEGORIES.has(d.category)) return {error:'Please choose a contact reason.'};
  if (d.message.length < 15) return {error:'Please tell us a little more about your request.'};
  if (d.message.length > 2000) return {error:'Please shorten your message to 2,000 characters.'};
  if (!d.contactConsent) return {error:'Please agree that DCT may respond to this inquiry.'};
  if (d.careerConsent && d.category !== 'learner') return {error:'Career-readiness support is offered through the learner pathway.'};
  return {data:d};
}
function createIntakeTables(db) {
  db.exec(
    "CREATE TABLE IF NOT EXISTS dct_inquiries ("+
      "id TEXT PRIMARY KEY, submission_key TEXT UNIQUE NOT NULL,"+
      "name TEXT NOT NULL, email TEXT NOT NULL, category TEXT NOT NULL,"+
      "organization TEXT NOT NULL DEFAULT '', interest TEXT NOT NULL DEFAULT '',"+
      "delivery_format TEXT NOT NULL DEFAULT '', timing TEXT NOT NULL DEFAULT '',"+
      "message TEXT NOT NULL, career_consent INTEGER NOT NULL DEFAULT 0,"+
      "status TEXT NOT NULL DEFAULT 'New', assigned_owner TEXT NOT NULL DEFAULT 'Founder review',"+
      "notification_state TEXT NOT NULL DEFAULT 'not_configured',"+
      "created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
      "updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);"+
    "CREATE INDEX IF NOT EXISTS dct_inquiry_recent ON dct_inquiries(created_at DESC);"+
    "CREATE TABLE IF NOT EXISTS dct_career_referrals ("+
      "id TEXT PRIMARY KEY, inquiry_id TEXT UNIQUE NOT NULL REFERENCES dct_inquiries(id) ON DELETE CASCADE,"+
      "status TEXT NOT NULL DEFAULT 'New', consented_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
      "updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);"+
    "CREATE TABLE IF NOT EXISTS dct_inquiry_history ("+
      "id INTEGER PRIMARY KEY AUTOINCREMENT, inquiry_id TEXT NOT NULL REFERENCES dct_inquiries(id) ON DELETE CASCADE,"+
      "action TEXT NOT NULL, actor_id INTEGER, detail TEXT NOT NULL DEFAULT '',"+
      "created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);"
  );
}
async function notifyInquiry(db,record) {
  if (!transporter || !process.env.ADMIN_EMAIL || !process.env.EMAIL_FROM) return;
  let receipt=false, alert=false;
  try {
    await transporter.sendMail({
      from:process.env.EMAIL_FROM, to:record.email,
      subject:'DCT received your inquiry',
      text:'Thanks for contacting The Dope Cloud TeacHer.\n\nYour reference is '+record.id+
       '. Your message has been recorded for review. We will follow up about next steps.'+
       '\n\nSubmitting an inquiry does not enroll you, approve assistance, offer work or confirm a partnership.'+
       '\nFor urgent support, email thedopecloudteacher@gmail.com.'
    });
    receipt=true;
  } catch (_) { console.warn('DCT inquiry receipt could not be delivered'); }
  try {
    await transporter.sendMail({
      from:process.env.EMAIL_FROM, to:process.env.ADMIN_EMAIL,
      subject:'DCT inquiry for review: '+record.category+' ('+record.id+')',
      text:'New '+record.category+' inquiry '+record.id+
        ' awaits founder review. Sign in at https://thedopecloudteacher.org/admin/intake.html.'+
        '\nPersonal details are not forwarded in this notification.'
    });
    alert=true;
  } catch (_) { console.warn('DCT owner alert could not be delivered'); }
  db.prepare('UPDATE dct_inquiries SET notification_state=?,updated_at=CURRENT_TIMESTAMP WHERE id=?')
    .run(receipt&&alert?'both_sent':receipt?'receipt_sent':alert?'owner_alert_sent':'failed',record.id);
}
function setupIntakeRoutes(app,db,authenticateToken,requireAdmin) {
  createIntakeTables(db);
  const intakeLimiter=rateLimit({windowMs:15*60*1000,limit:5,
    standardHeaders:'draft-7',legacyHeaders:false,
    message:{error:'Too many requests. Please try again later or email DCT.'}});
  app.post('/api/intake/inquiries',intakeLimiter,(req,res)=>{
    const parsed=normalizeInquiry(req.body);
    if (parsed.honeypot) return res.status(202).json({received:true});
    if (parsed.error) return res.status(400).json({error:parsed.error});
    const d=parsed.data;
    const existing=db.prepare('SELECT id FROM dct_inquiries WHERE submission_key=?').get(d.submissionKey);
    if (existing) return res.status(202).json({received:true,reference:existing.id,duplicate:true});
    const id='DCT-'+crypto.randomBytes(8).toString('hex').toUpperCase();
    const notified=Boolean(transporter&&process.env.ADMIN_EMAIL&&process.env.EMAIL_FROM);
    try {
      db.transaction(()=>{
        db.prepare('INSERT INTO dct_inquiries (id,submission_key,name,email,category,organization,interest,delivery_format,timing,message,career_consent,assigned_owner,notification_state) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)')
          .run(id,d.submissionKey,d.name,d.email,d.category,d.organization,d.interest,
            d.format,d.timing,d.message,d.careerConsent?1:0,DEFAULT_OWNER[d.category],
            notified?'pending':'not_configured');
        db.prepare('INSERT INTO dct_inquiry_history(inquiry_id,action,detail) VALUES (?,?,?)')
          .run(id,'created',d.category);
        if (d.careerConsent) {
          db.prepare('INSERT INTO dct_career_referrals(id,inquiry_id) VALUES (?,?)')
            .run(crypto.randomUUID(),id);
          db.prepare('INSERT INTO dct_inquiry_history(inquiry_id,action,detail) VALUES (?,?,?)')
            .run(id,'career_opt_in','Founder review needed; do not automatically forward');
        }
      })();
      res.status(202).json({received:true,reference:id,
        message:'Your inquiry has been recorded. No registration, scholarship, job or partnership approval is implied.'});
      if (notified) void notifyInquiry(db,{id,email:d.email,category:d.category})
        .catch(()=>console.warn('DCT notification was not completed'));
    } catch (_) {
      const duplicate=db.prepare('SELECT id FROM dct_inquiries WHERE submission_key=?').get(d.submissionKey);
      if (duplicate) return res.status(202).json({received:true,reference:duplicate.id,duplicate:true});
      console.error('DCT inquiry storage failed');
      res.status(500).json({error:'Could not record your inquiry. Please email DCT.'});
    }
  });
  app.get('/api/admin/intake/inquiries',authenticateToken,requireAdmin,(req,res)=>{
    const limit=Math.max(1,Math.min(Number.parseInt(req.query.limit,10)||50,100));
    const category=CATEGORIES.has(req.query.category)?req.query.category:null;
    const status=CASE_STATES.has(req.query.status)?req.query.status:null;
    const rows=db.prepare(
      'SELECT id,name,email,category,organization,interest,delivery_format AS format,timing,message,'+
      'career_consent AS careerConsent,assigned_owner AS assignedOwner,status,'+
      'notification_state AS notification,created_at AS createdAt,updated_at AS updatedAt '+
      'FROM dct_inquiries WHERE (? IS NULL OR category=?) AND (? IS NULL OR status=?) '+
      'ORDER BY created_at DESC LIMIT ?'
    ).all(category,category,status,status,limit);
    res.set('Cache-Control','no-store');res.json({inquiries:rows,total:rows.length});
  });
  app.patch('/api/admin/intake/inquiries/:id',authenticateToken,requireAdmin,(req,res)=>{
    const id=clean(req.params.id,80);
    const status=clean(req.body?.status,40), owner=clean(req.body?.assignedOwner,80);
    if (!CASE_STATES.has(status)||!OWNER_OPTIONS.has(owner))
      return res.status(400).json({error:'Invalid status or owner.'});
    const row=db.prepare('SELECT status,assigned_owner FROM dct_inquiries WHERE id=?').get(id);
    if (!row) return res.status(404).json({error:'Inquiry not found.'});
    db.transaction(()=>{
      db.prepare('UPDATE dct_inquiries SET status=?,assigned_owner=?,updated_at=CURRENT_TIMESTAMP WHERE id=?')
        .run(status,owner,id);
      db.prepare('INSERT INTO dct_inquiry_history(inquiry_id,action,actor_id,detail) VALUES (?,?,?,?)')
        .run(id,'reviewed',req.user.userId,row.status+' to '+status);
    })();
    res.json({saved:true});
  });
  // Restricted opt-in referral registry. Does not email Norine or grant access.
  app.get('/api/admin/intake/referrals',authenticateToken,requireAdmin,(req,res)=>{
    res.set('Cache-Control','no-store');
    res.json({referrals:db.prepare(
      'SELECT r.id,r.status,r.consented_at AS consentedAt,i.id AS inquiryReference,'+
      'i.name,i.email,i.interest FROM dct_career_referrals r '+
      'JOIN dct_inquiries i ON i.id=r.inquiry_id WHERE i.career_consent=1 '+
      'ORDER BY r.consented_at DESC LIMIT 100'
    ).all()});
  });
  app.patch('/api/admin/intake/referrals/:id',authenticateToken,requireAdmin,(req,res)=>{
    const id=clean(req.params.id,80),status=clean(req.body?.status,40);
    if (!REFERRAL_STATES.has(status)) return res.status(400).json({error:'Invalid referral status.'});
    const row=db.prepare('SELECT inquiry_id FROM dct_career_referrals WHERE id=?').get(id);
    if (!row) return res.status(404).json({error:'Referral not found.'});
    db.transaction(()=>{
      db.prepare('UPDATE dct_career_referrals SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?')
        .run(status,id);
      db.prepare('INSERT INTO dct_inquiry_history(inquiry_id,action,actor_id,detail) VALUES (?,?,?,?)')
        .run(row.inquiry_id,'referral_stage',req.user.userId,status);
    })();
    res.json({saved:true});
  });
}
module.exports={setupIntakeRoutes,normalizeInquiry};