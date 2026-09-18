export function renderServices(services) {
  return services.map((service) => `
    <article class="service-card">
      <div class="service-card__top">
        <h3>${service.name}</h3>
        <span class="service-card__price">${service.price} kr</span>
      </div>
      <p>${service.description}</p>
    </article>
  `).join('');
}

export function renderServiceOptions(services) {
  const options = services.map((service) => `<option value="${service.id}">${service.name} — ${service.price} kr</option>`);
  return '<option value="">Vælg behandling...</option>' + options.join('');
}
