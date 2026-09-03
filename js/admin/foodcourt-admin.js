/* Admin — Foodcourt Tenant & Menu management */
(async function () {
  await window.AdminAuth.ready;
  const S = window.PlazaSupabase;
  if (!S || !S.isConfigured) return;

  let tenants = [];
  let currentTenantId = null;
  let currentMenuItems = [];
  let pendingLogoFile = null, pendingBannerFile = null, pendingItemPhotoFile = null;

  const tenantsBody = document.getElementById('tenantsBody');

  async function loadTenants() {
    const rawTenants = await S.list('food_tenants', { order: { column: 'sort_order' } });
    const items = await S.list('menu_items');
    tenants = rawTenants.map((t) => ({ ...t, menu_count: items.filter((i) => i.food_tenant_id === t.id).length }));
    renderTenants();
  }

  function renderTenants() {
    tenantsBody.innerHTML = tenants.length
      ? tenants
          .map(
            (t) => `
      <tr>
        <td><strong>${escapeHtml(t.name)}</strong></td>
        <td>${escapeHtml(t.cuisine_id || '-')}</td>
        <td>${t.menu_count != null ? t.menu_count : '-'}</td>
        <td>${t.is_active ? '<span class="status-badge status-resolved">Aktif</span>' : '<span class="status-badge status-cancelled">Nonaktif</span>'}</td>
        <td class="admin-table-actions">
          <button class="admin-icon-btn" data-manage-menu="${t.id}" title="Kelola Menu"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10" stroke-linecap="round"/></svg></button>
          <button class="admin-icon-btn" data-edit-tenant="${t.id}" title="Edit"><svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="admin-icon-btn danger" data-delete-tenant="${t.id}" title="Hapus"><svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </td>
      </tr>`
          )
          .join('')
      : `<tr class="admin-empty-row"><td colspan="5">Belum ada tenant. Klik "+ Tambah Tenant" untuk mulai.</td></tr>`;

    tenantsBody.querySelectorAll('[data-manage-menu]').forEach((b) => b.addEventListener('click', () => openMenuModal(b.getAttribute('data-manage-menu'))));
    tenantsBody.querySelectorAll('[data-edit-tenant]').forEach((b) => b.addEventListener('click', () => openTenantForm(b.getAttribute('data-edit-tenant'))));
    tenantsBody.querySelectorAll('[data-delete-tenant]').forEach((b) => b.addEventListener('click', () => deleteTenant(b.getAttribute('data-delete-tenant'))));
  }

  /* ---------------- TENANT FORM ---------------- */
  const tenantFormModal = document.getElementById('tenantFormModal');
  const tenantForm = document.getElementById('tenantForm');

  function openTenantForm(id) {
    document.getElementById('tenantFormTitle').textContent = id ? 'Edit Tenant' : 'Tambah Tenant';
    tenantForm.reset();
    document.getElementById('tf-id').value = id || '';
    pendingLogoFile = null; pendingBannerFile = null;
    document.getElementById('tf-logo-preview').classList.remove('show');
    document.getElementById('tf-banner-preview').classList.remove('show');
    document.getElementById('tf-active').checked = true;
    if (id) {
      const t = tenants.find((x) => x.id === id);
      if (t) {
        document.getElementById('tf-name').value = t.name || '';
        document.getElementById('tf-cuisine-id').value = t.cuisine_id || '';
        document.getElementById('tf-cuisine-en').value = t.cuisine_en || '';
        document.getElementById('tf-desc-id').value = t.description_id || '';
        document.getElementById('tf-desc-en').value = t.description_en || '';
        document.getElementById('tf-hours-id').value = t.hours_id || '';
        document.getElementById('tf-hours-en').value = t.hours_en || '';
        document.getElementById('tf-whatsapp').value = t.whatsapp_number || '';
        document.getElementById('tf-active').checked = !!t.is_active;
        if (t.logo_url) { const p = document.getElementById('tf-logo-preview'); p.src = t.logo_url; p.classList.add('show'); }
        if (t.banner_url) { const p = document.getElementById('tf-banner-preview'); p.src = t.banner_url; p.classList.add('show'); }
      }
    }
    tenantFormModal.classList.add('open');
  }

  document.getElementById('addTenantBtn').addEventListener('click', () => openTenantForm(null));

  document.getElementById('tf-logo-drop').addEventListener('click', () => document.getElementById('tf-logo-input').click());
  document.getElementById('tf-logo-input').addEventListener('change', (e) => {
    pendingLogoFile = e.target.files[0];
    if (pendingLogoFile) previewFile(pendingLogoFile, document.getElementById('tf-logo-preview'));
  });
  document.getElementById('tf-banner-drop').addEventListener('click', () => document.getElementById('tf-banner-input').click());
  document.getElementById('tf-banner-input').addEventListener('change', (e) => {
    pendingBannerFile = e.target.files[0];
    if (pendingBannerFile) previewFile(pendingBannerFile, document.getElementById('tf-banner-preview'));
  });

  function previewFile(file, imgEl) {
    const reader = new FileReader();
    reader.onload = (ev) => { imgEl.src = ev.target.result; imgEl.classList.add('show'); };
    reader.readAsDataURL(file);
  }

  tenantForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('tf-id').value;
    const saveBtn = document.getElementById('tenantSaveBtn');
    saveBtn.disabled = true; saveBtn.textContent = 'Menyimpan...';

    let logoUrl, bannerUrl;
    if (pendingLogoFile) logoUrl = await S.uploadImage(pendingLogoFile, 'food-tenants/logo');
    if (pendingBannerFile) bannerUrl = await S.uploadImage(pendingBannerFile, 'food-tenants/banner');

    const payload = {
      name: document.getElementById('tf-name').value.trim(),
      cuisine_id: document.getElementById('tf-cuisine-id').value.trim(),
      cuisine_en: document.getElementById('tf-cuisine-en').value.trim(),
      description_id: document.getElementById('tf-desc-id').value.trim(),
      description_en: document.getElementById('tf-desc-en').value.trim(),
      hours_id: document.getElementById('tf-hours-id').value.trim(),
      hours_en: document.getElementById('tf-hours-en').value.trim(),
      whatsapp_number: document.getElementById('tf-whatsapp').value.trim(),
      is_active: document.getElementById('tf-active').checked,
    };
    if (logoUrl) payload.logo_url = logoUrl;
    if (bannerUrl) payload.banner_url = bannerUrl;

    const result = id ? await S.update('food_tenants', id, payload) : await S.insert('food_tenants', payload);
    saveBtn.disabled = false; saveBtn.textContent = 'Simpan Tenant';
    if (!result) { adminToast('Gagal menyimpan tenant.', true); return; }
    adminToast('Tenant berhasil disimpan.');
    tenantFormModal.classList.remove('open');
    loadTenants();
  });

  async function deleteTenant(id) {
    if (!confirm('Hapus tenant ini beserta seluruh menunya? Tindakan ini tidak bisa dibatalkan.')) return;
    const ok = await S.remove('food_tenants', id);
    if (ok) { adminToast('Tenant dihapus.'); loadTenants(); }
    else adminToast('Gagal menghapus tenant.', true);
  }

  /* ---------------- MENU MANAGEMENT ---------------- */
  const menuModal = document.getElementById('menuModal');
  const menuItemsBody = document.getElementById('menuItemsBody');

  async function openMenuModal(tenantId) {
    currentTenantId = tenantId;
    const t = tenants.find((x) => x.id === tenantId);
    document.getElementById('menuModalTitle').textContent = 'Kelola Menu — ' + (t ? t.name : '');
    menuItemsBody.innerHTML = `<tr class="admin-empty-row"><td colspan="5">Memuat...</td></tr>`;
    menuModal.classList.add('open');
    currentMenuItems = await S.list('menu_items', { eq: { food_tenant_id: tenantId }, order: { column: 'sort_order' } });
    renderMenuItems();
  }

  function renderMenuItems() {
    menuItemsBody.innerHTML = currentMenuItems.length
      ? currentMenuItems
          .map(
            (item) => `
      <tr>
        <td><strong>${escapeHtml(item.name_id)}</strong></td>
        <td>${escapeHtml(item.category_label || '-')}</td>
        <td>${fmtCurrency(item.price)}</td>
        <td>
          <label class="toggle-switch" style="width:36px;height:20px;">
            <input type="checkbox" data-toggle-avail="${item.id}" ${item.is_available ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </td>
        <td class="admin-table-actions">
          <button class="admin-icon-btn" data-edit-item="${item.id}" title="Edit"><svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="admin-icon-btn danger" data-delete-item="${item.id}" title="Hapus"><svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </td>
      </tr>`
          )
          .join('')
      : `<tr class="admin-empty-row"><td colspan="5">Belum ada menu untuk tenant ini.</td></tr>`;

    menuItemsBody.querySelectorAll('[data-toggle-avail]').forEach((cb) => {
      cb.addEventListener('change', async () => {
        await S.update('menu_items', cb.getAttribute('data-toggle-avail'), { is_available: cb.checked });
        adminToast(cb.checked ? 'Menu ditandai tersedia.' : 'Menu ditandai habis (Sold Out).');
      });
    });
    menuItemsBody.querySelectorAll('[data-edit-item]').forEach((b) => b.addEventListener('click', () => openItemForm(b.getAttribute('data-edit-item'))));
    menuItemsBody.querySelectorAll('[data-delete-item]').forEach((b) => b.addEventListener('click', () => deleteItem(b.getAttribute('data-delete-item'))));
  }

  /* ---------------- MENU ITEM FORM ---------------- */
  const itemFormModal = document.getElementById('itemFormModal');
  const itemForm = document.getElementById('itemForm');

  function openItemForm(id) {
    document.getElementById('itemFormTitle').textContent = id ? 'Edit Item Menu' : 'Tambah Item Menu';
    itemForm.reset();
    document.getElementById('if-id').value = id || '';
    pendingItemPhotoFile = null;
    document.getElementById('if-photo-preview').classList.remove('show');
    document.getElementById('if-available').checked = true;
    if (id) {
      const item = currentMenuItems.find((x) => x.id === id);
      if (item) {
        document.getElementById('if-name-id').value = item.name_id || '';
        document.getElementById('if-name-en').value = item.name_en || '';
        document.getElementById('if-category').value = item.category_label || '';
        document.getElementById('if-price').value = item.price || 0;
        document.getElementById('if-desc').value = item.description_id || '';
        document.getElementById('if-available').checked = !!item.is_available;
        if (item.photo_url) { const p = document.getElementById('if-photo-preview'); p.src = item.photo_url; p.classList.add('show'); }
      }
    }
    itemFormModal.classList.add('open');
  }
  document.getElementById('addMenuItemBtn').addEventListener('click', () => openItemForm(null));
  document.getElementById('if-photo-drop').addEventListener('click', () => document.getElementById('if-photo-input').click());
  document.getElementById('if-photo-input').addEventListener('change', (e) => {
    pendingItemPhotoFile = e.target.files[0];
    if (pendingItemPhotoFile) previewFile(pendingItemPhotoFile, document.getElementById('if-photo-preview'));
  });

  itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('if-id').value;
    let photoUrl;
    if (pendingItemPhotoFile) photoUrl = await S.uploadImage(pendingItemPhotoFile, 'menu-items');
    const payload = {
      food_tenant_id: currentTenantId,
      name_id: document.getElementById('if-name-id').value.trim(),
      name_en: document.getElementById('if-name-en').value.trim(),
      category_label: document.getElementById('if-category').value.trim(),
      price: parseFloat(document.getElementById('if-price').value) || 0,
      description_id: document.getElementById('if-desc').value.trim(),
      is_available: document.getElementById('if-available').checked,
    };
    if (photoUrl) payload.photo_url = photoUrl;
    const result = id ? await S.update('menu_items', id, payload) : await S.insert('menu_items', payload);
    if (!result) { adminToast('Gagal menyimpan menu.', true); return; }
    adminToast('Menu berhasil disimpan.');
    itemFormModal.classList.remove('open');
    openMenuModal(currentTenantId);
    loadTenants();
  });

  async function deleteItem(id) {
    if (!confirm('Hapus item menu ini?')) return;
    const ok = await S.remove('menu_items', id);
    if (ok) { adminToast('Item menu dihapus.'); openMenuModal(currentTenantId); loadTenants(); }
    else adminToast('Gagal menghapus item.', true);
  }

  /* ---------------- MODAL CLOSE HANDLERS ---------------- */
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.querySelectorAll('.modal-close, .modal-backdrop, [data-close-modal]').forEach((el) =>
      el.addEventListener('click', () => modal.classList.remove('open'))
    );
  });

  loadTenants();
})();
