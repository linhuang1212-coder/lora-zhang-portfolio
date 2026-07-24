// ===== LORA ZHANG — Portfolio Site =====
// Architecture mirrors depasqualemaffini.com: three-panel home → list view → project page

// ===== DATA =====
// Local image paths
const IMG = {
  ring:     "./assets/sapphire-ring.jpg",
  earrings: "./assets/silver-earrings.jpg",
  pendant:  "./assets/sapphire-pendant.jpg",
  pearls:   "./assets/pearl-necklace.jpg"
};

const PROJECTS = {
  collections: [
    { name: "Éclat", detail: "Spring/Summer 2026", images: [
      IMG.ring, IMG.pearls, IMG.earrings, IMG.pendant
    ]},
    { name: "Lumière", detail: "Autumn/Winter 2025", images: [
      IMG.earrings, IMG.ring, IMG.pendant, IMG.pearls
    ]},
    { name: "Serpentine", detail: "Spring/Summer 2025", images: [
      IMG.pendant, IMG.earrings, IMG.ring, IMG.pearls
    ]},
    { name: "Constellation", detail: "Haute Joaillerie 2024", images: [
      IMG.ring, IMG.pendant, IMG.pearls, IMG.earrings
    ]},
    { name: "Jardin Secret", detail: "Autumn/Winter 2024", images: [
      IMG.pearls, IMG.ring, IMG.earrings, IMG.pendant
    ]},
    { name: "Petite Fleur", detail: "Spring/Summer 2024", images: [
      IMG.earrings, IMG.pendant, IMG.ring, IMG.pearls
    ]},
    { name: "Odyssey", detail: "Haute Joaillerie 2023", images: [
      IMG.pendant, IMG.pearls, IMG.earrings, IMG.ring
    ]},
    { name: "Aurore", detail: "Autumn/Winter 2023", images: [
      IMG.ring, IMG.earrings, IMG.pearls, IMG.pendant
    ]}
  ],
  editorial: [
    { name: "Vogue China", detail: "December 2025", images: [
      IMG.ring, IMG.pearls, IMG.pendant
    ]},
    { name: "Harper's Bazaar", detail: "October 2025", images: [
      IMG.pearls, IMG.ring, IMG.earrings
    ]},
    { name: "Elle Décor", detail: "September 2025", images: [
      IMG.earrings, IMG.pendant, IMG.pearls
    ]},
    { name: "Wallpaper*", detail: "July 2025", images: [
      IMG.pendant, IMG.ring, IMG.earrings
    ]},
    { name: "T Magazine", detail: "May 2025", images: [
      IMG.ring, IMG.earrings, IMG.pearls
    ]},
    { name: "AD China", detail: "March 2025", images: [
      IMG.pearls, IMG.pendant, IMG.ring
    ]},
    { name: "Monocle", detail: "January 2025", images: [
      IMG.earrings, IMG.ring, IMG.pendant
    ]},
    { name: "WWD", detail: "November 2024", images: [
      IMG.pendant, IMG.pearls, IMG.earrings
    ]},
    { name: "HTSI", detail: "September 2024", images: [
      IMG.ring, IMG.earrings, IMG.pendant
    ]},
    { name: "Departures", detail: "June 2024", images: [
      IMG.pearls, IMG.ring, IMG.earrings
    ]}
  ],
  bespoke: [
    { name: "Cartier Heritage", detail: "Paris, 2025", images: [
      IMG.pendant, IMG.ring, IMG.earrings
    ]},
    { name: "Van Cleef & Arpels", detail: "Shanghai, 2025", images: [
      IMG.ring, IMG.pendant, IMG.pearls
    ]},
    { name: "Piaget Rose", detail: "Geneva, 2024", images: [
      IMG.earrings, IMG.ring, IMG.pendant
    ]},
    { name: "Boucheron Atelier", detail: "Place Vendôme, 2024", images: [
      IMG.pendant, IMG.earrings, IMG.ring
    ]},
    { name: "Hermès Bijoux", detail: "Tokyo, 2024", images: [
      IMG.pearls, IMG.pendant, IMG.ring
    ]},
    { name: "Chaumet Tiara", detail: "London, 2023", images: [
      IMG.ring, IMG.pearls, IMG.pendant
    ]}
  ]
};

