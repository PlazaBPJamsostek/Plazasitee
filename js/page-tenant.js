/* Tenant Directory page */
(function () {
  const D = window.PlazaData;
  if (!D) return;
  const t = (k) => (window.t ? window.t(k) : k);
  const FAV_KEY = 'plaza-tenant-favorites';

  const grid = document.getElementById('tenantGrid');
  const searchInput = document.getElementById('tenantSearch');
  const catPills = document.getElementById('tenantCatPills');
  const favToggle = document.getElementById('tenantFavToggle');
  const countEl = document.getElementById('tenantCount');
  const cats = ['all', 'office', 'banking', 'retail', 'wedding'];
  let activeCat = 'all';

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch (e) { return []; }
  }
  function toggleFavorite(name) {
    let favs = getFavorites();
    if (favs.includes(name)) favs = favs.filter((n) => n !== name);
    else favs.push(name);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    return favs;
  }

  function renderPills() {
    if (!catPills) return;
    catPills.innerHTML = cats
      .map((c) => `<button type="button" data-cat="${c}" class="${c === activeCat ? 'active' : ''}">${t('tenant.cat.' + c)}</button>`)
      .join('');
    catPills.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-cat');
        renderPills();
        render();
      });
    });
  }

  function initials(name) {
    return name
      .split(' ')
      .filter((w) => w.length > 1 || /[A-Za-z]/.test(w))
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join('');
  }

  function render() {
    if (!grid) return;
    const q = (searchInput && searchInput.value.trim().toLowerCase()) || '';
    const favs = getFavorites();
    const onlyFav = favToggle && favToggle.querySelector('input').checked;
    const items = D.tenants.filter((tn) => {
      if (activeCat !== 'all' && tn.cat !== activeCat) return false;
      if (q && !tn.name.toLowerCase().includes(q)) return false;
      if (onlyFav && !favs.includes(tn.name)) return false;
      return true;
    });
    grid.innerHTML = items.length
      ? items
          .map(
            (tn, i) => `
        <div class="tenant-card reveal" style="--i:${Math.min(i, 12)}">
          <button type="button" class="tc-fav${favs.includes(tn.name) ? ' active' : ''}" data-fav="${tn.name}" aria-label="Favorit">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-7-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 21 11c0 5.5-7 10-7 10Z" stroke-linejoin="round"/></svg>
          </button>
          <div class="tc-avatar">${initials(tn.name)}</div>
          <h4>${tn.name}</h4>
          <div class="tc-floor">${tn.floor}</div>
          <span class="tc-cat">${t('tenant.cat.' + tn.cat)}</span>
        </div>`
          )
          .join('')
      : `<div class="no-results" style="grid-column:1/-1;">${t('tenant.empty')}</div>`;
    if (countEl) countEl.textContent = `${items.length} ${t('tenant.count')}`;
    grid.querySelectorAll('[data-fav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleFavorite(btn.getAttribute('data-fav'));
        render();
      });
    });
    if (window.reobserveReveal) window.reobserveReveal();
  }

  renderPills();
  render();
  if (searchInput) searchInput.addEventListener('input', render);
  if (favToggle) favToggle.querySelector('input').addEventListener('change', render);
  document.addEventListener('plaza:langchange', () => { renderPills(); render(); });
})();
