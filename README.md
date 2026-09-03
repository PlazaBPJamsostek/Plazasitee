# Plaza BPJamsostek — Website Corporate Premium

Website resmi Plaza BPJamsostek: Grade A Office Tower di CBD Kuningan, Jakarta Selatan.
Dibangun ulang dari source code lama menjadi situs multi-halaman yang modern, cepat, dan
siap dipublikasikan ke GitHub Pages maupun hosting biasa — **tanpa proses build/compile**.
Cukup upload semua file apa adanya.

---

## 1. Struktur Folder

```
├── index.html                 Beranda
├── sewa-kantor.html           Available Office for Rent (7 lantai, data dari PDF resmi)
├── floor-directory.html       Peta zonasi 28 lantai
├── foodcourt.html             Foodcourt (galeri, tenant, review, peta)
├── tenant-directory.html      Direktori tenant (search, filter, favorit)
├── ballroom.html               Ballroom & Meeting Room
├── fasilitas.html              Fasilitas gedung + tim housekeeping/security/engineering
├── lokasi.html                 Lokasi, transportasi, landmark sekitar
├── kontak.html                 Kontak, form, QR WhatsApp, peta
├── 404.html                    Halaman error kustom
├── sitemap.xml / robots.txt    SEO
├── css/
│   ├── fonts.css               Font self-hosted (Sora, Inter, Fraunces)
│   ├── base.css                Design token, nav, footer, tombol, modal, dsb (dipakai semua halaman)
│   └── pages.css                Style khusus tiap halaman
├── js/
│   ├── data.js                  ⭐ SUMBER DATA UTAMA — edit di sini untuk update konten
│   ├── i18n-data.js             Kamus terjemahan Indonesia/English
│   ├── i18n.js                  Mesin pergantian bahasa
│   ├── main.js                  Navigasi, dark mode, animasi, jam, cuaca, dsb
│   ├── ai-assistant.js          Chatbot asisten virtual (rule-based)
│   └── page-*.js                Logic khusus tiap halaman (filter, modal, dsb)
└── assets/
    ├── logo.png, favicon*
    ├── fonts/                   File font (.woff2)
    ├── docs/                    Brosur PDF asli (untuk tombol Download)
    └── img/                     Semua foto (hero, floors, facility, foodcourt, dst.)
```

## 2. Cara Menjalankan di Komputer Lokal

Karena situs ini murni HTML/CSS/JS statis, cukup buka `index.html` langsung di
browser, **atau** (lebih disarankan agar semua fitur JS berjalan sempurna) jalankan
local server sederhana dari folder ini:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## 3. Deploy ke GitHub Pages

1. Buat repository baru di GitHub, upload seluruh isi folder ini (jangan taruh di
   dalam sub-folder — `index.html` harus berada di root repo).
2. Buka **Settings → Pages**, pilih branch `main` dan folder `/root`.
3. Tunggu 1–2 menit, situs akan aktif di `https://namauser.github.io/namarepo/`.
4. File `.nojekyll` sudah disertakan agar GitHub tidak memproses folder lewat Jekyll.

## 4. Deploy ke Hosting Biasa (cPanel, dsb.)

Upload seluruh isi folder ini ke `public_html` (atau folder root domain Anda) via
FTP/File Manager. Tidak ada proses build, database, atau PHP yang dibutuhkan.

## 5. Mengedit Konten (paling penting!)

Hampir semua data yang tampil di beberapa halaman sekaligus (harga sewa, daftar
tenant, fasilitas, FAQ, berita) diatur dari **satu file**: `js/data.js`. Edit di sana,
dan perubahan akan otomatis muncul di semua halaman terkait — tidak perlu mengedit
HTML satu per satu.

Contoh: menambah lantai baru yang tersedia disewa, tinggal tambahkan satu objek baru
di array `floors` pada `js/data.js`, lengkap dengan foto, luas, harga, dan kondisi.

### Ganti Bahasa / Teks Statis
Teks yang tidak datanya dari `data.js` (judul, tombol, label) diatur di
`js/i18n-data.js`, dengan pasangan versi Indonesia (`id`) dan Inggris (`en`).

