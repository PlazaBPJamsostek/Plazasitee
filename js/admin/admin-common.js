/* Shared admin panel utilities used across all admin/*.html pages */
(function () {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('adminSidebarBackdrop');
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  }
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (backdrop) backdrop.classList.toggle('show', sidebar.classList.contains('open'));
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeSidebar);
  if (sidebar) {
    sidebar.querySelectorAll('.admin-nav a').forEach((a) => a.addEventListener('click', closeSidebar));
  }

  window.adminToast = function (message, isError) {
    const el = document.getElementById('adminToast');
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('error', !!isError);
    el.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  };

  window.fmtCurrency = function (n) {
    return 'Rp ' + Number(n || 0).toLocaleString('id-ID');
  };
  window.fmtDate = function (iso) {
    if (!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };
  window.escapeHtml = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  };
})();
