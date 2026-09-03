/* Facility page */
(function () {
  const D = window.PlazaData;
  if (!D) return;
  const lang = () => (window.PlazaI18n ? window.PlazaI18n.current : 'id');
  const t = (k) => (window.t ? window.t(k) : k);

  const ICONS = {
    foodcourt: '<path d="M5 4v8a3 3 0 0 0 3 3v7M5 4a2 2 0 0 0-2 2M8 4v8M11 4v8M17 4c-2 0-3 2-3 5v3h6v-3c0-3-1-5-3-5Zm0 8v8" stroke-linecap="round" stroke-linejoin="round"/>',
    'bank-atm': '<path d="M3 10L12 4l9 6M5 10v9h14v-9M9 19v-6h6v6" stroke-linecap="round" stroke-linejoin="round"/>',
    gym: '<path d="M4 12h2m12 0h2M6 8v8m12-8v8M8 12h8" stroke-linecap="round" stroke-linejoin="round"/>',
    badminton: '<circle cx="12" cy="5" r="2"/><path d="M5 21l3-9 4 2 4-2 3 9M9 12l1-5h4l1 5" stroke-linecap="round" stroke-linejoin="round"/>',
    musholla: '<path d="M4 21V11l8-7 8 7v10" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4v4M9 7h6M10 21v-6h4v6" stroke-linecap="round"/>',
    'business-center': '<rect x="4" y="7" width="16" height="12" rx="1.5"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke-linecap="round" stroke-linejoin="round"/>',
    minimarket: '<path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.6L21 8H6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="21" r="1.2"/><circle cx="17" cy="21" r="1.2"/>',
    'lounge-cafe': '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Zm13 2h2a2 2 0 0 1 0 4h-2M7 3c0 1-1 1.5-1 2.5S7 7 7 7M11 3c0 1-1 1.5-1 2.5S11 7 11 7" stroke-linecap="round" stroke-linejoin="round"/>',
    medical: '<path d="M12 4v16M4 12h16" stroke-linecap="round"/><rect x="3" y="3" width="18" height="18" rx="4"/>',
    security: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>',
    parking: '<path d="M6 3h7a5 5 0 0 1 0 10H9v8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 3v18" stroke-linecap="round"/>',
    'ev-charging': '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/>',
  };

  const grid = document.getElementById('facilityGrid');
  const modal = document.getElementById('facilityModal');
  const modalHero = document.getElementById('fmodHero');
  const modalTitle = document.getElementById('fmodTitle');
  const modalDesc = document.getElementById('fmodDesc');

  function render() {
    if (!grid) return;
    grid.innerHTML = D.facilities
      .map(
        (f, i) => `
      <div class="facility-icon-card reveal" style="--i:${i}" data-facility="${f.key}">
        ${f.comingSoon ? `<span class="fc-soon">${t('common.comingSoon')}</span>` : ''}
        <div class="hex-icon-wrap"><svg viewBox="0 0 24 24">${ICONS[f.key] || ''}</svg></div>
        <h4>${lang() === 'en' ? f.name_en : f.name_id}</h4>
      </div>`
      )
      .join('');
    grid.querySelectorAll('[data-facility]').forEach((card) => {
      card.addEventListener('click', () => openModal(card.getAttribute('data-facility')));
    });
    if (window.reobserveReveal) window.reobserveReveal();
  }

  function openModal(key) {
    const f = D.facilities.find((x) => x.key === key);
    if (!f || !modal) return;
    modalTitle.textContent = lang() === 'en' ? f.name_en : f.name_id;
    modalDesc.textContent = lang() === 'en' ? f.desc_en : f.desc_id;
    if (f.photo) {
      modalHero.classList.remove('no-photo');
      modalHero.innerHTML = `<img src="${f.photo}" alt="${lang() === 'en' ? f.name_en : f.name_id}">`;
    } else {
      modalHero.classList.add('no-photo');
      modalHero.innerHTML = `<svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" stroke-width="1.4">${ICONS[f.key] || ''}</svg>`;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (modal) {
    modal.querySelectorAll('.modal-close, .modal-backdrop').forEach((el) => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  render();
  document.addEventListener('plaza:langchange', render);

  /* ---- services (housekeeping / security / engineering) ---- */
  const svcGrid = document.getElementById('serviceGrid');
  function renderServices() {
    if (!svcGrid) return;
    svcGrid.innerHTML = D.services
      .map(
        (s, i) => `
      <div class="service-card card reveal" style="--i:${i}">
        <div class="service-photo"><img src="${s.photo}" alt="${lang() === 'en' ? s.name_en : s.name_id}" loading="lazy"></div>
        <div class="service-body"><h4>${lang() === 'en' ? s.name_en : s.name_id}</h4><p>${lang() === 'en' ? s.desc_en : s.desc_id}</p></div>
      </div>`
      )
      .join('');
    if (window.reobserveReveal) window.reobserveReveal();
  }
  renderServices();
  document.addEventListener('plaza:langchange', renderServices);
})();
