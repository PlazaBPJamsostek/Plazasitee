/* =================================================================
   PLAZA BPJAMSOSTEK — SHARED SITE ENGINE
   Loaded on every page. Handles: loader, nav, scroll reveal, dark
   mode, i18n (ID/EN), floating action cluster, footer year, clock,
   weather, animated counters, newsletter + contact form demo submit.
   ================================================================= */

/* ===== LOADING SCREEN ===== */
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const bar = document.getElementById('loaderProgress');
  const floorLabel = document.getElementById('loaderFloor');
  let progress = 0;
  const floors = ['LT. 01', 'LT. 09', 'LT. 15', 'LT. 21', 'LOBBY'];
  const tick = setInterval(() => {
    progress += Math.random() * 22 + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(tick);
      if (floorLabel) floorLabel.textContent = 'SELAMAT DATANG';
      setTimeout(() => {
        loader.classList.add('hide');
        document.body.style.overflow = '';
      }, 300);
    } else if (floorLabel) {
      const idx = Math.min(floors.length - 1, Math.floor((progress / 100) * floors.length));
      floorLabel.textContent = floors[idx];
    }
    if (bar) bar.style.width = progress + '%';
  }, 160);
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!loader.classList.contains('hide')) {
        progress = 100;
        if (bar) bar.style.width = '100%';
        loader.classList.add('hide');
        document.body.style.overflow = '';
      }
    }, 1800);
  });
})();

/* ===== SCROLL PROGRESS BAR ===== */
(function () {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = (scrolled || 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== NAVBAR ===== */
(function () {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      })
    );
  }
})();

/* ===== SCROLL REVEAL ===== */
(function () {
  const items = document.querySelectorAll('.reveal, .reveal-scale');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => io.observe(el));

  // Re-observe for dynamically injected content (data-driven cards)
  window.reobserveReveal = function () {
    document.querySelectorAll('.reveal:not(.in), .reveal-scale:not(.in)').forEach((el) => io.observe(el));
  };
})();

/* ===== DARK MODE ===== */
(function () {
  const KEY = 'plaza-theme';
  const root = document.documentElement;
  const saved = localStorage.getItem(KEY);
  if (saved === 'dark') root.classList.add('dark');
  document.querySelectorAll('[data-dark-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.classList.toggle('dark');
      localStorage.setItem(KEY, root.classList.contains('dark') ? 'dark' : 'light');
    });
  });
})();

