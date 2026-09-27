(() => {
  const section = document.getElementById('merch-checkout');
  const form = document.getElementById('merch-order-form');
  const message = document.getElementById('merch-checkout-message');
  const product = form.elements.product;
  const submit = form.querySelector('button[type="submit"]');
  const api = window.DCT_API_URL;

  const updateSizeFields = () => {
    const set = product.value === 'set';
    form.querySelector('[data-single-size]').hidden = set;
    form.elements.size.disabled = set;
    form.querySelectorAll('[data-set-size]').forEach((label) => {
      label.hidden = !set;
      label.querySelector('select').disabled = !set;
    });
  };
  product.addEventListener('change', updateSizeFields);
  updateSizeFields();

  fetch(`${api}/merch/catalog`)
    .then((response) => response.ok ? response.json() : null)
    .then((catalog) => {
      if (!catalog?.available) return;
      section.hidden = false;
      document.querySelectorAll('.merch-card .status').forEach((status) => { status.textContent = 'Order below'; });
      document.querySelector('.merch-note p').textContent =
        'Prices shown are before shipping. Enter your delivery address below to see standard shipping at Stripe checkout.';
    })
    .catch(() => {}); // The shop remains visibly closed if the API is unavailable.

  const params = new URLSearchParams(location.search);
  if (params.get('order') === 'received') {
    const note = document.querySelector('.merch-note');
    note.querySelector('h2').textContent = 'Payment received';
    note.querySelector('p').textContent = 'Thank you. Your order is being processed. Contact the DCT team if you need help.';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submit.disabled = true;
    message.textContent = 'Calculating shipping…';
    const values = new FormData(form);
    const selection = { product: values.get('product') };
    if (selection.product === 'set') {
      selection.hoodieSize = values.get('hoodieSize');
      selection.joggersSize = values.get('joggersSize');
    } else {
      selection.size = values.get('size');
    }
    const address = Object.fromEntries(
      ['first_name', 'last_name', 'email', 'phone', 'address1', 'address2', 'city', 'region', 'zip']
        .map((name) => [name, values.get(name) || ''])
    );
    try {
      const response = await fetch(`${api}/merch/checkout`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selection, address })
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || 'Checkout is unavailable.');
      location.assign(result.url);
    } catch (error) {
      message.textContent = error.message || 'Checkout is unavailable. Please try again later.';
      submit.disabled = false;
    }
  });
})();
