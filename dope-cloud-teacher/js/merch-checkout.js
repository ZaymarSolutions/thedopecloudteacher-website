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
      if (!catalog?.available) {
        message.textContent = 'Live checkout is not open yet. Product details are available now; please check back shortly or email the DCT team.';
        submit.disabled = true;
        return;
      }
      const availableProducts = Object.entries(catalog.products).filter(([, item]) => item.available !== false).map(([key]) => key);
      Array.from(product.options).forEach((option) => {
        option.disabled = !availableProducts.includes(option.value);
        if (option.disabled) option.textContent += ' — Coming soon';
      });
      if (!availableProducts.includes(product.value)) product.value = availableProducts[0];
      updateSizeFields();
      section.hidden = false;
      message.textContent = 'Live checkout is available. Complete your delivery details to continue.';
      document.querySelectorAll('[data-merch-product]').forEach((link) => {
        const available = availableProducts.includes(link.dataset.merchProduct);
        link.closest('.merch-card').querySelector('.status').textContent = available ? 'Available to order' : 'Coming soon';
        if (!available) {
          link.textContent = 'Coming soon';
          link.removeAttribute('href');
          link.removeAttribute('data-merch-product');
          link.setAttribute('aria-disabled', 'true');
          link.style.pointerEvents = 'none';
        }
      });
      document.querySelector('.merch-note p').textContent =
        'Prices shown are before shipping. Enter your delivery address below to see standard shipping at Stripe checkout.';
    })
    .catch(() => {
      message.textContent = 'We could not verify live checkout right now. Please try again shortly or email the DCT team.';
      submit.disabled = true;
    });

  const params = new URLSearchParams(location.search);
  if (params.get('order') === 'received') {
    const confirmation = document.createElement('section');
    confirmation.id = 'order-confirmation';
    confirmation.className = 'merch-note';
    confirmation.setAttribute('role', 'status');
    confirmation.setAttribute('tabindex', '-1');
    const heading = document.createElement('h2');
    heading.textContent = 'Thank you for your order';
    const detail = document.createElement('p');
    detail.textContent = 'Checking your payment. Please do not submit another order.';
    const support = document.createElement('a');
    support.href = 'mailto:thedopecloudteacher@gmail.com';
    support.textContent = 'Questions? Email the DCT team';
    confirmation.append(heading, detail, support);
    document.querySelector('main').prepend(confirmation);
    confirmation.focus({ preventScroll: true });
    confirmation.scrollIntoView({ block: 'center' });
    const sessionId = params.get('session_id');
    if (!sessionId) {
      detail.textContent = 'Your checkout has returned to DCT. If you completed payment, please do not pay again. Contact us to confirm your order.';
    } else {
      fetch(`${api}/merch/order-status?session_id=${encodeURIComponent(sessionId)}`)
        .then(async response => {
          const result = await response.json();
          if (!response.ok) throw new Error(result.error);
          if (!result.paid) {
            heading.textContent = 'Payment has not been confirmed';
            detail.textContent = 'Please do not pay again until you have checked your payment status with the DCT team.';
            return;
          }
          heading.textContent = 'Payment confirmed — thank you!';
          const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result.total / 100);
          detail.textContent = `Order ${result.orderReference}. Total paid: ${total}. ${result.fulfillment === 'production' ? 'Your order has been sent to production.' : 'Your order is being processed for fulfillment.'} Your payment receipt will be emailed to the address used at checkout.`;
          form.hidden = true;
          document.getElementById('checkout-title').textContent = 'Your order is confirmed';
        })
        .catch(error => {
          heading.textContent = 'We are checking your order';
          detail.textContent = error.message || 'Please do not pay again. Contact the DCT team to confirm your order.';
        });
    }
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