## 6. Foto yang Masih Perlu Diganti

Sebagian besar foto sudah menggunakan foto asli dari PDF referensi dan foto foodcourt
yang Anda kirim. Namun ada beberapa bagian yang **belum memiliki foto asli** dan saat
ini ditampilkan sebagai panel elegan bertuliskan "Foto akan segera diperbarui"
(bukan gambar rusak/placeholder norak seperti sebelumnya):

- **Ballroom** (`ballroom.html`) — belum ada foto interior ballroom.
- **Galeri Foodcourt** — hanya 2 foto asli (1 foto Anda + 1 foto kecil dari PDF), 2 slot
  galeri masih placeholder.

Untuk mengganti: cukup taruh file foto baru di `assets/img/ballroom/` atau
`assets/img/foodcourt/`, lalu update `src` di HTML terkait (atau beri tahu saya untuk
dibantu memasukkannya).

## 7. Fitur yang Sengaja Masih "Coming Soon"

Sesuai instruksi awal, beberapa fitur memang belum diisi karena menunggu data/aset
dari Anda — ini bukan bug:

- **360° Virtual Tour** (halaman Ballroom)
- **EV Charging Station** (halaman Fasilitas) — masih tahap perencanaan
- **Company Profile PDF** (Download Center di Beranda) — hanya brosur Available Office
  yang sudah tersedia
- **Price List Ballroom & Meeting Room** — ditampilkan "Hubungi Kami" karena tidak ada
  data harga resmi di sumber yang diberikan (menghindari menampilkan angka rekaan)

## 8. Testimoni & Berita — Konten Contoh

Bagian **Testimoni** (Beranda & Foodcourt) dan **Berita/Pengumuman** (Beranda) saat ini
berisi **konten contoh/ilustratif** (bukan kutipan asli dari tenant sungguhan), agar
tampilan bagian ini sudah "hidup" sejak awal. Silakan ganti dengan testimoni tenant
asli dan pengumuman resmi Anda di `js/data.js` (array `testimonials`,
`foodcourtReviews`, dan `news`) kapan pun sudah tersedia.

## 9. Koreksi Data dari Versi Sebelumnya

Beberapa data pada source code lama **tidak sesuai** dengan PDF referensi resmi yang
Anda kirimkan, sehingga sudah diperbarui:

- Data **Available Office** (lantai, luas, harga) sepenuhnya diganti mengikuti PDF:
  Lantai 1, 9, 11, 12, 15, 16, 18 — bukan lagi Lantai 1, 7, 9, 10, 11, 12, 15, 18 versi lama.
- Klaim sertifikasi **"Green Building Gold"** pada versi lama dihapus karena tidak ada
  dokumen pendukung yang bisa memverifikasi klaim tersebut. Silakan hubungi saya bila
  Anda memiliki sertifikat resmi untuk ditambahkan kembali dengan data yang akurat.
- Referensi ke `facility.css` dan `facility.js` yang hilang (membuat situs lama error)
  sudah diperbaiki — seluruh style & logic kini terstruktur rapi di `css/` dan `js/`.
- Nomor telepon kantor lama (021 5091 5190) tetap dipertahankan sebagai kontak
  sekunder, berdampingan dengan nomor Tenant Relation resmi dari PDF (0852-1156-6707)
  yang kini menjadi kontak utama (WhatsApp, tombol Book Now, dsb).

## 10. Menghubungkan AI Assistant ke Model AI Sungguhan (opsional)

Saat ini AI Assistant berjalan 100% di browser (rule-based, tanpa server/API key),
sehingga aman dipakai di GitHub Pages tanpa biaya. Jika suatu saat ingin membuatnya
lebih pintar dengan model AI sungguhan, `js/ai-assistant.js` cukup dimodifikasi untuk
memanggil API (misalnya Anthropic API) dari backend/serverless function milik Anda —
jangan panggil API key langsung dari browser demi keamanan.

## 11. Fitur yang Sudah Berjalan Penuh

