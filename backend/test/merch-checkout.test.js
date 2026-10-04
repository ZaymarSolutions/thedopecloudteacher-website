const test = require('node:test');
const assert = require('node:assert/strict');
const { setupMerch, summarizeArtwork } = require('../merch-checkout');

const address = { first_name: 'Ada', last_name: 'Lovelace', email: 'ada@example.org',
  phone: '', address1: '1 Main St', address2: '', city: 'Albany', region: 'NY', zip: '12207' };
const sizes = { S: 1, M: 2, L: 3, XL: 4, '2XL': 5 };

function fixture() {
  process.env.MERCH_CHECKOUT_ENABLED = 'true';
  process.env.PRINTIFY_SHOP_ID = '29102601';
  process.env.PRINTIFY_API_TOKEN = 'fixture-token';
  process.env.STRIPE_WEBHOOK_SECRET = 'fixture-signing-secret';
  process.env.MERCH_PRODUCTS_JSON = JSON.stringify({
    hoodie: { product_id: 'hoodie-id', variants: sizes },
    tee: { product_id: 'tee-id', variants: sizes },
    joggers: { product_id: 'joggers-id', variants: sizes }
  });
  const routes = {};
  const app = {
    get(path, handler) { routes[`GET ${path}`] = handler; },
    post(path, handler) { routes[`POST ${path}`] = handler; }
  };
  let row;
  const db = {
    exec() {},
    prepare(sql) {
      return {
        run(...args) {
          if (sql.startsWith('INSERT INTO merch_orders')) {
            row = { id: args[0], selection: args[1], address: args[2], line_items: args[3],
              item_total: args[4], shipping_total: args[5], status: 'awaiting_payment' };
          } else if (sql.includes('stripe_session_id = ?')) row.stripe_session_id = args[0];
          else if (sql.includes("status = 'submitting'")) {
            if (row.status !== 'awaiting_payment') return { changes: 0 };
            row.status = 'submitting';
          } else if (sql.includes("status = 'created'")) {
            row.printify_order_id = args[0]; row.status = 'created';
          } else if (sql.includes("status = 'submitted'")) row.status = 'submitted';
          else if (sql.includes("status = 'needs_review'")) row.status = 'needs_review';
          return { changes: 1 };
        },
        get(id, sessionId) {
          if (!row || row.id !== id || (sessionId && row.stripe_session_id !== sessionId)) return undefined;
          return row;
        }
      };
    }
  };
  let stripeInput;
  const stripe = { checkout: { sessions: { async create(input) {
    stripeInput = input;
    return { id: 'cs_test_fixture', url: 'https://checkout.stripe.com/test-fixture' };
  }, async retrieve(id) { return { id, currency: 'usd', amount_total: row.item_total + row.shipping_total, payment_status: 'paid', metadata: { orderType: 'merch', merchOrderId: row.id } }; } } } };
  const printifyCalls = [];
  const requestPrintify = async (method, path, payload) => {
    printifyCalls.push({ method, path, payload });
    if (path === '/products/6ab94e714af43262550fbfc7.json') return {
      id: '6ab94e714af43262550fbfc7', shop_id: 29102601, title: 'AI Shield Tee',
      blueprint_id: 12, print_provider_id: 34,
      variants: [{ id: 101, title: 'White / S', is_enabled: true, is_available: true },
        { id: 102, title: 'Black / S', is_enabled: false, is_available: true }],
      print_areas: [{ placeholders: [
        { position: 'front', images: [{ id: 'private-image' }] },
        { position: 'left_sleeve', images: [{ id: 'private-logo' }] }
      ] }]
    };
    if (path === '/orders/shipping.json') return { standard: 799 };
    if (path === '/orders.json') return { id: 'printify-order-1' };
    return {};
  };
  const catalogCalls = [];
  const requestCatalog = async (path) => {
    catalogCalls.push(path);
    if (path.endsWith('/print_providers.json')) return [{ id: path.includes('/6849/') ? 7 : 9,
      title: path.includes('/6849/') ? 'Fulfill Engine' : 'SwiftPOD' }];
    return { variants: [
      { id: 11, options: { color: 'Black', size: 'S' }, placeholders: [
        { position: 'front', decoration_method: 'dtg', width: 3000, height: 4000 },
        { position: 'right_leg_back', decoration_method: 'dtg', width: 1200, height: 2400 }
      ] },
      { id: 12, options: { color: 'White', size: 'S' }, placeholders: [] }
    ] };
  };
  const fulfill = setupMerch(app, db, stripe, 'https://thedopecloudteacher.org', requestPrintify, requestCatalog);
  return { routes, fulfill, printifyCalls, catalogCalls, getRow: () => row, getStripeInput: () => stripeInput };
}

