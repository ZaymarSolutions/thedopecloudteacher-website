const crypto = require('crypto');
const brands = ['askdogood', 'dct'];
const choices = ['crewneck', 'hoodie', 'tee'];
function initVotes(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS seasonal_merch_votes (
    brand TEXT NOT NULL, voter_hash TEXT NOT NULL, choice TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (brand, voter_hash)
  )`);
}
function totals(db, brand) {
  const counts = Object.fromEntries(choices.map(choice => [choice, 0]));
  for (const row of db.prepare('SELECT choice, COUNT(*) AS count FROM seasonal_merch_votes WHERE brand = ? GROUP BY choice').all(brand)) counts[row.choice] = row.count;
  return {brand, counts, total: Object.values(counts).reduce((a,b) => a+b, 0)};
}
function vote(db, brand, voterId, choice) {
  if (!brands.includes(brand) || !choices.includes(choice) || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(voterId || '')) throw new Error('Choose a valid collection and garment.');
  const hash = crypto.createHash('sha256').update(voterId).digest('hex');
  db.prepare(`INSERT INTO seasonal_merch_votes (brand,voter_hash,choice) VALUES (?,?,?)
    ON CONFLICT(brand,voter_hash) DO UPDATE SET choice=excluded.choice,updated_at=CURRENT_TIMESTAMP`).run(brand,hash,choice);
  return {...totals(db, brand), choice, saved: true};
}
function setupMerchVotes(app, db) {
  initVotes(db);
  app.get('/api/merch/seasonal-votes/:brand', (req,res) => {
    if (!brands.includes(req.params.brand)) return res.status(404).json({error:'Collection not found.'});
    res.set('Cache-Control','no-store');res.json(totals(db,req.params.brand));
  });
  app.post('/api/merch/seasonal-votes/:brand', (req,res) => {
    try {res.json(vote(db,req.params.brand,req.body.voterId,req.body.choice));}
    catch(error) {res.status(400).json({error:error.message});}
  });
}
module.exports = {setupMerchVotes,initVotes,totals,vote};
