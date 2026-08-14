# 🏢 DESAVA - Smart Sustainable Village Ecosystem

[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.2.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Start-1.168-FF4154?style=flat-square&logo=react&logoColor=white)](https://tanstack.com/router)
[![PWA](https://img.shields.io/badge/PWA-Supported-0284C7?style=flat-square&logo=pwa&logoColor=white)](https://web.dev/explore/progressive-web-apps)

**DESAVA (Desa Digital)** adalah platform ekosistem desa berkelanjutan pintar (*Smart Sustainable Village*) berbasis kecerdasan buatan (AI). Platform ini dirancang untuk menghubungkan tiga pilar utama desa—**Warga**, **UMKM Lokal**, dan **Pemerintah Desa (Admin)**—guna menciptakan siklus ekonomi sirkular yang hijau, efisien, dan inklusif.

Platform ini diimplementasikan sebagai **Progressive Web App (PWA)** dengan UI/UX premium yang responsif (desain khusus mobile-first shell) dan dilengkapi dengan fitur pemindaian sampah AI, asisten AI desa, visualisasi data pemerintah desa, serta dasbor bisnis sirkular bagi pelaku UMKM.

---

## 🔄 Siklus Ekonomi Sirkular DESAVA

DESAVA bekerja dengan memanfaatkan flywheel ekonomi sirkular digital:
1. **Warga Memilah:** Warga melakukan pemilahan sampah organik & anorganik dari rumah.
2. **AI Eco-Scanner:** Warga memindai sampah menggunakan modul kamera/galeri pintar berbasis AI untuk mengenali jenis sampah, akurasi, dan estimasi nilai jual secara instan.
3. **Drop Box / Bank Sampah:** Sampah disetorkan ke titik drop-box terdekat untuk diverifikasi.
4. **Distribusi Bahan Baku:** Sampah yang terkumpul diproses di TPS3R / Bank Sampah dan didistribusikan ke pelaku UMKM desa.
5. **Produksi Circular:** UMKM memproses sampah/bahan daur ulang menjadi produk bernilai ekonomi tinggi (contoh: pupuk kompos premium, pot sabut kelapa, kerajinan plastik).
6. **Pasar Desa (Marketplace):** Produk sirkular tersebut dijual kembali ke warga melalui marketplace desa terintegrasi.
7. **Green Wallet:** Transaksi menggunakan saldo rupiah atau *Green Points* yang didapatkan warga dari hasil setor sampah.
8. **Dashboard Govt:** Pemerintah desa memantau data volume sampah, perputaran ekonomi, dan kepuasan warga untuk mengambil kebijakan berbasis data.

---

## 🌟 Fitur Utama Berdasarkan Peran

### 1. 🟢 Portal Warga (Resident Portal)
* **AI Eco-Scanner:** Pemindai sampah berbasis kamera dan unggah galeri yang dapat mendeteksi jenis sampah secara otomatis (contoh: Plastik PET, Kardus Bekas, Kaleng Aluminium), menghitung akurasi kecocokan, dan memprediksi nilai tukar per unit.
* **Green Wallet:** Dompet digital yang melacak saldo rupiah dan *Poin Hijau* warga. Warga dapat melakukan penarikan dana atau menukar poin dengan voucher sembako/layanan desa.
* **Dampak Lingkungan (Green Impact Tracker):** Visualisasi kontribusi warga terhadap kelestarian lingkungan dalam metrik riil:
  * Jumlah emisi CO₂ yang dikurangi (kg)
  * Pohon yang diselamatkan (pohon)
  * Air yang dihemat (liter)
  * Energi yang dikonservasi (kWh)
* **Gamifikasi & Lencana:** Leaderboard warga bulanan berdasarkan kontribusi sampah, serta sistem lencana penghargaan (*Eco Hero*, *Top Recycler*, *Zero Waste*, dll.) untuk memotivasi partisipasi warga.
* **Asisten Desa AI (Chatbot):** Modul asisten AI interaktif untuk menjawab pertanyaan seputar jadwal pelayanan desa, lokasi drop-box, penukaran poin, dan informasi umum.
* **Layanan Cepat:** Akses cepat ke Bank Sampah, Dompet, Pasar Desa, Tagihan, Leaderboard, dan Pengumuman.

### 2. 🟠 Portal UMKM (Local Business Portal)
* **Dasbor Bisnis:** Metrik penjualan lengkap (Omset bulanan, tren transaksi mingguan, jumlah pengunjung toko, jumlah produk terjual, dan tingkat konversi).
* **AI Business Suggestion:** Rekomendasi bisnis bertenaga AI berdasarkan ketersediaan bahan baku di Bank Sampah/TPS3R dan permintaan pasar saat ini (misalnya: merekomendasikan peningkatan produksi pot jika stok sabut kelapa melimpah).
* **Circular Score & Sertifikasi:** Skor tingkat keberlanjutan produk (Circular Score) serta lencana sertifikasi resmi dari pemerintah desa (*Verified Business*, *Circular Champion*).
* **Manajemen Bahan Baku Sirkular:** Memantau kuantitas bahan daur ulang yang tersedia di Bank Sampah terdekat untuk dipasok ke proses produksi.
* **Katalog & Manajemen Pesanan:** Sistem pelacakan status pesanan terintegrasi (Baru, Proses, Selesai).

### 3. 🔵 Portal Pemerintah Desa (Admin Portal)
* **Executive Dashboard:** Memantau metrik agregat desa (Volume sampah terkumpul, total perputaran ekonomi sirkular, jumlah warga aktif, dan indeks kepuasan warga).
* **AI Feedback Summarizer:** Analisis sentimen otomatis berbasis AI untuk mengelompokkan dan merangkum keluhan/masukan warga (misalnya mengelompokkan keluhan air bersih di RW tertentu sebagai prioritas kritikal).
* **Heatmap Aktivitas Setoran:** Visualisasi kepadatan transaksi setoran sampah di berbagai dusun (Dusun Mawar, Melati, Dahlia, Kenanga) per hari dalam seminggu untuk optimalisasi operasional.
* **Peringkat Dusun:** Memantau dan mengomparasi performa pengumpulan sampah antar dusun demi kompetisi hijau yang sehat.
* **Ekspor Laporan:** Mengunduh data operasional desa dalam format PDF dan Excel untuk keperluan rapat desa.

---

## 🛠️ Teknologi yang Digunakan

* **Runtime & Framework:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
* **Routing & Meta-framework:** [TanStack Start](https://tanstack.com/router) & [TanStack React Router](https://tanstack.com/router) (File-based routing & SSR ready)
* **Bundler & Build Tool:** [Vite 7](https://vite.dev/)
* **Styling (CSS):** [Tailwind CSS v4](https://tailwindcss.com/) dengan visual premium (gradients, glassmorphism, dan custom shadow tokens)
* **PWA Engine:** [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
* **UI Components:** Radix UI Primitives, Lucide Icons, Recharts (untuk visualisasi grafik dasbor), Sonner (Toast notifications)
* **Sistem Pemetaan:** Leaflet & React Leaflet

---

## 📂 Struktur Folder Proyek

```
smart-village/
├── .tanstack/            # Konfigurasi router TanStack
├── public/               # Aset statis (logo, gambar, manifest PWA)
├── src/
│   ├── components/       # Komponen UI global (BottomNav, Header, AssistantModal, dll.)
│   │   └── ui/           # Komponen Shadcn UI yang disesuaikan
│   ├── hooks/            # Custom React hooks (usePwaInstall, use-mobile)
│   ├── lib/              # Utility functions & API client setup
│   ├── routes/           # Berkas routing file-based TanStack (Portal Warga, UMKM, Admin)
│   ├── styles.css        # Konfigurasi styling & token variabel global (CSS Variables)
│   ├── main.tsx          # Titik masuk aplikasi
│   ├── router.tsx        # Inisialisasi router Tanstack
│   └── routeTree.gen.ts  # Berkas routing yang dihasilkan otomatis oleh TanStack Router
├── vite.config.ts        # Konfigurasi Vite, plugin PWA, HTTPS lokal, dan Vercel Output
├── package.json          # Manajemen dependensi dan skrip proyek
└── tsconfig.json         # Konfigurasi TypeScript
```

---

## 🚀 Panduan Memulai

### 1. Prasyarat
Pastikan Anda memiliki node.js terinstal (versi LTS direkomendasikan):
* [Node.js](https://nodejs.org/) (versi 18+)
* npm (bawaan dari Node.js)

### 2. Instalasi Dependensi
Jalankan perintah berikut di folder proyek `smart-village`:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Mode)
Untuk menjalankan aplikasi secara lokal dengan hot reloading:
```bash
npm run dev
```
Aplikasi akan berjalan di: **`https://localhost:8080`**

### ⚠️ Informasi Penting Mengenai SSL (HTTPS Lokal)
Aplikasi ini dikonfigurasi untuk menggunakan **HTTPS** di server pengembangan lokal (`@vitejs/plugin-basic-ssl`). 
* **Mengapa HTTPS?** Fitur **AI Eco-Scanner** membutuhkan akses kamera via API browser (`navigator.mediaDevices.getUserMedia`). Browser modern membatasi fitur kamera ini hanya pada *Secure Contexts* (HTTPS atau localhost).
* **Mengatasi Peringatan SSL:** Saat pertama kali membuka `https://localhost:8080`, browser Anda mungkin menampilkan peringatan *"Your connection is not private"* karena menggunakan sertifikat SSL mandiri (self-signed).
  * Pada **Chrome/Edge**: Klik *"Advanced"* / *"Lanjutan"* lalu klik *"Proceed to localhost (unsafe)"* atau ketik `thisisunsafe` secara langsung di jendela browser.
  * Pada **Firefox**: Klik *"Advanced"* -> *"Accept the Risk and Continue"*.

### 4. Build untuk Produksi
Untuk membuild proyek untuk siap dideploy ke server produksi (misalnya Vercel):
```bash
npm run build
```
Hasil build akan diekspor ke `.vercel/output/static` beserta konfigurasi routing Vercel SPA di `.vercel/output/config.json`.

---

## 📝 Catatan Tambahan
* Berkas `routeTree.gen.ts` dibuat secara otomatis oleh TanStack Router saat server pengembangan berjalan atau saat build. **Jangan edit berkas ini secara manual**.
* Aplikasi ini didesain agar ramah perangkat mobile, pasang aplikasi sebagai aplikasi mandiri di perangkat seluler Anda melalui fitur PWA (klik "Install" di browser Anda).
