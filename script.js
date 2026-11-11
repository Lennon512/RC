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
  google: "https://www.google.com/maps/search/?api=1&query=Rose%27s+Cleaning+Services+Burnet+TX", // swap for her Google "Ask for reviews" link if she has one
  towns: ["Burnet", "Marble Falls", "Granite Shoals", "Kingsland", "Buchanan Dam", "Llano", "Burnet County", "Llano County", "Williamson County"],
};

/* ==================================================================
   REVIEWS: paste real client reviews here, copied word for word
   (with the client's OK). The Reviews page shows them automatically.
   Example:
   { text: "Their review here.", name: "Jane D.", service: "Deep clean", source: "Google", stars: 5 },
================================================================== */
const REVIEWS = [
  {
    text: "We have been using Rose's Cleaning Services for several years and are very pleased. Her team cleans and manages a short term rental for us also. They do a terrific job. Rose is always very responsive to any questions or concerns.",
    name: "Becca S.", service: "Standard cleaning", source: "Google", stars: 5,
  },
  {
    text: "I am incredibly grateful to have found a trustworthy team of true professionals for my home. Rose and her team are excellent communicators and execute the plans quickly, efficiently, and do an amazing job. I felt overwhelmed with an unorganized home. My home is now PERFECTLY organized and SPARKLING clean. I feel at peace in my home now and I get to feel like this regularly now!",
    name: "Loren C.", service: "Moving-related cleaning, general housekeeping", source: "Google", stars: 5,
  },
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
  // Little line icons, one per service, in the same order as SERVICES
  const ICONS = [
    // house
    '<path d="M6 21V11L16 4l10 7v10a1 1 0 0 1-1 1h-6v-7h-6v7H7a1 1 0 0 1-1-1z"/>',
    // sparkles
    '<path d="M14 4c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8z"/><path d="M24 19c.5 2 1.5 3 3.5 3.5-2 .5-3 1.5-3.5 3.5-.5-2-1.5-3-3.5-3.5 2-.5 3-1.5 3.5-3.5z"/>',
    // key
    '<circle cx="11" cy="16" r="5"/><path d="M16 16h11M23 16v4M27 16v3"/>',
    // briefcase
    '<rect x="5" y="10" width="22" height="15" rx="2.5"/><path d="M12 10V7.5A1.5 1.5 0 0 1 13.5 6h5A1.5 1.5 0 0 1 20 7.5V10M5 16h22"/>',
    // hanger
    '<path d="M16 9a2.5 2.5 0 1 0-2.5-2.5M16 9v2L4.5 19.5A1.5 1.5 0 0 0 5.4 22h21.2a1.5 1.5 0 0 0 .9-2.5L16 11"/>',
  ];
  serviceList.innerHTML = SERVICES.map((s, i) => `
    <article class="service tint-${i % 3}">
      <span class="service-icon" aria-hidden="true"><svg viewBox="0 0 32 32">${ICONS[i] || ICONS[1]}</svg></span>
      <h3>${s.name}</h3>
      <p>${s.summary}</p>
      <ul>${s.includes.map(x => `<li>${x}</li>`).join("")}</ul>
      <a class="btn btn-small" data-config="bookingLink">Book this</a>
    </article>`).join("") + `
    <article class="service service-help">
      <img src="images/logo.png" alt="">
      <h3>Not sure which one?</h3>
      <p>Tell us about your space and we'll help you pick. New clients get a free walkthrough and estimate.</p>
      <a class="btn btn-small btn-pink" data-config="phoneLink">Call or text us</a>
    </article>`;
}

// Towns
$$("[data-towns]").forEach(el => (el.innerHTML = CONFIG.towns.map(t => `<li>${t}</li>`).join("")));

// Reviews
const starRow = n => `<span class="stars" aria-label="${n} out of 5 stars">${"★".repeat(n)}</span>`;
const firstWords = (t, n) => { const w = t.split(/\s+/); return w.slice(0, n).join(" ") + (w.length > n ? "…" : ""); };

// Home page: featured quote
const featured = $("#featuredReview");
if (featured && REVIEWS.length) {
  const r = REVIEWS[0];
  featured.innerHTML = `
    <blockquote>${esc(r.text)}</blockquote>
    <figcaption>${starRow(r.stars || 5)} ${esc(r.name)}${r.source ? `, on ${esc(r.source)}` : ""}</figcaption>`;
  featured.hidden = false;
}

