/* ------------------------------------------------------------------
   Business details. Everything on the page that shows contact or
   booking info reads from here.
------------------------------------------------------------------- */
const CONFIG = {
  phone: "(512) 705-8505",
  phoneDigits: "5127058505",
  bookingUrl: "https://app.zenmaid.com/book/rose-s-cleaning-services",
  hiringUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdFZkP_-sFJhsDRX-Dx2bTA3Bnm4qaAXDMvMHCeqAyC41mIOA/viewform?usp=header",
  facebook: "https://www.facebook.com/p/Roses-Cleaning-100066975405899/",
};

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
    includes: ["Full clean between stays", "Fresh linens and beds made", "Restock basics you leave out", "Staged and guest-ready", "Flexible same-day turnovers", "Heads-up on damage or issues"],
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

/* ------------------------------------------------------------------ */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const external = el => { el.target = "_blank"; el.rel = "noopener"; };

$$('[data-config="phone"]').forEach(el => (el.textContent = CONFIG.phone));
$$('[data-config="phoneLink"]').forEach(el => (el.href = `tel:${CONFIG.phoneDigits}`));
$$('[data-config="textLink"]').forEach(el => (el.href = `sms:${CONFIG.phoneDigits}`));
$$('[data-config="bookingLink"]').forEach(el => { el.href = CONFIG.bookingUrl; external(el); });
$$('[data-config="hiringLink"]').forEach(el => { el.href = CONFIG.hiringUrl; external(el); });
$$('[data-config="facebookLink"]').forEach(el => { el.href = CONFIG.facebook; external(el); });
$("#year").textContent = new Date().getFullYear();

$("#serviceList").innerHTML = SERVICES.map(s => `
  <article class="service">
    <h3>${s.name}</h3>
    <div>
      <p>${s.summary}</p>
      <ul>${s.includes.map(x => `<li>${x}</li>`).join("")}</ul>
    </div>
    <a class="book-this" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener">Book this</a>
  </article>`).join("");
