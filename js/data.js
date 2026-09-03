/* =================================================================
   PLAZA BPJAMSOSTEK — SHARED CONTENT DATA
   Single source of truth for data-driven sections (Available Office,
   Tenant Directory, Facility, FAQ, News). Edit this file to update
   content across the whole site without touching page markup.
   Numbers below are taken directly from the official PDF brochure
   "Available Office For Rent — Plaza BPJamsostek" supplied by the
   building's Tenant Relation / Sinergi Investasi Properti team.
   ================================================================= */
window.PlazaData = {

  building: {
    totalFloors: 28,
    officeFloors: 21,
    podiumParking: 4,
    podiumCommercial: 2,
    basementParking: 3,
    address_id: 'Jl. H. R. Rasuna Said Kav. 112B RT.5/RW.1, Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, DKI Jakarta 12910',
    address_en: 'Jl. H. R. Rasuna Said Kav. 112B RT.5/RW.1, Kuningan, Setiabudi, South Jakarta, Special Capital Region of Jakarta 12910',
    whatsappOffice: '0813-1401-1230',
    whatsappOfficeLink: '6281314011230',
    phoneTenantRelation: '0852-1156-6707',
    whatsapp: '6285211566707',
    email: 'tr.plaza.bpjamsostek@gmail.com',
    instagram: 'plazabpjamsostek',
    tiktok: 'plazabpjamsostek',
    youtube: '@plazabpjamsostek',
    managedBy: 'Sinergi Investasi Properti (SIP)',
    website: 'sinergiinvestasiproperti.co.id',
  },

  /* ---------------- AVAILABLE OFFICE FOR RENT (from PDF) ---------------- */
  floors: [
    {
      id: 'lt01', floor: 1, floorLabel: '1', ordinal: '1st',
      area: 520, rent: 220000, service: 'negotiable', condition: 'bare',
      breakdown: '229 m\u00B2 + 291 m\u00B2 (2 unit bersebelahan)',
      photo: 'assets/img/floors/floor-01-photo.jpg',
      plan: 'assets/img/floors/floor-01-plan.jpg',
      spec: 'assets/img/floors/floor-01-specsheet.jpg',
      view_id: 'Pemandangan area hijau podium & akses drop-off utama.',
      view_en: 'Overlooks the podium greenery and the main drop-off area.',
    },
    {
      id: 'lt09', floor: 9, floorLabel: '9', ordinal: '9th',
      area: 1234, rent: 220000, service: 'negotiable', condition: 'bare',
      breakdown: 'Satu lantai penuh, layout terbuka',
      photo: 'assets/img/floors/floor-09-photo.jpg',
      plan: 'assets/img/floors/floor-09-plan.jpg',
      spec: 'assets/img/floors/floor-09-specsheet.jpg',
      view_id: 'Lantai penuh dengan jendela kaca keliling & langit-langit tinggi.',
      view_en: 'Full floor with wraparound glazing and high ceilings.',
    },
    {
      id: 'lt11', floor: 11, floorLabel: '11', ordinal: '11th',
      area: 603.05, rent: 230000, service: 'negotiable', condition: 'fitted',
      breakdown: 'Satu lantai penuh, sebagian sudah dipartisi',
      photo: 'assets/img/floors/floor-11-photo.jpg',
      plan: 'assets/img/floors/floor-11-plan.jpg',
      spec: 'assets/img/floors/floor-11-specsheet.jpg',
      view_id: 'View kota Jakarta Selatan, sudah fitted dengan partisi kaca.',
      view_en: 'South Jakarta skyline view, already fitted with glass partitions.',
    },
    {
      id: 'lt12', floor: 12, floorLabel: '12', ordinal: '12th',
      area: 787.71, rent: 230000, service: 'negotiable', condition: 'fitted',
      breakdown: 'Beberapa ruang dengan partisi & lantai kayu',
      photo: 'assets/img/floors/floor-12-photo.jpg',
      plan: 'assets/img/floors/floor-12-plan.jpg',
      spec: 'assets/img/floors/floor-12-specsheet.jpg',
      view_id: 'Kombinasi ruang terbuka & ruang privat, lantai vinyl kayu.',
      view_en: 'Mix of open-plan and private rooms, timber-look vinyl flooring.',
    },
    {
      id: 'lt15', floor: 15, floorLabel: '15', ordinal: '15th',
      area: 1234, rent: 220000, service: 'negotiable', condition: 'bare',
      breakdown: 'Satu lantai penuh, layout terbuka',
      photo: 'assets/img/floors/floor-15-photo.jpg',
      plan: 'assets/img/floors/floor-15-plan.jpg',
      spec: 'assets/img/floors/floor-15-specsheet.jpg',
      view_id: 'Lantai tinggi dengan potensi city view maksimal.',
      view_en: 'High floor with maximum city-view potential.',
    },
    {
      id: 'lt16', floor: 16, floorLabel: '16', ordinal: '16th',
      area: 1234, rent: 230000, service: 'negotiable', condition: 'fitted',
      breakdown: 'Sudah fitted dengan ruang rapat & lantai kayu',
      photo: 'assets/img/floors/floor-16-photo.jpg',
      plan: 'assets/img/floors/floor-16-plan.jpg',
      spec: 'assets/img/floors/floor-16-specsheet.jpg',
      view_id: 'Fitted dengan beberapa ruang meeting & lantai parket.',
      view_en: 'Fitted with several meeting rooms and parquet flooring.',
    },
    {
      id: 'lt18', floor: 18, floorLabel: '18', ordinal: '18th',
      area: 1234, rent: 220000, service: 'negotiable', condition: 'bare',
      breakdown: 'Satu lantai penuh, layout terbuka',
      photo: 'assets/img/floors/floor-18-photo.jpg',
      plan: 'assets/img/floors/floor-18-plan.jpg',
      spec: 'assets/img/floors/floor-18-specsheet.jpg',
      view_id: 'Lantai tinggi, sirkulasi udara & cahaya alami optimal.',
      view_en: 'High floor with optimal natural light and airflow.',
    },
  ],

  /* ---------------- FLOOR DIRECTORY (building-wide zoning) ---------------- */
  directory: [
    { zone_id:'Basement 1–3', zone_en:'Basement 1–3', cat:'parking', label_id:'Parkir Basement', label_en:'Basement Parking', icon:'parking', note_id:'3 level parkir basement untuk kendaraan tenant.', note_en:'3 basement parking levels for tenant vehicles.' },
    { zone_id:'Ground Floor', zone_en:'Ground Floor', cat:'lobby', label_id:'Lobby Utama & Resepsionis', label_en:'Main Lobby & Reception', icon:'lobby', note_id:'Pintu masuk utama, meja resepsionis, dan lift lobby.', note_en:'Main entrance, reception desk, and lift lobby.' },
    { zone_id:'Ground–2', zone_en:'Ground–2', cat:'retail', label_id:'Retail, Bank & ATM Center', label_en:'Retail, Bank & ATM Center', icon:'bank', note_id:'Deretan retail, gerai perbankan, dan ATM center.', note_en:'Retail row, banking outlets, and ATM center.' },
    { zone_id:'Podium P1–P4', zone_en:'Podium P1–P4', cat:'parking', label_id:'Parkir Podium', label_en:'Podium Parking', icon:'parking', note_id:'4 lantai podium parkir untuk tenant & pengunjung.', note_en:'4 podium parking floors for tenants & visitors.' },
    { zone_id:'Lantai 1–2', zone_en:'Level 1–2', cat:'foodcourt', label_id:'Foodcourt & Tenant Komersial', label_en:'Foodcourt & Commercial Tenants', icon:'foodcourt', note_id:'Foodcourt dengan city view dan tenant F&amp;B pilihan.', note_en:'Foodcourt with city views and curated F&B tenants.' },
    { zone_id:'Lantai 6', zone_en:'Level 6', cat:'ballroom', label_id:'Ballroom & Meeting Room', label_en:'Ballroom & Meeting Rooms', icon:'ballroom', note_id:'Ballroom serbaguna dan 2 ruang meeting representatif.', note_en:'Multi-purpose ballroom and 2 well-appointed meeting rooms.' },
    { zone_id:'Lantai 3–5, 7–21', zone_en:'Level 3–5, 7–21', cat:'office', label_id:'Lantai Perkantoran (21 Lantai)', label_en:'Office Floors (21 Levels)', icon:'office', note_id:'21 lantai kantor dengan opsi bare & fitted condition.', note_en:'21 office floors with bare & fitted condition options.' },
    { zone_id:'Setiap Lantai', zone_en:'Every Floor', cat:'toilet', label_id:'Toilet Pria & Wanita + Difable', label_en:"Men's, Women's & Accessible Toilets", icon:'toilet', note_id:'Tersedia di setiap lantai, termasuk toilet difable.', note_en:'Available on every floor, including accessible restrooms.' },
    { zone_id:'Setiap Lantai', zone_en:'Every Floor', cat:'musholla', label_id:'Surau / Ruang Ibadah (SJL)', label_en:'Prayer Room (every floor)', icon:'musholla', note_id:'Ruang ibadah kecil tersedia di tiap lantai kantor.', note_en:'A small prayer space is available on every office floor.' },
    { zone_id:'Lantai G, 9, 15, 18', zone_en:'Ground, 9, 15, 18', cat:'lift', label_id:'Lobby Lift & Tangga Darurat', label_en:'Lift Lobby & Emergency Stairs', icon:'lift', note_id:'2 core lift penumpang plus tangga darurat di setiap lantai.', note_en:'Two passenger lift cores plus emergency stairs on every floor.' },
    { zone_id:'Lantai G', zone_en:'Ground Floor', cat:'musholla', label_id:'Musholla Utama', label_en:'Main Musholla', icon:'musholla', note_id:'Ruang ibadah utama berkapasitas besar di area podium.', note_en:'Main prayer hall with larger capacity in the podium area.' },
    { zone_id:'Podium', zone_en:'Podium', cat:'sport', label_id:'Lapangan Badminton', label_en:'Badminton Court', icon:'badminton', note_id:'Lapangan badminton indoor untuk aktivitas tenant.', note_en:'Indoor badminton court for tenant activities.' },
  ],

  /* ---------------- FACILITIES ---------------- */
  facilities: [
    { key:'foodcourt', name_id:'Food Court', name_en:'Food Court', photo:'assets/img/foodcourt/foodcourt-main.jpg',
      desc_id:'Foodcourt panorama di lantai atas dengan aneka tenant F&B, kursi luas, dan pemandangan kota Jakarta.',
      desc_en:'A panoramic upper-floor foodcourt with a variety of F&B tenants, generous seating, and Jakarta skyline views.' },
    { key:'bank-atm', name_id:'Bank & ATM Center', name_en:'Bank & ATM Center', photo:'assets/img/facility/atm-banking.jpg',
      desc_id:'Deretan mesin ATM multi-bank dan gerai layanan perbankan di area lobby untuk kemudahan transaksi harian.',
      desc_en:'A row of multi-bank ATMs and banking service counters in the lobby area for everyday transactions.' },
    { key:'gym', name_id:'Gym & Fitness Center', name_en:'Gym & Fitness Center', photo:'assets/img/facility/gym.jpg',
      desc_id:'Fitness center dengan alat modern dan jendela kaca menghadap skyline Jakarta — cocok untuk olahraga sebelum atau sesudah jam kerja.',
      desc_en:'A modern fitness center with floor-to-ceiling windows facing the Jakarta skyline — perfect before or after work hours.' },
    { key:'badminton', name_id:'Lapangan Badminton', name_en:'Badminton Court', photo:'assets/img/facility/badminton.jpg',
      desc_id:'Lapangan badminton indoor standar untuk aktivitas olahraga dan kebersamaan tenant di sela kesibukan kerja.',
      desc_en:'A standard indoor badminton court for tenant sports activities and team bonding between work hours.' },
    { key:'musholla', name_id:'Musholla', name_en:'Musholla / Prayer Room', photo:'assets/img/facility/musholla.jpg',
      desc_id:'Ruang ibadah yang bersih dan nyaman tersedia di area podium serta di setiap lantai kantor.',
      desc_en:'A clean, comfortable prayer space available in the podium area and on every office floor.' },
    { key:'business-center', name_id:'Business Center', name_en:'Business Center', photo:null,
      desc_id:'Layanan dukungan bisnis termasuk ruang cetak dokumen, meeting kecil, dan kebutuhan administrasi kantor.',
      desc_en:'Business support services including printing, small meeting space, and everyday office administration needs.' },
    { key:'minimarket', name_id:'Minimarket', name_en:'Minimarket', photo:null,
      desc_id:'Minimarket di area podium untuk kebutuhan harian tenant, buka setiap hari kerja.',
      desc_en:'A minimarket in the podium area for tenants\u2019 daily needs, open every working day.' },
    { key:'lounge-cafe', name_id:'Lounge Cafe', name_en:'Lounge Cafe', photo:'assets/img/facility/lounge-cafe.jpg',
      desc_id:'Area lounge santai dengan pilihan kopi dan camilan — cocok untuk pertemuan informal maupun me time.',
      desc_en:'A relaxed lounge area with coffee and light bites — great for informal meetings or a quick break.' },
    { key:'medical', name_id:'Medical Clinic', name_en:'Medical Clinic', photo:null,
      desc_id:'Klinik kesehatan dasar untuk penanganan pertama dan pemeriksaan ringan bagi tenant dan pengunjung.',
      desc_en:'A basic health clinic for first aid and light check-ups for tenants and visitors.' },
    { key:'security', name_id:'Keamanan 24 Jam & CCTV', name_en:'24-Hour Security & CCTV', photo:'assets/img/services/security.jpg',
      desc_id:'Personel keamanan profesional berjaga 24 jam, didukung sistem CCTV di seluruh area gedung.',
      desc_en:'Professional security personnel on duty 24 hours a day, supported by CCTV coverage throughout the building.' },
    { key:'parking', name_id:'Parkir Podium & Basement', name_en:'Podium & Basement Parking', photo:'assets/img/facility/parking.jpg',
      desc_id:'4 lantai podium dan 3 lantai basement parkir, termasuk area parkir khusus pengunjung (visitor parking).',
      desc_en:'4 podium floors and 3 basement floors of parking, including a dedicated visitor parking area.' },
    { key:'ev-charging', name_id:'EV Charging Station', name_en:'EV Charging Station', photo:null, comingSoon:true,
      desc_id:'Stasiun pengisian kendaraan listrik sedang dalam tahap perencanaan sebagai bagian dari inisiatif gedung ramah lingkungan.',
      desc_en:'An EV charging station is currently in the planning stage as part of the building\u2019s sustainability initiatives.' },
  ],

  services: [
    { name_id:'Housekeeping', name_en:'Housekeeping', photo:'assets/img/services/housekeeping.jpg',
      desc_id:'Kebersihan area kerja dan ruang publik terjaga setiap saat, mendukung lingkungan yang rapi, sehat, dan nyaman bagi seluruh tenant.',
      desc_en:'Work and public areas are kept clean at all times, supporting a tidy, healthy and comfortable environment for every tenant.' },
    { name_id:'Security', name_en:'Security', photo:'assets/img/services/security.jpg',
      desc_id:'Personel keamanan terlatih dan sigap berjaga 24 jam, memberikan rasa aman di setiap sudut gedung dan area sekitarnya.',
      desc_en:'Trained, responsive security personnel are on duty 24 hours a day, providing peace of mind throughout the building and its surroundings.' },
    { name_id:'Engineering', name_en:'Engineering', photo:'assets/img/services/engineering.jpg',
      desc_id:'Perawatan rutin, perbaikan cepat, dan pengelolaan fasilitas teknis memastikan setiap sistem gedung berjalan aman dan efisien.',
      desc_en:'Routine maintenance, fast repairs, and technical facility management keep every building system running safely and efficiently.' },
  ],

  /* ---------------- TENANT DIRECTORY (preserved from prior site content) ---------------- */
  tenants: [
    { name:'BPJS Ketenagakerjaan', cat:'office', floor:'Berbagai Lantai' },
    { name:'Sinergi Investasi Properti', cat:'office', floor:'Manajemen Gedung' },
    { name:'Binajasa Abadikarya', cat:'office', floor:'Manajemen Gedung' },
    { name:'Jofteri Group', cat:'office', floor:'Lantai Kantor' },
    { name:'Perisaiku Group', cat:'office', floor:'Lantai Kantor' },
    { name:'Singapore Business Federation', cat:'office', floor:'Lantai Kantor' },
    { name:'StraitsX', cat:'office', floor:'Lantai Kantor' },
    { name:'Bank BTN', cat:'banking', floor:'Ground Floor' },
    { name:'Bank Mandiri', cat:'banking', floor:'Ground Floor' },
    { name:'Bank BNI', cat:'banking', floor:'Ground Floor' },
    { name:'Bank BJB', cat:'banking', floor:'Ground Floor' },
    { name:'Bank Kalteng', cat:'banking', floor:'Ground Floor' },
    { name:'Indomaret Point', cat:'retail', floor:'Lantai 1-2' },
    { name:'JAKOKI', cat:'retail', floor:'Foodcourt' },
    { name:'Dapur Sedap NR', cat:'retail', floor:'Foodcourt' },
    { name:'Mococo Cafe', cat:'retail', floor:'Foodcourt' },
    { name:'Soto Khas Bogor', cat:'retail', floor:'Foodcourt' },
    { name:'Pawon Stories', cat:'retail', floor:'Foodcourt' },
    { name:'Keday Nusantara', cat:'retail', floor:'Foodcourt' },
    { name:'Saudi Chicken', cat:'retail', floor:'Foodcourt' },
    { name:'Sudo Brew', cat:'retail', floor:'Foodcourt' },
    { name:'Golden Black Coffee', cat:'retail', floor:'Foodcourt' },
    { name:'Chaniago', cat:'retail', floor:'Foodcourt' },
    { name:'Queensyatila Lumiere', cat:'wedding', floor:'Ballroom Lt. 6' },
  ],

  /* ---------------- NEARBY / LOCATION ---------------- */
  nearby: {
    transit: [
      { name_id:'Halte Transjakarta Setiabudi', name_en:'Setiabudi Transjakarta Stop', dist:'\u00B1100 m', note_id:'Melayani rute JABODETABEK', note_en:'Serves JABODETABEK routes' },
      { name_id:'Stasiun LRT Setiabudi / Dukuh Atas', name_en:'Setiabudi / Dukuh Atas LRT Station', dist:'\u00B1100 m', note_id:'Melayani rute Bekasi & Cibubur', note_en:'Serves Bekasi & Cibubur routes' },
      { name_id:'Stasiun MRT Sudirman', name_en:'Sudirman MRT Station', dist:'\u00B12 km', note_id:'Jalur MRT Bundaran HI \u2013 Lebak Bulus', note_en:'MRT line Bundaran HI \u2013 Lebak Bulus' },
    ],
    landmarks: ['The St. Regis Jakarta','The Royal Kuningan','The Kuningan Suites','KPK Merah Putih','MD Entertainment','Plaza Festival','Setiabudi One','Epicentrum Walk','Mega Kuningan','Raffles Hotel','Westin Hotel','Aston Rasuna Hotel','Grand Melia Hotel','ITC Kuningan','Kuningan City','Ambasador Mall','Kota Kasablanka'],
    categories_id: ['Shopping Mall','Hotel Bintang 5','Halte Transjakarta','Stasiun MRT','Stasiun LRT','Stasiun Kereta','Rumah Sakit','Kedutaan Besar'],
    categories_en: ['Shopping Mall','5-Star Hotels','Transjakarta Stop','MRT Station','LRT Station','Railway Station','Hospital','Embassy'],
  },

  /* ---------------- FAQ ---------------- */
  faq: [
    { q_id:'Berapa harga sewa kantor di Plaza BPJamsostek?', q_en:'What is the office rental rate at Plaza BPJamsostek?',
      a_id:'Harga sewa bervariasi per lantai, mulai dari Rp 220.000 hingga Rp 230.000 per m² per bulan dan dapat dinegosiasikan. Lihat rincian lengkap di halaman Sewa Kantor.',
      a_en:'Rental rates vary by floor, from Rp 220,000 to Rp 230,000 per m² per month, and are negotiable. See full details on the Available Office page.' },
    { q_id:'Apakah service charge sudah termasuk dalam harga sewa?', q_en:'Is the service charge included in the rental price?',
      a_id:'Belum. Service charge dihitung terpisah dan besarannya dapat dinegosiasikan bersama tim Tenant Relation kami.',
      a_en:'No. The service charge is calculated separately and can be negotiated with our Tenant Relation team.' },
    { q_id:'Apa perbedaan kondisi "Bare" dan "Fitted"?', q_en:'What is the difference between "Bare" and "Fitted" condition?',
      a_id:'Bare condition berarti unit belum memiliki partisi/lantai akhir sehingga bebas didesain sesuai kebutuhan Anda. Fitted condition berarti unit sudah memiliki partisi, plafon, dan lantai yang siap pakai.',
      a_en:'Bare condition means the unit has no partitions or final flooring yet, so you can design it to your own needs. Fitted condition means the unit already has partitions, ceiling and flooring ready to use.' },
    { q_id:'Bagaimana cara menjadwalkan kunjungan ke unit yang tersedia?', q_en:'How do I schedule a viewing of an available unit?',
      a_id:'Anda dapat menekan tombol "Jadwalkan Kunjungan" di halaman Sewa Kantor, menghubungi kami via WhatsApp, atau mengisi formulir kontak — tim kami akan mengatur jadwal kunjungan sesuai waktu Anda.',
      a_en:'You can tap the "Schedule Viewing" button on the Available Office page, contact us via WhatsApp, or fill in the contact form — our team will arrange a visit at a time that suits you.' },
    { q_id:'Apakah tersedia unit retail selain kantor?', q_en:'Are retail units available in addition to office space?',
      a_id:'Ya. Selain 21 lantai kantor, terdapat 2 lantai podium komersial untuk kebutuhan retail, F&B dan perbankan. Hubungi tim kami untuk ketersediaan terbaru.',
      a_en:'Yes. In addition to 21 office floors, there are 2 podium commercial floors for retail, F&B and banking needs. Contact our team for the latest availability.' },
    { q_id:'Berapa kapasitas Ballroom dan bagaimana cara memesannya?', q_en:'What is the Ballroom capacity and how do I book it?',
      a_id:'Ballroom di lantai 6 dapat menampung 500–1.000 tamu tergantung layout acara. Untuk pemesanan dan price list, hubungi tim kami melalui halaman Kontak atau tombol "Book Now" di halaman Ballroom.',
      a_en:'The 6th-floor Ballroom accommodates 500–1,000 guests depending on the event layout. For booking and the price list, contact our team via the Contact page or the "Book Now" button on the Ballroom page.' },
    { q_id:'Apakah gedung ini mudah dijangkau transportasi umum?', q_en:'Is the building easily accessible by public transport?',
      a_id:'Sangat mudah. Halte Transjakarta dan Stasiun LRT Setiabudi/Dukuh Atas hanya berjarak ±100 meter, sementara Stasiun MRT Sudirman berjarak ±2 kilometer.',
      a_en:'Very easily. The Transjakarta stop and Setiabudi/Dukuh Atas LRT station are only ±100 metres away, while Sudirman MRT station is about 2 kilometres away.' },
    { q_id:'Bagaimana cara menghubungi Tenant Relation?', q_en:'How do I contact Tenant Relation?',
      a_id:'Anda dapat menghubungi tim Tenant Relation kami di 0852-1156-6707 (WhatsApp/telepon) atau melalui email tr.plaza.bpjamsostek@gmail.com.',
      a_en:'You can reach our Tenant Relation team at 0852-1156-6707 (WhatsApp/phone) or via email at tr.plaza.bpjamsostek@gmail.com.' },
  ],

  /* ---------------- FOODCOURT TENANT PROFILES ----------------
     NOTE: menu items, prices, hours and descriptions below are
     SAMPLE / PLACEHOLDER content (isSample: true) so the browsing
     and ordering system can be demonstrated end-to-end. Replace
     with each tenant's real menu, prices and photos as they become
     available — see README.md for how. Tenant names themselves are
     real (from the building's tenant list). */
  foodTenants: [
    { id:'jakoki', name:'JAKOKI', cuisine_id:'Asian Fusion', cuisine_en:'Asian Fusion', logo:null, banner:null, isSample:true,
      desc_id:'Menyajikan hidangan ala Asia dengan cita rasa modern — cocok untuk makan siang maupun santai sore hari.',
      desc_en:'Serving modern Asian-inspired dishes — great for lunch or a relaxed afternoon bite.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'jakoki-1', name_id:'Rice Bowl Spesial', name_en:'Signature Rice Bowl', price:28000, cat_id:'Menu Utama', cat_en:'Main Menu' },
        { id:'jakoki-2', name_id:'Ramen Pilihan', name_en:'Selected Ramen', price:32000, cat_id:'Menu Utama', cat_en:'Main Menu' },
        { id:'jakoki-3', name_id:'Gyoza / Side Dish', name_en:'Gyoza / Side Dish', price:15000, cat_id:'Pendamping', cat_en:'Side Dish' },
      ] },
    { id:'dapur-sedap-nr', name:'Dapur Sedap NR', cuisine_id:'Nusantara', cuisine_en:'Indonesian', logo:null, banner:null, isSample:true,
      desc_id:'Masakan rumahan Nusantara dengan menu yang berganti setiap hari.',
      desc_en:'Homestyle Indonesian cooking with a menu that rotates daily.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'dsn-1', name_id:'Paket Nasi + Ayam', name_en:'Rice + Chicken Set', price:22000, cat_id:'Paket Nasi', cat_en:'Rice Set' },
        { id:'dsn-2', name_id:'Paket Nasi + Ikan', name_en:'Rice + Fish Set', price:24000, cat_id:'Paket Nasi', cat_en:'Rice Set' },
        { id:'dsn-3', name_id:'Sayur Tambahan', name_en:'Extra Vegetable Side', price:8000, cat_id:'Pendamping', cat_en:'Side Dish' },
      ] },
    { id:'mococo-cafe', name:'Mococo Cafe', cuisine_id:'Coffee & Dessert', cuisine_en:'Coffee & Dessert', logo:null, banner:null, isSample:true,
      desc_id:'Kopi dan dessert untuk menemani waktu kerja maupun rehat sejenak.',
      desc_en:'Coffee and desserts to accompany your workday or a short break.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'moc-1', name_id:'Kopi Susu Gula Aren', name_en:'Palm Sugar Milk Coffee', price:22000, cat_id:'Minuman', cat_en:'Drinks' },
        { id:'moc-2', name_id:'Americano', name_en:'Americano', price:18000, cat_id:'Minuman', cat_en:'Drinks' },
        { id:'moc-3', name_id:'Kue / Dessert Pilihan', name_en:'Selected Dessert', price:20000, cat_id:'Dessert', cat_en:'Dessert' },
      ] },
    { id:'soto-khas-bogor', name:'Soto Khas Bogor', cuisine_id:'Nusantara', cuisine_en:'Indonesian', logo:null, banner:null, isSample:true,
      desc_id:'Soto khas Bogor dengan kuah gurih dan bahan pilihan.',
      desc_en:'Traditional Bogor-style soto with a savoury broth and quality ingredients.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'skb-1', name_id:'Soto Ayam', name_en:'Chicken Soto', price:23000, cat_id:'Menu Utama', cat_en:'Main Menu' },
        { id:'skb-2', name_id:'Soto Daging', name_en:'Beef Soto', price:28000, cat_id:'Menu Utama', cat_en:'Main Menu' },
        { id:'skb-3', name_id:'Es Teh Manis', name_en:'Iced Sweet Tea', price:8000, cat_id:'Minuman', cat_en:'Drinks' },
      ] },
    { id:'pawon-stories', name:'Pawon Stories', cuisine_id:'Nusantara', cuisine_en:'Indonesian', logo:null, banner:null, isSample:true,
      desc_id:'Menu rumahan Nusantara dengan sentuhan modern.',
      desc_en:'Indonesian homestyle menu with a modern touch.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'pws-1', name_id:'Paket Nasi + Lauk Pilihan', name_en:'Rice + Choice of Side', price:25000, cat_id:'Paket Nasi', cat_en:'Rice Set' },
        { id:'pws-2', name_id:'Sambal Tambahan', name_en:'Extra Sambal', price:5000, cat_id:'Pendamping', cat_en:'Side Dish' },
      ] },
    { id:'keday-nusantara', name:'Keday Nusantara', cuisine_id:'Nusantara', cuisine_en:'Indonesian', logo:null, banner:null, isSample:true,
      desc_id:'Ragam masakan Nusantara dari berbagai daerah dalam satu tempat.',
      desc_en:'A variety of Indonesian regional dishes in one place.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'kn-1', name_id:'Paket Nasi Campur', name_en:'Mixed Rice Set', price:26000, cat_id:'Paket Nasi', cat_en:'Rice Set' },
        { id:'kn-2', name_id:'Kerupuk / Pendamping', name_en:'Crackers / Side', price:5000, cat_id:'Pendamping', cat_en:'Side Dish' },
      ] },
    { id:'saudi-chicken', name:'Saudi Chicken', cuisine_id:'Middle Eastern & Fried Chicken', cuisine_en:'Middle Eastern & Fried Chicken', logo:null, banner:null, isSample:true,
      desc_id:'Ayam goreng ala Timur Tengah dan nasi kebuli.',
      desc_en:'Middle Eastern-style fried chicken and kebuli rice.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'sc-1', name_id:'Paket Ayam Goreng', name_en:'Fried Chicken Set', price:27000, cat_id:'Menu Utama', cat_en:'Main Menu' },
        { id:'sc-2', name_id:'Nasi Kebuli', name_en:'Kebuli Rice', price:30000, cat_id:'Menu Utama', cat_en:'Main Menu' },
        { id:'sc-3', name_id:'Minuman Segar', name_en:'Refreshing Drink', price:10000, cat_id:'Minuman', cat_en:'Drinks' },
      ] },
    { id:'sudo-brew', name:'Sudo Brew', cuisine_id:'Coffee & Dessert', cuisine_en:'Coffee & Dessert', logo:null, banner:null, isSample:true,
      desc_id:'Kopi seduh dengan biji pilihan untuk penikmat kopi di gedung.',
      desc_en:'Brewed coffee with selected beans for the building\u2019s coffee lovers.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'sb-1', name_id:'Manual Brew', name_en:'Manual Brew Coffee', price:25000, cat_id:'Minuman', cat_en:'Drinks' },
        { id:'sb-2', name_id:'Es Kopi Susu', name_en:'Iced Milk Coffee', price:20000, cat_id:'Minuman', cat_en:'Drinks' },
      ] },
    { id:'golden-black-coffee', name:'Golden Black Coffee', cuisine_id:'Coffee & Dessert', cuisine_en:'Coffee & Dessert', logo:null, banner:null, isSample:true,
      desc_id:'Kopi kekinian dengan suasana nyaman untuk bekerja maupun bersantai.',
      desc_en:'Modern coffee drinks in a comfortable space to work or unwind.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'gbc-1', name_id:'Kopi Hitam', name_en:'Black Coffee', price:16000, cat_id:'Minuman', cat_en:'Drinks' },
        { id:'gbc-2', name_id:'Kopi Susu Signature', name_en:'Signature Milk Coffee', price:23000, cat_id:'Minuman', cat_en:'Drinks' },
        { id:'gbc-3', name_id:'Roti / Snack Pendamping', name_en:'Bread / Snack', price:12000, cat_id:'Snack', cat_en:'Snack' },
      ] },
    { id:'chaniago', name:'Chaniago', cuisine_id:'Nusantara', cuisine_en:'Indonesian', logo:null, banner:null, isSample:true,
      desc_id:'Masakan Padang otentik dengan berbagai pilihan lauk.',
      desc_en:'Authentic Padang cuisine with a variety of side dishes.',
      hours_id:'Setiap hari kerja, mengikuti jam operasional gedung', hours_en:'Every working day, following building operating hours',
      menu:[
        { id:'chn-1', name_id:'Nasi Rendang', name_en:'Rendang Rice', price:30000, cat_id:'Menu Utama', cat_en:'Main Menu' },
        { id:'chn-2', name_id:'Nasi Ayam Pop', name_en:'Ayam Pop Rice', price:26000, cat_id:'Menu Utama', cat_en:'Main Menu' },
        { id:'chn-3', name_id:'Es Teh / Es Jeruk', name_en:'Iced Tea / Iced Orange', price:8000, cat_id:'Minuman', cat_en:'Drinks' },
      ] },
  ],

  /* ---------------- INSTAGRAM VIDEOS ----------------
     Situs ini HANYA menampilkan video dari Instagram (bukan file video lokal),
     supaya ukuran situs tetap kecil & cepat diakses. Video otomatis muncul di
     Beranda (bagian "Video Promosi") dan di halaman Ballroom.

     CARA MENAMBAH / MENGGANTI VIDEO (tidak perlu bantuan developer):
       1. Buka reel/postingan Instagram yang ingin ditampilkan.
       2. Salin link-nya (tombol "Copy Link" / bagikan), contoh:
          https://www.instagram.com/reel/DaShpdGxVVD/
       3. Tempel di bagian "url" di bawah ini. Boleh dengan parameter tambahan
          (?utm_source=...) atau tanpa — keduanya tetap berfungsi.
       4. Untuk menambah video baru, salin satu blok { ... } dan tempel lagi
          di dalam array (pisahkan dengan koma). Video pertama dalam daftar
          yang dipakai di halaman Ballroom.
       5. Untuk sementara tidak menampilkan video sama sekali, kosongkan
          array ini menjadi: instagramReels: [],                          */
  instagramReels: [
    { title_id:'Suasana & Profil Plaza BPJamsostek', title_en:'Plaza BPJamsostek Atmosphere & Profile',
      url:'https://www.instagram.com/reel/DaShpdGxVVD/' },
  ],

  /* ---------------- FOODCOURT REVIEWS (illustrative sample) ---------------- */
  foodcourtReviews: [
    { role_id:'Karyawan Tenant \u2014 Lantai Kantor', role_en:'Tenant Employee \u2014 Office Floor',
      quote_id:'Pemandangan kotanya bagus banget buat makan siang, jadi nggak bosen tiap hari.',
      quote_en:'The city view is great for lunch, so it never feels boring day to day.' },
    { role_id:'Pengunjung Rutin', role_en:'Regular Visitor',
      quote_id:'Pilihan tenant cukup beragam, dari makanan Nusantara sampai kopi kekinian.',
      quote_en:'The tenant selection is quite varied, from Indonesian classics to modern coffee.' },
    { role_id:'Karyawan Tenant \u2014 Divisi Operasional', role_en:'Tenant Employee \u2014 Operations',
      quote_id:'Pembayaran cashless dan QRIS memudahkan banget, nggak perlu bawa uang tunai.',
      quote_en:'Cashless and QRIS payment make things so much easier — no need to carry cash.' },
  ],

  /* ---------------- TESTIMONIALS (illustrative sample — replace with real tenant quotes) ---------------- */
  testimonials: [
    { role_id:'Perwakilan Tenant \u2014 Divisi Corporate Affairs', role_en:'Tenant Representative \u2014 Corporate Affairs',
      quote_id:'Lokasi yang sangat strategis di CBD Kuningan membuat mobilitas tim kami jauh lebih efisien setiap hari.',
      quote_en:'The strategic location in the Kuningan CBD makes our team\u2019s daily mobility far more efficient.' },
    { role_id:'Perwakilan Tenant \u2014 Lantai Kantor', role_en:'Tenant Representative \u2014 Office Floor',
      quote_id:'Tim pengelola gedung sangat responsif setiap kali ada kebutuhan teknis maupun kebersihan.',
      quote_en:'The building management team is very responsive whenever we need technical support or cleaning.' },
    { role_id:'Perwakilan Tenant \u2014 Divisi HR &amp; GA', role_en:'Tenant Representative \u2014 HR & GA',
      quote_id:'Foodcourt dengan pemandangan kota menjadi tempat favorit tim kami untuk makan siang sekaligus rehat sejenak.',
      quote_en:'The foodcourt with its city view has become our team\u2019s favourite spot for lunch and a short break.' },
    { role_id:'Perwakilan Tenant \u2014 Manajemen Kantor', role_en:'Tenant Representative \u2014 Office Management',
      quote_id:'Proses negosiasi sewa berjalan transparan dan tim Tenant Relation sangat membantu dari awal hingga akhir.',
      quote_en:'The leasing negotiation process was transparent, and the Tenant Relation team was very helpful from start to finish.' },
  ],

  /* ---------------- NEWS & ANNOUNCEMENTS (sample — replace with real updates) ---------------- */
  news: [
    { date_id:'Juli 2026', date_en:'July 2026', tag_id:'Promo', tag_en:'Promotion',
      title_id:'Penawaran Spesial untuk Penyewa Baru Semester Kedua', title_en:'Special Offer for New Tenants — Second Half of 2026',
      body_id:'Nikmati skema negosiasi service charge khusus bagi penyewa yang menandatangani kontrak baru pada periode ini. Hubungi tim marketing untuk detail lengkap.',
      body_en:'Enjoy a special service-charge negotiation scheme for tenants signing a new contract during this period. Contact our marketing team for full details.' },
    { date_id:'Juni 2026', date_en:'June 2026', tag_id:'Fasilitas', tag_en:'Facility Update',
      title_id:'Pembaruan Area Foodcourt & Penambahan Tenant F&B', title_en:'Foodcourt Refresh & New F&B Tenants',
      body_id:'Area foodcourt kini semakin nyaman dengan penataan ulang tempat duduk dan kehadiran tenant F&B baru untuk melengkapi pilihan kuliner harian Anda.',
      body_en:'The foodcourt area is now more comfortable with rearranged seating and new F&B tenants to complement your daily dining choices.' },
    { date_id:'Mei 2026', date_en:'May 2026', tag_id:'Pengumuman', tag_en:'Announcement',
      title_id:'Jadwal Perawatan Berkala Sistem Gedung', title_en:'Scheduled Building System Maintenance',
      body_id:'Tim engineering kami rutin melakukan perawatan lift, sistem kelistrikan, dan HVAC untuk memastikan kenyamanan operasional tenant sehari-hari.',
      body_en:'Our engineering team regularly maintains lifts, electrical systems, and HVAC to ensure comfortable day-to-day operations for every tenant.' },
  ],
};
