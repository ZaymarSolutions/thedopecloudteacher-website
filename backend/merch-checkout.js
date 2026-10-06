const crypto = require('crypto');
const https = require('https');

const PRODUCTS = {
  hoodie: { name: 'Dope Shitz Hoodie', price: 5900 },
  tee: { name: 'AI Shield Tee', price: 2900 },
  joggers: { name: 'Cloud AI Joggers', price: 4500 },
  set: { name: 'Dope Shitz Hoodie + Cloud AI Joggers', price: 9500 },
  adg_hoodie: { name: 'AskDoGood Embroidered Hoodie', price: 5900 },
  adg_tee: { name: 'AskDoGood Cream Tee', price: 2900 },
  adg_joggers: { name: 'AskDoGood Joggers', price: 4500 },
  adg_set: { name: 'AskDoGood Hoodie + Jogger Set', price: 9500 }
};
const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
// Product link supplied by the merchant. Check ownership and print areas before
// using any of its variants in checkout.
const CANDIDATE_TEE_ID = '6ab94e714af43262550fbfc7';
const BLANKS_TO_CHECK = [
  { key: 'hoodie', blueprintId: 6849, provider: 'Fulfill Engine', color: 'Black' },
  { key: 'joggers', blueprintId: 1398, provider: 'SwiftPOD', color: 'Black' }
];

function printifyApiRequest(method, path, payload) {
  const body = payload === undefined ? null : JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const request = https.request({
      hostname: 'api.printify.com',
      path,
      method,
      headers: {
        Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
        'User-Agent': 'TheDopeCloudTeacher/merch-checkout',
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } : {})
      },
      timeout: 15000
    }, (response) => {
      let result = '';
      response.on('data', (chunk) => { result += chunk; });
      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          const error = new Error(`Printify returned HTTP ${response.statusCode}`);
          error.upstreamStatus = response.statusCode;
          try {
            const details = JSON.parse(result);
            const message = details.message || details.error;
            if (typeof message === 'string' && message.length <= 160 &&
                /^[a-zA-Z0-9 .,:;!?()_-]+$/.test(message)) error.upstreamMessage = message;
          } catch (_) { /* Keep non-JSON error bodies private. */ }
          return reject(error);
        }
        try { resolve(result ? JSON.parse(result) : {}); }
        catch (error) { reject(new Error('Printify returned invalid JSON')); }
      });
    });
    request.on('timeout', () => request.destroy(new Error('Printify timed out')));
    request.on('error', reject);
    if (body) request.write(body);
    request.end();
  });
}

function printifyRequest(method, path, payload) {
  return printifyApiRequest(method, `/v1/shops/${encodeURIComponent(process.env.PRINTIFY_SHOP_ID)}${path}`, payload);
}

function printifyCatalogRequest(path) {
  return printifyApiRequest('GET', `/v1/catalog${path}`);
}

function summarizeArtwork(response) {
  const data = response.data || [];
  return {
    scanned: data.length,
    morePages: Number(response.last_page || 1) > 1,
    matches: data.filter(a => /dope|shitz|cloud|security|morale|shield|dct/i.test(a.file_name || ''))
      .slice(0, 30).map(a => ({ id: a.id, name: a.file_name, width: a.width, height: a.height }))
  };
}

function getConfiguredProducts() {
  try {
    const config = JSON.parse(process.env.MERCH_PRODUCTS_JSON || '{}');
    const configured = {};
    for (const key of ['hoodie', 'tee', 'joggers', 'adg_hoodie', 'adg_tee', 'adg_joggers']) {
      const item = config[key];
      if (!item || typeof item.product_id !== 'string' || !item.product_id.trim()) continue;
      if (!SIZES.every((size) => Number.isSafeInteger(item.variants?.[size]) && item.variants[size] > 0)) continue;
      configured[key] = item;
    }
    return Object.keys(configured).length ? configured : null;
  } catch (_) { return null; }
}

