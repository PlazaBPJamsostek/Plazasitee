// =====================================================================
// AI ASSISTANT — Asisten Virtual Plaza BPJamsostek
// Rule-based chatbot, runs 100% in the browser (no server / API key).
// Content is generated from js/data.js so it always matches the rest
// of the site. To connect this to a real generative model later
// (e.g. the Claude API), see README.md → "Menghubungkan AI Assistant".
// =====================================================================
(function () {
  const widget = document.getElementById('aiWidget');
  const toggle = document.getElementById('aiToggle');
  const panel = document.getElementById('aiPanel');
  const body = document.getElementById('aiBody');
  const quick = document.getElementById('aiQuick');
  const form = document.getElementById('aiForm');
  const input = document.getElementById('aiInput');
  if (!widget) return;

  const D = window.PlazaData || {};
  const lang = () => (window.PlazaI18n ? window.PlazaI18n.current : 'id');
  const tr = (id, en) => (lang() === 'en' ? en : id);

  function floorSummary() {
    if (!D.floors) return '';
    return D.floors
      .map((f) => `${tr('Lt.', 'Fl.')} ${f.floorLabel} (${f.area.toLocaleString('id-ID')} m²)`)
      .join(', ');
  }
  function cheapestRent() {
    if (!D.floors) return '220.000';
    return Math.min(...D.floors.map((f) => f.rent)).toLocaleString('id-ID');
  }
  function tenantSample() {
    if (!D.tenants) return '';
    return D.tenants.slice(0, 6).map((t) => t.name).join(', ');
  }

  function buildKB() {
    const b = D.building || {};
    return [
      {
        id: 'unit',
        label: () => tr('Unit tersedia?', 'Available units?'),
        keywords: ['unit', 'lantai', 'kosong', 'tersedia', 'available', 'kantor kosong', 'floor', 'space'],
        reply: () =>
          tr(
            `Saat ini tersedia ${D.floors.length} lantai kantor: ${floorSummary()}. Kondisi bervariasi antara <em>bare</em> dan <em>fitted</em>. Lihat foto, denah &amp; detail lengkap di halaman <a href="sewa-kantor.html">Sewa Kantor</a>.`,
            `We currently have ${D.floors.length} office floors available: ${floorSummary()}. Condition varies between <em>bare</em> and <em>fitted</em>. See photos, floor plans & full details on the <a href="sewa-kantor.html">Available Office</a> page.`
          ),
      },
      {
        id: 'harga',
        label: () => tr('Harga sewa?', 'Rental rates?'),
        keywords: ['sewa', 'harga', 'biaya', 'rent', 'price', 'm2', 'meter', 'service charge', 'cost'],
        reply: () =>
          tr(
            `Harga sewa mulai dari <strong>Rp ${cheapestRent()}/m²/bulan</strong> tergantung lantai, dan dapat dinegosiasikan. Service charge dihitung terpisah. Rincian per lantai ada di halaman <a href="sewa-kantor.html">Sewa Kantor</a>.`,
            `Rental rates start from <strong>Rp ${cheapestRent()}/sqm/month</strong> depending on the floor, and are negotiable. Service charge is calculated separately. Per-floor details are on the <a href="sewa-kantor.html">Available Office</a> page.`
          ),
      },
      {
        id: 'fasilitas',
        label: () => tr('Fasilitas gedung?', 'Building facilities?'),
        keywords: ['fasilitas', 'facility', 'atm', 'bank', 'foodcourt', 'food court', 'kantin', 'musholla', 'ibadah', 'klinik', 'gym', 'badminton'],
        reply: () =>
          tr(
            `Plaza BPJamsostek dilengkapi Food Court, Bank &amp; ATM Center, Gym, Lapangan Badminton, Musholla, Business Center, Minimarket, Lounge Cafe, Medical Clinic, hingga keamanan 24 jam. Detail lengkap di halaman <a href="fasilitas.html">Fasilitas</a>.`,
            `Plaza BPJamsostek is equipped with a Food Court, Bank &amp; ATM Center, Gym, Badminton Court, Prayer Room, Business Center, Minimarket, Lounge Cafe, Medical Clinic, and 24-hour security. Full details on the <a href="fasilitas.html">Facilities</a> page.`
          ),
      },
      {
        id: 'foodcourt',
        label: () => tr('Foodcourt?', 'Foodcourt?'),
        keywords: ['foodcourt', 'food court', 'makan', 'kuliner', 'jajan'],
        reply: () =>
          tr(
            `Foodcourt Plaza BPJamsostek berada di lantai atas dengan city view, beragam tenant F&amp;B, WiFi gratis, dan pembayaran cashless/QRIS. Lihat galeri di halaman <a href="foodcourt.html">Foodcourt</a>.`,
            `The Plaza BPJamsostek foodcourt sits on an upper floor with city views, a variety of F&amp;B tenants, free WiFi, and cashless/QRIS payment. See the gallery on the <a href="foodcourt.html">Foodcourt</a> page.`
          ),
      },
      {
        id: 'ballroom',
        label: () => tr('Sewa ballroom?', 'Ballroom rental?'),
        keywords: ['ballroom', 'wedding', 'pernikahan', 'nikah', 'event', 'acara', 'konferensi', 'seminar'],
        reply: () =>
          tr(
            `Ballroom di lantai 6 berukuran 29,5 m × 24 m, kapasitas 500–1.000 tamu — cocok untuk wedding maupun corporate event. Lihat foto &amp; cara booking di halaman <a href="ballroom.html">Ballroom</a>.`,
            `The 6th-floor Ballroom measures 29.5 m × 24 m, with a capacity of 500–1,000 guests — suitable for weddings and corporate events alike. See photos & booking info on the <a href="ballroom.html">Ballroom</a> page.`
          ),
      },
      {
        id: 'lokasi',
        label: () => tr('Lokasi & akses?', 'Location & access?'),
        keywords: ['lokasi', 'alamat', 'address', 'akses', 'transjakarta', 'mrt', 'lrt', 'kuningan', 'dimana'],
        reply: () =>
          tr(
            `Plaza BPJamsostek berada di ${b.address_id || 'Kuningan, Jakarta Selatan'} — hanya ±100 meter dari Halte Transjakarta &amp; Stasiun LRT Setiabudi. Peta lengkap di halaman <a href="lokasi.html">Lokasi</a>.`,
            `Plaza BPJamsostek is located at ${b.address_en || 'Kuningan, South Jakarta'} — only ±100 metres from the Transjakarta stop & Setiabudi LRT station. Full map on the <a href="lokasi.html">Location</a> page.`
          ),
      },
      {
        id: 'tenant',
        label: () => tr('Daftar tenant?', 'Tenant list?'),
        keywords: ['tenant', 'penyewa', 'siapa saja', 'perusahaan', 'directory'],
        reply: () =>
          tr(
            `Sejumlah tenant di gedung ini antara lain ${tenantSample()}, dan lainnya. Direktori lengkap ada di halaman <a href="tenant-directory.html">Tenant Directory</a>.`,
            `Tenants in this building include ${tenantSample()}, and more. The full directory is on the <a href="tenant-directory.html">Tenant Directory</a> page.`
          ),
      },
      {
        id: 'kontak',
        label: () => tr('Hubungi marketing', 'Contact marketing'),
        keywords: ['kontak', 'hubungi', 'telepon', 'email', 'whatsapp', 'wa', 'nomor', 'cs', 'customer service', 'marketing'],
        reply: () =>
          tr(
            `Anda bisa menghubungi tim Tenant Relation kami di <a href="tel:${(b.phoneTenantRelation || '').replace(/[^\d+]/g, '')}">${b.phoneTenantRelation}</a> (WhatsApp/telepon) atau email <a href="mailto:${b.email}">${b.email}</a>. Atau isi formulir di halaman <a href="kontak.html">Kontak</a>.`,
            `You can reach our Tenant Relation team at <a href="tel:${(b.phoneTenantRelation || '').replace(/[^\d+]/g, '')}">${b.phoneTenantRelation}</a> (WhatsApp/phone) or email <a href="mailto:${b.email}">${b.email}</a>. Or fill in the form on the <a href="kontak.html">Contact</a> page.`
          ),
      },
      {
        id: 'gedung',
        label: () => tr('Info gedung', 'Building info'),
        keywords: ['gedung', 'building', 'lantai berapa', 'komposisi', 'grade a', 'tinggi'],
        reply: () =>
          tr(
            `Plaza BPJamsostek adalah gedung perkantoran Grade A dengan total ${b.totalFloors} lantai: ${b.officeFloors} lantai kantor, ${b.podiumParking} podium parkir, ${b.podiumCommercial} podium komersial, dan ${b.basementParking} basement parkir.`,
            `Plaza BPJamsostek is a Grade A office building with ${b.totalFloors} floors in total: ${b.officeFloors} office floors, ${b.podiumParking} podium parking floors, ${b.podiumCommercial} podium commercial floors, and ${b.basementParking} basement parking floors.`
          ),
      },
      {
        id: 'layanan',
        label: () => tr('Keamanan & kebersihan', 'Security & cleaning'),
        keywords: ['keamanan', 'security', 'kebersihan', 'housekeeping', 'engineering', 'teknisi', 'binajasa', 'cctv'],
        reply: () =>
          tr(
            `Kebersihan, keamanan 24 jam, dan perawatan teknis gedung dikelola langsung oleh Binajasa Abadikarya. Detail di halaman <a href="fasilitas.html">Fasilitas</a>.`,
            `Cleaning, 24-hour security, and technical maintenance are managed directly by Binajasa Abadikarya. Details on the <a href="fasilitas.html">Facilities</a> page.`
          ),
      },
      {
        id: 'jadwal',
        label: () => tr('Cara jadwalkan kunjungan?', 'How to schedule a visit?'),
        keywords: ['jadwal', 'kunjung', 'survey', 'lihat langsung', 'visit', 'schedule', 'viewing'],
        reply: () =>
          tr(
            `Anda bisa tekan tombol "Jadwalkan Kunjungan" di halaman <a href="sewa-kantor.html">Sewa Kantor</a>, atau chat langsung via <a href="https://wa.me/${b.whatsapp}" target="_blank" rel="noopener">WhatsApp</a> — tim kami akan atur jadwal sesuai waktu Anda.`,
            `You can tap "Schedule Viewing" on the <a href="sewa-kantor.html">Available Office</a> page, or chat directly via <a href="https://wa.me/${b.whatsapp}" target="_blank" rel="noopener">WhatsApp</a> — our team will arrange a time that works for you.`
          ),
      },
    ];
  }

  function fallback() {
    const b = D.building || {};
    return tr(
      `Maaf, saya belum punya jawaban pasti untuk itu 🙏 — tapi tim kami siap membantu langsung. Hubungi <a href="tel:${(b.phoneTenantRelation || '').replace(/[^\d+]/g, '')}">${b.phoneTenantRelation}</a>, email <a href="mailto:${b.email}">${b.email}</a>, atau isi formulir di halaman <a href="kontak.html">Kontak</a>.`,
      `Sorry, I don't have a definite answer for that yet 🙏 — but our team is ready to help directly. Contact <a href="tel:${(b.phoneTenantRelation || '').replace(/[^\d+]/g, '')}">${b.phoneTenantRelation}</a>, email <a href="mailto:${b.email}">${b.email}</a>, or fill in the form on the <a href="kontak.html">Contact</a> page.`
    );
  }

  let started = false;

  function addMsg(text, who) {
    const div = document.createElement('div');
    div.className = 'ai-msg ' + who;
    div.innerHTML = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'ai-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function findReply(text) {
    const t = text.toLowerCase();
    const KB = buildKB();
    let best = null;
    let bestScore = 0;
    KB.forEach((entry) => {
      let score = 0;
      entry.keywords.forEach((kw) => {
        if (t.includes(kw)) score += kw.length;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });
    return best ? best.reply() : fallback();
  }

  function respond(userText) {
    addMsg(userText, 'user');
    const typing = showTyping();
    const delay = 450 + Math.random() * 450;
    setTimeout(() => {
      typing.remove();
      addMsg(findReply(userText), 'bot');
    }, delay);
  }

  function renderQuickReplies() {
    quick.innerHTML = '';
    buildKB()
      .slice(0, 4)
      .forEach((entry) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = entry.label();
        btn.addEventListener('click', () => respond(entry.label()));
        quick.appendChild(btn);
      });
  }

  function openPanel() {
    widget.classList.add('open');
    if (!started) {
      started = true;
      const typing = showTyping();
      setTimeout(() => {
        typing.remove();
        addMsg(window.t ? window.t('ai.greeting') : 'Halo!', 'bot');
        renderQuickReplies();
      }, 500);
    }
    setTimeout(() => input && input.focus(), 300);
  }

  function closePanel() {
    widget.classList.remove('open');
  }

  toggle.addEventListener('click', () => {
    widget.classList.contains('open') ? closePanel() : openPanel();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    respond(text);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('open')) closePanel();
  });

  document.addEventListener('plaza:langchange', () => {
    if (started) renderQuickReplies();
  });
})();
