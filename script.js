/* ------------------------------------------------------------------
   EDIT THIS SECTION with Roses Cleaning Service's real details.
   Everything on the page that shows contact info reads from here.
------------------------------------------------------------------- */
const CONFIG = {
  phone: "(000) 000-0000",              // TODO: real phone number
  phoneDigits: "0000000000",            // TODO: same number, digits only
  email: "bookings@example.com",        // TODO: email that should receive bookings
  facebook: "https://www.facebook.com/p/Roses-Cleaning-100066975405899/",
  area: "Tell us your address when you book and we'll confirm we can reach you.", // TODO: e.g. "Leander, Cedar Park, Georgetown and nearby"
};

const SERVICES = [
  {
    name: "Standard clean",
    summary: "Regular upkeep for a home that's lived in. Great as a weekly or every-two-weeks visit.",
    includes: ["Dusting all reachable surfaces", "Vacuum and mop floors", "Kitchen counters, sink and stovetop", "Bathrooms: toilet, tub, shower, sink", "Make beds and tidy up", "Empty trash"],
  },
  {
    name: "Deep clean",
    summary: "A detailed top-to-bottom clean for a first visit, a season change or a home that needs extra attention.",
    includes: ["Everything in a standard clean", "Baseboards, doors and light switches", "Inside microwave", "Cabinet fronts and appliance exteriors", "Scrub grout and soap buildup", "Ceiling fans and vents"],
  },
  {
    name: "Move-in / move-out",
    summary: "An empty-home clean so you can hand back the keys or move in fresh.",
    includes: ["Everything in a deep clean", "Inside cabinets and drawers", "Inside oven and fridge", "Closets and shelves", "Window sills and tracks", "Garage sweep on request"],
  },
  {
    name: "Office cleaning",
    summary: "After-hours or weekend cleaning for small offices and shops.",
    includes: ["Desks and common areas", "Restrooms and break room", "Floors and entryways", "Trash and recycling", "Glass doors and fixtures", "Schedule that works around you"],
  },
];

/* ------------------------------------------------------------------ */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// Contact info
$$('[data-config="phone"]').forEach(el => (el.textContent = CONFIG.phone));
$$('[data-config="email"]').forEach(el => (el.textContent = CONFIG.email));
$$('[data-config="area"]').forEach(el => (el.textContent = CONFIG.area));
$$('[data-config="phoneLink"]').forEach(el => (el.href = `tel:${CONFIG.phoneDigits}`));
$$('[data-config="emailLink"]').forEach(el => (el.href = `mailto:${CONFIG.email}`));
$$('[data-config="facebookLink"]').forEach(el => { el.href = CONFIG.facebook; el.target = "_blank"; el.rel = "noopener"; });
$("#year").textContent = new Date().getFullYear();

// Services list
$("#serviceList").innerHTML = SERVICES.map((s, i) => `
  <article class="service">
    <h3>${s.name}</h3>
    <div>
      <p>${s.summary}</p>
      <ul>${s.includes.map(x => `<li>${x}</li>`).join("")}</ul>
    </div>
    <button class="book-this" type="button" data-index="${i}">Book this</button>
  </article>`).join("");

// Service dropdowns
const options = SERVICES.map(s => `<option>${s.name}</option>`).join("");
$("#qbService").innerHTML = options;
$("#service").innerHTML = options;

// Dates: no past days
const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
const minDate = today.toISOString().slice(0, 10);
$("#qbDate").min = minDate;
$("#date").min = minDate;

const goToBooking = () => {
  showForm();
  $("#book").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  setTimeout(() => $("#name").focus({ preventScroll: true }), 400);
};

// Hero quick-book carries choices into the full form
$("#quickBook").addEventListener("submit", e => {
  e.preventDefault();
  $("#service").value = $("#qbService").value;
  if ($("#qbDate").value) $("#date").value = $("#qbDate").value;
  goToBooking();
});

// "Book this" on each service
$("#serviceList").addEventListener("click", e => {
  const btn = e.target.closest(".book-this");
  if (!btn) return;
  $("#service").value = SERVICES[btn.dataset.index].name;
  goToBooking();
});

// Booking form
const form = $("#bookingForm");
const errorBox = $("#formError");
const labels = { name: "your full name", phone: "a phone number", address: "your address", date: "a preferred day" };

function showForm() {
  form.hidden = false;
  $("#confirm").hidden = true;
}

form.addEventListener("input", e => e.target.removeAttribute("aria-invalid"));

form.addEventListener("submit", e => {
  e.preventDefault();
  const missing = [];
  ["name", "phone", "address", "date"].forEach(id => {
    const el = $("#" + id);
    const bad = !el.value.trim() || (id === "date" && el.value < minDate);
    el.toggleAttribute("aria-invalid", bad);
    if (bad) { el.setAttribute("aria-invalid", "true"); missing.push(labels[id]); }
  });
  const email = $("#email");
  if (email.value && !email.checkValidity()) { email.setAttribute("aria-invalid", "true"); missing.push("a valid email (or leave it blank)"); }

  if (missing.length) {
    errorBox.textContent = `Add ${missing.join(", ")} to send your request.`;
    errorBox.hidden = false;
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }
  errorBox.hidden = true;

  const d = Object.fromEntries(new FormData(form));
  const day = new Date(d.date + "T12:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const body = [
    "New booking request",
    "",
    `Service: ${d.service}`,
    `How often: ${d.frequency}`,
    `Home: ${d.bedrooms} bed / ${d.bathrooms} bath`,
    `Preferred day: ${day}`,
    `Time window: ${d.time}`,
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email || "not given"}`,
    `Address: ${d.address}`,
    "",
    `Notes: ${d.notes || "none"}`,
  ].join("\n");

  const subject = `Booking request: ${d.service}, ${day}`;
  window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  form.hidden = true;
  const confirm = $("#confirm");
  confirm.hidden = false;
  confirm.focus();
});

$("#editBooking").addEventListener("click", () => { showForm(); $("#name").focus(); });