function ready(stripe) {
  return process.env.MERCH_CHECKOUT_ENABLED === 'true' && !!stripe &&
    !!process.env.STRIPE_WEBHOOK_SECRET && !!process.env.PRINTIFY_API_TOKEN &&
    /^\d+$/.test(process.env.PRINTIFY_SHOP_ID || '') && !!getConfiguredProducts();
}

function cleanAddress(value) {
  if (!value || typeof value !== 'object') return null;
  const address = {};
  const limits = { first_name: 80, last_name: 80, email: 254, phone: 32,
    address1: 120, address2: 120, city: 80, region: 2, zip: 10 };
  for (const [field, limit] of Object.entries(limits)) {
    if (typeof value[field] !== 'string' || value[field].length > limit) return null;
    address[field] = value[field].trim();
  }
  if (['first_name', 'last_name', 'email', 'address1', 'city', 'region', 'zip'].some((field) => !address[field])) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) return null;
  if (!/^[A-Za-z]{2}$/.test(address.region) || !/^\d{5}(?:-\d{4})?$/.test(address.zip)) return null;
  return { ...address, region: address.region.toUpperCase(), country: 'US' };
}

function orderLines(selection, config) {
  if (!selection || !Object.hasOwn(PRODUCTS, selection.product)) return null;
  const isSet = ['set', 'adg_set'].includes(selection.product);
  const keys = selection.product === 'set' ? ['hoodie', 'joggers'] : selection.product === 'adg_set' ? ['adg_hoodie', 'adg_joggers'] : [selection.product];
  const lines = [];
  for (const key of keys) {
    const size = isSet ? selection[`${key.replace('adg_', '')}Size`] : selection.size;
    if (!SIZES.includes(size)) return null;
    if (!Number.isSafeInteger(config[key]?.variants?.[size]) || config[key].variants[size] <= 0) return null;
    lines.push({ product_id: config[key].product_id, variant_id: config[key].variants[size], quantity: 1 });
  }
  return lines;
}