const CATEGORY_CONFIG = {
  collections: {
    label: "Collections",
    bgColor: "var(--color-collections)",
    textColor: "var(--color-collections-text)"
  },
  editorial: {
    label: "Editorial",
    bgColor: "var(--color-editorial)",
    textColor: "var(--color-editorial-text)"
  },
  bespoke: {
    label: "Bespoke",
    bgColor: "var(--color-bespoke)",
    textColor: "var(--color-bespoke-text)"
  }
};

// ===== STATE =====
let currentCategory = null;
let currentProject = null;
let slideIntervals = {};

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initPanelSlides();
  bindPanelClicks();
  bindAboutLink();
});

// ===== PANEL SLIDES =====
function initPanelSlides() {
  document.querySelectorAll(".panel").forEach(panel => {
    const slides = panel.querySelectorAll(".panel__slide");
    if (slides.length === 0) return;

    let current = 0;
    slides[0].classList.add("active");

    const cat = panel.dataset.category;

    panel.addEventListener("mouseenter", () => {
      slideIntervals[cat] = setInterval(() => {
        slides[current].classList.remove("active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("active");
      }, 3000);
    });

    panel.addEventListener("mouseleave", () => {
      clearInterval(slideIntervals[cat]);
    });
  });
}

// ===== PANEL CLICKS =====
function bindPanelClicks() {
  document.querySelectorAll(".panel").forEach(panel => {
    panel.addEventListener("click", () => {
      const cat = panel.dataset.category;
      openCategoryView(cat);
    });
  });
}

// ===== CATEGORY VIEW =====
function openCategoryView(category) {
  currentCategory = category;
  const config = CATEGORY_CONFIG[category];
  const projects = PROJECTS[category];

  // Hide brand overlay
  document.getElementById("brand-overlay").style.opacity = "0";
  document.getElementById("brand-overlay").style.pointerEvents = "none";

  const view = document.getElementById("category-view");
  view.style.backgroundColor = config.bgColor;
  view.style.color = config.textColor;

  // Header
  document.getElementById("cat-title").textContent = config.label;
  document.getElementById("cat-close").style.color = config.textColor;

  // Build project list
  const list = document.getElementById("project-list");
  list.innerHTML = "";

  projects.forEach((project, index) => {
    const item = document.createElement("div");
    item.className = "project-item";
    item.innerHTML = `
      <span class="project-item__name">${project.name}</span>
      <span class="project-item__detail">${project.detail}</span>
    `;
    item.style.borderBottomColor = `${config.textColor}20`;
    item.addEventListener("click", () => openProjectPage(category, index));
    item.addEventListener("mouseenter", () => showPreview(project.images[0]));
    item.addEventListener("mouseleave", () => hidePreview());
    list.appendChild(item);
  });

  // Build collapsed panels
  buildCollapsedPanels(category);

  // Scroll arrow
  document.getElementById("scroll-arrow").style.color = config.textColor;

  // Open
  view.classList.add("open");
  document.querySelector(".home").style.pointerEvents = "none";
}

function closeCategoryView() {
  const view = document.getElementById("category-view");
  view.classList.remove("open");
  document.querySelector(".home").style.pointerEvents = "";
  currentCategory = null;
  hidePreview();

  // Show brand overlay again
  document.getElementById("brand-overlay").style.opacity = "1";
  document.getElementById("brand-overlay").style.pointerEvents = "";
}

// ===== PREVIEW IMAGE =====
function showPreview(imageSrc) {
  const img = document.getElementById("preview-img");
  // Create new image to preload
  const newImg = new Image();
  newImg.onload = () => {
    img.src = imageSrc;
    img.classList.add("visible");
  };
  newImg.src = imageSrc;
}

function hidePreview() {
  const img = document.getElementById("preview-img");
  img.classList.remove("visible");
}

// ===== COLLAPSED PANELS =====
function buildCollapsedPanels(activeCategory) {
  const container = document.getElementById("collapsed-panels");
  container.innerHTML = "";

  Object.keys(CATEGORY_CONFIG).forEach(cat => {
    if (cat === activeCategory) return;
    const config = CATEGORY_CONFIG[cat];

    const strip = document.createElement("div");
    strip.className = "collapsed-strip";
    strip.style.backgroundColor = config.bgColor;

    const label = document.createElement("span");
    label.className = "collapsed-strip__label";
    label.textContent = config.label;
    label.style.color = config.textColor;

    strip.appendChild(label);
    strip.addEventListener("click", () => {
      closeCategoryView();
      setTimeout(() => openCategoryView(cat), 300);
    });
    container.appendChild(strip);
  });
}

// ===== PROJECT PAGE =====
function openProjectPage(category, index) {
  const config = CATEGORY_CONFIG[category];
  const project = PROJECTS[category][index];
  currentProject = { category, index };

  const page = document.getElementById("project-page");
  page.style.backgroundColor = config.bgColor;
  page.style.color = config.textColor;

  // Header
  document.getElementById("proj-category").textContent = config.label;
  document.getElementById("proj-category").style.color = config.textColor;
  document.getElementById("proj-title").textContent = project.name;
  document.getElementById("proj-title").style.color = config.textColor;
  document.getElementById("proj-subtitle").textContent = project.detail;
  document.getElementById("proj-subtitle").style.color = config.textColor;
  document.getElementById("proj-close").style.color = config.textColor;

  // Build gallery
  const gallery = document.getElementById("project-gallery");
  gallery.innerHTML = "";
  gallery.scrollTop = 0;

  project.images.forEach((imgSrc, i) => {
    const wrapper = document.createElement("div");

    if (i === 0) {
      wrapper.className = "gallery-image gallery-image--centered";
    } else if (i === 1) {
      wrapper.className = "gallery-image gallery-image--full";
    } else if (i === 2 && project.images.length > 3) {
      // Start a pair
      wrapper.className = "gallery-image gallery-image--pair";
      const img1 = document.createElement("img");
      img1.src = imgSrc;
      img1.alt = `${project.name} — ${i + 1}`;
      img1.loading = "lazy";
      wrapper.appendChild(img1);

      if (project.images[i + 1]) {
        const img2 = document.createElement("img");
        img2.src = project.images[i + 1];
        img2.alt = `${project.name} — ${i + 2}`;
        img2.loading = "lazy";
        wrapper.appendChild(img2);
      }
      gallery.appendChild(wrapper);
      return;
    } else if (i === 3 && project.images.length > 3) {
      // Already added as part of pair
      return;
    } else {
      wrapper.className = "gallery-image gallery-image--centered";
    }

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = `${project.name} — ${i + 1}`;
    img.loading = i === 0 ? "eager" : "lazy";
    wrapper.appendChild(img);
    gallery.appendChild(wrapper);
  });

  page.classList.add("open");
}

function closeProjectPage() {
  const page = document.getElementById("project-page");
  page.classList.remove("open");
  currentProject = null;
}

// ===== ABOUT PAGE =====
function bindAboutLink() {
  document.getElementById("about-link").addEventListener("click", openAboutPage);
}

function openAboutPage() {
  document.getElementById("about-page").classList.add("open");
  document.getElementById("brand-overlay").style.opacity = "0";
  document.getElementById("brand-overlay").style.pointerEvents = "none";
}

function closeAboutPage() {
  document.getElementById("about-page").classList.remove("open");
  document.getElementById("brand-overlay").style.opacity = "1";
  document.getElementById("brand-overlay").style.pointerEvents = "";
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (currentProject) {
      closeProjectPage();
    } else if (currentCategory) {
      closeCategoryView();
    } else if (document.getElementById("about-page").classList.contains("open")) {
      closeAboutPage();
    }
  }
});
