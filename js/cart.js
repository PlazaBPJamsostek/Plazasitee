/* =================================================================
   FOODCOURT CART ENGINE
   Client-side cart (localStorage) + WhatsApp checkout. This is a
   "Phase 1" ordering flow that works with zero backend/server —
   the order is compiled into a formatted WhatsApp message sent to
   the building's operations WhatsApp, grouped by tenant, with an
   auto-generated order number. See README.md for the roadmap to a
   full database-backed ordering system with live status tracking.
   ================================================================= */
window.PlazaCart = (function () {
  const KEY = 'plaza-cart-v1';
  let dataSource = window.PlazaData ? window.PlazaData.foodTenants : [];

  function setDataSource(tenants) {
    dataSource = tenants;
  }

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  }
  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('cart:change', { detail: { items } }));
  }
  function findTenant(tenantId) {
    return dataSource.find((t) => t.id === tenantId);
  }
  function findItem(tenantId, itemId) {
    const t = findTenant(tenantId);
    return t ? t.menu.find((m) => m.id === itemId) : null;
  }

  function add(tenantId, itemId, qty) {
    qty = qty || 1;
    const items = read();
    const existing = items.find((i) => i.tenantId === tenantId && i.itemId === itemId);
    if (existing) existing.qty += qty;
    else items.push({ tenantId, itemId, qty });
    write(items);
  }
  function setQty(tenantId, itemId, qty) {
    let items = read();
    if (qty <= 0) {
      items = items.filter((i) => !(i.tenantId === tenantId && i.itemId === itemId));
    } else {
      const existing = items.find((i) => i.tenantId === tenantId && i.itemId === itemId);
      if (existing) existing.qty = qty;
      else items.push({ tenantId, itemId, qty });
    }
    write(items);
  }
  function getQty(tenantId, itemId) {
    const items = read();
    const existing = items.find((i) => i.tenantId === tenantId && i.itemId === itemId);
    return existing ? existing.qty : 0;
  }
  function remove(tenantId, itemId) {
    write(read().filter((i) => !(i.tenantId === tenantId && i.itemId === itemId)));
  }
  function clear() {
    write([]);
  }
  function count() {
    return read().reduce((s, i) => s + i.qty, 0);
  }
  function totalForTenant(tenantId) {
    return read()
      .filter((i) => i.tenantId === tenantId)
      .reduce((s, i) => {
        const item = findItem(tenantId, i.itemId);
        return s + (item ? item.price * i.qty : 0);
      }, 0);
  }
  function grandTotal() {
    const items = read();
    const tenantIds = [...new Set(items.map((i) => i.tenantId))];
    return tenantIds.reduce((s, tid) => s + totalForTenant(tid), 0);
  }
  function grouped() {
    const items = read();
    const byTenant = {};
    items.forEach((i) => {
      if (!byTenant[i.tenantId]) byTenant[i.tenantId] = [];
      byTenant[i.tenantId].push(i);
    });
    return byTenant;
  }
  function generateOrderNumber() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const rand = Math.floor(100 + Math.random() * 900);
    return `PBJ-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${rand}`;
  }

  /* Save the order to Supabase (if configured) so it shows up in the Admin
     Panel's Order Management with live status tracking. Falls back silently
     to WhatsApp-only when the backend isn't set up yet. */
  async function submitOrderToBackend(orderNo, customerName, customerPhone) {
    const S = window.PlazaSupabase;
    if (!S || !S.isConfigured) return null;
    const groups = grouped();
    const total = grandTotal();
    const order = await S.insert('orders', {
      order_number: orderNo,
      customer_name: customerName || 'Pengunjung Foodcourt',
      customer_phone: customerPhone || '-',
      total_amount: total,
      status: 'pending',
    });
    if (!order) return null;
    const rows = [];
    Object.keys(groups).forEach((tenantId) => {
      const tenant = findTenant(tenantId);
      groups[tenantId].forEach((line) => {
        const item = findItem(tenantId, line.itemId);
        if (!item) return;
        rows.push({
          order_id: order.id,
          food_tenant_id: tenantId,
          tenant_name: tenant ? tenant.name : tenantId,
          item_name: item.name_id,
          price: item.price,
          qty: line.qty,
          subtotal: item.price * line.qty,
        });
      });
    });
    for (const row of rows) { await S.insert('order_items', row); }
    return order;
  }

  function buildWhatsAppMessage(lang, orderNo) {
    const t = (id, en) => (lang === 'en' ? en : id);
    orderNo = orderNo || generateOrderNumber();
    const groups = grouped();
    let msg = `*${t('PESANAN FOODCOURT', 'FOODCOURT ORDER')} — ${orderNo}*\n\n`;
    Object.keys(groups).forEach((tenantId) => {
      const tenant = findTenant(tenantId);
      msg += `*${tenant ? tenant.name : tenantId}*\n`;
      groups[tenantId].forEach((line) => {
        const item = findItem(tenantId, line.itemId);
        if (!item) return;
        const name = lang === 'en' ? item.name_en : item.name_id;
        msg += `- ${line.qty}x ${name} (Rp ${(item.price * line.qty).toLocaleString('id-ID')})\n`;
      });
      msg += `${t('Subtotal', 'Subtotal')}: Rp ${totalForTenant(tenantId).toLocaleString('id-ID')}\n\n`;
    });
    msg += `${t('Total Keseluruhan', 'Grand Total')}: Rp ${grandTotal().toLocaleString('id-ID')}\n\n`;
    msg += t(
      'Mohon konfirmasi pesanan saya dan info estimasi waktu penyajian. Terima kasih!',
      'Please confirm my order and let me know the estimated preparation time. Thank you!'
    );
    return { orderNo, text: msg };
  }

  return { add, setQty, getQty, remove, clear, count, totalForTenant, grandTotal, grouped, findTenant, findItem, buildWhatsAppMessage, submitOrderToBackend, generateOrderNumber, setDataSource };
})();
