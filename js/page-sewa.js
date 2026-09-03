/* Sewa Kantor (Available Office) page */
(function () {
  const D = window.PlazaData;
  if (!D) return;
  const lang = () => (window.PlazaI18n ? window.PlazaI18n.current : 'id');
  const t = (k) => (window.t ? window.t(k) : k);

  const grid = document.getElementById('floorGrid');
  const searchInput = document.getElementById('filterSearch');
  const areaSelect = document.getElementById('filterArea');
  const condSelect = document.getElementById('filterCondition');
  const rentSelect = document.getElementById('filterRent');
  const resetBtn = document.getElementById('filterReset');
  const countEl = document.getElementById('filterCount');
  const tableBody = document.getElementById('availTableBody');

  /* ---- header stats ---- */
  const totalArea = D.floors.reduce((s, f) => s + f.area, 0);
  const minRent = Math.min(...D.floors.map((f) => f.rent));
  const maxRent = Math.max(...D.floors.map((f) => f.rent));
  const rentRangeEl = document.getElementById('rentRange');
  if (rentRangeEl) rentRangeEl.textContent = `Rp ${minRent.toLocaleString('id-ID')} – ${maxRent.toLocaleString('id-ID')}`;
  const totalAreaEl = document.getElementById('totalAreaStat');
  if (totalAreaEl) totalAreaEl.setAttribute('data-count', Math.round(totalArea));
  const heroFloorCount = document.getElementById('heroFloorCount');
  if (heroFloorCount) heroFloorCount.setAttribute('data-count', D.floors.length);
  const heroAreaCount = document.getElementById('heroAreaCount');
  if (heroAreaCount) heroAreaCount.setAttribute('data-count', Math.round(totalArea));

  function conditionLabel(cond) {
    return cond === 'bare' ? t('common.bare') : t('common.fitted');
  }

  function matchesFilters(f) {
    const q = (searchInput && searchInput.value.trim().toLowerCase()) || '';
    if (q && !(`lantai ${f.floorLabel}`.includes(q) || `floor ${f.floorLabel}`.includes(q) || f.floorLabel.includes(q))) return false;
    const area = (areaSelect && areaSelect.value) || 'all';
    if (area === 'small' && f.area >= 700) return false;
    if (area === 'med' && (f.area < 700 || f.area > 1200)) return false;
    if (area === 'large' && f.area <= 1200) return false;
    const cond = (condSelect && condSelect.value) || 'all';
    if (cond !== 'all' && f.condition !== cond) return false;
    const rent = (rentSelect && rentSelect.value) || 'all';
    if (rent !== 'all' && String(f.rent) !== rent) return false;
    return true;
  }

  function cardHTML(f, i) {
    return `
    <article class="floor-card card reveal" style="--i:${i}" data-floor-card="${f.id}">
      <div class="floor-card-img skeleton">
        <img src="${f.photo}" alt="Foto Lantai ${f.floorLabel}" loading="lazy" onload="this.parentElement.classList.remove('skeleton')">
        <span class="floor-card-num">${t('sewa.card.floor')} ${f.floorLabel}</span>
        <span class="floor-card-cond badge ${f.condition === 'bare' ? 'badge-green' : 'badge-gold'}">${conditionLabel(f.condition)}</span>
      </div>
      <div class="floor-card-body">
        <div class="floor-card-meta">
          <span class="area">${f.area.toLocaleString('id-ID')} <small>m²</small></span>
          <span class="badge badge-live">${t('common.available')}</span>
        </div>
        <p class="floor-card-view">${lang() === 'en' ? f.view_en : f.view_id}</p>
        <div class="floor-card-rent">
          <span>${t('common.rent')}</span>
          <strong>Rp ${f.rent.toLocaleString('id-ID')}${t('common.perMonth')}</strong>
        </div>
        <div class="floor-card-actions">
          <button type="button" class="btn btn-outline btn-sm" data-open-modal="${f.id}">${t('common.viewDetail')}</button>
          <a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="https://wa.me/${D.building.whatsapp}?text=${encodeURIComponent(t('sewa.modal.waMsg') + ' ' + f.floorLabel)}">${t('common.scheduleViewing')}</a>
        </div>
      </div>
    </article>`;
  }

  function render() {
    if (!grid) return;
    const filtered = D.floors.filter(matchesFilters);
    grid.innerHTML = filtered.length
      ? filtered.map(cardHTML).join('')
      : `<div class="no-results">${t('common.noResults')}</div>`;
    if (countEl) countEl.textContent = `${filtered.length} ${t('sewa.filter.showing')}`;
    grid.querySelectorAll('[data-open-modal]').forEach((btn) => {
      btn.addEventListener('click', () => openModal(btn.getAttribute('data-open-modal')));
    });
    if (window.reobserveReveal) window.reobserveReveal();
  }

  [searchInput, areaSelect, condSelect, rentSelect].forEach((el) => {
    if (el) el.addEventListener('input', render);
  });
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (areaSelect) areaSelect.value = 'all';
      if (condSelect) condSelect.value = 'all';
      if (rentSelect) rentSelect.value = 'all';
      render();
    });
  }
  document.addEventListener('plaza:langchange', render);
  render();

  /* ---- printable summary table ---- */
  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = D.floors
      .map(
        (f) => `
      <tr>
        <td>${t('sewa.card.floor')} ${f.floorLabel}</td>
        <td>${f.area.toLocaleString('id-ID')} m²</td>
        <td>Rp ${f.rent.toLocaleString('id-ID')}${t('common.perMonth')}</td>
        <td>${conditionLabel(f.condition)}</td>
      </tr>`
      )
      .join('');
  }
  renderTable();
  document.addEventListener('plaza:langchange', renderTable);

  /* ---- floor detail modal ---- */
  const modal = document.getElementById('floorModal');
  if (!modal) return;
  const mainImg1 = document.getElementById('fmImg1');
  const mainImg2 = document.getElementById('fmImg2');
  const mainImg3 = document.getElementById('fmImg3');
  const tabs = modal.querySelectorAll('.fm-tabs button');
  const titleEl = document.getElementById('fmTitle');
  const areaStat = document.getElementById('fmArea');
  const rentStat = document.getElementById('fmRent');
  const serviceStat = document.getElementById('fmService');
  const condStat = document.getElementById('fmCondition');
  const descEl = document.getElementById('fmDesc');
  const scheduleBtn = document.getElementById('fmScheduleBtn');
  const specBtn = document.getElementById('fmSpecBtn');
  let currentFloor = null;

  function setTab(idx) {
    [mainImg1, mainImg2, mainImg3].forEach((img, i) => img && img.classList.toggle('active', i === idx));
    tabs.forEach((tb, i) => tb.classList.toggle('active', i === idx));
  }

  function openModal(id) {
    const f = D.floors.find((x) => x.id === id);
    if (!f) return;
    currentFloor = f;
    mainImg1.src = f.photo;
    mainImg2.src = f.plan;
    mainImg3.src = f.spec;
    setTab(0);
    titleEl.textContent = `${t('sewa.card.floor')} ${f.floorLabel}`;
    areaStat.textContent = f.area.toLocaleString('id-ID') + ' m²';
    rentStat.textContent = 'Rp ' + f.rent.toLocaleString('id-ID') + t('common.perMonth');
    serviceStat.textContent = t('common.negotiable');
    condStat.textContent = conditionLabel(f.condition);
    descEl.textContent = (lang() === 'en' ? f.view_en : f.view_id) + ' ' + f.breakdown;
    scheduleBtn.href = `https://wa.me/${D.building.whatsapp}?text=${encodeURIComponent(t('sewa.modal.waMsg') + ' ' + f.floorLabel)}`;
    specBtn.href = f.spec;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  window.openModal = openModal;

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  modal.querySelectorAll('.modal-close, .modal-backdrop').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  tabs.forEach((tb, i) => tb.addEventListener('click', () => setTab(i)));
  document.addEventListener('plaza:langchange', () => { if (currentFloor) openModal(currentFloor.id); });

  /* open modal directly if URL has a #lt.. hash (linked from Home preview cards) */
  if (location.hash && D.floors.some((f) => f.id === location.hash.slice(1))) {
    setTimeout(() => openModal(location.hash.slice(1)), 700);
  }
})();