Dark mode • Bilingual ID/EN • Live clock WIB • Live cuaca Jakarta (Open-Meteo) •
Animated counters • Visitor counter (lokal per-browser) • FAQ accordion •
Testimonial & review carousel • Search & filter Available Office • Search, filter,
favorit Tenant Directory • Lightbox galeri • Floating WhatsApp/Call/Email • AI
Assistant chatbot • Form kontak & newsletter (demo, siap dihubungkan ke email service
seperti Formspree bila diperlukan) • Print-friendly (halaman Sewa Kantor punya versi
tabel cetak) • Aksesibilitas dasar (skip-link, aria-label, kontras warna, navigasi
keyboard pada modal).

## 12. Sumber Aset

- Semua foto gedung, lantai, dan fasilitas diekstrak dari PDF resmi
  *"Available Office For Rent — Plaza BPJamsostek"* yang Anda kirimkan.
- Foto foodcourt dari file yang Anda unggah.
- Font Sora, Inter, dan Fraunces — Google Fonts (lisensi Open Font License), di-host
  sendiri di folder `assets/fonts/`.
- Palet warna hijau/emas diambil langsung dari logo dan dokumen resmi Plaza
  BPJamsostek (bukan warna generik template).

## 13. Update Agustus 2026 — Fitur Baru

### Nomor Kontak
Nomor telepon kantor lama (021 5091 5190) sudah **diganti seluruhnya** menjadi WhatsApp
**0813-1401-1230** di setiap lokasi (footer, tombol floating, halaman Kontak). Nomor
Tenant Relation (0852-1156-6707) tetap dipakai khusus untuk urusan sewa kantor/ballroom
karena itu nomor resmi yang berbeda dari brosur PDF Anda.

### Foodcourt: Menu &amp; Pemesanan Online (Fase 1 — tanpa server, sudah aktif)
Halaman Foodcourt kini punya sistem lengkap:
- Kartu profil untuk **10 tenant F&amp;B** (logo inisial, deskripsi, jam operasional, menu
  berkategori).
- Tombol **+/-** untuk menambah item ke keranjang, ikon keranjang mengambang dengan
  badge jumlah item.
- **Checkout via WhatsApp**: pesanan dikelompokkan per tenant, nomor pesanan dibuat
  otomatis (format `PBJ-YYYYMMDD-XXX`), lalu dikirim sebagai pesan WhatsApp terformat
  ke nomor WhatsApp operasional gedung.

⚠️ **Penting**: Karena tidak ada data menu, harga, jam buka, atau logo asli dari
masing-masing tenant, seluruh isi menu saat ini adalah **contoh/placeholder** (ditandai
badge "Contoh" di setiap item, plus notice besar di halaman). Edit array `foodTenants`
di `js/data.js` untuk mengisi data asli kapan pun sudah tersedia dari tenant.

Ini adalah solusi **"Fase 1"**: berfungsi penuh hari ini, tanpa biaya server/database,
cocok untuk GitHub Pages. Order tidak tersimpan di database — hanya terkirim sebagai
pesan WhatsApp. Untuk pelacakan status pesanan otomatis & dashboard admin, lihat bagian
14 di bawah.

### Video Promosi
> **Update:** sistem video ini sudah digantikan sepenuhnya oleh sistem Video Instagram
> yang lebih baru dan lebih ringan — lihat **Bagian 15** di bawah untuk detail lengkap
> dan cara menambah/mengganti videonya.

## 14. Backend Sungguhan (Supabase) — Admin Panel, Order Tracking, Complaint Management

Fitur-fitur ini sekarang **sudah dibangun sepenuhnya** dan siap dipakai setelah Anda
menghubungkan project Supabase Anda sendiri (lihat `SUPABASE_SETUP.md` untuk langkah
lengkapnya — 15-20 menit, gratis).

### Yang sudah dibangun

**Admin Panel** (folder `admin/`, akses via `admin/login.html`):
- Login aman menggunakan Supabase Auth (bukan password yang bisa dilihat di source code).
- Dashboard ringkasan: pesanan menunggu, komplain terbuka, jumlah tenant &amp; menu aktif.
- **Kelola Tenant &amp; Menu Foodcourt**: tambah/edit/hapus tenant (nama, deskripsi,
  jam operasional, logo, banner), kelola menu per tenant (nama, kategori, harga, foto,
  status Tersedia/Sold Out).
