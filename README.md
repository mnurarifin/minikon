# MiniKon.id — Miniatur Cetak 3D Bongkar-Pasang Alat Peraga Teknik Sipil

[![POLBAN Collaboration](https://img.shields.io/badge/Kolaborasi-POLBAN-0ea5e9.svg)](https://polban.ac.id)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![Status: Production Ready](https://img.shields.io/badge/Status-Active-emerald.svg)](#)

Website resmi dan katalog interaktif untuk **MiniKon.id**, penyedia jasa 3D modeling dan cetak 3D miniatur struktur bangunan berskala (1:20 & 1:50) dengan sistem modul interaktif bongkar-pasang untuk media edukasi teknik sipil (mahasiswa perguruan tinggi dan siswa SMK).

---

## 🏗️ Latar Belakang & Fenomena

Konsep struktur bangunan seperti kolom, balok, pelat lantai, pondasi, dan profil baja sulit dibayangkan hanya dari gambar kerja dua dimensi (2D), terutama bagi mahasiswa teknik sipil dan siswa SMK. Sementara itu:

- **Alat peraga konvensional** di kampus/sekolah sangat terbatas, berat (benda uji beton asli puluhan kilogram), dan kaku (tidak bisa dibongkar-pasang).
- **Pembuatan maket manual** (kayu/gipsum) memakan waktu lama, berbiaya tinggi, kurang presisi, dan sulit direvisi saat ada perubahan desain.

**MiniKon hadir sebagai solusi** dengan menghadirkan miniatur modular presisi cetak 3D yang ringan, terjangkau, dan dapat dibongkar-pasang per komponen untuk mempelajari susunan tulangan dan mekanisme struktur secara langsung.

---

## ✨ 4 Fitur Utama Website

1. **Kontak Person Resmi**:
   - WhatsApp Fast-Response (+62 821-2345-6789) dengan form pre-order otomatis yang langsung mengonversi data pemesan ke chat WhatsApp.
   - Hotline Pengadaan Instansi / SMK (+62 812-9876-5432).
   - Info workshop & laboratorium di Jurusan Teknik Sipil Politeknik Negeri Bandung (POLBAN).
   - Floating WhatsApp Action Button.
2. **Foto & Galeri Produk**:
   - Sambungan Balok-Kolom (Beam-Column Joint) Skala 1:20.
   - Pondasi Pile Cap & Tiang Pancang Modular Skala 1:20.
   - Jembatan Rangka Baja Warren Truss Skala 1:50.
   - Sambungan Baut Profil Baja WF Skala 1:10.
   - Portal Gedung Bertingkat 3 Lantai Skala 1:50.
   - Paket Edukasi Lengkap Lab Sipil & Bengkel SMK (All-in-One Kit).
   - Modal detail foto beresolusi tinggi, spesifikasi bahan (PLA+, Tough Resin), dan daftar kelengkapan.
3. **Keunggulan MiniKon**:
   - Sistem modul bongkar-pasang (interlocking magnet & pin presisi).
   - Presisi tinggi cetak 3D dengan toleransi hingga 0.1 mm.
   - Revisi digital cepat tanpa harus membuang maket fisik.
   - Ringan, ringkas, dan portabel.
   - Sistem pre-order praktis tanpa klien harus memiliki printer 3D sendiri.
   - Selaras dengan standar SNI 2847 untuk beton bertulang.
4. **Review & Testimoni Produk**:
   - Skor rata-rata 4.9/5 dari 85+ ulasan instansi pendidikan.
   - Testimoni dari dosen struktur POLBAN, guru kejuruan SMK BKP, dan mahasiswa teknik sipil.
   - Fitur interaktif **"Tulis Ulasan Anda"** yang langsung tersimpan ke LocalStorage browser dan tampil di feed teratas.

---

## 🛠️ Fitur Interaktif Tambahan

- **Simulasi 4 Tahap Bongkar-Pasang**: Menampilkan proses bertahap dari pondasi, perakitan tulangan baja & sengkang geser, pemasangan bekisting tiruan, hingga selimut beton modular.
- **Kalkulator Estimasi Biaya Pre-Order**: Perhitungan otomatis biaya dan estimasi hari pengerjaan berdasarkan jenis struktur, skala, dan jumlah unit.
- **FAQ Accordion**: Pertanyaan seputar material cetak, format file CAD/BIM yang diterima, dan proteksi pengiriman luar kota.

---

## 🚀 Struktur Direktori

```text
minikon/
├── index.html                  # Halaman web utama
├── css/
│   └── style.css               # Design system & stylesheet responsif
├── js/
│   └── main.js                 # Logika interaktif, modal, kalkulator & review
├── assets/
│   └── images/                 # Foto produk dan logo vektor SVG
│       ├── minikon-logo.svg
│       ├── polban-badge.svg
│       ├── product-beam-column.jpg
│       ├── product-foundation-pilecap.jpg
│       ├── product-truss-bridge.jpg
│       ├── product-steel-joint.svg
│       ├── product-portal-frame.svg
│       └── product-edu-kit.svg
└── README.md                   # Dokumentasi proyek
```

---

## 💻 Cara Menjalankan Secara Lokal

Cukup buka file `index.html` langsung di browser, atau jalankan menggunakan server lokal:

```bash
# Menggunakan Python
python -m http.server 3000

# Atau menggunakan Laragon / XAMPP
# Tempatkan folder di d:/laragon/www/Learn/minikon lalu akses http://localhost/Learn/minikon/
```

---

## 👥 Tim & Kolaborasi

- **Pengembang**: MiniKon Team
- **Afiliasi & Riset**: Jurusan Teknik Sipil, Politeknik Negeri Bandung (POLBAN)
- **Repository**: [https://github.com/mnurarifin/minikon](https://github.com/mnurarifin/minikon)
