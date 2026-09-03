/* Ballroom page */
(function () {
  /* ---- Instagram reel (reuses the same source as Beranda, first item) ---- */
  const D = window.PlazaData;
  const reelWrap = document.getElementById('ballroomReel');
  if (D && reelWrap && window.PlazaReels) {
    const lang = () => (window.PlazaI18n ? window.PlazaI18n.current : 'id');
    function renderBallroomReel() {
      const first = (D.instagramReels || [])[0];
      const reels = first ? [{ url: first.url, title: lang() === 'en' ? first.title_en : first.title_id }] : [];
      window.PlazaReels.renderInto(reelWrap, reels, { emptyHTML: '' });
    }
    renderBallroomReel();
    document.addEventListener('plaza:langchange', renderBallroomReel);
  }

  const tabs = document.querySelectorAll('.layout-tab');
  const panels = document.querySelectorAll('.layout-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((tb) => tb.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.getAttribute('data-layout'));
      if (target) target.classList.add('active');
    });
  });

  /* ---- gallery lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCap = document.getElementById('lightboxCap');
  document.querySelectorAll('[data-lightbox]').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img || !lightbox) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCap) lightboxCap.textContent = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
})();
