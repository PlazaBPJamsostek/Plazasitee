/* =================================================================
   PLAZA BPJAMSOSTEK — I18N ENGINE (Bahasa Indonesia / English)
   Dictionary lives in js/i18n-data.js as window.PlazaDict = {id:{},en:{}}
   Usage in HTML:
     data-i18n="key"             -> sets textContent
     data-i18n-html="key"        -> sets innerHTML (allows <strong> etc)
     data-i18n-placeholder="key" -> sets placeholder attribute
     data-i18n-title="key"       -> sets title attribute
   ================================================================= */
(function () {
  const KEY = 'plaza-lang';
  const dict = window.PlazaDict || { id: {}, en: {} };

  function get(lang, key) {
    return (dict[lang] && dict[lang][key]) !== undefined ? dict[lang][key] : (dict.id[key] !== undefined ? dict.id[key] : null);
  }

  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = get(lang, el.getAttribute('data-i18n'));
      if (v !== null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const v = get(lang, el.getAttribute('data-i18n-html'));
      if (v !== null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const v = get(lang, el.getAttribute('data-i18n-placeholder'));
      if (v !== null) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const v = get(lang, el.getAttribute('data-i18n-title'));
      if (v !== null) el.setAttribute('title', v);
    });
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    // update weather widget language if already loaded
    const w = document.getElementById('liveWeather');
    if (w && w.dataset.temp) {
      const txt = lang === 'en' ? w.dataset.enText : w.dataset.idText;
      w.innerHTML = `<strong>${w.dataset.temp}&deg;C</strong><span>${txt} &middot; Jakarta</span>`;
    }
    document.dispatchEvent(new CustomEvent('plaza:langchange', { detail: { lang } }));
  }

  function setLang(lang) {
    if (lang !== 'id' && lang !== 'en') lang = 'id';
    localStorage.setItem(KEY, lang);
    window.PlazaI18n.current = lang;
    apply(lang);
  }

  window.PlazaI18n = {
    current: localStorage.getItem(KEY) || 'id',
    setLang: setLang,
    t: function (key) { return get(window.PlazaI18n.current, key) || key; },
  };
  window.t = window.PlazaI18n.t;

  document.addEventListener('DOMContentLoaded', () => {
    apply(window.PlazaI18n.current);
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  });
})();
