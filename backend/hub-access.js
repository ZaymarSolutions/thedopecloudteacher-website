// Paid course HTML is imported into the private database, never the static site.
const COURSE_SLUGS = new Set(['cloud-fundamentals-101','az-900-azure-fundamentals','az-104-azure-administrator','az-305-azure-solutions-architect','ai-901-azure-ai-fundamentals','ai-fundamentals-everyday-ai','cloud-security','ai-security-responsible-governance','cyber-basics-stay-safer-online']);
async function verifyPaidAccess({ purchase, course, stripe }) {
  if (!purchase || purchase.status !== 'active' || purchase.product_type !== 'course' || purchase.product_id !== course.id || !purchase.stripe_payment_id || !stripe) return false;
  if (purchase.expires_at) {
    const value=purchase.expires_at.replace(' ', 'T');
    const expiry=new Date(/[zZ]|[+-]\d{2}:?\d{2}$/.test(value) ? value : value+'Z').getTime();
    if (!Number.isFinite(expiry) || expiry <= Date.now()) return false;
  }
  // Re-check the processor, including refunds/disputes. A database checkbox,
  // browser success flag or test payment cannot unlock a live paid course.
  const payment = await stripe.paymentIntents.retrieve(purchase.stripe_payment_id);
  if (payment.livemode !== true || payment.status !== 'succeeded' || payment.currency !== 'usd' || !Number.isFinite(course.price) || course.price <= 0 || payment.amount_received < Math.round(course.price * 100)) return false;
  if (String(payment.metadata?.userId) !== String(purchase.user_id) || payment.metadata?.courseId !== course.id) return false;
  if (!payment.latest_charge) return false;
  const charge = await stripe.charges.retrieve(typeof payment.latest_charge === 'string' ? payment.latest_charge : payment.latest_charge.id);
  return charge.livemode === true && charge.paid === true && !charge.refunded && !charge.disputed && charge.amount_refunded === 0;
}
function setupHubAccess(app, db, stripe, authenticateToken, requireAdmin) {
  db.exec(`CREATE TABLE IF NOT EXISTS private_course_content (course_id TEXT PRIMARY KEY, html TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(course_id) REFERENCES courses(id));
    CREATE TABLE IF NOT EXISTS instructor_readiness (user_id INTEGER PRIMARY KEY, modules TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending_review', updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id));`);
  app.post('/api/admin/hub/import', authenticateToken, requireAdmin, (req,res) => {
    const {slug,title,html}=req.body;
    const prices={'cloud-fundamentals-101':97,'az-900-azure-fundamentals':297,'az-104-azure-administrator':597,'ai-901-azure-ai-fundamentals':297};
    if (!COURSE_SLUGS.has(slug) || typeof title !== 'string' || title.length>200 || typeof html !== 'string' || Buffer.byteLength(html)>450000 || !html.includes('<article class="content">')) return res.status(400).json({error:'Invalid private course file'});
    const price=prices[slug] ?? null;
    db.transaction(()=>{
      db.prepare("INSERT INTO courses (id,title,price,status) VALUES (?,?,?,'active') ON CONFLICT(id) DO UPDATE SET title=excluded.title,price=excluded.price").run(slug,title,price);
      db.prepare('INSERT INTO private_course_content (course_id,html) VALUES (?,?) ON CONFLICT(course_id) DO UPDATE SET html=excluded.html,updated_at=CURRENT_TIMESTAMP').run(slug,html);
    })();
    res.set('Cache-Control','no-store').json({imported:slug});
  });
  app.get('/api/hub/catalog', (req, res) => {
    const courses = db.prepare('SELECT c.id, c.title, c.price FROM courses c JOIN private_course_content p ON p.course_id = c.id').all();
    res.json({ courses: courses.filter(c => COURSE_SLUGS.has(c.id)).map(c => ({...c, checkoutReady: !!stripe && process.env.HUB_CHECKOUT_ENABLED === 'true' && c.price > 0})) });
  });
  app.get('/api/hub/courses/:slug/content', authenticateToken, async (req, res) => {
    res.set('Cache-Control', 'private, no-store');
    res.set('Vary', 'Authorization');
    if (!COURSE_SLUGS.has(req.params.slug)) return res.status(404).json({ error: 'Course not found' });
    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.slug);
    const content = db.prepare('SELECT html FROM private_course_content WHERE course_id = ?').get(req.params.slug);
    if (!course || !content) return res.status(503).json({ error: 'Your course classroom is being prepared. Please contact DCT with your enrollment reference; do not send tax forms or identity documents.' });
    const purchases = db.prepare("SELECT * FROM purchases WHERE user_id = ? AND product_id = ? AND product_type = 'course' AND status = 'active'").all(req.user.userId, course.id);
    try {
      for (const purchase of purchases) {
        if (await verifyPaidAccess({purchase,course,stripe})) return res.json({html:content.html});
      }
      return res.status(403).json({ error: 'Verified paid enrollment is required for this classroom. Gumroad starter purchases are accessed through your Gumroad library.' });
    } catch (_) { return res.status(503).json({error:'We could not verify your enrollment right now. Please try again or contact DCT.'}); }
  });
  app.get('/api/instructors/readiness', authenticateToken, (req,res) => {
    const record=db.prepare('SELECT modules, status, updated_at FROM instructor_readiness WHERE user_id = ?').get(req.user.userId);
    res.json({record:record ? {...record, modules:JSON.parse(record.modules)} : null});
  });
  app.post('/api/instructors/readiness', authenticateToken, (req,res) => {
    const allowed=['welcome','plan','include','labs','assess','practice'];
    const modules=req.body.modules;
    if (!Array.isArray(modules) || modules.length !== allowed.length || !allowed.every(id=>modules.includes(id))) return res.status(400).json({error:'Complete all six preparation blocks before requesting review.'});
    // Preparation is self-reported. Only an administrator may record an approval.
    db.prepare("INSERT INTO instructor_readiness (user_id, modules, status) VALUES (?, ?, 'pending_review') ON CONFLICT(user_id) DO UPDATE SET modules=excluded.modules, status='pending_review', updated_at=CURRENT_TIMESTAMP").run(req.user.userId, JSON.stringify(allowed));
    res.json({status:'pending_review'});
  });
  app.get('/api/admin/instructors/readiness', authenticateToken, requireAdmin, (req,res)=> {
    res.json({records:db.prepare('SELECT r.user_id, u.name, u.email, r.status, r.modules, r.updated_at FROM instructor_readiness r JOIN users u ON u.id=r.user_id').all()});
  });
  // Approval is recorded only after an authorized reviewer checks the practice
  // lesson and documents in DCT's separate private personnel process.
  app.post('/api/admin/instructors/:userId/approve', authenticateToken, requireAdmin, (req,res)=> {
    if (req.body.practiceReviewed !== true || req.body.documentsReviewed !== true || req.body.agreementConfirmed !== true) return res.status(400).json({error:'Practice lesson, appropriate documents and agreement must be reviewed.'});
    const result=db.prepare("UPDATE instructor_readiness SET status='approved', updated_at=CURRENT_TIMESTAMP WHERE user_id=? AND status='pending_review'").run(req.params.userId);
    if (!result.changes) return res.status(404).json({error:'No pending preparation record'});
    res.json({status:'approved'});
  });
}
module.exports={setupHubAccess,verifyPaidAccess,COURSE_SLUGS};
