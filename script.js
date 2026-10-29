/* ==================================================================
   BUSINESS DETAILS: edit here and every page updates.
================================================================== */
const CONFIG = {
  name: "Rose's Cleaning Services",
  phone: "(512) 705-8505",
  phoneDigits: "5127058505",
  email: "rose@patriotendeavorstx.com",
  address: "109 S Water St, Burnet, TX 78611",
  bookingUrl: "https://app.zenmaid.com/book/rose-s-cleaning-services",
  hiringUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdFZkP_-sFJhsDRX-Dx2bTA3Bnm4qaAXDMvMHCeqAyC41mIOA/viewform?usp=header",
  facebook: "https://www.facebook.com/p/Roses-Cleaning-100066975405899/",
  towns: ["Burnet", "Marble Falls", "Granite Shoals", "Kingsland", "Buchanan Dam", "Llano", "Burnet County", "Llano County", "Williamson County"],
};

/* ==================================================================
   REVIEWS: paste real client reviews here, copied word for word
   (with the client's OK). The Reviews page shows them automatically.
   Example:
   { text: "Their review here.", name: "Jane D.", where: "Marble Falls", stars: 5 },
================================================================== */
const REVIEWS = [
];

const SERVICES = [
  {
    name: "Residential cleaning",
    summary: "Regular cleaning that keeps your home feeling fresh, on a weekly, every-two-weeks or monthly schedule.",
    includes: ["Dusting reachable surfaces", "Vacuum and mop floors", "Kitchen counters, sink and stovetop", "Bathrooms top to bottom", "Make beds and tidy up", "Empty trash"],
  },
  {
    name: "Deep cleans",
    summary: "A detailed top-to-bottom clean for a first visit, a move, a season change or a home that needs extra attention.",
    includes: ["Everything in a regular clean", "Baseboards, doors and switches", "Sinks, faucets and fixtures scrubbed", "Grout and soap buildup", "Ceiling fans and vents", "Cabinet fronts and appliances"],
  },
  {
    name: "Airbnb & rentals",
    summary: "Turnovers between guests so your rental is spotless and ready for the next check-in.",
    includes: ["Full clean between stays", "Fresh linens and beds made", "Restock basics you leave out", "Staged and guest-ready", "Flexible turnovers", "Heads-up on damage or issues"],
  },
  {
    name: "Commercial",
    summary: "Cleaning for offices, shops and other workspaces, scheduled around your hours.",
    includes: ["Desks and common areas", "Restrooms and break rooms", "Floors and entryways", "Trash and recycling", "Glass and fixtures", "After-hours or weekend visits"],
  },
  {
    name: "Organization",
    summary: "We sort, declutter and set up closets, pantries and drawers so they stay easy to use.",
    includes: ["Closets and wardrobes", "Pantries and kitchens", "Drawers and bathroom cabinets", "Garages and storage", "Sorting and decluttering", "A simple system you can keep up"],
  },
];

/* ================================================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const PAGES = [
  ["index.html", "Home"],
  ["index.html#services", "Services"],
  ["about.html", "About us"],
  ["reviews.html", "Reviews"],
  ["contact.html", "Service area & contact"],
  ["careers.html", "Join our team"],
];
const here = location.pathname.split("/").pop() || "index.html";

// Header
$("#site-header").outerHTML = `
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="index.html">
      <img src="images/logo.png" alt="" width="52" height="52">
      <span>Rose's Cleaning<small>Texas Hill Country</small></span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mainNav">Menu</button>
    <nav class="main-nav" id="mainNav" aria-label="Main">
      ${PAGES.filter(([h]) => h !== "index.html").map(([h, t]) =>
        `<a href="${h}"${h === here ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
      <a class="btn btn-small" data-config="bookingLink">Book online</a>
    </nav>
  </div>
</header>`;

const toggle = $(".menu-toggle");
toggle.addEventListener("click", () => {
  const open = $("#mainNav").classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
$$("#mainNav a").forEach(a => a.addEventListener("click", () => {
  $("#mainNav").classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

// Footer
$("#site-footer").outerHTML = `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="images/logo.png" alt="" width="72" height="72">
        <p>Rose's Cleaning Services<small>Detail driven. Trusted. Consistent.</small></p>
      </div>
      <div>
        <h2>Pages</h2>
        <ul>${PAGES.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h2>Contact</h2>
        <ul>
          <li><a data-config="phoneLink"><span data-config="phone"></span></a></li>
          <li><a data-config="emailLink"><span data-config="email"></span></a></li>
          <li><span data-config="address"></span></li>
        </ul>
      </div>
      <div>
        <h2>Book & follow</h2>
        <ul>
          <li><a data-config="bookingLink">Book online</a></li>
          <li><a data-config="facebookLink">Facebook</a></li>
          <li><a data-config="hiringLink">Apply to join our team</a></li>
        </ul>
      </div>
    </div>
    <p class="footer-bottom">© ${new Date().getFullYear()} Rose's Cleaning Services. Serving the Texas Hill Country.</p>
  </div>
</footer>`;

// Services (home)
const serviceList = $("#serviceList");
if (serviceList) {
  serviceList.innerHTML = SERVICES.map(s => `
    <article class="service">
      <h3>${s.name}</h3>
      <div>
        <p>${s.summary}</p>
        <ul>${s.includes.map(x => `<li>${x}</li>`).join("")}</ul>
      </div>
      <a class="book-this" data-config="bookingLink">Book this</a>
    </article>`).join("");
}

// Towns
$$("[data-towns]").forEach(el => (el.innerHTML = CONFIG.towns.map(t => `<li>${t}</li>`).join("")));

// Reviews
const reviewList = $("#reviewList");
if (reviewList) {
  if (REVIEWS.length) {
    reviewList.className = "review-grid";
    reviewList.innerHTML = REVIEWS.map(r => `
      <figure class="review">
        ${r.stars ? `<div class="stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}</div>` : ""}
        <blockquote>${esc(r.text)}</blockquote>
        <figcaption>${esc(r.name)}${r.where ? `<span>${esc(r.where)}</span>` : ""}</figcaption>
      </figure>`).join("");
  } else {
    $("#reviewEmpty").hidden = false;
  }
}

// Contact + link bindings (run last so injected header/footer get them too)
const external = el => { el.target = "_blank"; el.rel = "noopener"; };
const bind = {
  phone: el => (el.textContent = CONFIG.phone),
  email: el => (el.textContent = CONFIG.email),
  address: el => (el.textContent = CONFIG.address),
  phoneLink: el => (el.href = `tel:${CONFIG.phoneDigits}`),
  textLink: el => (el.href = `sms:${CONFIG.phoneDigits}`),
  emailLink: el => (el.href = `mailto:${CONFIG.email}`),
  mapLink: el => { el.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.address)}`; external(el); },
  bookingLink: el => { el.href = CONFIG.bookingUrl; external(el); },
  hiringLink: el => { el.href = CONFIG.hiringUrl; external(el); },
  facebookLink: el => { el.href = CONFIG.facebook; external(el); },
};
$$("[data-config]").forEach(el => bind[el.dataset.config]?.(el));
