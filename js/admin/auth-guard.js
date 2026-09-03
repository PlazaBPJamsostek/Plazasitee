/* =================================================================
   ADMIN AUTH GUARD — include on every protected admin/*.html page.
   Redirects to login.html if no valid session exists, and fills in
   the sidebar user card once confirmed.
   ================================================================= */
(function () {
  const S = window.PlazaSupabase;

  function toLogin() {
    window.location.href = 'login.html';
  }

  window.AdminAuth = {
    ready: (async function () {
      if (!S || !S.isConfigured) {
        // Not configured yet — show a clear message instead of a silent redirect loop.
        document.body.innerHTML = `
          <div class="admin-login-wrap">
            <div class="admin-login-card">
              <h1>Backend belum terhubung</h1>
              <p class="sub">Admin Panel ini butuh koneksi Supabase yang belum dikonfigurasi.
              Lihat <code>SUPABASE_SETUP.md</code> untuk langkah-langkahnya, lalu isi
              <code>js/supabase-config.js</code> dengan Project URL &amp; anon key Anda.</p>
              <a class="btn btn-primary full" href="../index.html">Kembali ke Beranda</a>
            </div>
          </div>`;
        return null;
      }
      const session = await S.getSession();
      if (!session) {
        toLogin();
        return null;
      }
      const profile = await S.getProfile(session.user.id);
      if (!profile) {
        // Logged in via Supabase Auth but no admin profile row -> not authorized.
        await S.signOut();
        toLogin();
        return null;
      }
      // Populate sidebar user card if present
      const nameEl = document.getElementById('adminUserName');
      const roleEl = document.getElementById('adminUserRole');
      const avatarEl = document.getElementById('adminUserAvatar');
      if (nameEl) nameEl.textContent = profile.full_name || session.user.email;
      if (roleEl) roleEl.textContent = (profile.role || 'admin').replace('_', ' ');
      if (avatarEl) avatarEl.textContent = (profile.full_name || session.user.email || '?').charAt(0).toUpperCase();

      const logoutBtn = document.getElementById('adminLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
          await S.signOut();
          toLogin();
        });
      }
      return { session, profile };
    })(),
  };
})();