/* ===== FLOATING ACTION CLUSTER ===== */
(function () {
  const cluster = document.getElementById('floatingCluster');
  if (!cluster) return;
  const mainBtn = document.getElementById('fabMain');
  const menu = document.getElementById('fabMenu');
  const topBtn = document.getElementById('fabTop');
  if (mainBtn && menu) {
    mainBtn.addEventListener('click', () => {
      cluster.classList.toggle('open');
      menu.classList.toggle('collapsed');
    });
  }
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();

/* ===== FOOTER YEAR ===== */
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* ===== LIVE CLOCK (WIB) ===== */
(function () {
  const el = document.getElementById('liveClock');
  if (!el) return;
  function tick() {
    const now = new Date();
    const wib = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const hh = String(wib.getHours()).padStart(2, '0');
    const mm = String(wib.getMinutes()).padStart(2, '0');
    const ss = String(wib.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss} WIB`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ===== LIVE WEATHER (Jakarta, Open-Meteo — free, no API key) ===== */
(function () {
  const el = document.getElementById('liveWeather');
  if (!el) return;
  const codeMap = {
    0: { id: 'Cerah', en: 'Clear sky', ic: 'sun' },
    1: { id: 'Cerah Berawan', en: 'Mostly clear', ic: 'sun' },
    2: { id: 'Berawan Sebagian', en: 'Partly cloudy', ic: 'cloud-sun' },
    3: { id: 'Berawan', en: 'Overcast', ic: 'cloud' },
    45: { id: 'Berkabut', en: 'Fog', ic: 'cloud' },
    48: { id: 'Berkabut', en: 'Fog', ic: 'cloud' },
    51: { id: 'Gerimis Ringan', en: 'Light drizzle', ic: 'cloud-rain' },
    53: { id: 'Gerimis', en: 'Drizzle', ic: 'cloud-rain' },
    55: { id: 'Gerimis Lebat', en: 'Dense drizzle', ic: 'cloud-rain' },
    61: { id: 'Hujan Ringan', en: 'Light rain', ic: 'cloud-rain' },
    63: { id: 'Hujan', en: 'Rain', ic: 'cloud-rain' },
    65: { id: 'Hujan Lebat', en: 'Heavy rain', ic: 'cloud-rain' },
    80: { id: 'Hujan Sesaat', en: 'Rain showers', ic: 'cloud-rain' },
    81: { id: 'Hujan Sesaat', en: 'Rain showers', ic: 'cloud-rain' },
    82: { id: 'Hujan Deras', en: 'Violent showers', ic: 'cloud-rain' },
    95: { id: 'Badai Petir', en: 'Thunderstorm', ic: 'cloud-lightning' },
  };
  fetch('https://api.open-meteo.com/v1/forecast?latitude=-6.22&longitude=106.83&current_weather=true&timezone=Asia%2FJakarta')
    .then((r) => r.json())
    .then((data) => {
      const cw = data && data.current_weather;
      if (!cw) throw new Error('no data');
      const info = codeMap[cw.weathercode] || { id: 'Cerah Berawan', en: 'Partly cloudy', ic: 'cloud-sun' };
      const lang = (window.PlazaI18n && window.PlazaI18n.current) || 'id';
      el.innerHTML = `<strong>${Math.round(cw.temperature)}&deg;C</strong><span>${lang === 'en' ? info.en : info.id} &middot; Jakarta</span>`;
      el.dataset.idText = info.id;
      el.dataset.enText = info.en;
      el.dataset.temp = Math.round(cw.temperature);
    })
    .catch(() => {
      el.innerHTML = `<span>Jakarta &middot; --&deg;C</span>`;
    });
})();

/* ===== ANIMATED STAT COUNTERS ===== */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('id-ID')) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString('id-ID')) + suffix;
    }
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window)) { counters.forEach(animate); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach((c) => io.observe(c));
})();

/* ===== LOCAL VISITOR COUNTER (per-browser, transparently labelled) ===== */
(function () {
  const el = document.getElementById('visitorCount');
  if (!el) return;
  const KEY = 'plaza-visit-count';
  let n = parseInt(localStorage.getItem(KEY) || '0', 10);
  const lastVisit = localStorage.getItem('plaza-last-visit');
  const today = new Date().toDateString();
  if (lastVisit !== today) {
    n += 1;
    localStorage.setItem(KEY, String(n));
    localStorage.setItem('plaza-last-visit', today);
  }
  el.textContent = n.toLocaleString('id-ID');
})();

/* ===== NEWSLETTER FORM (demo, static-site friendly) ===== */
document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.querySelector('[data-form-note]');
    if (note) note.textContent = window.t ? window.t('newsletter.success') : 'Terima kasih! Anda telah berlangganan.';
    form.reset();
  });
});

/* ===== GENERIC CONTACT FORM DEMO SUBMIT ===== */
document.querySelectorAll('[data-contact-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.querySelector('[data-form-note]');
    if (note) note.textContent = window.t ? window.t('contact.formSuccess') : 'Terima kasih, pesan Anda telah diterima. Tim kami akan segera menghubungi Anda.';
    form.reset();
  });
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-item').forEach((item) => {
  const q = item.querySelector('.faq-q');
  if (!q) return;
  q.addEventListener('click', () => {
    const open = item.classList.contains('open');
    item.closest('.faq-list').querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

/* ===== TESTIMONIAL CAROUSEL ===== */
(function () {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dotsWrap = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    if (!track || !slides.length) return;
    let current = 0;
    let timer = null;
    if (dotsWrap) {
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(idx));
        dotsWrap.appendChild(dot);
      });
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];
    function goTo(idx) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function start() { stop(); timer = setInterval(next, 5500); }
    function stop() { if (timer) clearInterval(timer); }
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    start();
  });
})();

/* ===== INSTAGRAM REELS EMBED (shared: Beranda + Ballroom) =====
   Renders official Instagram embeds (no local video files needed).
   The embed.js widget script is only requested once the section is
   about to scroll into view, so pages that don't need it stay light. */
window.PlazaReels = (function () {
  let scriptRequested = false;
  function loadEmbedScript(cb) {
    if (window.instgrm && window.instgrm.Embeds) { cb(); return; }
    if (scriptRequested) {
      const wait = setInterval(() => {
        if (window.instgrm && window.instgrm.Embeds) { clearInterval(wait); cb(); }
      }, 200);
      return;
    }
    scriptRequested = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.instagram.com/embed.js';
    s.onload = cb;
    document.body.appendChild(s);
  }
  function normalizeUrl(url) {
    const clean = String(url || '').split('?')[0];
    return clean.endsWith('/') ? clean : clean + '/';
  }
  function cardHTML(reel, i) {
    const isEn = window.PlazaI18n && window.PlazaI18n.current === 'en';
    const loadingLabel = isEn ? 'Loading video&hellip;' : 'Memuat video&hellip;';
    return `
      <div class="reel-card reveal" style="--i:${i}">
        <blockquote class="instagram-media" data-instgrm-permalink="${normalizeUrl(reel.url)}" data-instgrm-version="14">
          <div class="reel-fallback">
            <div class="reel-fallback-icon">
              <svg viewBox="0 0 24 24" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>
            </div>
            <p>${reel.title || 'Instagram'}</p>
            <span>${loadingLabel}</span>
          </div>
        </blockquote>
        ${reel.title ? `<h5>${reel.title}</h5>` : ''}
      </div>`;
  }
  function renderInto(container, reels, opts) {
    opts = opts || {};
    if (!container) return;
    if (!reels || !reels.length) {
      container.innerHTML = opts.emptyHTML || '';
      return;
    }
    container.innerHTML = reels.map(cardHTML).join('');
    if (window.reobserveReveal) window.reobserveReveal();
    const process = () => loadEmbedScript(() => { if (window.instgrm) window.instgrm.Embeds.process(); });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { process(); io.disconnect(); }
        });
      }, { rootMargin: '500px 0px' });
      io.observe(container);
    } else {
      process();
    }
  }
  return { renderInto };
})();

/* ===== SMOOTH ANCHOR OFFSET (fixed nav) ===== */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  const y = target.getBoundingClientRect().top + window.scrollY - 86;
  window.scrollTo({ top: y, behavior: 'smooth' });
});

/* ===== PRINT BUTTON ===== */
document.querySelectorAll('[data-print]').forEach((btn) => {
  btn.addEventListener('click', () => window.print());
});