test('set charges approved $95 plus quoted shipping, then submits exactly once after payment', async () => {
  const f = fixture();
  let status = 200;
  let body;
  await f.routes['POST /api/merch/checkout']({ body: {
    selection: { product: 'set', hoodieSize: 'S', joggersSize: 'M', price: 1 }, address
  } }, { status(value) { status = value; return this; }, json(value) { body = value; } });
  assert.equal(status, 200);
  assert.match(body.url, /^https:\/\/checkout\.stripe\.com/);
  assert.equal(f.getStripeInput().line_items[0].price_data.unit_amount, 9500);
  assert.equal(f.getStripeInput().payment_intent_data.receipt_email, address.email);
  assert.match(f.getStripeInput().success_url, /session_id=\{CHECKOUT_SESSION_ID\}#order-confirmation$/);
  assert.equal(f.getStripeInput().shipping_options[0].shipping_rate_data.fixed_amount.amount, 799);
  assert.deepEqual(JSON.parse(f.getRow().line_items).map((line) => line.variant_id), [1, 2]);
  const session = { id: 'cs_test_fixture', currency: 'usd', amount_total: 10299,
    payment_status: 'paid', metadata: { orderType: 'merch', merchOrderId: f.getRow().id } };
  assert.equal(await f.fulfill(session), true);
  assert.equal(await f.fulfill(session), true);
  assert.equal(f.printifyCalls.filter((call) => call.path === '/orders.json').length, 1);
  assert.equal(f.printifyCalls.filter((call) => call.path.includes('send_to_production')).length, 1);
  assert.equal(f.getRow().status, 'submitted');
});

test('unpaid webhook and invalid size do not submit to production', async () => {
  const f = fixture();
  let status = 200;
  await f.routes['POST /api/merch/checkout']({ body: {
    selection: { product: 'tee', size: '3XL' }, address
  } }, { status(value) { status = value; return this; }, json() {} });
  assert.equal(status, 400);
  assert.equal(f.getRow(), undefined);
  assert.equal(await f.fulfill({ payment_status: 'unpaid', metadata: { orderType: 'merch' } }), true);
  assert.equal(f.printifyCalls.length, 0);
});

test('tee check reads only the saved product and reveals only review metadata', async () => {
  const f = fixture();
  process.env.MERCH_CHECKOUT_ENABLED = 'false';
  let body;
  await f.routes['GET /api/merch/tee-check']({}, { json(value) { body = value; } });
  assert.equal(body.teeFoundInStore, true);
  assert.deepEqual(body.enabledVariants, [{ id: 101, title: 'White / S', available: true }]);
  assert.deepEqual(body.printPositions, ['front', 'left_sleeve']);
  assert.equal(JSON.stringify(body).includes('private-image'), false);
  assert.equal(f.printifyCalls.length, 1);
  await f.routes['GET /api/merch/tee-check']({}, { json() {} });
  assert.equal(f.printifyCalls.length, 1);
});

test('blank check selects black variants and returns provider print areas without credentials', async () => {
  const f = fixture();
  process.env.MERCH_CHECKOUT_ENABLED = 'false';
  let body;
  await f.routes['GET /api/merch/blank-check']({}, { json(value) { body = value; } });
  assert.equal(body.blanks.length, 2);
  assert.equal(body.blanks[0].provider, 'Fulfill Engine');
  assert.deepEqual(body.blanks[1].variants, [{ size: 'S', id: 11 }]);
  assert.deepEqual(body.blanks[1].printAreas.map(area => area.position), ['front', 'right_leg_back']);
  assert.equal(JSON.stringify(body).includes('fixture-token'), false);
  assert.equal(f.catalogCalls.length, 4);
});

test('media check reveals only matching artwork metadata', () => {
  const result = summarizeArtwork({ last_page: 2, data: [
    { id: 'a', file_name: 'DOPE SHITZ.png', width: 1536, height: 1024, preview_url: 'private-url' },
    { id: 'b', file_name: 'family-photo.png', width: 100, height: 100 }
  ] });
  assert.deepEqual(result, { scanned: 2, morePages: true,
    matches: [{ id: 'a', name: 'DOPE SHITZ.png', width: 1536, height: 1024 }] });
});

 test('tee-only catalog opens tee checkout and rejects unmapped products', async () => {
  const f = fixture();
  process.env.MERCH_PRODUCTS_JSON = JSON.stringify({ tee: { product_id: 'tee-id', variants: sizes } });
  let catalog;
  f.routes['GET /api/merch/catalog']({}, { json(value) { catalog = value; } });
  assert.equal(catalog.available, true);
  assert.equal(catalog.products.tee.available, true);
  assert.equal(catalog.products.hoodie.available, false);
  assert.equal(catalog.products.set.available, false);
  let status = 200;
  await f.routes['POST /api/merch/checkout']({ body: {selection: {product: 'hoodie', size: 'S'}, address} }, {status(value) { status = value; return this; }, json() {} });
  assert.equal(status, 400);
  assert.equal(f.printifyCalls.length, 0);
  let body;
  await f.routes['POST /api/merch/checkout']({body: {selection: {product:'tee', size:'M'}, address}}, {status(value) {status=value; return this;}, json(value) {body=value;}});
  assert.match(body.url, /^https:\/\/checkout.stripe.com/);
  assert.equal(f.getStripeInput().line_items[0].price_data.unit_amount, 2900);
 });

 test('order confirmation verifies the matching Stripe session and excludes customer details', async () => {
  const f = fixture();
  await f.routes['POST /api/merch/checkout']({ body: { selection: { product: 'tee', size: 'S' }, address } }, { json() {} });
  let body, status = 200;
  const response = { status(value) { status = value; return this; }, json(value) { body = value; } };
  await f.routes['GET /api/merch/order-status']({ query: { session_id: 'cs_test_fixture' } }, response);
  assert.equal(body.paid, true);
  assert.equal(body.total, 3699);
  assert.equal(body.fulfillment, 'processing');
  assert.equal(JSON.stringify(body).includes(address.email), false);
  assert.equal(JSON.stringify(body).includes(address.address1), false);
  await f.routes['GET /api/merch/order-status']({ query: { session_id: 'invalid' } }, response);
  assert.equal(status, 400);
});
