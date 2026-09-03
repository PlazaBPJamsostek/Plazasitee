/* Admin — Order management */
(async function () {
  await window.AdminAuth.ready;
  const S = window.PlazaSupabase;
  if (!S || !S.isConfigured) return;

  let orders = [];
  let currentOrderId = null;
  const ordersBody = document.getElementById('ordersBody');
  const statusFilter = document.getElementById('statusFilter');

  async function loadOrders() {
    orders = await S.list('orders', { order: { column: 'created_at', ascending: false } });
    render();
  }

  function render() {
    const filter = statusFilter.value;
    const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
    ordersBody.innerHTML = filtered.length
      ? filtered
          .map(
            (o) => `
      <tr>
        <td><strong>${escapeHtml(o.order_number)}</strong></td>
        <td>${escapeHtml(o.customer_name)}<br><span class="muted" style="font-size:11.5px;">${escapeHtml(o.customer_phone)}</span></td>
        <td>${fmtCurrency(o.total_amount)}</td>
        <td><span class="status-badge status-${o.status}">${o.status}</span></td>
        <td>${fmtDate(o.created_at)}</td>
        <td><button class="btn btn-outline btn-sm" data-view-order="${o.id}">Detail</button></td>
      </tr>`
          )
          .join('')
      : `<tr class="admin-empty-row"><td colspan="6">Belum ada pesanan pada status ini.</td></tr>`;
    ordersBody.querySelectorAll('[data-view-order]').forEach((b) => b.addEventListener('click', () => openDetail(b.getAttribute('data-view-order'))));
  }

  statusFilter.addEventListener('change', render);

  const modal = document.getElementById('orderDetailModal');
  async function openDetail(id) {
    currentOrderId = id;
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    document.getElementById('odNumber').textContent = order.order_number;
    document.getElementById('odMeta').textContent = `${order.customer_name} \u2022 ${order.customer_phone} \u2022 ${fmtDate(order.created_at)}`;
    document.getElementById('odStatusSelect').value = order.status;
    document.getElementById('odItems').innerHTML = '<p class="muted" style="font-size:13px;">Memuat item...</p>';
    modal.classList.add('open');

    const items = await S.list('order_items', { eq: { order_id: id } });
    const byTenant = {};
    items.forEach((it) => { (byTenant[it.tenant_name] = byTenant[it.tenant_name] || []).push(it); });
    document.getElementById('odItems').innerHTML =
      Object.keys(byTenant)
        .map(
          (tname) => `
        <div style="margin-bottom:12px;">
          <div style="font-family:var(--display);font-size:12px;font-weight:700;color:var(--green-700);text-transform:uppercase;margin-bottom:6px;">${escapeHtml(tname)}</div>
          ${byTenant[tname]
            .map((it) => `<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;"><span>${it.qty}x ${escapeHtml(it.item_name)}</span><span>${fmtCurrency(it.subtotal)}</span></div>`)
            .join('')}
        </div>`
        )
        .join('') + `<div style="display:flex;justify-content:space-between;font-weight:700;font-family:var(--display);border-top:1px solid var(--line);padding-top:10px;"><span>Total</span><span>${fmtCurrency(order.total_amount)}</span></div>`;
  }

  document.getElementById('odSaveStatusBtn').addEventListener('click', async () => {
    const newStatus = document.getElementById('odStatusSelect').value;
    const result = await S.update('orders', currentOrderId, { status: newStatus, updated_at: new Date().toISOString() });
    if (result) {
      adminToast('Status pesanan diperbarui.');
      modal.classList.remove('open');
      loadOrders();
    } else {
      adminToast('Gagal memperbarui status.', true);
    }
  });

  document.querySelectorAll('.modal').forEach((m) => {
    m.querySelectorAll('.modal-close, .modal-backdrop, [data-close-modal]').forEach((el) => el.addEventListener('click', () => m.classList.remove('open')));
  });

  loadOrders();
  setInterval(loadOrders, 30000); // light polling so new orders show up without manual refresh
})();
