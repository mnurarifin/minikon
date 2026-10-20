/**
 * MiniKon.id - Miniatur Cetak 3D Bongkar Pasang Alat Peraga Teknik Sipil
 * Interactive JavaScript Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initProductFilter();
  initSimulator();
  initCostCalculator();
  initReviewsFromStorage();
  initContactForm();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");

  // Sticky navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
      const icon = mobileMenuBtn.querySelector("i");
      if (navLinks.classList.contains("mobile-open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });

    // Close on link click
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // Active link scroll spy
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   2. FOTO PRODUK: FILTER & MODAL DATA
   ========================================================================== */
const PRODUCTS_DATA = {
  p1: {
    id: "p1",
    category: "Struktur Beton Bertulang",
    title: "Sambungan Balok-Kolom (Beam-Column Joint)",
    scale: "Skala 1:20",
    badge: "Bongkar-Pasang Interlock",
    price: "Rp 480.000",
    img: "assets/images/product-beam-column.jpg",
    desc: "Model fisik edukatif yang memperlihatkan secara jelas pertemuan tulangan longitudinal balok dan kolom, daerah sendi plastis (plastic hinge), sengkang pengekang (confinement ties), dan selimut beton luar yang bisa dilepas untuk inspeksi detail.",
    features: [
      "1x Modul Inti Sambungan Balok-Kolom Skala 1:20",
      "4x Batang Tulangan Utama Berskala High Tensile PLA",
      "8x Sengkang Begel Geser Presisi Standar SNI 2847",
      "2x Selimut Beton Belah Transparan Lepas-Pasang (Magnetik)",
      "1x Lembar Gambar Kerja Blueprint Skematik A4",
    ],
  },
  p2: {
    id: "p2",
    category: "Pondasi & Sub-Struktur",
    title: "Pondasi Pile Cap & Tiang Pancang Modular",
    scale: "Skala 1:20",
    badge: "Include Bekisting Kayu",
    price: "Rp 550.000",
    img: "assets/images/product-foundation-pilecap.jpg",
    desc: "Miniatur sub-struktur pondasi dalam yang dilengkapi dengan replika tiang pancang (pile), pile cap (poer beton), tulangan anyaman bawah & atas, dowel stek kolom, serta bekisting kayu tiruan yang bisa dibuka untuk simulasi tahapan pengecoran.",
    features: [
      "4x Tiang Pancang Miniatur Modular",
      "1x Blok Pile Cap dengan Kerangka Tulangan Anyaman Bawah & Atas",
      "8x Dowel Penyaluran Kolom ke Pondasi",
      "4x Panel Bekisting Kayu Tiruan dengan Pengunci Baut Mini",
      "1x Stand Dudukan Akrilik Laboratorium",
    ],
  },
  p3: {
    id: "p3",
    category: "Rangka Baja & Jembatan",
    title: "Jembatan Rangka Baja Warren Truss",
    scale: "Skala 1:50",
    badge: "Interlocking Gusset Plate",
    price: "Rp 650.000",
    img: "assets/images/product-truss-bridge.jpg",
    desc: "Model jembatan rangka baja tipe Warren bentang 60 cm. Didesain dengan sistem pin klik presisi pada pelat buhul (gusset plate) sehingga mahasiswa dapat menguji gaya batang tarik dan tekan secara kualitatif maupun uji beban statis ringan.",
    features: [
      "1x Rangka Batang Atas (Top Chord) & Bawah (Bottom Chord)",
      "14x Batang Diagonal & Vertikal Modular",
      "12x Pelat Buhul (Gusset Plate) Berlubang Baut Pin",
      "2x Abutment Tumpuan Sendi dan Rol Miniatur",
      "Mampu menahan beban uji vertikal hingga 5 kg",
    ],
  },
  p4: {
    id: "p4",
    category: "Sambungan Baja Struktural",
    title: "Sambungan Baut Profil Baja WF & Gusset Plate",
    scale: "Skala 1:10",
    badge: "Baut Hex Mini Aktif",
    price: "Rp 390.000",
    img: "assets/images/product-steel-joint.svg",
    desc: "Dirancang khusus untuk mendukung mata kuliah Struktur Baja. Profil balok WF dan kolom WF dilengkapi lubang baut presisi, pelat penyambung (splice plate), dan baut miniatur fungsional yang dapat diputar menggunakan kunci mikro bawaan.",
    features: [
      "1x Profil Kolom WF Skala 1:10 Tough Resin",
      "2x Profil Balok Anak WF",
      "4x Pelat Penyambung Sayap (Flange) & Badan (Web)",
      "16x Baut Hexagonal Miniatur Aktif + Mur & Ring",
      "1x Mini Wrench Kunci Pas Eksklusif MiniKon",
    ],
  },
  p5: {
    id: "p5",
    category: "Struktur Gedung Bertingkat",
    title: "Portal Gedung Bertingkat 3 Lantai + Tangga",
    scale: "Skala 1:50",
    badge: "28 Komponen Modular",
    price: "Rp 890.000",
    img: "assets/images/product-portal-frame.svg",
    desc: "Model 3 dimensi portal struktur gedung 3 dimensi 3 lantai. Mencakup pondasi telapak, balok sloof, kolom lantai 1-3, balok lantai, pelat lantai, dan modul tangga yang dapat dirakit lantai demi lantai untuk visualisasi denah struktur.",
    features: [
      "6x Modul Kolom Lantai 1-3 dengan Pengunci Magnet Neodymium",
      "9x Modul Balok Induk & Balok Anak",
      "3x Pelat Lantai Akrilik Presisi Transparan",
      "2x Modul Tangga Beton Bertulang Modular",
      "Buku panduan perakitan denah struktur gedung",
    ],
  },
  p6: {
    id: "p6",
    category: "Paket Edukasi SMK & Lab",
    title: "Paket Lengkap Kit Praktikum Struktur Sipil",
    scale: "Paket Bundling",
    badge: "Best Value SMK/Kampus",
    price: "Rp 2.450.000",
    img: "assets/images/product-edu-kit.svg",
    desc: "Paket all-in-one paling lengkap yang didedikasikan untuk laboratorium kampus dan bengkel kejuruan SMK BKP (Desain Pemodelan dan Informasi Bangunan / Konstruksi Gedung). Berisi 5 modul struktur utama dalam hardcase kokoh.",
    features: [
      "1x Modul Sambungan Balok-Kolom (Skala 1:20)",
      "1x Modul Pondasi Pile Cap & Bekisting (Skala 1:20)",
      "1x Modul Jembatan Truss Rangka Baja (Skala 1:50)",
      "1x Modul Sambungan Baut Profil Baja WF (Skala 1:10)",
      "150+ Pcs Miniatur Tulangan Besi & Begel Geser Lepas-Pasang",
      "1x Hardcase Koper Eksklusif Tahan Banting",
      "1x Jangka Sorong Digital + Buku Modul Praktikum SNI",
    ],
  },
};

function initProductFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      productCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterVal === "all" || category === filterVal) {
          card.style.display = "flex";
          card.style.animation = "fadeInCard 0.4s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function openProductModal(productId) {
  const item = PRODUCTS_DATA[productId];
  if (!item) return;

  document.getElementById("modalProductImg").src = item.img;
  document.getElementById("modalProductImg").alt = item.title;
  document.getElementById("modalProductCategory").textContent = item.category;
  document.getElementById("modalProductTitle").textContent = item.title;
  document.getElementById("modalScaleBadge").textContent = item.scale;
  document.getElementById("modalModularBadge").textContent = item.badge;
  document.getElementById("modalProductDesc").textContent = item.desc;
  document.getElementById("modalProductPrice").textContent = item.price;

  // Features list
  const featuresList = document.getElementById("modalProductFeatures");
  featuresList.innerHTML = "";
  item.features.forEach((feat) => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fa-solid fa-check" style="color: var(--primary-light); margin-right: 6px;"></i> ${feat}`;
    featuresList.appendChild(li);
  });

  // WhatsApp link generator with pre-filled message
  const waUrl = `https://wa.me/6282123456789?text=${encodeURIComponent(
    `Halo MiniKon.id, saya tertarik untuk memesan atau berkonsultasi mengenai:\n\n*Produk:* ${item.title}\n*Skala:* ${item.scale}\n*Harga Acuan:* ${item.price}\n\nMohon info ketersediaan stok atau jadwal pengerjaan pre-order. Terima kasih!`,
  )}`;
  document.getElementById("modalOrderWaBtn").href = waUrl;

  const modal = document.getElementById("productModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close modal on backdrop click
document.addEventListener("click", (e) => {
  const pModal = document.getElementById("productModal");
  const rModal = document.getElementById("reviewModal");
  if (e.target === pModal) closeProductModal();
  if (e.target === rModal) closeWriteReviewModal();
});

/* ==========================================================================
   3. SIMULATOR INTERAKTIF: SISTEM BONGKAR-PASANG
   ========================================================================== */
function initSimulator() {
  // Simulator initialized with step 1
  switchSimStep(1);
}

function switchSimStep(stepNumber) {
  const allLayers = document.querySelectorAll(".sim-layer");
  const allBtns = document.querySelectorAll(".step-btn");

  allLayers.forEach((l) => {
    l.classList.remove("active");
    l.classList.add("hidden");
  });

  allBtns.forEach((b) => b.classList.remove("active"));

  const targetLayer = document.getElementById(`simLayer${stepNumber}`);
  if (targetLayer) {
    targetLayer.classList.remove("hidden");
    targetLayer.classList.add("active");
  }

  if (allBtns[stepNumber - 1]) {
    allBtns[stepNumber - 1].classList.add("active");
  }
}

/* ==========================================================================
   4. KALKULATOR ESTIMASI PRE-ORDER
   ========================================================================== */
let currentScaleMultiplier = 1;

function updateScaleRadio(radio) {
  document
    .querySelectorAll(".calc-radio-label")
    .forEach((label) => label.classList.remove("selected"));
  radio.closest(".calc-radio-label").classList.add("selected");
  currentScaleMultiplier = parseFloat(radio.value);
  calculateEstimate();
}

function calculateEstimate() {
  const basePrice = parseInt(document.getElementById("calcType").value, 10);
  const qtyInput = document.getElementById("calcQty");
  let qty = parseInt(qtyInput.value, 10);
  if (isNaN(qty) || qty < 1) qty = 1;

  const totalPrice = Math.round(basePrice * currentScaleMultiplier * qty);

  // Format to IDR
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  document.getElementById("calcResultPrice").textContent = formattedPrice;

  // Duration estimation
  const durationBadge = document.getElementById("calcDuration");
  if (qty === 1) {
    durationBadge.innerHTML = `<i class="fa-solid fa-clock"></i> Estimasi Pengerjaan: 3 - 5 Hari Kerja`;
  } else if (qty <= 5) {
    durationBadge.innerHTML = `<i class="fa-solid fa-clock"></i> Estimasi Pengerjaan: 5 - 8 Hari Kerja`;
  } else {
    durationBadge.innerHTML = `<i class="fa-solid fa-clock"></i> Estimasi Pengerjaan: 10 - 14 Hari Kerja (Batch Produksi)`;
  }
}

function initCostCalculator() {
  calculateEstimate();
}

function sendCalculatedOrderToWA() {
  const typeSelect = document.getElementById("calcType");
  const typeText = typeSelect.options[typeSelect.selectedIndex].text;
  const qty = document.getElementById("calcQty").value || 1;
  const total = document.getElementById("calcResultPrice").textContent;

  let scaleText = "1:20 (Standar)";
  if (currentScaleMultiplier === 1.15) scaleText = "1:50";
  if (currentScaleMultiplier === 1.3) scaleText = "Custom Spesifikasi";

  const message =
    `Halo Tim MiniKon.id! Saya telah menghitung estimasi pre-order melalui website:\n\n` +
    `• *Jenis Struktur:* ${typeText}\n` +
    `• *Pilihan Skala:* ${scaleText}\n` +
    `• *Jumlah:* ${qty} unit\n` +
    `• *Estimasi Total:* ${total}\n\n` +
    `Mohon informasi lebih lanjut perihal pemesanan dan mekanisme pengiriman. Terima kasih!`;

  const waUrl = `https://wa.me/6282123456789?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
}

/* ==========================================================================
   5. REVIEW PRODUK (PERSIST KE LOCALSTORAGE)
   ========================================================================== */
const STORAGE_KEY_REVIEWS = "minikon_user_reviews";

function initReviewsFromStorage() {
  const savedReviews = localStorage.getItem(STORAGE_KEY_REVIEWS);
  if (!savedReviews) return;

  try {
    const list = JSON.parse(savedReviews);
    const grid = document.getElementById("reviewsGrid");

    // Prepend user reviews so they appear at top
    list.reverse().forEach((rev) => {
      const card = createReviewCardElement(rev, true);
      grid.insertBefore(card, grid.firstChild);
    });
  } catch (e) {
    console.error("Error loading saved reviews:", e);
  }
}

function createReviewCardElement(data, isNew = false) {
  const article = document.createElement("article");
  article.className = `review-card ${isNew ? "newly-added" : ""}`;

  let starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= data.rating) {
      starsHtml += '<i class="fa-solid fa-star"></i> ';
    } else {
      starsHtml += '<i class="fa-regular fa-star"></i> ';
    }
  }

  // Generate initials
  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  article.innerHTML = `
    <div>
      <div class="review-header">
        <div class="reviewer-meta">
          <div class="reviewer-avatar" style="background: linear-gradient(135deg, var(--primary), var(--accent-cyan));">${initials}</div>
          <div>
            <h4 class="reviewer-name">${escapeHtml(data.name)}</h4>
            <div class="reviewer-role">${escapeHtml(data.role)}</div>
          </div>
        </div>
        <div class="review-stars">
          ${starsHtml}
        </div>
      </div>
      <p class="review-text">
        "${escapeHtml(data.comment)}"
      </p>
    </div>
    <div class="review-footer">
      <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Ulasan Pengunjung Web</span>
      <span>${data.date || "Hari ini"}</span>
    </div>
  `;
  return article;
}

function openWriteReviewModal() {
  document.getElementById("reviewModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeWriteReviewModal() {
  document.getElementById("reviewModal").classList.remove("active");
  document.body.style.overflow = "";
}

function setFormRating(rating) {
  document.getElementById("reviewRatingInput").value = rating;
  const stars = document.querySelectorAll("#starRatingSelect .star-item");
  stars.forEach((star) => {
    const starVal = parseInt(star.getAttribute("data-rating"), 10);
    if (starVal <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function handleReviewSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("reviewName").value.trim();
  const role = document.getElementById("reviewRole").value.trim();
  const comment = document.getElementById("reviewComment").value.trim();
  const rating = parseInt(
    document.getElementById("reviewRatingInput").value,
    10,
  );

  if (!name || !role || !comment) {
    showToast("Harap lengkapi semua field review!");
    return;
  }

  const newReview = {
    name,
    role,
    comment,
    rating,
    date: "Baru saja",
  };

  // Save to LocalStorage
  let stored = [];
  try {
    const existing = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (existing) stored = JSON.parse(existing);
  } catch (err) {
    stored = [];
  }
  stored.push(newReview);
  localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(stored));

  // Prepend to UI
  const grid = document.getElementById("reviewsGrid");
  const cardElement = createReviewCardElement(newReview, true);
  grid.insertBefore(cardElement, grid.firstChild);

  // Reset form & close
  document.getElementById("submitReviewForm").reset();
  setFormRating(5);
  closeWriteReviewModal();
  showToast("Terima kasih! Ulasan Anda berhasil ditambahkan.");
}

/* ==========================================================================
   6. KONTAK PERSON: FORM HANDLING & WHATSAPP GENERATION
   ========================================================================== */
function initContactForm() {
  // Set up contact form
}

function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const institution = document
    .getElementById("contactInstitution")
    .value.trim();
  const whatsapp = document.getElementById("contactWhatsapp").value.trim();
  const productChoice = document.getElementById("contactProductChoice").value;
  const notes =
    document.getElementById("contactNotes").value.trim() ||
    "Tidak ada catatan tambahan.";

  const message =
    `Halo Tim MiniKon.id, saya ingin konsultasi / pre-order:\n\n` +
    `• *Nama Lengkap:* ${name}\n` +
    `• *Instansi/Sekolah:* ${institution}\n` +
    `• *No. WhatsApp:* ${whatsapp}\n` +
    `• *Pilihan Produk:* ${productChoice}\n` +
    `• *Catatan/Kebutuhan Khusus:* ${notes}\n\n` +
    `Mohon informasi ketersediaan, penawaran harga resmi, atau diskusi teknis lebih lanjut. Terima kasih!`;

  const waUrl = `https://wa.me/6282123456789?text=${encodeURIComponent(message)}`;

  // Show toast feedback and open WhatsApp in new tab
  showToast("Membuka WhatsApp untuk mengirim pesan...");
  setTimeout(() => {
    window.open(waUrl, "_blank");
  }, 400);
}

function saveDirectInquiry() {
  const name = document.getElementById("contactName").value.trim();
  const whatsapp = document.getElementById("contactWhatsapp").value.trim();

  if (!name || !whatsapp) {
    showToast("Harap isi Nama dan Nomor WhatsApp terlebih dahulu!");
    return;
  }

  showToast(
    `Pesan atas nama ${name} berhasil dikirim ke server MiniKon! Tim kami akan menghubungi no. ${whatsapp}.`,
  );
}

/* ==========================================================================
   7. FAQ TOGGLE
   ========================================================================== */
function toggleFaq(button) {
  const item = button.closest(".faq-item");
  const answer = item.querySelector(".faq-answer");
  const isActive = item.classList.contains("active");

  // Close all other FAQs
  document.querySelectorAll(".faq-item").forEach((other) => {
    other.classList.remove("active");
    other.querySelector(".faq-answer").style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add("active");
    answer.style.maxHeight = answer.scrollHeight + 30 + "px";
  }
}

/* ==========================================================================
   8. UTILITIES (TOAST & ESCAPE HTML)
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById("toastNotice");
  const toastMsg = document.getElementById("toastMsg");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m];
  });
}
