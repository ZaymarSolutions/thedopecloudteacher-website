# DCT merchandise checkout setup

The merchandise flow uses the existing DCT Stripe secret key, the existing
`/api/webhook` endpoint, and the dedicated Printify API store. Checkout remains
closed unless `MERCH_CHECKOUT_ENABLED=true` and every required value is present.

## Products and artwork

Create three **existing products** in Printify's **API · The Dope Cloud Teacher**
store. Verify the finished preview and a sample before accepting orders:

| Product | Color | Approved placement | Retail |
| --- | --- | --- | ---: |
| Dope Shitz hoodie | Black | Metallic blue graphic, about 8 inches on chest; DCT mark centered on outer sleeve | $59 |
| AI Shield tee | White | Shield about 6 inches tall on chest; DCT mark centered on outer sleeve | $29 |
| Cloud AI joggers | Black | CLOUD AI about 4–4.5 inches on front thigh with SECURITY & MORALE beneath; DCT mark on opposite back calf | $45 |

The $95 set is one hoodie plus one pair of joggers, with separate sizes.
The site only offers S, M, L, XL, and 2XL, so all 15 Printify product variants
must be enabled. Do not advertise a placement the selected provider cannot print.

The saved tee `6ab94e714af43262550fbfc7` was read from Printify shop
`29102601` on September 27, 2026. It is a white Bella+Canvas 3001 from
provider 99. Its enabled, available variants include:

| S | M | L | XL | 2XL |
| ---: | ---: | ---: | ---: | ---: |
| 18540 | 18541 | 18542 | 18543 | 18544 |

The Printify product has populated `front`, `right_sleeve`, and `neck` areas.
The front and sleeve are visible in the merchant's preview. Inspect the neck
artwork and a physical sample before publishing or accepting payments.

Candidates for the remaining drafts, pending Printify catalog and print-area
verification in the merchant account:

- Black hoodie: Hanes RS170, blueprint 6849, Fulfill Engine. The public listing
  advertises front and both sleeves, S–4XL. Place the metallic blue lettering
  on the chest and the DCT logo on the outer sleeve.
  https://printify.com/app/products/6849/hanes/unisex-perfect-sweats-hooded-sweatshirt
- Black joggers: Gildan 18200, blueprint 1398, SwiftPOD. The public listing
  advertises front and back of both legs, S–3XL. Place CLOUD AI on a front
  thigh and the DCT logo on the opposite back calf; verify actual printable
  bounds in the product editor before finalizing.
  https://printify.com/app/products/1398/gildan/unisex-sweatpants

## Private configuration

In the backend host's secret environment, set:

- `STRIPE_SECRET_KEY` for the **AskDoGood** Stripe account and
  `STRIPE_WEBHOOK_SECRET` for the webhook endpoint on that same account.
- `PRINTIFY_API_TOKEN`, created in Printify **My Profile → Connections** with
  `shops.read`, `products.read`, `orders.read`, and `orders.write` access.
  Enter it in the host's secret environment; never commit or send it in chat.
- `PRINTIFY_SHOP_ID=29102601` (confirm the shop ID in Printify before launch).
- `MERCH_PRODUCTS_JSON` with each product ID and its enabled variant IDs, in
  the format shown in `.env.example`.
- `MERCH_CHECKOUT_ENABLED=false` until the tests below pass.

Printify bills production, shipping, and any applicable Printify tax to its
linked payment method or Printify Balance; Stripe customer proceeds do not
directly fund that charge. Configure the billing method in Printify yourself.

## Verify before opening

1. Confirm the deployed `/api/merch/catalog` reports `available:false`.
2. Test each item/size and shipping quote against a mocked Printify API before
   connecting production credentials. A Stripe test payment with a **live**
   Printify token would still submit a real production order and charge the
   Printify billing method; do not perform that mixed-mode test.
3. With authorization for a sample order and its production cost, test one
   end-to-end purchase. Confirm exactly one `merch_orders` row and one
   Printify order with the same external ID; inspect its address, variants,
   placement, and production status. Check the set maps to two line items.
4. Confirm the Stripe webhook has `checkout.session.completed` and
   `checkout.session.async_payment_succeeded` enabled and that the signing
   secret matches the deployed endpoint. Replay a webhook and confirm no
   duplicate Printify order.
5. Set up applicable sales tax in Stripe and confirm the resulting checkout
   total. Confirm the Printify account has a working production payment method.
6. Only after a satisfactory physical sample and successful end-to-end checks,
   switch the production secret to `MERCH_CHECKOUT_ENABLED=true`.

Orders marked `needs_review` after an uncertain Printify submission must be
reconciled by external ID in Printify before any manual retry. The checkout
currently accepts US shipping addresses and one item or set per payment.
