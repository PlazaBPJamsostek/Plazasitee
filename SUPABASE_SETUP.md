# Setup Backend (Supabase) — Panduan Langkah demi Langkah

Dokumen ini menjelaskan cara mengaktifkan Admin Panel, Order Tracking, dan Complaint
Management yang sungguhan (tersimpan di database, bisa diakses admin dari mana saja).
Kita menggunakan **Supabase** — layanan backend siap pakai (database + login + tempat
simpan foto) dengan paket gratis yang cukup besar untuk memulai. Anda yang akan
memiliki akun ini sepenuhnya (bukan saya), supaya Anda punya kendali penuh.

Ikuti langkah-langkah berikut. Setelah selesai sampai **Langkah 4**, kirimkan ke saya
dua hal yang Anda dapatkan (Project URL dan anon/public key) — **jangan pernah kirim
"service_role key"**, itu kunci rahasia yang tidak boleh dibagikan ke siapa pun.

---

## Langkah 1 — Buat Akun Supabase

1. Buka [https://supabase.com](https://supabase.com)
2. Klik **Start your project** → daftar dengan email atau akun GitHub Anda.
3. Setelah masuk, klik **New Project**.
4. Isi:
   - **Name**: `plaza-bpjamsostek` (atau nama lain bebas)
   - **Database Password**: buat password yang kuat, **simpan di tempat aman**
     (misalnya password manager) — ini bukan password login admin website, ini
     password database.
   - **Region**: pilih yang terdekat, misalnya `Southeast Asia (Singapore)`.
5. Klik **Create new project**, tunggu 1–2 menit sampai project siap.

## Langkah 2 — Jalankan Skema Database

1. Di dashboard project Anda, buka menu **SQL Editor** (ikon di sidebar kiri).
2. Klik **New query**.
3. Buka file `supabase/schema.sql` yang saya sertakan dalam paket website ini,
   salin **seluruh isinya**, tempel ke SQL Editor.
4. Klik **Run** (atau tekan Ctrl+Enter). Tunggu sampai muncul "Success".
   Ini akan membuat semua tabel yang dibutuhkan (menu, tenant, pesanan, komplain, dst.)
   sekaligus aturan keamanannya.

## Langkah 3 — Aktifkan Login Email untuk Admin

1. Buka menu **Authentication → Providers**.
2. Pastikan **Email** dalam keadaan aktif (biasanya sudah aktif secara default).
3. Buka **Authentication → Settings** → matikan **"Confirm email"** jika Anda ingin
   akun admin langsung aktif tanpa perlu klik link verifikasi (opsional, lebih
   praktis untuk internal team).

## Langkah 4 — Ambil Kunci API (yang akan Anda kirim ke saya)

1. Buka menu **Project Settings** (ikon gear) → **API**.
2. Anda akan melihat:
   - **Project URL** — contoh: `https://xxxxxxxxxxx.supabase.co`
   - **Project API keys → anon / public** — kunci panjang yang boleh dipakai di
     kode frontend (aman untuk dipublikasikan, karena akses sebenarnya dibatasi
     oleh Row Level Security yang sudah kita atur di `schema.sql`).
3. **Salin kedua nilai ini** dan kirimkan ke saya. Contoh format yang saya butuhkan:
   ```
   SUPABASE_URL = https://xxxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......
   ```
   ⚠️ **Jangan kirim "service_role" key** — hanya kirim yang berlabel **anon / public**.

## Langkah 5 — Buat Login Admin Pertama

1. Buka menu **Authentication → Users** → **Add user** → **Create new user**.
2. Isi email dan password untuk akun admin pertama Anda (misalnya email kerja Anda).
3. Setelah user dibuat, buka **SQL Editor** lagi, jalankan query berikut (ganti
   `EMAIL_ADMIN_ANDA` dengan email yang baru dibuat):
   ```sql
   insert into profiles (id, full_name, role)
   select id, 'Administrator', 'super_admin' from auth.users
   where email = 'EMAIL_ADMIN_ANDA';
   ```
4. Selesai — akun ini sekarang bisa login ke Admin Panel setelah saya menghubungkan
   kredensial dari Langkah 4.

---

## Setelah Anda Kirim URL & anon key ke Saya

Saya akan:
1. Menghubungkan seluruh Admin Panel, Foodcourt management, Order tracking, dan
   Complaint management ke project Supabase Anda.
2. Memindahkan data yang sudah ada (data lantai kantor, tenant, dsb.) ke database
   agar bisa diedit langsung dari Admin Panel — tidak perlu lagi edit `data.js`.
3. Memberi Anda link login Admin Panel beserta panduan penggunaannya.

## Biaya

Paket gratis Supabase mencakup: 500MB database, 1GB penyimpanan file, 50.000
pengguna terautentikasi per bulan — sangat cukup untuk kebutuhan Plaza BPJamsostek
saat ini. Jika suatu saat traffic sangat besar, Anda bisa upgrade ke paket
berbayar (mulai ~$25/bulan) langsung dari akun Supabase Anda sendiri — saya tidak
memiliki akses untuk menagih Anda apa pun, karena akun sepenuhnya milik Anda.
