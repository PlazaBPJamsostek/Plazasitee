/* Floor Directory page */
(function () {
  const D = window.PlazaData;
  if (!D) return;
  const lang = () => (window.PlazaI18n ? window.PlazaI18n.current : 'id');
  const t = (k) => (window.t ? window.t(k) : k);

  const ICONS = {
    parking: '<path d="M6 3h7a5 5 0 0 1 0 10H9v8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 3v18" stroke-linecap="round"/>',
    lobby: '<path d="M4 21V9l8-6 8 6v12M9 21v-7h6v7" stroke-linecap="round" stroke-linejoin="round"/>',
    bank: '<path d="M3 10L12 4l9 6M5 10v9h14v-9M9 19v-6h6v6" stroke-linecap="round" stroke-linejoin="round"/>',
    foodcourt: '<path d="M5 4v8a3 3 0 0 0 3 3v7M5 4a2 2 0 0 0-2 2M8 4v8M11 4v8M17 4c-2 0-3 2-3 5v3h6v-3c0-3-1-5-3-5Zm0 8v8" stroke-linecap="round" stroke-linejoin="round"/>',
    ballroom: '<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" stroke-linecap="round" stroke-linejoin="round"/>',
    office: '<path d="M4 21V8l8-5 8 5v13M9 21v-7h6v7M9 12h.01M15 12h.01M9 8h.01M15 8h.01" stroke-linecap="round" stroke-linejoin="round"/>',
    toilet: '<circle cx="12" cy="6" r="2.5"/><path d="M7 21l2-9h6l2 9M9 12V9M15 12V9" stroke-linecap="round" stroke-linejoin="round"/>',
    musholla: '<path d="M4 21V11l8-7 8 7v10" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4v4M9 7h6M10 21v-6h4v6" stroke-linecap="round"/>',
    lift: '<rect x="6" y="3" width="12" height="18" rx="1.5"/><path d="M10 8l2-2 2 2M10 14l2 2 2-2" stroke-linecap="round" stroke-linejoin="round"/>',
    sport: '<circle cx="12" cy="5" r="2"/><path d="M5 21l3-9 4 2 4-2 3 9M9 12l1-5h4l1 5" stroke-linecap="round" stroke-linejoin="round"/>',
    retail: '<path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.6L21 8H6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="21" r="1.2"/><circle cx="17" cy="21" r="1.2"/>',
  };

  const cats = ['all', 'office', 'retail', 'foodcourt', 'ballroom', 'parking', 'lobby', 'musholla', 'lift', 'toilet', 'sport'];
  const tabsWrap = document.getElementById('dirTabs');
  const grid = document.getElementById('dirGrid');
  let active = 'all';

  function renderTabs() {
    if (!tabsWrap) return;
    tabsWrap.innerHTML = cats
      .map((c) => `<button type="button" class="dir-tab${c === active ? ' active' : ''}" data-cat="${c}">${t('floordir.tab.' + c)}</button>`)
      .join('');
    tabsWrap.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        active = btn.getAttribute('data-cat');
        renderTabs();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    if (!grid) return;
    const items = D.directory.filter((d) => active === 'all' || d.cat === active);
    grid.innerHTML = items
      .map(
        (d, i) => `
      <div class="dir-card card reveal" style="--i:${i}">
        <div class="hex-icon-wrap"><svg viewBox="0 0 24 24">${ICONS[d.icon] || ICONS.office}</svg></div>
        <div>
          <span class="zone">${lang() === 'en' ? d.zone_en : d.zone_id}</span>
          <h4>${lang() === 'en' ? d.label_en : d.label_id}</h4>
          <p>${lang() === 'en' ? d.note_en : d.note_id}</p>
        </div>
      </div>`
      )
      .join('');
    if (window.reobserveReveal) window.reobserveReveal();
  }

  renderTabs();
  renderGrid();
  document.addEventListener('plaza:langchange', () => { renderTabs(); renderGrid(); });
})();
