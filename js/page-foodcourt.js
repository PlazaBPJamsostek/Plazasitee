/* Foodcourt page — tenant menu browsing + ordering + gallery + reviews */
(async function () {
  const D = window.PlazaData;
  if (!D) return;
  const lang = () => (window.PlazaI18n ? window.PlazaI18n.current : 'id');
  const t = (k) => (window.t ? window.t(k) : k);

  /* ---- resolve data source: live Supabase data when configured, else static sample data ---- */
  let foodTenants = D.foodTenants;
  let usingLiveData = false;
  const S = window.PlazaSupabase;
  if (S && S.isConfigured) {
    const liveTenants = await S.list('food_tenants', { eq: { is_active: true }, order: { column: 'sort_order' } });
    if (liveTenants && liveTenants.length) {
      const liveItems = await S.list('menu_items', { eq: { is_available: true } });
      foodTenants = liveTenants.map((tn) => ({
        id: tn.id,
        name: tn.name,
        cuisine_id: tn.cuisine_id, cuisine_en: tn.cuisine_en,
        desc_id: tn.description_id, desc_en: tn.description_en,
        hours_id: tn.hours_id, hours_en: tn.hours_en,
        logoUrl: tn.logo_url, bannerUrl: tn.banner_url,
        isSample: false,
        menu: liveItems
          .filter((it) => it.food_tenant_id === tn.id)
          .map((it) => ({
            id: it.id, name_id: it.name_id, name_en: it.name_en || it.name_id,
            price: it.price, cat_id: it.category_label || 'Menu', cat_en: it.category_label || 'Menu',
          })),
      }));
      usingLiveData = true;
    }
  }
  const noticeEl = document.querySelector('.sample-notice');
  if (usingLiveData && noticeEl) noticeEl.style.display = 'none';
  window.PlazaCart.setDataSource(foodTenants);

  function initials(name) {
    return name.split(' ').slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join('');
  }

  /* ---- tenant grid ---- */
  const ftGrid = document.getElementById('ftGrid');
  function renderTenantGrid() {
    if (!ftGrid) return;
    ftGrid.innerHTML = foodTenants
      .map(
        (tn, i) => `
      <div class="ft-card card reveal" style="--i:${Math.min(i, 8)}" data-open-tenant="${tn.id}">
        <div class="ft-banner"><div class="hex-pattern-svg"></div><div class="ft-logo">${initials(tn.name)}</div></div>
        <div class="ft-body">
          <h4>${tn.name}</h4>
          <div class="ft-cuisine">${lang() === 'en' ? tn.cuisine_en : tn.cuisine_id}</div>
          <p class="ft-desc">${lang() === 'en' ? tn.desc_en : tn.desc_id}</p>
          <div class="ft-foot">
            <span>${tn.menu.length} ${t('foodcourt.menu.items')}</span>
            <button type="button" class="btn btn-outline btn-sm" data-open-tenant="${tn.id}">${t('foodcourt.menu.view')}</button>
          </div>
        </div>
      </div>`
      )
      .join('');
    ftGrid.querySelectorAll('[data-open-tenant]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        openTenantModal(el.getAttribute('data-open-tenant'));
      });
    });
    if (window.reobserveReveal) window.reobserveReveal();
  }
  renderTenantGrid();
  document.addEventListener('plaza:langchange', renderTenantGrid);

  /* ---- tenant menu modal ---- */
  const modal = document.getElementById('tenantModal');
  const tmLogo = document.getElementById('tmLogo');
  const tmName = document.getElementById('tmName');
  const tmCuisine = document.getElementById('tmCuisine');
  const tmHours = document.getElementById('tmHours');
  const tmDesc = document.getElementById('tmDesc');
  const tmMenu = document.getElementById('tmMenu');
  let currentTenantId = null;

  function renderMenu(tenant) {
    const cats = [];
    tenant.menu.forEach((item) => {
      const catName = lang() === 'en' ? item.cat_en : item.cat_id;
      let group = cats.find((c) => c.name === catName);
      if (!group) { group = { name: catName, items: [] }; cats.push(group); }
      group.items.push(item);
    });
    tmMenu.innerHTML = cats
      .map(
        (group) => `
      <div class="tm-menu-cat">${group.name}</div>
      ${group.items
        .map((item) => {
          const qty = window.PlazaCart.getQty(tenant.id, item.id);
          const name = lang() === 'en' ? item.name_en : item.name_id;
          return `
        <div class="tm-menu-item" data-item-row="${item.id}">
          <div>
            <div class="tmi-name">${name} ${tenant.isSample !== false ? `<span class="sample-tag">${t('foodcourt.menu.sample')}</span>` : ''}</div>
            <div class="tmi-price">Rp ${item.price.toLocaleString('id-ID')}</div>
          </div>
          <div class="tmi-qty" data-qty-wrap="${item.id}">
            ${
              qty > 0
                ? `<button type="button" data-qty-minus="${item.id}">\u2212</button><span class="tmi-qty-val">${qty}</span><button type="button" data-qty-plus="${item.id}">+</button>`
                : `<button type="button" class="tmi-add" data-qty-plus="${item.id}">${t('foodcourt.menu.add')}</button>`
            }
          </div>
        </div>`;
        })
        .join('')}`
      )
      .join('');

    tmMenu.querySelectorAll('[data-qty-plus]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const itemId = btn.getAttribute('data-qty-plus');
        const cur = window.PlazaCart.getQty(tenant.id, itemId);
        window.PlazaCart.setQty(tenant.id, itemId, cur + 1);
        renderMenu(tenant);
      });
    });
    tmMenu.querySelectorAll('[data-qty-minus]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const itemId = btn.getAttribute('data-qty-minus');
        const cur = window.PlazaCart.getQty(tenant.id, itemId);
        window.PlazaCart.setQty(tenant.id, itemId, cur - 1);
        renderMenu(tenant);
      });
    });
  }

  function openTenantModal(id) {
    const tenant = foodTenants.find((tn) => tn.id === id);
    if (!tenant || !modal) return;
    currentTenantId = id;
    tmLogo.textContent = initials(tenant.name);
    tmName.textContent = tenant.name;
    tmCuisine.textContent = lang() === 'en' ? tenant.cuisine_en : tenant.cuisine_id;
    tmHours.textContent = lang() === 'en' ? tenant.hours_en : tenant.hours_id;
    tmDesc.textContent = lang() === 'en' ? tenant.desc_en : tenant.desc_id;
    renderMenu(tenant);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeTenantModal() {
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
    updateCartFab();
  }
  if (modal) {
    modal.querySelectorAll('.modal-close, .modal-backdrop').forEach((el) => el.addEventListener('click', closeTenantModal));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeTenantModal(); });
  }
  document.addEventListener('plaza:langchange', () => {
    if (currentTenantId && modal && modal.classList.contains('open')) openTenantModal(currentTenantId);
  });

  /* ---- cart fab + drawer ---- */
  const cartFab = document.getElementById('cartFab');
  const cartBadge = document.getElementById('cartBadge');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartBody = document.getElementById('cartBody');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function updateCartFab() {
    const n = window.PlazaCart.count();
    if (cartFab) cartFab.classList.toggle('show', n > 0);
    if (cartBadge) cartBadge.textContent = n;
  }

  function renderCartDrawer() {
    if (!cartBody) return;
    const groups = window.PlazaCart.grouped();
    const tenantIds = Object.keys(groups);
    if (!tenantIds.length) {
      cartBody.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.8h8.6a2 2 0 0 0 2-1.6L21 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg><p>${t('foodcourt.cart.empty')}</p></div>`;
      if (cartTotalEl) cartTotalEl.textContent = 'Rp 0';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }
    if (checkoutBtn) checkoutBtn.disabled = false;
    cartBody.innerHTML = tenantIds
      .map((tid) => {
        const tenant = window.PlazaCart.findTenant(tid);
        const lines = groups[tid];
        return `
        <div class="cart-tenant-group">
          <h5><span>${tenant ? tenant.name : tid}</span><span>Rp ${window.PlazaCart.totalForTenant(tid).toLocaleString('id-ID')}</span></h5>
          ${lines
            .map((line) => {
              const item = window.PlazaCart.findItem(tid, line.itemId);
              if (!item) return '';
              const name = lang() === 'en' ? item.name_en : item.name_id;
              return `
            <div class="cart-line">
              <div><div class="cl-name">${line.qty}x ${name}</div><div class="cl-price">Rp ${(item.price * line.qty).toLocaleString('id-ID')}</div></div>
              <button type="button" class="cl-remove" data-cart-remove="${tid}|${line.itemId}" aria-label="Hapus">&times;</button>
            </div>`;
            })
            .join('')}
        </div>`;
      })
      .join('');
    cartBody.querySelectorAll('[data-cart-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const [tid, itemId] = btn.getAttribute('data-cart-remove').split('|');
        window.PlazaCart.remove(tid, itemId);
      });
    });
    if (cartTotalEl) cartTotalEl.textContent = 'Rp ' + window.PlazaCart.grandTotal().toLocaleString('id-ID');
  }

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (cartFab) cartFab.addEventListener('click', openCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  document.querySelectorAll('[data-cart-close]').forEach((el) => el.addEventListener('click', closeCart));

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
      const nameEl = document.getElementById('cartCustomerName');
      const phoneEl = document.getElementById('cartCustomerPhone');
      const name = nameEl ? nameEl.value.trim() : '';
      const phone = phoneEl ? phoneEl.value.trim() : '';
      checkoutBtn.disabled = true;
      const orderNo = window.PlazaCart.generateOrderNumber();
      // Best-effort: save to backend if configured, so it appears in the Admin Panel.
      await window.PlazaCart.submitOrderToBackend(orderNo, name, phone);
      const result = window.PlazaCart.buildWhatsAppMessage(lang(), orderNo);
      const url = `https://wa.me/${D.building.whatsappOfficeLink}?text=${encodeURIComponent(result.text)}`;
      window.open(url, '_blank', 'noopener');
      window.PlazaCart.clear();
      checkoutBtn.disabled = false;
      closeCart();
    });
  }

  document.addEventListener('cart:change', () => { updateCartFab(); renderCartDrawer(); });
  document.addEventListener('plaza:langchange', renderCartDrawer);
  updateCartFab();
  renderCartDrawer();

  /* ---- reviews (reuses carousel engine from main.js) ---- */
  const carousel = document.getElementById('reviewCarousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    let current = 0;
    function render() {
      track.innerHTML = D.foodcourtReviews
        .map(
          (rv, i) => `
        <div class="carousel-slide testi-slide${i === 0 ? ' active' : ''}">
          <svg class="quote-mark" viewBox="0 0 24 24" width="30" height="30"><path d="M7 9c-2 0-3 1.5-3 3.5S5 16 7 16c0 2-1 3-3 3v2c3 0 5-2 5-5V9H7Zm10 0c-2 0-3 1.5-3 3.5s1 3.5 3 3.5c0 2-1 3-3 3v2c3 0 5-2 5-5V9h-2Z" fill="currentColor"/></svg>
          <p class="testi-quote" style="font-size:17px;">${lang() === 'en' ? rv.quote_en : rv.quote_id}</p>
          <p class="testi-role">${lang() === 'en' ? rv.role_en : rv.role_id}</p>
        </div>`
        )
        .join('');
    }
    render();
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

  /* ---- lightbox for masonry gallery ---- */
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