- **Kelola Pesanan**: lihat semua pesanan masuk beserta rincian item, ubah status
  (Menunggu → Dikonfirmasi → Disiapkan → Siap Diambil → Selesai), auto-refresh tiap
  30 detik.
- **Kelola Komplain**: lihat semua komplain beserta foto terlampir, ubah status,
  tugaskan ke staf, kirim respons/tanggapan yang bisa dilihat pengirim komplain.

**Foodcourt (publik)**: begitu Supabase terhubung dan Anda menambahkan tenant/menu
lewat Admin Panel, halaman `foodcourt.html` **otomatis menampilkan data asli tersebut**
— tidak perlu edit kode. Selama belum ada data di database, halaman tetap menampilkan
contoh tampilan dari `data.js` seperti sebelumnya (fallback otomatis, tidak pernah
kosong/rusak).

**Pemesanan**: saat pelanggan checkout, pesanan disimpan ke database (muncul di Admin
Panel secara real-time) **dan** tetap terkirim ke WhatsApp seperti sebelumnya — dua-duanya
jalan bersamaan.

**Komplain** (halaman publik baru: `komplain.html`, sudah ditambahkan ke menu navigasi):
- Form pengajuan komplain dengan kategori, deskripsi, dan upload hingga 3 foto.
- Nomor komplain dibuat otomatis (format `CMP-YYYYMMDD-XXX`).
- Tab "Lacak Status" — siapa pun bisa cek status &amp; tanggapan dengan memasukkan
  nomor komplainnya, tanpa perlu login.

### Cara Mengaktifkan

1. Ikuti seluruh langkah di `SUPABASE_SETUP.md`.
2. Isi `js/supabase-config.js` dengan Project URL &amp; anon key Anda.
3. Upload ulang seluruh website (file yang berubah hanya `supabase-config.js`).
4. Login ke `namadomainanda.com/admin/login.html` dengan akun admin yang dibuat di
   Langkah 5 panduan setup.

Sebelum langkah di atas dilakukan, seluruh website (termasuk halaman publik) tetap
berfungsi normal seperti sebelumnya — tidak ada yang rusak, backend baru bersifat
"opt-in" sepenuhnya.

### Yang Masih Perlu Dikembangkan (fase berikutnya)

Skema database (`supabase/schema.sql`) sudah menyiapkan tabel untuk **seluruh** modul
yang Anda minta (hero banner, video promosi, berita, office listing, ballroom/meeting
room, fasilitas, tenant directory), supaya struktur database tidak perlu diubah lagi
ke depannya. Namun, **antarmuka Admin Panel untuk modul-modul tersebut belum saya
bangun** di iterasi ini — saat ini Admin Panel baru mencakup Foodcourt, Pesanan, dan
Komplain sesuai prioritas awal Anda. Beri tahu saya modul mana yang ingin diprioritaskan
selanjutnya (misalnya: kelola Hero Banner &amp; berita di beranda, atau kelola data
Sewa Kantor/Ballroom langsung dari Admin Panel).



## 15. Update Agustus 2026 (lanjutan) — Video Instagram &amp; Penyegaran Tampilan

### Video sekarang 100% dari Instagram (bukan file lokal lagi)
Semua video di website (Beranda &amp; halaman Ballroom) sekarang ditampilkan langsung
dari Instagram menggunakan sistem **embed resmi Instagram** — bukan file video yang
di-upload ke server. Dampaknya:

- **Ukuran website turun drastis**: 3 file video lokal (±87 MB) sudah dihapus. Total
  ukuran folder website turun dari ±112 MB menjadi ±25 MB (termasuk brosur PDF 18 MB).
  Situs jadi jauh lebih ringan &amp; cepat diakses, terutama di HP dengan koneksi
  terbatas.
- Video hanya benar-benar dimuat saat pengunjung men-scroll mendekati bagiannya
  (lazy-load), supaya halaman awal tetap ringan.
