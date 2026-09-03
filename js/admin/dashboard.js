/* Admin Dashboard — overview stats + recent activity */
(async function () {
  await window.AdminAuth.ready;
  const S = window.PlazaSupabase;

  const dateEl = document.getElementById('topbarDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  if (!S || !S.isConfigured) return;

  const orders = await S.list('orders', { order: { column: 'created_at', ascending: false } });
  const complaints = await S.list('complaints', { order: { column: 'created_at', ascending: false } });
  const tenants = await S.list('food_tenants', { eq: { is_active: true } });
  const menuItems = await S.list('menu_items');

  document.getElementById('statPendingOrders').textContent = orders.filter((o) => o.status === 'pending').length;
  document.getElementById('statOpenComplaints').textContent = complaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed').length;
  document.getElementById('statActiveTenants').textContent = tenants.length;
  document.getElementById('statMenuItems').textContent = menuItems.length;

  const ordersBody = document.getElementById('recentOrdersBody');
  if (ordersBody) {
    const recent = orders.slice(0, 6);
    ordersBody.innerHTML = recent.length
      ? recent
          .map(
            (o) => `
        <tr>
          <td>${escapeHtml(o.order_number)}</td>
          <td>${escapeHtml(o.customer_name)}</td>
          <td>${fmtCurrency(o.total_amount)}</td>
          <td><span class="status-badge status-${o.status}">${o.status}</span></td>
          <td>${fmtDate(o.created_at)}</td>
        </tr>`
          )
          .join('')
      : `<tr class="admin-empty-row"><td colspan="5">Belum ada pesanan.</td></tr>`;
  }

  const complaintsBody = document.getElementById('recentComplaintsBody');
  if (complaintsBody) {
    const recent = complaints.slice(0, 6);
    complaintsBody.innerHTML = recent.length
      ? recent
          .map(
            (c) => `
        <tr>
          <td>${escapeHtml(c.complaint_number)}</td>
          <td>${escapeHtml(c.name)}</td>
          <td>${escapeHtml(c.subject)}</td>
          <td><span class="status-badge status-${c.status}">${c.status.replace('_', ' ')}</span></td>
          <td>${fmtDate(c.created_at)}</td>
        </tr>`
          )
          .join('')
      : `<tr class="admin-empty-row"><td colspan="5">Belum ada komplain.</td></tr>`;
  }
})();