// Reviews page: floating bubbles you can click to read
const field = $("#reviewField");
if (field) {
  if (!REVIEWS.length) {
    field.hidden = true;
    $("#reviewEmpty").hidden = false;
  } else {
    const tints = ["pink", "teal", "butter"];
    const bubbles = REVIEWS.map((r, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `bubble bubble-${tints[i % 3]}`;
      b.setAttribute("aria-label", `Read ${r.name}'s review`);
      b.innerHTML = `
        <span class="bubble-avatar" aria-hidden="true">${esc(r.name[0])}</span>
        ${starRow(r.stars || 5)}
        <span class="bubble-snip">“${esc(firstWords(r.text, 9))}”</span>
        <span class="bubble-name">${esc(r.name)}</span>
        <span class="bubble-tap" aria-hidden="true">Tap to read</span>`;
      b.addEventListener("click", () => openReview(r));
      field.appendChild(b);
      return b;
    });

    // Decorative sparkles and petals drift too
    const decor = [];
    for (let i = 0; i < 10; i++) {
      const d = document.createElement("span");
      d.className = i % 2 ? "drift drift-sparkle" : "drift drift-petal";
      d.setAttribute("aria-hidden", "true");
      d.style.setProperty("--s", (14 + Math.random() * 22).toFixed(0) + "px");
      field.appendChild(d);
      decor.push(d);
    }

    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    const items = [...bubbles.map(el => ({ el, big: true })), ...decor.map(el => ({ el, big: false }))];
    let W = 0, H = 0, paused = false, last = 0;

    function place() {
      W = field.clientWidth; H = field.clientHeight;
      items.forEach((it, i) => {
        it.w = it.el.offsetWidth; it.h = it.el.offsetHeight;
        if (it.x == null) {
          // spread bubbles across the field to start
          const cols = Math.max(1, bubbles.length);
          it.x = it.big ? ((i + 0.5) / cols) * (W - it.w) : Math.random() * (W - it.w);
          it.y = it.big ? (0.2 + 0.5 * ((i * 0.37) % 1)) * (H - it.h) : Math.random() * (H - it.h);
          const speed = it.big ? 14 + Math.random() * 10 : 10 + Math.random() * 14; // px per second
          const a = Math.random() * Math.PI * 2;
          it.vx = Math.cos(a) * speed; it.vy = Math.sin(a) * speed;
          it.phase = Math.random() * 6.28;
        }
        it.x = Math.min(Math.max(0, it.x), Math.max(0, W - it.w));
        it.y = Math.min(Math.max(0, it.y), Math.max(0, H - it.h));
        draw(it, 0);
      });
    }
    function draw(it, t) {
      const wob = it.big ? Math.sin(t / 900 + it.phase) * 4 : Math.sin(t / 700 + it.phase) * 10;
      const rot = it.big ? Math.sin(t / 1400 + it.phase) * 3 : (t / 40 + it.phase * 60) % 360;
      it.el.style.transform = `translate(${it.x}px, ${it.y + wob}px) rotate(${rot}deg)`;
    }
    function tick(t) {
      const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
      if (!paused) items.forEach(it => {
        if (it.held) return;
        it.x += it.vx * dt; it.y += it.vy * dt;
        if (it.x < 0 || it.x > W - it.w) { it.vx *= -1; it.x = Math.min(Math.max(0, it.x), W - it.w); }
        if (it.y < 0 || it.y > H - it.h) { it.vy *= -1; it.y = Math.min(Math.max(0, it.y), H - it.h); }
        draw(it, t);
      });
      if (!calm.matches) requestAnimationFrame(tick);
    }
    // Hovering or focusing a bubble holds it still so it's easy to click
    items.filter(it => it.big).forEach(it => {
      const hold = v => () => (it.held = v);
      it.el.addEventListener("pointerenter", hold(true));
      it.el.addEventListener("pointerleave", hold(false));
      it.el.addEventListener("focus", hold(true));
      it.el.addEventListener("blur", hold(false));
    });
    document.addEventListener("visibilitychange", () => (paused = document.hidden));

    if (calm.matches) {
      field.classList.add("still");      // reduced motion: tidy static layout
    } else {
      requestAnimationFrame(() => { place(); requestAnimationFrame(tick); });
      addEventListener("resize", place);
    }
  }
}

// Review popup
const dlg = $("#reviewDialog");
function openReview(r) {
  $("#rdStars").innerHTML = starRow(r.stars || 5);
  $("#rdText").textContent = r.text;
  $("#rdName").textContent = r.name;
  $("#rdMeta").textContent = [r.service, r.source && `Review on ${r.source}`].filter(Boolean).join(" · ");
  dlg.showModal();
}
if (dlg) {
  $("#rdClose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
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
  googleLink: el => { el.href = CONFIG.google; external(el); },
};
$$("[data-config]").forEach(el => bind[el.dataset.config]?.(el));