- Video otomatis menampilkan tampilan asli dari Instagram (termasuk tombol play,
  jumlah like, dsb) begitu widget-nya selesai dimuat oleh browser pengunjung.

### Cara mengganti/menambah video sendiri (tanpa developer)
Buka `js/data.js`, cari bagian **`instagramReels`** (ada di dekat bagian atas file,
lengkap dengan komentar panduan). Untuk mengganti video:

1. Buka reel/postingan Instagram yang ingin ditampilkan → salin link-nya.
2. Tempel link tersebut menggantikan `url` yang ada.
3. Simpan file, lalu upload ulang `js/data.js` ke hosting Anda.

```js
instagramReels: [
  { title_id:'Suasana & Profil Plaza BPJamsostek', title_en:'Plaza BPJamsostek Atmosphere & Profile',
    url:'https://www.instagram.com/reel/DaShpdGxVVD/' },
  // tambahkan blok seperti di atas (pisahkan dengan koma) untuk menampilkan lebih dari 1 video di Beranda
],
```

Video **pertama** dalam daftar ini juga otomatis dipakai di halaman Ballroom. Kosongkan
array (`instagramReels: []`) jika sementara tidak ingin menampilkan video sama sekali —
akan otomatis muncul status "segera hadir" yang rapi, bukan halaman kosong/rusak.

> Catatan: link Instagram yang dipakai harus dari akun/postingan publik (bukan private),
> karena embed resmi Instagram hanya bisa menampilkan konten publik.

### Penyegaran tampilan (visual polish)
- Tombol utama (`btn-primary`, `btn-gold`) kini punya efek **kilau halus saat disentuh
  kursor/hover** di seluruh halaman — sentuhan kecil yang membuat call-to-action terasa
  lebih premium tanpa mengubah tata letak.
- Kartu video Instagram dirancang menyatu dengan tema gelap/terang situs (termasuk saat
  dark mode aktif) dan sepenuhnya responsif di HP maupun desktop.
- Sudah diuji ulang di seluruh 10+ halaman (desktop &amp; mobile, mode ID/EN, mode
  terang/gelap) — tidak ada perubahan yang merusak fitur yang sudah berjalan.

### Ingin penyegaran tampilan lebih jauh?
Fondasi desain situs ini (warna, tipografi, animasi, dark mode, hexagon motif) sudah
cukup matang dari pembangunan sebelumnya, jadi pembaruan kali ini difokuskan pada video
Instagram (permintaan utama) plus polish yang aman &amp; menyeluruh. Jika ada bagian/menu
spesifik yang ingin ditata ulang lebih besar (misalnya: hero section, kartu lantai, atau
halaman tertentu), beri tahu bagian mana — supaya perubahan bisa lebih terarah dan
diuji dengan teliti satu per satu.

---

## 16. Update Agustus 2026 (lanjutan #2) — Palet Warna Baru, Galeri Ballroom &amp; Admin Panel

Update ini merespons brief redesign besar yang diberikan, dengan pendekatan: **audit
dulu, baru ubah** — bukan langsung ganti CSS tanpa pengecekan. Di bawah ini ringkasan
apa yang benar-benar dikerjakan, dan apa yang masih perlu dikerjakan berikutnya (supaya
tidak ada klaim "sudah selesai" yang menyesatkan).

### A. Audit yang dilakukan
- Meng-clone repo GitHub Pages yang sedang live (`plazabpjamsostek/Plazabpjamsostek`)
  untuk membandingkan dengan salinan kerja — ditemukan repo live masih 1 versi
  tertinggal (belum menerima update video Instagram dari sesi sebelumnya).
- Memeriksa seluruh `admin/*.html`, `js/admin/*.js`, `css/admin.css`, dan
  `supabase/schema.sql` — struktur dasarnya (proteksi login, tabel, modal detail
  komplain dengan riwayat respons, upload foto, dsb) **sudah cukup lengkap**; yang
  kurang adalah polish visual (kartu statistik datar, tabel berpotensi overflow di HP).
