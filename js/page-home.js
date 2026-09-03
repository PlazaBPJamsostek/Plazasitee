/* Home page — renders dynamic sections from window.PlazaData and
   re-renders them whenever the language is switched. */
(function () {
  const D = window.PlazaData;
  if (!D) return;
  const lang = () => (window.PlazaI18n ? window.PlazaI18n.current : 'id');

  const totalAvailArea = D.floors.reduce((sum, f) => sum + f.area, 0);
  const cheapestRent = Math.min(...D.floors.map((f) => f.rent));

  /* ---- hero / dashboard numeric stats ---- */
  function setCount(id, value) {
    const el = document.getElementById(id);
    if (el) el.setAttribute('data-count', value);
  }
  setCount('statTotalFloors', D.building.totalFloors);
  setCount('statOfficeFloors', D.building.officeFloors);
  setCount('statAvailFloors', D.floors.length);
  setCount('statAvailArea', Math.round(totalAvailArea));
  setCount('dashFloors', D.floors.length);
  setCount('dashArea', Math.round(totalAvailArea));
  const dashRent = document.getElementById('dashRent');
  if (dashRent) dashRent.textContent = 'Rp ' + cheapestRent.toLocaleString('id-ID');

  /* ---- testimonials ---- */
  const carousel = document.getElementById('testiCarousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    function render() {
      track.innerHTML = D.testimonials
        .map(
          (t, i) => `
        <div class="carousel-slide testi-slide${i === 0 ? ' active' : ''}">
          <svg class="quote-mark" viewBox="0 0 24 24" width="34" height="34"><path d="M7 9c-2 0-3 1.5-3 3.5S5 16 7 16c0 2-1 3-3 3v2c3 0 5-2 5-5V9H7Zm10 0c-2 0-3 1.5-3 3.5s1 3.5 3 3.5c0 2-1 3-3 3v2c3 0 5-2 5-5V9h-2Z" fill="currentColor"/></svg>
          <p class="testi-quote">${lang() === 'en' ? t.quote_en : t.quote_id}</p>
          <p class="testi-role">${lang() === 'en' ? t.role_en : t.role_id}</p>
        </div>`
        )
        .join('');
      track.querySelectorAll('.carousel-dots').length; // noop safeguard
    }
    render();
    // Re-init dots/controls fresh each time language changes (dots handled by main.js on first load only,
    // so we keep testimonials simple: fade first slide, use prev/next buttons directly here)
    let current = 0;
    const slides = () => Array.from(track.querySelectorAll('.testi-slide'));
    function goTo(i) {
      const s = slides();
      if (!s.length) return;
      s[current] && s[current].classList.remove('active');
      current = (i + s.length) % s.length;
      s[current].classList.add('active');
    }
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));
    let timer = setInterval(() => goTo(current + 1), 6000);
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(current + 1), 6000); });
    document.addEventListener('plaza:langchange', () => { current = 0; render(); });
  }

  /* ---- news ---- */
  const newsGrid = document.getElementById('newsGrid');
  function renderNews() {
    if (!newsGrid) return;
    newsGrid.innerHTML = D.news
      .map(
        (n, i) => `
      <article class="news-card card reveal" style="--i:${i}">
        <div class="news-top">
          <span class="badge badge-gold">${lang() === 'en' ? n.tag_en : n.tag_id}</span>
          <span class="news-date">${lang() === 'en' ? n.date_en : n.date_id}</span>
        </div>
        <h4>${lang() === 'en' ? n.title_en : n.title_id}</h4>
        <p class="muted">${lang() === 'en' ? n.body_en : n.body_id}</p>
      </article>`
      )
      .join('');
    if (window.reobserveReveal) window.reobserveReveal();
  }
  renderNews();
  document.addEventListener('plaza:langchange', renderNews);

  /* ---- FAQ ---- */
  const faqList = document.getElementById('faqList');
  function renderFaq() {
    if (!faqList) return;
    faqList.innerHTML = D.faq
      .map(
        (f, i) => `
      <div class="faq-item${i === 0 ? ' open' : ''}">
        <button class="faq-q" type="button">
          <span>${lang() === 'en' ? f.q_en : f.q_id}</span>
          <svg viewBox="0 0 24 24" class="faq-caret"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="faq-a"><p>${lang() === 'en' ? f.a_en : f.a_id}</p></div>
      </div>`
      )
      .join('');
    faqList.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-q').addEventListener('click', () => {
        const open = item.classList.contains('open');
        faqList.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
        if (!open) item.classList.add('open');
      });
    });
  }
  renderFaq();
  document.addEventListener('plaza:langchange', renderFaq);

  /* ---- explore / availability preview cards (top 3 cheapest / soonest) ---- */
  const previewWrap = document.getElementById('floorPreview');
  function renderPreview() {
    if (!previewWrap) return;
    const top3 = D.floors.slice(0, 3);
    previewWrap.innerHTML = top3
      .map(
        (f, i) => `
      <a href="sewa-kantor.html#${f.id}" class="floor-preview-card card reveal" style="--i:${i}">
        <div class="fpc-img skeleton"><img src="${f.photo}" alt="Lantai ${f.floorLabel}" loading="lazy" onload="this.parentElement.classList.remove('skeleton')"></div>
        <div class="fpc-body">
          <span class="badge badge-live">${window.t ? window.t('common.available') : 'Tersedia'}</span>
          <h4>${lang() === 'en' ? 'Floor' : 'Lantai'} ${f.floorLabel}</h4>
          <div class="fpc-meta">
            <span>${f.area.toLocaleString('id-ID')} m\u00B2</span>
            <span>Rp ${f.rent.toLocaleString('id-ID')}${window.t ? window.t('common.perMonth') : '/m²/bulan'}</span>
          </div>
        </div>
      </a>`
      )
      .join('');
    if (window.reobserveReveal) window.reobserveReveal();
  }
  /* ---- Instagram reels ---- */
  const reelsGrid = document.getElementById('videoGrid');
  function renderReels() {
    if (!reelsGrid) return;
    const reels = (D.instagramReels || []).map((r) => ({ url: r.url, title: lang() === 'en' ? r.title_en : r.title_id }));
    window.PlazaReels.renderInto(reelsGrid, reels, {
      emptyHTML: `
        <div class="video-empty reveal">
          <svg viewBox="0 0 24 24"><path d="M4 6h13v12H4V6Zm13 4 5-3v10l-5-3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p>${t('home.video.empty')}</p>
        </div>`,
    });
  }
  renderReels();
  document.addEventListener('plaza:langchange', renderReels);
})();