function setupMerch(app, db, stripe, frontendUrl, requestPrintify = printifyRequest, requestCatalog = printifyCatalogRequest) {
  db.exec(`CREATE TABLE IF NOT EXISTS merch_orders (
    id TEXT PRIMARY KEY,
    stripe_session_id TEXT UNIQUE,
    printify_order_id TEXT,
    selection TEXT NOT NULL,
    address TEXT NOT NULL,
    line_items TEXT NOT NULL,
    item_total INTEGER NOT NULL,
    shipping_total INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  app.get('/api/merch/catalog', (req, res) => {
    const config = getConfiguredProducts();
    const available = ready(stripe);
    const products = Object.fromEntries(Object.entries(PRODUCTS).map(([key, item]) => [key, {
      ...item, available: available && (key === 'set' ? !!config?.hoodie && !!config?.joggers : key === 'adg_set' ? !!config?.adg_hoodie && !!config?.adg_joggers : !!config?.[key])
    }]));
    res.json({ available, products, sizes: SIZES });
  });

  // A narrow, read-only deployment check. Never return the token, image URLs,
  // original print data, or an arbitrary Printify product requested by a caller.
  let teeCheckCache;
  let apparelCheckCache;
  app.get('/api/merch/apparel-check', async (req, res) => {
    try {
      if (!apparelCheckCache || apparelCheckCache.expires < Date.now()) {
        const products = [];
        for (const [key, id] of Object.entries({ hoodie: '6ac2354ec4300a8ab10a345f', joggers: '6ac236df17b6abfbf901ddcb', adg_hoodie: '6ac239430a61e8cef702fcbc', adg_joggers: '6ac23a43943f9147b90106fa', adg_tee: '6ac23b7b82fa998d6d0178a9' })) {
          const product = await requestPrintify('GET', `/products/${id}.json`);
          if (String(product.shop_id) !== process.env.PRINTIFY_SHOP_ID || product.id !== id) throw new Error('Product store mismatch');
          products.push({ key, id, title: product.title,
            image: (product.images || []).find(image => image.is_default)?.src || (product.images || [])[0]?.src || null,
            variants: (product.variants || []).filter(v => v.is_enabled).map(v => ({ id: v.id, title: v.title, available: v.is_available })),
            printPositions: [...new Set((product.print_areas || []).flatMap(a => (a.placeholders || []).filter(p => p.images?.length).map(p => p.position)))].sort() });
        }
        apparelCheckCache = { expires: Date.now() + 60000, result: { products } };
      }
      res.json(apparelCheckCache.result);
    } catch (_) { res.status(503).json({ error: 'Could not verify apparel' }); }
  });
  app.get('/api/merch/tee-check', async (req, res) => {
    if (process.env.MERCH_CHECKOUT_ENABLED === 'true') return res.status(404).json({ error: 'Unavailable' });
    if (!process.env.PRINTIFY_API_TOKEN || !/^\d+$/.test(process.env.PRINTIFY_SHOP_ID || '')) {
      return res.status(503).json({ connected: false, error: 'Printify connection is not configured' });
    }
    try {
      if (!teeCheckCache || teeCheckCache.expires < Date.now()) {
        const product = await requestPrintify('GET', `/products/${CANDIDATE_TEE_ID}.json`);
        const shopMatches = String(product.shop_id) === process.env.PRINTIFY_SHOP_ID;
        teeCheckCache = { expires: Date.now() + 60000, result: {
          connected: true,
          teeFoundInStore: shopMatches && product.id === CANDIDATE_TEE_ID,
          title: product.title,
          blueprintId: product.blueprint_id,
          printProviderId: product.print_provider_id,
          enabledVariants: (product.variants || []).filter(v => v.is_enabled).map(v => ({ id: v.id, title: v.title, available: v.is_available })),
          printPositions: [...new Set((product.print_areas || []).flatMap(area =>
            (area.placeholders || []).filter(p => (p.images || []).length).map(p => p.position)))].sort()
        } };
      }
      res.json(teeCheckCache.result);
    } catch (error) {
      console.error('Printify tee verification failed:', error);
      res.status(503).json({ connected: false, teeFoundInStore: false, error: 'Could not verify saved tee' });
    }
  });

  // Fixed catalog lookups for the two candidate blanks. This cannot modify
  // products or expose the private token, and disappears when checkout opens.
  let blankCheckCache;
  app.get('/api/merch/blank-check', async (req, res) => {
    if (process.env.MERCH_CHECKOUT_ENABLED === 'true') return res.status(404).json({ error: 'Unavailable' });
    if (!process.env.PRINTIFY_API_TOKEN) return res.status(503).json({ error: 'Printify connection is not configured' });
    try {
      if (!blankCheckCache || blankCheckCache.expires < Date.now()) {
        const blanks = [];
        for (const blank of BLANKS_TO_CHECK) {
          const providers = await requestCatalog(`/blueprints/${blank.blueprintId}/print_providers.json`);
          const provider = providers.find(p => p.title === blank.provider);
          if (!provider) {
            blanks.push({ product: blank.key, providerFound: false });
            continue;
          }
          const response = await requestCatalog(`/blueprints/${blank.blueprintId}/print_providers/${provider.id}/variants.json`);
          const variants = Array.isArray(response) ? response : response.variants || [];
          const selected = variants.filter(v =>
            v.options?.color?.toLowerCase() === blank.color.toLowerCase() && SIZES.includes(v.options?.size));
          const positions = [...new Map(selected.flatMap(v => v.placeholders || []).map(p =>
            [p.position, { position: p.position, method: p.decoration_method, widthPx: p.width, heightPx: p.height }])).values()];
          blanks.push({ product: blank.key, blueprintId: blank.blueprintId,
            provider: provider.title, providerId: provider.id,
            variants: selected.map(v => ({ size: v.options.size, id: v.id })),
            printAreas: positions.sort((a, b) => a.position.localeCompare(b.position)) });
        }
        blankCheckCache = { expires: Date.now() + 60000, result: { blanks } };
      }
      res.json(blankCheckCache.result);
    } catch (error) {
      console.error('Printify blank verification failed:', error);
      res.status(503).json({ error: 'Could not verify candidate blanks' });
    }
  });

  // Check only merchant artwork names; do not disclose unrelated media or URLs.
  let assetCheckCache;
  app.get('/api/merch/assets-check', async (req, res) => {
    if (process.env.MERCH_CHECKOUT_ENABLED === 'true') return res.status(404).json({ error: 'Unavailable' });
    if (!process.env.PRINTIFY_API_TOKEN) return res.status(503).json({ error: 'Printify connection is not configured' });
    try {
      if (!assetCheckCache || assetCheckCache.expires < Date.now()) {
        const response = await printifyApiRequest('GET', '/v1/uploads.json');
        assetCheckCache = { expires: Date.now() + 60000, result: summarizeArtwork(response) };
      }
      res.json(assetCheckCache.result);
    } catch (error) {
      console.error('Printify media check failed:', error);
      res.status(503).json({ error: 'Could not check Printify media',
        upstreamStatus: error.upstreamStatus || null,
        ...(error.upstreamMessage ? { upstreamMessage: error.upstreamMessage } : {}) });
    }
  });

  app.get('/api/merch/order-status', async (req, res) => {
    const sessionId = req.query?.session_id;
    if (typeof sessionId !== 'string' || !/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) {
      return res.status(400).json({ error: 'A valid checkout reference is required.' });
    }
    res.set?.('Cache-Control', 'no-store');
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const order = db.prepare('SELECT * FROM merch_orders WHERE id = ? AND stripe_session_id = ?')
        .get(session.metadata?.merchOrderId, session.id);
      if (session.metadata?.orderType !== 'merch' || !order) return res.status(404).json({ error: 'Order not found.' });
      const paid = session.payment_status === 'paid' && session.currency === 'usd'
        && session.amount_total === order.item_total + order.shipping_total;
      res.json({ paid, orderReference: order.id, total: order.item_total + order.shipping_total,
        itemTotal: order.item_total, shippingTotal: order.shipping_total, currency: session.currency,
        live: session.livemode === true,
        fulfillment: order.status === 'submitted' ? 'production' : 'processing' });
    } catch (error) {
      console.error('Merch order verification failed:', error.message);
      res.status(503).json({ error: 'We could not verify the order right now. Please do not pay again; contact the DCT team.' });
    }
  });

  app.post('/api/merch/checkout', async (req, res) => {
    if (!ready(stripe)) return res.status(503).json({ error: 'Merch checkout is not open yet.' });
    const config = getConfiguredProducts();
    const address = cleanAddress(req.body?.address);
    const selection = req.body?.selection;
    const lines = orderLines(selection, config);
    if (!address || !lines) return res.status(400).json({ error: 'Select available sizes and enter a valid US shipping address.' });

    try {
      const quote = await requestPrintify('POST', '/orders/shipping.json', { line_items: lines, address_to: address });
      if (!Number.isSafeInteger(quote.standard) || quote.standard < 0) {
        return res.status(503).json({ error: 'Shipping is unavailable for this order.' });
      }
      const id = crypto.randomUUID();
      const item = PRODUCTS[selection.product];
      db.prepare(`INSERT INTO merch_orders (id, selection, address, line_items, item_total, shipping_total, status)
        VALUES (?, ?, ?, ?, ?, ?, 'awaiting_payment')`).run(
        id, JSON.stringify(selection), JSON.stringify(address), JSON.stringify(lines), item.price, quote.standard
      );
      const base = frontendUrl.replace(/\/$/, '');
      const returnPage = selection.product.startsWith('adg_') ? 'https://askdogood.com/merch' : `${base}/merch.html`;
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: address.email,
        payment_intent_data: { receipt_email: address.email },
        line_items: [{ price_data: { currency: 'usd', product_data: { name: item.name }, unit_amount: item.price }, quantity: 1 }],
        shipping_options: [{ shipping_rate_data: {
          type: 'fixed_amount', fixed_amount: { amount: quote.standard, currency: 'usd' },
          display_name: 'Standard shipping'
        } }],
        success_url: `${returnPage}?order=received&session_id={CHECKOUT_SESSION_ID}#order-confirmation`,
        cancel_url: `${returnPage}?order=canceled`,
        client_reference_id: id,
        metadata: { orderType: 'merch', merchOrderId: id }
      });
      db.prepare('UPDATE merch_orders SET stripe_session_id = ? WHERE id = ?').run(session.id, id);
      res.json({ url: session.url });
    } catch (error) {
      console.error('Merch checkout setup failed:', error);
      res.status(503).json({ error: 'Checkout is temporarily unavailable. No payment was taken.' });
    }
  });

  return async function fulfillMerch(session) {
    if (session.metadata?.orderType !== 'merch') return false;
    if (session.payment_status !== 'paid') return true;
    const order = db.prepare('SELECT * FROM merch_orders WHERE id = ? AND stripe_session_id = ?')
      .get(session.metadata.merchOrderId, session.id);
    if (!order) throw new Error(`Paid merch checkout ${session.id} has no matching order`);
    if (session.currency !== 'usd' || session.amount_total !== order.item_total + order.shipping_total) {
      throw new Error(`Paid merch checkout ${session.id} does not match the quoted total`);
    }
    if (order.status === 'submitted') return true;
    if (order.status === 'needs_review') {
      console.error('Merch order needs manual Printify reconciliation:', order.id);
      return true;
    }
    // Prevent duplicate submissions if two Stripe notifications arrive together.
    if (order.status === 'awaiting_payment') {
      const claimed = db.prepare(`UPDATE merch_orders SET status = 'submitting' WHERE id = ? AND status = 'awaiting_payment'`)
        .run(order.id).changes;
      if (!claimed) return true;
      try {
        const result = await requestPrintify('POST', '/orders.json', {
          external_id: order.id,
          line_items: JSON.parse(order.line_items),
          shipping_method: 1,
          send_shipping_notification: true,
          address_to: JSON.parse(order.address)
        });
        if (!result.id) throw new Error('Printify did not return an order ID');
        db.prepare(`UPDATE merch_orders SET printify_order_id = ?, status = 'created' WHERE id = ?`)
          .run(result.id, order.id);
      } catch (error) {
        // A network failure can occur after Printify accepted the order. Never
        // submit it again until the external ID is reconciled by a human.
        db.prepare(`UPDATE merch_orders SET status = 'needs_review' WHERE id = ?`).run(order.id);
        console.error('Printify submission requires reconciliation:', order.id, error);
        return true;
      }
    }
    const current = db.prepare('SELECT printify_order_id, status FROM merch_orders WHERE id = ?').get(order.id);
    if (current.status === 'created') {
      try {
        await requestPrintify('POST', `/orders/${encodeURIComponent(current.printify_order_id)}/send_to_production.json`);
        db.prepare(`UPDATE merch_orders SET status = 'submitted' WHERE id = ?`).run(order.id);
      } catch (error) {
        // Automatic approval can start production before this request arrives.
        // Reconcile the same order rather than sending a duplicate production request.
        const saved = await requestPrintify('GET', `/orders/${encodeURIComponent(current.printify_order_id)}.json`);
        if (['sending-to-production', 'in-production', 'fulfilled', 'partially-fulfilled'].includes(saved.status)) {
          db.prepare(`UPDATE merch_orders SET status = 'submitted' WHERE id = ?`).run(order.id);
        } else {
          console.error('Printify production submission failed:', order.id, error);
          throw error; // Stripe retries using the existing order.
        }
      }
    }
    return true;
  };
}

module.exports = { setupMerch, cleanAddress, orderLines, getConfiguredProducts, summarizeArtwork };
