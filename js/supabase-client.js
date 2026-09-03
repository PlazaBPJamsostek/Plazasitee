/* =================================================================
   PLAZA BPJAMSOSTEK — SUPABASE CLIENT WRAPPER
   Thin helper layer over the Supabase JS SDK. Every public/admin
   page that needs the backend loads, in order:
     1. https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2  (SDK)
     2. js/supabase-config.js                                 (your keys)
     3. js/supabase-client.js                                 (this file)
   If Supabase hasn't been configured yet (see SUPABASE_SETUP.md),
   `window.PlazaSupabase.isConfigured` is false and every helper
   below resolves gracefully to null/empty instead of throwing —
   pages fall back to the static content in js/data.js.
   ================================================================= */
(function () {
  const cfg = window.PLAZA_SUPABASE_CONFIG || {};
  const isConfigured = !!(cfg.url && cfg.anonKey && !cfg.url.includes('YOUR_SUPABASE') && !cfg.anonKey.includes('YOUR_SUPABASE'));
  let client = null;

  if (isConfigured && window.supabase && window.supabase.createClient) {
    client = window.supabase.createClient(cfg.url, cfg.anonKey);
  }

  const BUCKET = 'public-media';

  async function safeQuery(promise, fallback) {
    if (!client) return fallback;
    try {
      const { data, error } = await promise;
      if (error) { console.warn('[Supabase]', error.message); return fallback; }
      return data;
    } catch (e) {
      console.warn('[Supabase]', e.message);
      return fallback;
    }
  }

  const PlazaSupabase = {
    isConfigured,
    client,
    BUCKET,

    /* ---------------- AUTH ---------------- */
    async signIn(email, password) {
      if (!client) return { error: { message: 'Supabase belum dikonfigurasi.' } };
      return client.auth.signInWithPassword({ email, password });
    },
    async signOut() {
      if (!client) return;
      return client.auth.signOut();
    },
    async getSession() {
      if (!client) return null;
      const { data } = await client.auth.getSession();
      return data ? data.session : null;
    },
    async getProfile(userId) {
      if (!client) return null;
      return safeQuery(client.from('profiles').select('*').eq('id', userId).single(), null);
    },
    onAuthChange(cb) {
      if (!client) return;
      client.auth.onAuthStateChange((_event, session) => cb(session));
    },

    /* ---------------- GENERIC CRUD ---------------- */
    async list(table, opts) {
      opts = opts || {};
      if (!client) return [];
      let q = client.from(table).select(opts.select || '*');
      if (opts.eq) Object.keys(opts.eq).forEach((k) => { q = q.eq(k, opts.eq[k]); });
      if (opts.order) q = q.order(opts.order.column, { ascending: opts.order.ascending !== false });
      return safeQuery(q, []);
    },
    async getById(table, id) {
      if (!client) return null;
      return safeQuery(client.from(table).select('*').eq('id', id).single(), null);
    },
    async insert(table, row) {
      if (!client) return null;
      return safeQuery(client.from(table).insert(row).select().single(), null);
    },
    async update(table, id, patch) {
      if (!client) return null;
      return safeQuery(client.from(table).update(patch).eq('id', id).select().single(), null);
    },
    async remove(table, id) {
      if (!client) return false;
      const { error } = await client.from(table).delete().eq('id', id);
      return !error;
    },

    /* ---------------- STORAGE (image uploads) ---------------- */
    async uploadImage(file, folder) {
      if (!client) return null;
      const ext = file.name.split('.').pop();
      const path = `${folder || 'misc'}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await client.storage.from(BUCKET).upload(path, file, { cacheControl: '3600', upsert: false });
      if (error) { console.warn('[Supabase Storage]', error.message); return null; }
      const { data } = client.storage.from(BUCKET).getPublicUrl(path);
      return data ? data.publicUrl : null;
    },
  };

  window.PlazaSupabase = PlazaSupabase;
})();