- Mengecek warna asli dari **logo resmi Plaza BPJamsostek** — ternyata wordmark-nya
  sudah biru tua ("BPJS blue" ~#00618A), bukan hijau. Jadi arah warna baru di bawah ini
  bukan preferensi sepihak, tapi align dengan aset brand yang sudah ada.

### B. Palet warna — diganti total, dari satu tempat
`css/base.css` sekarang punya skala warna baru: **navy/biru BPJS sebagai warna utama**,
teal/cyan sebagai aksen, gold tetap dipertahankan untuk kesan premium. Karena variabel
lama (`--green-700`, dst.) di-alias ke warna baru (bukan dihapus), perubahan ini otomatis
berlaku di **semua halaman publik + admin panel sekaligus** tanpa perlu menyentuh setiap
file satu per satu — termasuk mode gelap. Sudah diuji visual di 8+ halaman.

### C. Galeri "Momen Nyata di Ballroom Kami" (baru)
Menggunakan 8 foto acara asli yang diberikan (dari total ±19 foto):
- Foto dipilih yang paling menonjolkan **ruangan/venue**, bukan close-up wajah tamu.
- Watermark studio foto pihak ketiga (Askar Photography, 3larasfotografi) di-crop dari
  4 foto.
- Satu foto yang menampilkan **nama pasangan pengantin secara publik** di-crop supaya
  privasi tetap terjaga.
- File aslinya di-resize/dikompresi dari total ±65MB menjadi ±1.8MB.
- ⚠️ **Perlu ditindaklanjuti:** foto-foto ini didokumentasikan oleh vendor fotografi
  rekanan tenant/klien (bukan foto milik Plaza BPJamsostek sendiri). Sebelum publish,
  mohon pastikan izin penggunaan untuk materi marketing resmi sudah didapat dari
  fotografer/klien terkait — saya sudah menambahkan catatan kecil di halaman Ballroom
  ("Foto dokumentasi oleh vendor rekanan...") tapi ini bukan pengganti izin tertulis.

### D. Admin Panel — perbaikan visual &amp; mobile (bukan rombak total)
- Kartu statistik dashboard: sekarang pakai ikon berwarna + baris konteks tambahan,
  bukan cuma angka polos.
- Topbar dashboard: ditambah tanggal hari ini.
- **Bug diperbaiki:** sidebar mobile sebelumnya tidak punya backdrop/overlay saat
  dibuka (konten di belakangnya masih bisa diklik) — sekarang ada overlay gelap yang
  bisa di-tap untuk menutup, dan otomatis tertutup saat memilih menu.
- **Bug diperbaiki:** tabel admin (`admin-panel` punya `overflow:hidden`) berisiko
  memotong kolom tabel di layar HP tanpa cara untuk melihat sisanya. Sekarang setiap
  tabel dibungkus `.admin-table-wrap` yang bisa di-scroll horizontal khusus di area
  tabel saja — sesuai instruksi "jangan sampai ada elemen yang keluar layar".
- Halaman login: ditambah tombol show/hide password.

### E. Yang BELUM dikerjakan (supaya jujur, bukan diklaim selesai)
Brief yang diberikan sangat luas (40 bagian) — beberapa bagian besar berikut **belum**
disentuh dan realistis butuh sesi kerja terpisah:
- Grafik/chart analitik di dashboard (pesanan per hari, menu terpopuler, dsb).
- Redesign visual halaman Pesanan &amp; Tenant/Menu admin secara menyeluruh (saat ini
  sudah fungsional dan ikut mendapat palet warna baru, tapi belum di-polish sedetail
  Dashboard &amp; Komplain).
- Audit keamanan RLS Supabase secara menyeluruh (kebijakan di `supabase/schema.sql`
  belum ditinjau ulang di update ini).
- Halaman profil admin (edit profil, ganti password dari dalam panel).
- SEO/meta tag audit menyeluruh di semua halaman.

Kalau mau lanjut ke salah satu bagian di atas, sebutkan mana yang paling prioritas —
akan dikerjakan bertahap dan diuji satu per satu, bukan sekaligus tanpa verifikasi.

---

Ada pertanyaan atau ingin penyesuaian lebih lanjut (menambah lantai baru, mengganti
foto, menambah bahasa lain, dll.) — tinggal beri tahu.
