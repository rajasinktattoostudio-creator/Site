/* ============================================================
   Gallery images
   Your own photos, stored locally in assets/images/. Add more by
   dropping a file in that folder and adding an {src, alt} entry
   below — see README.md.
   ============================================================ */
const GALLERY_IMAGES = [
  { src: "assets/images/gallery-01.jpg", alt: "Balinese barong tattoo on the back, black and grey" },
  { src: "assets/images/gallery-02.jpg", alt: "Serpent and cross tattoo on the lower leg" },
  { src: "assets/images/gallery-03.jpg", alt: "Small blue forget-me-not flowers tattoo on the forearm" },
  { src: "assets/images/gallery-04.jpg", alt: "Balinese barong mask tattoo on the stomach" },
  { src: "assets/images/gallery-05.jpg", alt: "Ram skull tattoo on the upper back" },
  { src: "assets/images/gallery-06.jpg", alt: "Tribal shark tattoo on the ribs" },
  { src: "assets/images/gallery-07.jpg", alt: "Mandala tattoo covering the top of the head" },
  { src: "assets/images/gallery-08.jpg", alt: "Dotwork ornamental tattoo on the lower back" },
  { src: "assets/images/gallery-09.jpg", alt: "Black and grey mandala tattoo on the arm" },
  { src: "assets/images/gallery-10.jpg", alt: "Realistic portrait tattoo of a woman's face on the forearm" },
  { src: "assets/images/gallery-11.jpg", alt: "Japanese oni samurai tattoo on the shoulder" },
  { src: "assets/images/gallery-12.jpg", alt: "Black and grey realism portrait tattoo" },
  { src: "assets/images/gallery-13.jpg", alt: "Sun and clouds armband tattoo in red and black" },
  { src: "assets/images/gallery-14.jpg", alt: "Circular blackletter script tattoo on the arm" },
  { src: "assets/images/gallery-15.jpg", alt: "Fine line butterfly tattoo on the upper back" },
  { src: "assets/images/gallery-16.jpg", alt: "Books and feather tattoo on the forearm" },
  { src: "assets/images/gallery-17.jpg", alt: "Matching geometric eye tattoos on both knees" },
  { src: "assets/images/gallery-18.jpg", alt: "Floral sleeve tattoo on the forearm" },
  { src: "assets/images/gallery-19.jpg", alt: "Arabic script tattoo on the ribs" },
  { src: "assets/images/gallery-20.jpg", alt: "Koi fish and lotus tattoo along the spine" },
  { src: "assets/images/gallery-21.jpg", alt: "Balinese barong mask tattoo on the forearm" },
  { src: "assets/images/gallery-22.jpg", alt: "Dotwork mandala tattoo on the calf" },
  { src: "assets/images/gallery-23.jpg", alt: "Lotus and crescent moon tattoo on the back of the neck" },
  { src: "assets/images/gallery-24.jpg", alt: "Dice, cards and cash tattoo on the leg" },
  { src: "assets/images/gallery-25.jpg", alt: "Script lettering tattoo on the head" },
  { src: "assets/images/gallery-26.jpg", alt: "Floral tattoo on the thigh" },
];

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Nav: scrolled state + mobile toggle ---------- */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 40);
}, { passive: true });

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const navClose = document.getElementById("nav-close");
function closeNav(){
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navClose.addEventListener("click", closeNav);
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));

/* ---------- Gallery render + lightbox ---------- */
const galleryGrid = document.getElementById("gallery-grid");
GALLERY_IMAGES.forEach(({ src, alt }) => {
  const img = document.createElement("img");
  img.src = src;
  img.loading = "lazy";
  img.alt = alt;
  galleryGrid.appendChild(img);
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
galleryGrid.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    lightboxImg.src = e.target.src;
    lightboxImg.alt = e.target.alt;
    lightbox.classList.add("is-open");
  }
});
document.getElementById("lightbox-close").addEventListener("click", () => lightbox.classList.remove("is-open"));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("is-open"); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.classList.remove("is-open"); });

/* ---------- FAQ accordion ---------- */
document.querySelectorAll(".faq-item").forEach((item) => {
  const q = item.querySelector(".faq-q");
  const a = item.querySelector(".faq-a");
  q.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");
    document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
      openItem.classList.remove("is-open");
      openItem.querySelector(".faq-a").style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add("is-open");
      a.style.maxHeight = a.scrollHeight + "px";
    }
  });
});

/* ---------- Reviews render ---------- */
const reviewsContent = document.getElementById("reviews-content");
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/Tq7LDhvyWvr31vrV8";

if (typeof REVIEWS !== "undefined" && REVIEWS.length > 0) {
  const featured = REVIEWS[0];
  const card = document.createElement("div");
  card.className = "review-cta-card review-cta-card--featured";
  card.innerHTML = `
    <div class="review-stars">${"★".repeat(featured.rating || 5)}</div>
    <p class="review-quote">"${featured.text}"</p>
    <p class="review-author">— ${featured.author}</p>
    <div class="review-footer">
      <p class="review-footer-text">See what more clients are saying, straight from Google.</p>
      <a class="btn btn-brass btn-sm" href="${GOOGLE_REVIEWS_URL}" target="_blank" rel="noopener">Read our reviews on Google</a>
    </div>
  `;
  reviewsContent.appendChild(card);

  if (REVIEWS.length > 1) {
    const grid = document.createElement("div");
    grid.className = "review-grid";
    REVIEWS.slice(1, 6).forEach((r) => {
      const c = document.createElement("div");
      c.className = "review-card";
      c.innerHTML = `
        <div class="review-stars">${"★".repeat(r.rating || 5)}</div>
        <p>"${r.text}"</p>
        <p class="review-author">${r.author}</p>
      `;
      grid.appendChild(c);
    });
    reviewsContent.appendChild(grid);
  }
} else {
  reviewsContent.innerHTML = `
    <div class="review-cta-card">
      <div class="review-stars">★★★★★</div>
      <p>See what clients are saying about their experience at Rajas Ink, straight from Google.</p>
      <a class="btn btn-brass" href="${GOOGLE_REVIEWS_URL}" target="_blank" rel="noopener" style="margin-top:1.2rem">Read our reviews on Google</a>
    </div>
  `;
}

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
