/* ============================================================
   Gallery images
   Your own photos, stored locally in assets/images/. Add more by
   dropping a file in that folder and adding its path below — see
   README.md.
   ============================================================ */
const GALLERY_IMAGES = [
  "assets/images/gallery-01.jpg",
  "assets/images/gallery-02.jpg",
  "assets/images/gallery-03.jpg",
  "assets/images/gallery-04.jpg",
  "assets/images/gallery-05.jpg",
  "assets/images/gallery-06.jpg",
  "assets/images/gallery-07.jpg",
  "assets/images/gallery-08.jpg",
  "assets/images/gallery-09.jpg",
  "assets/images/gallery-10.jpg",
  "assets/images/gallery-11.jpg",
  "assets/images/gallery-12.jpg",
  "assets/images/gallery-13.jpg",
  "assets/images/gallery-14.jpg",
  "assets/images/gallery-15.jpg",
  "assets/images/gallery-16.jpg",
  "assets/images/gallery-17.jpg",
  "assets/images/gallery-18.jpg",
  "assets/images/gallery-19.jpg",
  "assets/images/gallery-20.jpg",
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
GALLERY_IMAGES.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;
  img.loading = "lazy";
  img.alt = "Tattoo by Rajas Ink, Ubud";
  galleryGrid.appendChild(img);
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
galleryGrid.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    lightboxImg.src = e.target.src;
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
