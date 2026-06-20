import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const domain = "https://kampottaxi.github.io";
const waNumber = "85512960940";
const telegram = "0964800081";

const routes = [
  {
    id: "kampot-phnom-penh-city",
    slug: "kampot-to-phnom-penh-city",
    title: "Kampot → Phnom Penh City / Hotel",
    destinationLabel: "To Phnom Penh",
    categoryLabel: "Kampot Taxi",
    fromPrice: "$50",
    suvPrice: "$50",
    vanPrice: "$90",
    duration: "3h-4h",
    tripType: "Private transfer",
    description:
      "Private taxi transfer from Kampot to Phnom Penh city, hotel, or local address. Travel in an air-conditioned SUV or van with luggage space.",
    image: "assets/images/PhnomPenh1.PNG",
    alt: "Phnom Penh city scene for the Kampot to Phnom Penh private taxi route",
    detailUrl: "routes/kampot-to-phnom-penh-city/index.html",
    whatsappMessageTitle: "Kampot to Phnom Penh City / Hotel",
  },
  {
    id: "kampot-phnom-penh-airport",
    slug: "kampot-to-phnom-penh-airport",
    title: "Kampot → Phnom Penh Airport",
    destinationLabel: "To Phnom Penh Airport",
    categoryLabel: "Airport Transfer",
    fromPrice: "$60",
    suvPrice: "$60",
    vanPrice: "$100",
    duration: "3h-4h",
    tripType: "Airport transfer",
    description:
      "Private airport transfer from Kampot to Phnom Penh International Airport. Message Tha with your flight time, pickup location, passengers, and luggage.",
    image: "assets/images/PhnomPenh2.PNG",
    alt: "Phnom Penh travel scene for the Kampot to Phnom Penh Airport transfer",
    detailUrl: "routes/kampot-to-phnom-penh-airport/index.html",
    whatsappMessageTitle: "Kampot to Phnom Penh Airport",
  },
  {
    id: "phnom-penh-airport-kampot",
    slug: "phnom-penh-airport-to-kampot",
    title: "Phnom Penh Airport → Kampot",
    destinationLabel: "To Kampot",
    categoryLabel: "Airport Transfer",
    fromPrice: "$35",
    suvPrice: "$35",
    vanPrice: "$50",
    duration: "3h-4h",
    tripType: "Airport pickup",
    description:
      "Private pickup from Phnom Penh Airport to Kampot. Send your arrival time, flight details, passenger count, and luggage for confirmation.",
    image: "assets/images/PhnomPenh1.PNG",
    alt: "Phnom Penh city scene for the airport pickup to Kampot route",
    detailUrl: "routes/phnom-penh-airport-to-kampot/index.html",
    whatsappMessageTitle: "Phnom Penh Airport to Kampot",
  },
  {
    id: "kampot-sihanoukville",
    slug: "kampot-to-sihanoukville",
    title: "Kampot → Sihanoukville",
    destinationLabel: "To Sihanoukville",
    categoryLabel: "Private Taxi",
    fromPrice: "$50",
    suvPrice: "$50",
    vanPrice: "$90",
    duration: "2h30m-3h30m",
    tripType: "Private transfer",
    description:
      "Private taxi from Kampot to Sihanoukville for hotels, beaches, ferry connections, and onward travel.",
    image: "assets/images/Sihanoukville1.PNG",
    alt: "Sihanoukville coastal scene for the private taxi route from Kampot",
    detailUrl: "routes/kampot-to-sihanoukville/index.html",
    whatsappMessageTitle: "Kampot to Sihanoukville",
  },
  {
    id: "kampot-kep",
    slug: "kampot-to-kep",
    title: "Kampot → Kep",
    destinationLabel: "To Kep",
    categoryLabel: "Coastal Taxi",
    fromPrice: "$25",
    suvPrice: "$25",
    vanPrice: "$40",
    duration: "35m-1h",
    tripType: "Short transfer",
    description:
      "Easy private transfer from Kampot to Kep for beach visits, seafood, hotels, crab market, or coastal stops.",
    image: "assets/images/Kep1.PNG",
    alt: "Kep coastal travel scene for the private taxi route from Kampot",
    detailUrl: "routes/kampot-to-kep/index.html",
    whatsappMessageTitle: "Kampot to Kep",
  },
  {
    id: "kampot-bokor",
    slug: "kampot-to-bokor-mountain",
    title: "Kampot → Bokor Mountain",
    destinationLabel: "To Bokor Mountain",
    categoryLabel: "Round Trip Tour",
    fromPrice: "$50",
    suvPrice: "$50",
    vanPrice: "$70",
    duration: "4h-6h",
    tripType: "Round trip tour",
    description:
      "Private round-trip tour from Kampot to Bokor Mountain area. Good for sightseeing, cool weather, viewpoints, and flexible local stops.",
    image: "assets/images/Bokor1.PNG",
    alt: "Bokor Mountain travel scene for a private tour from Kampot",
    detailUrl: "routes/kampot-to-bokor-mountain/index.html",
    whatsappMessageTitle: "Kampot to Bokor Mountain",
  },
  {
    id: "kampot-mangrove",
    slug: "kampot-mangrove-forest-trip",
    title: "Kampot → Mangrove Forest Trip",
    destinationLabel: "To Mangrove Forest",
    categoryLabel: "Kampot Tour",
    fromPrice: "$40",
    suvPrice: "$40",
    vanPrice: "$60",
    duration: "2h-4h",
    tripType: "Local tour",
    description:
      "Private Kampot-area trip to the mangrove forest. Message Tha to confirm route, timing, waiting time, and any boat or entry costs.",
    image: "assets/images/Bokor2.PNG",
    alt: "Green Kampot landscape used for the mangrove forest trip route",
    detailUrl: "routes/kampot-mangrove-forest-trip/index.html",
    whatsappMessageTitle: "Kampot Mangrove Forest Trip",
  },
  {
    id: "kampot-full-day",
    slug: "kampot-full-day-tour",
    title: "Kampot Full-Day Tour",
    destinationLabel: "Around Kampot",
    categoryLabel: "Full-Day Tour",
    fromPrice: "$60",
    suvPrice: "$60",
    vanPrice: "$80",
    duration: "6h-10h",
    tripType: "Full-day private driver",
    description:
      "A flexible full-day private driver option for Kampot local attractions, viewpoints, countryside stops, Bokor-style routes, or custom plans.",
    image: "assets/images/Bokor2.PNG",
    alt: "Scenic Kampot landscape for a full-day private driver tour",
    detailUrl: "routes/kampot-full-day-tour/index.html",
    whatsappMessageTitle: "Kampot Full-Day Tour",
  },
  {
    id: "kampot-half-day",
    slug: "kampot-half-day-tour",
    title: "Kampot Half-Day Tour",
    destinationLabel: "Around Kampot",
    categoryLabel: "Half-Day Tour",
    fromPrice: "$50",
    suvPrice: "$50",
    vanPrice: "$70",
    duration: "3h-5h",
    tripType: "Half-day private driver",
    description:
      "A shorter private tour option around Kampot for travelers who want a flexible half-day plan with a local driver.",
    image: "assets/images/Kep1.PNG",
    alt: "Coastal Cambodia travel scene for a half-day Kampot tour",
    detailUrl: "routes/kampot-half-day-tour/index.html",
    whatsappMessageTitle: "Kampot Half-Day Tour",
  },
  {
    id: "kampot-siem-reap",
    slug: "kampot-to-siem-reap",
    title: "Kampot → Siem Reap",
    destinationLabel: "To Siem Reap",
    categoryLabel: "Long-Distance Taxi",
    fromPrice: "$140",
    suvPrice: "$140",
    vanPrice: "$200",
    duration: "8h-10h",
    tripType: "Long-distance transfer",
    description:
      "Private long-distance taxi from Kampot to Siem Reap. Best for travelers who want a direct private route instead of changing buses or vans.",
    image: "assets/images/SiemReap1.PNG",
    alt: "Siem Reap temple scene for the long-distance private taxi route",
    detailUrl: "routes/kampot-to-siem-reap/index.html",
    whatsappMessageTitle: "Kampot to Siem Reap",
  },
  {
    id: "kampot-koh-rong-ferry",
    slug: "kampot-to-koh-rong-ferry",
    title: "Kampot → Koh Rong Ferry / Sihanoukville Pier",
    destinationLabel: "To Koh Rong Ferry / Pier",
    categoryLabel: "Pier Transfer",
    fromPrice: "$170",
    suvPrice: "$170",
    vanPrice: "$300",
    duration: "3h-4h",
    tripType: "Ferry connection transfer",
    description:
      "Private transfer from Kampot toward the Koh Rong ferry or Sihanoukville pier area. Confirm ferry time and exact pier with Tha before travel.",
    image: "assets/images/Sihanoukville1.PNG",
    alt: "Sihanoukville coast and pier area for the Koh Rong ferry transfer",
    detailUrl: "routes/kampot-to-koh-rong-ferry/index.html",
    whatsappMessageTitle: "Kampot to Koh Rong Ferry / Sihanoukville Pier",
  },
  {
    id: "custom-cambodia-route",
    slug: "custom-cambodia-route",
    title: "Custom Cambodia Route",
    destinationLabel: "Any Province or City",
    categoryLabel: "Custom Route",
    fromPrice: "Ask for quote",
    suvPrice: "Ask for quote",
    vanPrice: "Ask for quote",
    duration: "Varies",
    tripType: "Custom private taxi",
    description:
      "Need another route in Cambodia? Send Tha your pickup location, destination, date, passengers, luggage, and preferred vehicle for a quote.",
    image: "assets/images/PhnomPenh2.PNG",
    alt: "Cambodia travel scene for custom private taxi routes",
    detailUrl: "routes/custom-cambodia-route/index.html",
    whatsappMessageTitle: "Custom Cambodia Route",
  },
];

const transfers = [
  "kampot-to-phnom-penh-city",
  "kampot-to-phnom-penh-airport",
  "phnom-penh-airport-to-kampot",
  "kampot-to-sihanoukville",
  "kampot-to-kep",
  "kampot-to-siem-reap",
  "kampot-to-koh-rong-ferry",
  "custom-cambodia-route",
];
const tours = [
  "kampot-to-bokor-mountain",
  "kampot-mangrove-forest-trip",
  "kampot-full-day-tour",
  "kampot-half-day-tour",
];

function ensureDir(file) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
}

function write(file, content) {
  ensureDir(file);
  fs.writeFileSync(path.join(root, file), content);
}

function esc(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

function rel(prefix, target = "") {
  return `${prefix}${target}`;
}

function waHref(routeTitle = "") {
  const msg = [
    "Hello Tha, I would like to book or request a quote.",
    `Route: ${routeTitle}`,
    "Vehicle: SUV or Van",
    "Travel date/time:",
    "Pickup location:",
    "Destination:",
    "Number of passengers:",
    "Luggage:",
    "Name:",
    "Notes:",
  ].join("\n");
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
}

function icon(name) {
  const paths = {
    pin: '<path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    route:
      '<path d="M6 19c3 0 3-14 6-14s3 14 6 14"/><circle cx="6" cy="19" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="18" cy="19" r="2"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/>',
    car: '<path d="M5 15h14l-1.4-5.2A3 3 0 0 0 14.7 8H9.3a3 3 0 0 0-2.9 1.8L5 15Z"/><path d="M6 15v3M18 15v3"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/>',
  };
  return `<svg class="icon icon-${name}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}

function photo(route, prefix, extraClass = "") {
  return `<div class="photo-slot ${extraClass}" role="img" aria-label="${esc(route.alt)}" style="--photo:url('${esc(rel(prefix, route.image))}')">
    <span class="photo-fallback">${esc(route.alt)}</span>
  </div>`;
}

function tripCard(route) {
  const price =
    route.fromPrice === "Ask for quote"
      ? `<span class="price-main" data-i18n="askForQuote">Ask for quote</span>`
      : `<span class="price-prefix" data-i18n="from">From</span> <span class="price-main">${esc(route.fromPrice)}</span>`;
  return `<div class="trip-card">
    <div class="trip-price">${price}</div>
    <div class="trip-row">${icon("pin")}<span>${esc(route.destinationLabel)}</span></div>
    <div class="trip-row">${icon("route")}<span>${esc(route.categoryLabel)}</span></div>
    <div class="trip-row">${icon("clock")}<span>${esc(route.duration)}</span></div>
    <a class="book-button" href="${waHref(route.whatsappMessageTitle)}" data-wa-route="${esc(route.whatsappMessageTitle)}" target="_blank" rel="noopener" data-i18n="bookNow">Book Now</a>
  </div>`;
}

function routeCard(route, prefix) {
  return `<article class="route-card">
    ${photo(route, prefix, "route-photo")}
    <div class="route-copy">
      <h3>${esc(route.title)}</h3>
      <p>${esc(route.description)}</p>
      <a class="details-button" href="${esc(rel(prefix, route.detailUrl))}"><span data-i18n="moreDetails">More details</span> &rarr;</a>
    </div>
    ${tripCard(route)}
  </article>`;
}

function header(prefix) {
  return `<header class="site-header">
    <div class="topbar">
      <div class="container topbar-inner">
        <span data-i18n="topbar">Booking requests welcome 24 hours. Please message 4+ hours ahead when possible.</span>
        <span>WhatsApp: 012960940 · Telegram: ${telegram}</span>
      </div>
    </div>
    <div class="nav-wrap">
      <div class="container nav-inner">
        <a class="brand" href="${rel(prefix)}index.html" aria-label="Kampot Taxi by Tha home">
          <span class="brand-badge">${icon("car")}</span>
          <span><strong>Kampot Taxi by Tha</strong><small>Private taxi in Cambodia</small></span>
        </a>
        <nav class="desktop-nav" aria-label="Main navigation">
          <a href="${rel(prefix)}index.html" data-i18n="navHome">Home</a>
          <a href="${rel(prefix)}taxi-transfers/index.html" data-i18n="navTransfers">Taxi Transfers</a>
          <a href="${rel(prefix)}kampot-tours/index.html" data-i18n="navTours">Kampot Tours</a>
          <a href="${rel(prefix)}vehicles/index.html" data-i18n="navVehicles">Vehicles</a>
          <a href="${rel(prefix)}booking/index.html" data-i18n="navBooking">Booking</a>
          <a href="${rel(prefix)}contact/index.html" data-i18n="navContact">Contact</a>
        </nav>
        <div class="nav-actions">
          <label class="language-label">
            <span class="sr-only">Language</span>
            <select class="language-select" aria-label="Language selector">
              <option value="zh-CN">Chinese</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="ko">Korean</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="es">Spanish</option>
              <option value="vi">Vietnamese</option>
            </select>
          </label>
          <a class="header-wa" href="${waHref("")}" target="_blank" rel="noopener" data-i18n="bookWhatsApp">Book on WhatsApp</a>
          <button class="menu-toggle" type="button" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open menu"><span></span><span></span><span></span></button>
        </div>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" hidden>
      <div class="mobile-menu-panel">
        <div class="mobile-menu-head">
          <strong>Kampot Taxi by Tha</strong>
          <button class="menu-close" type="button" aria-label="Close menu">×</button>
        </div>
        <label class="mobile-language">Language <select class="language-select" aria-label="Mobile language selector"></select></label>
        <nav class="mobile-nav" aria-label="Mobile navigation">
          <a href="${rel(prefix)}index.html" data-i18n="navHome">Home</a>
          <a href="${rel(prefix)}taxi-transfers/index.html" data-i18n="navTransfers">Taxi Transfers</a>
          <a href="${rel(prefix)}kampot-tours/index.html" data-i18n="navTours">Kampot Tours</a>
          <a href="${rel(prefix)}vehicles/index.html" data-i18n="navVehicles">Vehicles</a>
          <a href="${rel(prefix)}booking/index.html" data-i18n="navBooking">Booking</a>
          <a href="${rel(prefix)}contact/index.html" data-i18n="navContact">Contact</a>
        </nav>
        <div class="mobile-contact">
          <a class="book-button" href="${waHref("")}" target="_blank" rel="noopener" data-i18n="bookWhatsApp">Book on WhatsApp</a>
          <button class="telegram-open" type="button">Telegram: ${telegram}</button>
        </div>
      </div>
    </div>
  </header>`;
}

function floating() {
  return `<div class="floating-contact" aria-label="Quick contact buttons">
    <a class="float-wa" href="${waHref("")}" target="_blank" rel="noopener" aria-label="Open WhatsApp booking message">WhatsApp</a>
    <button class="float-telegram telegram-open" type="button" aria-label="Show Telegram contact">✈</button>
  </div>
  <div class="telegram-modal" id="telegram-modal" hidden>
    <div class="telegram-card" role="dialog" aria-modal="true" aria-labelledby="telegram-title">
      <button class="telegram-close" type="button" aria-label="Close Telegram contact">×</button>
      <h2 id="telegram-title">Telegram Contact</h2>
      <p>Telegram: <strong id="telegram-number">${telegram}</strong></p>
      <div class="telegram-actions">
        <button class="copy-telegram" type="button" data-copy="${telegram}">Copy number</button>
        <a href="tel:+855964800081">Call Telegram number</a>
      </div>
      <p class="copy-status" role="status" aria-live="polite"></p>
    </div>
  </div>`;
}

function footer(prefix) {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <strong>Kampot Taxi by Tha</strong>
        <p>Private taxi transfers, Kampot tours, airport pickups, and long-distance rides across Cambodia.</p>
        <p class="khmer" lang="km">អាចទាក់ទងតាម Telegram ឬ WhatsApp ដើម្បីសួរតម្លៃ និងកក់ឡាន។</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="${rel(prefix)}taxi-transfers/index.html">Taxi Transfers</a>
        <a href="${rel(prefix)}kampot-tours/index.html">Kampot Tours</a>
        <a href="${rel(prefix)}vehicles/index.html">Vehicles</a>
        <a href="${rel(prefix)}booking/index.html">Booking</a>
        <a href="${rel(prefix)}contact/index.html">Contact</a>
      </nav>
      <div class="footer-contact">
        <a href="${waHref("")}" target="_blank" rel="noopener">WhatsApp: 012960940</a>
        <span>Telegram: ${telegram}</span>
        <span>Payment by ABA or cash at pickup.</span>
      </div>
    </div>
  </footer>${floating()}`;
}

function head({
  title,
  desc,
  prefix,
  urlPath = "",
  image = "assets/images/PhnomPenh2.PNG",
}) {
  const canonical = `${domain}/${urlPath}`.replace(/\/$/, "/");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(desc)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${esc(rel(prefix, image))}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(desc)}">
    <meta name="twitter:image" content="${esc(rel(prefix, image))}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Khmer:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${rel(prefix, "styles.css")}">
    <script type="application/ld+json">${JSON.stringify(schema(title, desc), null, 6)}</script>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>`;
}

function schema(title, desc) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: "Kampot Taxi by Tha",
    serviceType: "Private taxi and driver service",
    description: desc,
    telephone: "+85512960940",
    areaServed: [
      "Kampot",
      "Cambodia",
      "Phnom Penh International Airport",
      "Kep",
      "Sihanoukville",
      "Siem Reap",
      "Bokor Mountain",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "WhatsApp booking",
        telephone: "+85512960940",
        availableLanguage: ["English", "Khmer"],
      },
      {
        "@type": "ContactPoint",
        contactType: "Telegram booking",
        telephone: "+855964800081",
        name: "Telegram: 0964800081",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: title,
      itemListElement: routes.map((route) => ({
        "@type": "Offer",
        name: route.title,
        description: route.description,
        price: route.fromPrice.replace("$", ""),
        priceCurrency: route.fromPrice.startsWith("$") ? "USD" : undefined,
      })),
    },
  };
}

function scripts(prefix) {
  return `<script src="${rel(prefix, "data/i18n.js")}"></script>
    <script src="${rel(prefix, "data/routes.js")}"></script>
    <script src="${rel(prefix, "script.js")}"></script>
  </body>
</html>`;
}

function noteBlock() {
  return `<section class="note-band">
    <div class="container note-grid">
      <div><strong data-i18n="pricingNoteTitle">From-price note</strong><p>Prices are shown as "From" prices. Final price may depend on pickup location, destination, stops, passengers, luggage, vehicle, and current travel conditions. Message Tha to confirm before travel.</p></div>
      <div><strong data-i18n="payment">Payment</strong><p>Payment by ABA or cash at pickup.</p></div>
      <div><strong>Separate costs</strong><p>Entry fees, ferry tickets, boat tickets, parking, and attraction costs are separate unless confirmed in your quote.</p></div>
    </div>
  </section>`;
}

function bookingCTA(prefix, title = "Ready to book your ride?") {
  return `<section class="cta-band">
    <div class="container cta-inner">
      <div>
        <p class="eyebrow" data-i18n="simpleBooking">Simple booking</p>
        <h2>${esc(title)}</h2>
        <p>Send your route, pickup, destination, date/time, passengers, luggage, and vehicle preference. Booking requests are welcome 24 hours a day.</p>
      </div>
      <div class="cta-actions">
        <a class="book-button" href="${waHref("")}" target="_blank" rel="noopener" data-i18n="sendWhatsApp">Send request on WhatsApp</a>
        <a class="outline-light" href="${rel(prefix, "booking/index.html")}" data-i18n="navBooking">Booking</a>
      </div>
    </div>
  </section>`;
}

function faqSection(short = false) {
  const faqs = [
    [
      "Do I need to book in advance?",
      "Booking requests are welcome 24 hours a day. Please message at least 4 hours before pickup when possible.",
    ],
    [
      "Can Tha drive outside Kampot?",
      "Yes. Tha can drive to provinces and cities across Cambodia.",
    ],
    [
      "Can I book an airport transfer?",
      "Yes. Phnom Penh Airport transfers are available, including Kampot to Phnom Penh Airport and Phnom Penh Airport to Kampot.",
    ],
    [
      "How many passengers can ride?",
      "SUVs can carry up to 4 passengers. Vans can carry up to 7 passengers.",
    ],
    [
      "Do the vehicles have air conditioning?",
      "Yes. Vehicles have air conditioning and luggage space.",
    ],
    [
      "How do I get the final price?",
      "Send your pickup location, destination, date/time, passenger count, luggage, and preferred vehicle. Tha will confirm the quote by WhatsApp or Telegram.",
    ],
    [
      "Does Tha speak English?",
      "Tha can communicate with some English and Google Translate through WhatsApp or Telegram.",
    ],
    ["How can I pay?", "Payment is available by ABA or cash at pickup."],
    [
      "Are route prices fixed?",
      'Prices are shown as "From" prices. Final price depends on trip details and should be confirmed with Tha before travel.',
    ],
  ];
  return `<section class="section faq-section">
    <div class="container two-col">
      <div>
        <p class="eyebrow">FAQ</p>
        <h2 data-i18n="faqHeading">Common booking questions</h2>
        <p class="muted">Simple English and Google Translate welcome through WhatsApp or Telegram.</p>
      </div>
      <div class="faq-list">
        ${faqs
          .slice(0, short ? 5 : faqs.length)
          .map(
            ([q, a]) =>
              `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`,
          )
          .join("\n")}
      </div>
    </div>
  </section>`;
}

function pageShell({ title, desc, prefix, urlPath, body, image }) {
  return `${head({ title, desc, prefix, urlPath, image })}
    ${header(prefix)}
    <main id="main">${body}</main>
    ${footer(prefix)}
    ${scripts(prefix)}`;
}

function routeGrid(routeSlugs, prefix) {
  return `<div class="route-grid">${routeSlugs
    .map((slug) =>
      routeCard(
        routes.find((r) => r.slug === slug),
        prefix,
      ),
    )
    .join("\n")}</div>`;
}

function homePage() {
  const prefix = "";
  const preview = [
    "kampot-to-phnom-penh-airport",
    "phnom-penh-airport-to-kampot",
    "kampot-to-kep",
    "kampot-to-bokor-mountain",
    "kampot-to-sihanoukville",
    "custom-cambodia-route",
  ];
  const body = `<section class="hero">
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">Kampot private taxi booking</p>
        <h1>Kampot Taxi by Tha</h1>
        <p class="hero-lead" data-i18n="heroLead">Private taxi transfers, Kampot tours, airport pickups, and long-distance rides across Cambodia.</p>
        <div class="hero-actions">
          <a class="book-button" href="${waHref("")}" target="_blank" rel="noopener" data-i18n="bookWhatsApp">Book on WhatsApp</a>
          <button class="telegram-button telegram-open" type="button">Telegram: ${telegram}</button>
        </div>
        <div class="trust-chips">
          <span>From-price route list</span><span>SUV up to 4 passengers</span><span>Van up to 7 passengers</span><span>Air conditioning</span><span>Luggage space</span><span>Booking requests 24 hours</span><span>Book 4+ hours ahead</span><span>ABA or cash at pickup</span>
        </div>
      </div>
      <div class="hero-panel">
        ${photo(routes[1], prefix, "hero-photo")}
        <div class="quick-card">
          <strong>Popular now</strong>
          <span>Kampot to Phnom Penh Airport from $60</span>
          <span>Phnom Penh Airport to Kampot from $35</span>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container section-head">
      <p class="eyebrow">Popular Taxi Transfers</p>
      <h2 data-i18n="popularRoutes">Popular routes with public from-prices</h2>
      <p>Choose a route, check the from-price, then tap Book Now to confirm the final quote with Tha.</p>
    </div>
    <div class="container">${routeGrid(preview, prefix)}</div>
  </section>
  <section class="section soft">
    <div class="container split">
      <div>
        <p class="eyebrow">Kampot Tours</p>
        <h2>Local tours around Kampot, Bokor, and mangrove areas</h2>
        <p>Flexible local trips for travelers who want a private driver for countryside stops, viewpoints, Bokor-style routes, or custom Kampot plans.</p>
        <a class="details-button wide" href="kampot-tours/index.html">View Kampot tours &rarr;</a>
      </div>
      ${routeGrid(["kampot-to-bokor-mountain", "kampot-mangrove-forest-trip"], prefix)}
    </div>
  </section>
  <section class="section">
    <div class="container vehicle-preview">
      <div><h2>Vehicles for couples, families, and groups</h2><p>SUVs carry up to 4 passengers. Vans carry up to 7 passengers. All vehicles have air conditioning and luggage space.</p><a class="details-button" href="vehicles/index.html">See vehicles &rarr;</a></div>
      <div class="mini-cards"><div><strong>SUV</strong><span>Up to 4 passengers</span></div><div><strong>Van</strong><span>Up to 7 passengers</span></div></div>
    </div>
  </section>
  <section class="section soft">
    <div class="container steps">
      <div><p class="eyebrow">How booking works</p><h2>Choose a route, then confirm by WhatsApp</h2></div>
      <ol><li>Choose your route</li><li>Tap Book Now or send WhatsApp message</li><li>Share pickup, destination, date/time, passengers, luggage, and vehicle preference</li><li>Confirm your quote with Tha</li><li>Pay by ABA or cash at pickup</li></ol>
    </div>
  </section>
  ${noteBlock()}
  ${faqSection(true)}`;
  return pageShell({
    title:
      "Kampot Taxi by Tha | Private Taxi Transfers, Kampot Tours & Cambodia Routes",
    desc: "Book private taxi transfers and Kampot tours with Kampot Taxi by Tha. From-price routes for Phnom Penh, Phnom Penh Airport, Kep, Sihanoukville, Bokor Mountain, Siem Reap, and custom Cambodia travel. Message Tha on WhatsApp or Telegram.",
    prefix,
    urlPath: "",
    body,
  });
}

function catalogPage({
  kind,
  title,
  desc,
  intro,
  slugs,
  prefix = "../",
  urlPath,
}) {
  const body = `<section class="page-hero">
    <div class="container">
      <p class="eyebrow">${kind}</p>
      <h1>${esc(title)}</h1>
      <p>${esc(intro)}</p>
      <div class="hero-actions"><a class="book-button" href="${waHref("")}" target="_blank" rel="noopener" data-i18n="bookWhatsApp">Book on WhatsApp</a><button class="telegram-button telegram-open" type="button">Telegram: ${telegram}</button></div>
    </div>
  </section>
  <section class="section"><div class="container">${routeGrid(slugs, prefix)}</div></section>
  ${noteBlock()}
  ${bookingCTA(prefix)}
  ${faqSection(true)}`;
  return pageShell({ title, desc, prefix, urlPath, body });
}

function vehiclesPage() {
  const prefix = "../";
  const body = `<section class="page-hero"><div class="container"><p class="eyebrow">Vehicles</p><h1>Air-conditioned SUV and van options</h1><p>Choose the right vehicle for your passengers, luggage, route, and travel day.</p></div></section>
  <section class="section"><div class="container vehicle-grid">
    <article class="vehicle-card">${photo(routes[4], prefix, "vehicle-photo")}<div><h2>SUV</h2><ul><li>Up to 4 passengers</li><li>Air conditioning</li><li>Luggage space</li><li>Good for couples, solo travelers, small families, and small groups</li><li>Examples include Lexus / Highlander style vehicles</li><li>From-prices vary by route</li></ul></div></article>
    <article class="vehicle-card">${photo(routes[1], prefix, "vehicle-photo")}<div><h2>Van</h2><ul><li>Up to 7 passengers</li><li>Air conditioning</li><li>Luggage space</li><li>Good for families, groups, airport rides, and luggage-heavy trips</li><li>From-prices vary by route</li></ul></div></article>
  </div></section>
  <section class="section soft"><div class="container"><div class="section-head"><p class="eyebrow">Photo gallery</p><h2>Vehicle photos</h2><p>Real vehicle photos can be placed in assets/images using the required filenames.</p></div><div class="gallery-grid">${["kampot-taxi-van-front.jpg", "kampot-taxi-van-scenic.jpg", "kampot-taxi-suv-highlander.jpg"].map((file, index) => `<div class="photo-slot gallery-photo" role="img" aria-label="${index === 0 ? "White van used by Kampot Taxi by Tha" : index === 1 ? "Kampot Taxi by Tha van parked near a scenic local stop" : "Toyota Highlander SUV used by Kampot Taxi by Tha"}" style="--photo:url('../assets/images/${file}')"><span class="photo-fallback">${file}</span></div>`).join("")}</div></div></section>
  <section class="section"><div class="container split"><div><h2>Which vehicle should I choose?</h2><p>For couples and small groups, an SUV is usually comfortable and direct. For families, groups, airport rides, or luggage-heavy trips, a van gives more space.</p></div><div class="info-box"><strong>All vehicles</strong><p>Air conditioning, luggage space, and private route planning with Tha.</p></div></div></section>
  ${bookingCTA(prefix)}`;
  return pageShell({
    title: "Vehicles | Kampot Taxi by Tha SUV and Van Options",
    desc: "Compare SUV and van options for Kampot Taxi by Tha. SUVs carry up to 4 passengers and vans carry up to 7 passengers, with air conditioning and luggage space.",
    prefix,
    urlPath: "vehicles/",
    body,
  });
}

function bookingPage() {
  const prefix = "../";
  const options = routes
    .map(
      (r) =>
        `<option value="${esc(r.whatsappMessageTitle)}">${esc(r.title)}</option>`,
    )
    .join("");
  const body = `<section class="page-hero"><div class="container"><p class="eyebrow">Booking</p><h1>Send a taxi request on WhatsApp</h1><p>Fill the details below. This website does not store your data or submit to a server. The button opens WhatsApp with your message.</p></div></section>
  <section class="section"><div class="container booking-layout">
    <form class="booking-form" id="booking-form">
      <label><span data-i18n="routeTrip">Route / trip</span><select name="route" id="route-select" required><option value="">Choose a route</option>${options}</select></label>
      <label><span data-i18n="vehicle">Vehicle</span><select name="vehicle"><option>SUV or Van</option><option>SUV</option><option>Van</option><option>Not sure</option></select></label>
      <label><span>Travel date</span><input name="date" type="date" required></label>
      <label><span>Travel time</span><input name="time" type="time"></label>
      <label><span data-i18n="pickup">Pickup location</span><input name="pickup" type="text" required placeholder="Hotel, airport, or address"></label>
      <label><span data-i18n="destination">Destination</span><input name="destination" type="text" required placeholder="Where do you want to go?"></label>
      <label><span data-i18n="passengers">Passengers</span><input name="passengers" type="number" min="1" max="7" placeholder="2"></label>
      <label><span data-i18n="luggage">Luggage</span><input name="luggage" type="text" placeholder="2 suitcases"></label>
      <label><span data-i18n="name">Name</span><input name="name" type="text" autocomplete="name"></label>
      <label><span>Contact number / WhatsApp</span><input name="contact" type="text" autocomplete="tel"></label>
      <label class="full"><span>Notes</span><textarea name="notes" rows="4" placeholder="Flight number, stops, waiting time, special requests"></textarea></label>
      <p class="form-error" id="form-error" role="alert" aria-live="polite"></p>
      <button class="book-button full" type="submit" data-i18n="sendWhatsApp">Send request on WhatsApp</button>
      <noscript><a class="details-button wide" href="${waHref("")}" target="_blank" rel="noopener">Open generic WhatsApp request</a></noscript>
    </form>
    <aside class="booking-side">
      <h2>Before booking</h2>
      <ul><li>Booking requests are welcome 24 hours a day.</li><li>Please message at least 4 hours before pickup when possible.</li><li>Payment by ABA or cash at pickup.</li><li>Prices are "From" prices and should be confirmed with Tha.</li><li>Simple English and Google Translate welcome.</li></ul>
      <p class="khmer" lang="km">អាចទាក់ទងតាម Telegram ឬ WhatsApp ដើម្បីសួរតម្លៃ និងកក់ឡាន។</p>
    </aside>
  </div></section>
  ${noteBlock()}`;
  return pageShell({
    title: "Book a Taxi | Kampot Taxi by Tha WhatsApp Request",
    desc: "Send a WhatsApp taxi request to Kampot Taxi by Tha. Choose route, vehicle, pickup, destination, date, passengers, luggage, and contact details. No backend or data storage.",
    prefix,
    urlPath: "booking/",
    body,
  });
}

function contactPage() {
  const prefix = "../";
  const body = `<section class="page-hero"><div class="container"><p class="eyebrow">Contact</p><h1>Contact Tha for a taxi quote</h1><p>Use WhatsApp for the fastest booking request. Telegram is visible as a secondary contact method.</p><div class="hero-actions"><a class="book-button" href="${waHref("")}" target="_blank" rel="noopener">WhatsApp: 012960940</a><button class="telegram-button telegram-open" type="button">Telegram: ${telegram}</button></div></div></section>
  <section class="section"><div class="container contact-grid">
    <div class="info-box"><h2>Send these details</h2><ul><li>Route or trip</li><li>Travel date and time</li><li>Pickup location</li><li>Destination</li><li>Passengers and luggage</li><li>SUV, Van, or Not sure</li><li>Name and contact number</li></ul></div>
    <div class="info-box"><h2>Payment and language</h2><p>Payment by ABA or cash at pickup.</p><p>Simple English and Google Translate welcome through WhatsApp or Telegram.</p><p class="khmer" lang="km">អាចទាក់ទងតាម Telegram ឬ WhatsApp ដើម្បីសួរតម្លៃ និងកក់ឡាន។</p></div>
  </div></section>
  ${faqSection(false)}`;
  return pageShell({
    title: "Contact Kampot Taxi by Tha | WhatsApp and Telegram",
    desc: "Contact Kampot Taxi by Tha by WhatsApp or Telegram to ask for a private taxi quote, airport transfer, Kampot tour, or custom Cambodia route.",
    prefix,
    urlPath: "contact/",
    body,
  });
}

function routeDetailPage(route) {
  const prefix = "../../";
  const isTour = tours.includes(route.slug);
  const backUrl = isTour
    ? "kampot-tours/index.html"
    : "taxi-transfers/index.html";
  const related = routes
    .filter((r) => r.slug !== route.slug)
    .slice(0, 3)
    .map((r) => routeCard(r, prefix))
    .join("\n");
  const body = `<section class="route-hero">
    <div class="container route-hero-grid">
      <div><p class="eyebrow">${esc(route.categoryLabel)}</p><h1>${esc(route.title)}</h1><p>${esc(route.description)}</p><div class="hero-actions"><a class="book-button" href="${waHref(route.whatsappMessageTitle)}" data-wa-route="${esc(route.whatsappMessageTitle)}" target="_blank" rel="noopener">Book this route</a><a class="details-button on-dark" href="${rel(prefix, backUrl)}">Back to ${isTour ? "Kampot Tours" : "Taxi Transfers"}</a></div></div>
      <div>${photo(route, prefix, "detail-photo")}</div>
    </div>
  </section>
  <section class="section"><div class="container route-detail-grid">
    <article class="detail-main">
      <h2>Private ${esc(route.tripType.toLowerCase())}</h2>
      <p>${esc(route.description)} This route is private, direct, and planned by message before travel so the pickup point, destination, timing, passengers, luggage, and vehicle are clear.</p>
      <h2>What to send Tha</h2>
      <ul><li>Travel date and time</li><li>Pickup location and destination</li><li>Number of passengers</li><li>Amount of luggage</li><li>Preferred vehicle: SUV, Van, or Not sure</li><li>Name, contact number, and any stops or notes</li></ul>
      <h2>Vehicle capacity</h2>
      <p>SUVs carry up to 4 passengers. Vans carry up to 7 passengers. All vehicles have air conditioning and luggage space.</p>
      <h2>Payment and exclusions</h2>
      <p>Payment by ABA or cash at pickup. Entry fees, ferry tickets, boat tickets, parking, and attraction costs are separate unless confirmed in your quote.</p>
      <p>Early morning and late-night requests are welcome. Message Tha to confirm availability.</p>
    </article>
    <aside class="detail-side">
      ${tripCard(route)}
      <div class="price-box"><h2>From prices</h2><div><span>SUV from</span><strong>${esc(route.suvPrice)}</strong></div><div><span>Van from</span><strong>${esc(route.vanPrice)}</strong></div><div><span>Approx duration</span><strong>${esc(route.duration)}</strong></div></div>
      <a class="book-button wide" href="${waHref(route.whatsappMessageTitle)}" data-wa-route="${esc(route.whatsappMessageTitle)}" target="_blank" rel="noopener">Book Now</a>
    </aside>
  </div></section>
  ${noteBlock()}
  <section class="section soft"><div class="container section-head"><p class="eyebrow">Related routes</p><h2>Other private taxi options</h2></div><div class="container route-grid">${related}</div></section>
  ${bookingCTA(prefix, `Book ${route.whatsappMessageTitle}`)}`;
  return pageShell({
    title: `${route.whatsappMessageTitle} | Kampot Taxi by Tha`,
    desc: `${route.description} From ${route.fromPrice}. Confirm final price, pickup, passengers, luggage, and vehicle with Tha by WhatsApp.`,
    prefix,
    urlPath: `routes/${route.slug}/`,
    body,
    image: route.image,
  });
}

function dataRoutes() {
  return `window.KT_ROUTES = ${JSON.stringify(routes, null, 2)};\n`;
}

function i18n() {
  const base = {
    navHome: "Home",
    navTransfers: "Taxi Transfers",
    navTours: "Kampot Tours",
    navVehicles: "Vehicles",
    navBooking: "Booking",
    navContact: "Contact",
    bookWhatsApp: "Book on WhatsApp",
    bookNow: "Book Now",
    moreDetails: "More details",
    from: "From",
    askForQuote: "Ask for quote",
    sendWhatsApp: "Send request on WhatsApp",
    popularRoutes: "Popular routes with public from-prices",
    heroLead:
      "Private taxi transfers, Kampot tours, airport pickups, and long-distance rides across Cambodia.",
    routeTrip: "Route / trip",
    vehicle: "Vehicle",
    pickup: "Pickup location",
    destination: "Destination",
    passengers: "Passengers",
    luggage: "Luggage",
    name: "Name",
    payment: "Payment",
    pricingNoteTitle: "From-price note",
    simpleBooking: "Simple booking",
    faqHeading: "Common booking questions",
    topbar:
      "Booking requests welcome 24 hours. Please message 4+ hours ahead when possible.",
  };
  const t = {
    en: base,
    "zh-CN": {
      ...base,
      navHome: "首页",
      navTransfers: "出租车路线",
      navTours: "贡布旅游",
      navVehicles: "车辆",
      navBooking: "预订",
      navContact: "联系",
      bookWhatsApp: "WhatsApp 预订",
      bookNow: "立即预订",
      moreDetails: "更多详情",
      from: "起价",
      askForQuote: "询价",
      sendWhatsApp: "通过 WhatsApp 发送",
    },
    fr: {
      ...base,
      navHome: "Accueil",
      navTransfers: "Transferts taxi",
      navTours: "Tours Kampot",
      navVehicles: "Véhicules",
      navBooking: "Réserver",
      navContact: "Contact",
      bookWhatsApp: "Réserver sur WhatsApp",
      bookNow: "Réserver",
      moreDetails: "Plus de détails",
      from: "À partir de",
      askForQuote: "Demander un prix",
      sendWhatsApp: "Envoyer sur WhatsApp",
    },
    de: {
      ...base,
      navHome: "Start",
      navTransfers: "Taxi-Transfers",
      navTours: "Kampot-Touren",
      navVehicles: "Fahrzeuge",
      navBooking: "Buchung",
      navContact: "Kontakt",
      bookWhatsApp: "Per WhatsApp buchen",
      bookNow: "Jetzt buchen",
      moreDetails: "Mehr Details",
      from: "Ab",
      askForQuote: "Preis anfragen",
      sendWhatsApp: "Per WhatsApp senden",
    },
    it: {
      ...base,
      navHome: "Home",
      navTransfers: "Transfer taxi",
      navTours: "Tour Kampot",
      navVehicles: "Veicoli",
      navBooking: "Prenota",
      navContact: "Contatto",
      bookWhatsApp: "Prenota su WhatsApp",
      bookNow: "Prenota",
      moreDetails: "Dettagli",
      from: "Da",
      askForQuote: "Chiedi preventivo",
      sendWhatsApp: "Invia su WhatsApp",
    },
    ko: {
      ...base,
      navHome: "홈",
      navTransfers: "택시 이동",
      navTours: "캄폿 투어",
      navVehicles: "차량",
      navBooking: "예약",
      navContact: "연락처",
      bookWhatsApp: "WhatsApp 예약",
      bookNow: "예약하기",
      moreDetails: "자세히",
      from: "부터",
      askForQuote: "견적 요청",
      sendWhatsApp: "WhatsApp으로 보내기",
    },
    pt: {
      ...base,
      navHome: "Início",
      navTransfers: "Táxi privado",
      navTours: "Passeios Kampot",
      navVehicles: "Veículos",
      navBooking: "Reserva",
      navContact: "Contato",
      bookWhatsApp: "Reservar no WhatsApp",
      bookNow: "Reservar",
      moreDetails: "Mais detalhes",
      from: "Desde",
      askForQuote: "Pedir preço",
      sendWhatsApp: "Enviar no WhatsApp",
    },
    ru: {
      ...base,
      navHome: "Главная",
      navTransfers: "Такси",
      navTours: "Туры Кампот",
      navVehicles: "Авто",
      navBooking: "Бронирование",
      navContact: "Контакт",
      bookWhatsApp: "Написать в WhatsApp",
      bookNow: "Забронировать",
      moreDetails: "Подробнее",
      from: "От",
      askForQuote: "Запросить цену",
      sendWhatsApp: "Отправить в WhatsApp",
    },
    es: {
      ...base,
      navHome: "Inicio",
      navTransfers: "Traslados taxi",
      navTours: "Tours Kampot",
      navVehicles: "Vehículos",
      navBooking: "Reserva",
      navContact: "Contacto",
      bookWhatsApp: "Reservar por WhatsApp",
      bookNow: "Reservar",
      moreDetails: "Más detalles",
      from: "Desde",
      askForQuote: "Pedir precio",
      sendWhatsApp: "Enviar por WhatsApp",
    },
    vi: {
      ...base,
      navHome: "Trang chủ",
      navTransfers: "Taxi tuyến",
      navTours: "Tour Kampot",
      navVehicles: "Xe",
      navBooking: "Đặt xe",
      navContact: "Liên hệ",
      bookWhatsApp: "Đặt qua WhatsApp",
      bookNow: "Đặt ngay",
      moreDetails: "Chi tiết",
      from: "Từ",
      askForQuote: "Hỏi giá",
      sendWhatsApp: "Gửi qua WhatsApp",
    },
  };
  return `window.KT_I18N = ${JSON.stringify(t, null, 2)};\n`;
}

function contract() {
  const routeLines = routes
    .map(
      (r, i) =>
        `${i + 1}. ${r.title} (${r.slug}) - From ${r.fromPrice}; SUV ${r.suvPrice}; Van ${r.vanPrice}; ${r.duration}; ${r.categoryLabel}; ${r.detailUrl}`,
    )
    .join("\n");
  return `# Website Build Contract: Kampot Taxi by Tha

This file replaces the rejected single-page version. Future changes must preserve this contract unless the product owner explicitly changes it.

## Project Location

Project folder: \`~/Desktop/Codejects/KampotTaxiWebsite\`.

The folder is intended to become the GitHub repository for the website.

## Repository Safety Rule

NEVER EVER EVER commit or push this website to any repository other than:

- \`KampotTaxi/KampotTaxi.github.io\`

This site is hosted from the \`KampotTaxi.github.io\` repository under the \`KampotTaxi\` GitHub organization. Before any push, verify the git remote points to that repository and not to any personal-account or unrelated website repository.

Pay special attention to never overwrite, commit to, or push to either of the other websites hosted under the same GitHub account:

- \`hagerlabs.com\`
- \`tavraOS.com\`

## Required Direction

- Static multi-page GitHub Pages website.
- Route-first and price-first Cambodia taxi booking catalog.
- Not a single-page site.
- Not a SaaS landing page.
- Inspired structurally by Cambodia private taxi destination pages, without copying their text, imagery, logo, reviews, claims, or branding.
- Orange header/navigation energy, blue booking buttons, large route cards, floating WhatsApp and Telegram buttons, language selector, and individual route pages.

## Backend Rule

- No backend for v1.
- No login, admin dashboard, database, cloud functions, analytics, booking storage, payment processing, live translation API, or third-party booking widget.
- Booking actions route to WhatsApp, Telegram, or phone-style contact.
- Future backend preference, if explicitly requested: Parse on Back4App, https://www.back4app.com.

## Business Facts

- Business name: Kampot Taxi by Tha.
- Business type: Private taxi / private driver service based around Kampot, Cambodia.
- Audience: Foreign tourists visiting Cambodia, especially Kampot, Kep, Phnom Penh, Sihanoukville, Siem Reap, Bokor, and nearby destinations.
- Coverage: Tha can drive guests across all provinces and cities in Cambodia.
- Supported work: Kampot tours, Phnom Penh airport transfers, Kampot to Phnom Penh, Phnom Penh Airport, Sihanoukville, Kep, Bokor Mountain, mangrove forest trips, Kampot local tours, Siem Reap, Koh Rong ferry / Sihanoukville pier, and custom Cambodia routes.
- Use flexible wording such as "Tell Tha where you want to go."

## Contact

- WhatsApp display: 012960940.
- WhatsApp deep link: https://wa.me/85512960940.
- Telegram display: 0964800081.
- Do not invent a Telegram username or t.me link.
- Floating Telegram button must show/copy the number.

## Vehicles

- SUV up to 4 passengers.
- Van up to 7 passengers.
- Examples mentioned: Lexus and Highlander.
- All vehicles have air conditioning and luggage space.

## Booking, Payment, Language

- Booking requests are welcome 24 hours a day.
- Please message at least 4 hours before pickup when possible.
- Payment by ABA or cash at pickup.
- Tha can communicate with some English and Google Translate through WhatsApp/Telegram. Do not claim fluent English.
- English-first site with this Khmer support line near contact/booking: អាចទាក់ទងតាម Telegram ឬ WhatsApp ដើម្បីសួរតម្លៃ និងកក់ឡាន។

## Preferred Future Domain

Preferred future domain: kampottaxibytha.com, pending availability and purchase.

Update canonical URLs, robots.txt, and sitemap.xml after domain purchase/configuration.

## Route Pricing Rule

- Prices are public but not fixed guarantees.
- Display prices as "From $..." everywhere.
- Final price may depend on pickup location, destination, stops, passengers, luggage, vehicle, timing, and current travel conditions.
- Confirm final quote by WhatsApp or Telegram.
- Do not claim tickets, boat fees, parking, attraction entry fees, or third-party costs are included unless confirmed.
- Required caveat: Entry fees, ferry tickets, boat tickets, parking, and attraction costs are separate unless confirmed in your quote.

## Route Data

${routeLines}

## Required Pages

- index.html
- taxi-transfers/index.html
- kampot-tours/index.html
- vehicles/index.html
- booking/index.html
- contact/index.html
- routes/kampot-to-phnom-penh-city/index.html
- routes/kampot-to-phnom-penh-airport/index.html
- routes/phnom-penh-airport-to-kampot/index.html
- routes/kampot-to-sihanoukville/index.html
- routes/kampot-to-kep/index.html
- routes/kampot-to-bokor-mountain/index.html
- routes/kampot-mangrove-forest-trip/index.html
- routes/kampot-full-day-tour/index.html
- routes/kampot-half-day-tour/index.html
- routes/kampot-to-siem-reap/index.html
- routes/kampot-to-koh-rong-ferry/index.html
- routes/custom-cambodia-route/index.html

## Route Card Format

Every listed trip must use:

1. Image or styled photo placeholder.
2. Route title.
3. Brief description.
4. Working "More details" button.
5. Trip card with From price, destination label, category label, approximate duration, and Book Now button.

Trip card style: light gray background, thin bright-blue border, prominent From price, gray icon rows, large rounded blue Book Now button.

## Vehicle Photos

Tha confirmed the provided vehicle photos may be published publicly. The photos were not found locally during this rebuild. Place them here:

- assets/images/kampot-taxi-van-front.jpg
- assets/images/kampot-taxi-van-scenic.jpg
- assets/images/kampot-taxi-suv-highlander.jpg

Do not use images from cambodiatourtaxi.com. Do not hotlink reference images.

## Language Selector

Options: Chinese Simplified, English, French, German, Italian, Korean, Portuguese, Russian, Spanish, Vietnamese.

Behavior:

- Detect navigator.language on first load.
- Default to English if unsupported.
- Persist user selection in localStorage.
- Update visible UI labels and html lang.
- No live translation APIs.
- English remains authoritative. Route names may remain English.

## WhatsApp Message

Generic and route-specific messages must use:

Hello Tha, I would like to book or request a quote.
Route: [route title]
Vehicle: SUV or Van
Travel date/time:
Pickup location:
Destination:
Number of passengers:
Luggage:
Name:
Notes:

## SEO

- Unique page titles and descriptions.
- Open Graph and Twitter card tags.
- Canonical placeholders.
- Static route content visible in HTML.
- TaxiService or LocalBusiness JSON-LD without inventing a street address.
- areaServed: Kampot, Cambodia, Phnom Penh International Airport, Kep, Sihanoukville, Siem Reap, Bokor Mountain.

## Acceptance Criteria

1. Rejected old design is replaced entirely.
2. Site opens locally by loading index.html.
3. Static and suitable for GitHub Pages.
4. Multi-page, not single-page.
5. Required pages and all 12 route detail pages exist.
6. Design is polished on mobile and desktop and reads like a Cambodia taxi route booking catalog.
7. Every listed trip uses the required route card format.
8. Every More details button links to a working route detail page.
9. Every trip card includes From price, destination label, category label, approximate duration, and Book Now button.
10. Floating WhatsApp and Telegram buttons appear on every page.
11. WhatsApp uses +85512960940.
12. Telegram number 0964800081 is visible and no username is invented.
13. Booking form builds WhatsApp message and never submits to a server.
14. Prices are From prices, not fixed guarantees.
15. Route data includes all 12 routes.
16. SUV capacity is up to 4 passengers and van capacity is up to 7 passengers.
17. Site states air conditioning and luggage space.
18. Payment methods are ABA or cash at pickup.
19. Booking requests are welcome 24 hours and 4+ hours advance notice is recommended when possible.
20. No fake reviews, ratings, awards, guarantees, licenses, years of experience, or unsupported claims.
21. No backend, no data collection, no data storage.
22. README explains deployment and update locations.
23. No external reference-site images.
24. No broken internal links or dead buttons.
25. No console errors.
26. Language selector exists, defaults intelligently, and persists selection.
`;
}

function readme() {
  return `# Kampot Taxi by Tha

Static multi-page GitHub Pages website for Kampot Taxi by Tha, a private taxi and driver service based in Kampot, Cambodia.

This is intentionally a multi-page route catalog, not a single-page site.

## Open locally

Open \`index.html\` directly in a browser. The site is static and does not require a server.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub, open **Settings > Pages**.
3. Select **Deploy from a branch**.
4. Choose the \`main\` branch and \`/root\`.
5. Save and wait for GitHub Pages to publish.

The site uses relative paths for CSS, JavaScript, route pages, and assets.

## Update route prices

Route source data lives in \`data/routes.js\`. Static route cards and detail pages are generated from the same route data used by this build. If prices change, update \`data/routes.js\` and the visible static HTML pages, or rerun the local generator at \`tools/generate-site.mjs\`.

## Update contact numbers

Update WhatsApp and Telegram values in:

- \`tools/generate-site.mjs\`
- \`script.js\`
- \`data/routes.js\` only if route message titles change

Current values:

- WhatsApp display: \`012960940\`
- WhatsApp deep link number: \`+85512960940\`
- Telegram display: \`0964800081\`

Do not invent a Telegram username.

## Vehicle photos

The expected image paths are:

- \`assets/images/kampot-taxi-van-front.jpg\`
- \`assets/images/kampot-taxi-van-scenic.jpg\`
- \`assets/images/kampot-taxi-suv-highlander.jpg\`

The photos were not found locally during this rebuild, so the site uses styled photo placeholders that reference these paths. Add the real vehicle photos with those exact filenames when available.

## Domain

Preferred future domain: kampottaxibytha.com, pending availability and purchase.

After the domain is purchased/configured, update:

- Canonical URLs in generated HTML
- \`robots.txt\`
- \`sitemap.xml\`

## Backend

Version 1 has no backend and no data storage. Booking requests open WhatsApp. Telegram is shown as a secondary contact method.

If future backend work is requested, prefer Parse on Back4App: https://www.back4app.com.
`;
}

function styles() {
  return `:root{--orange:#f28c00;--orange-dark:#d96f00;--blue:#0757e6;--blue-dark:#0446bd;--wa:#128c7e;--telegram:#229ed9;--text:#252a31;--muted:#5f6368;--card:#f4f6f8;--line:#d9e1ea;--cream:#fff7eb;--white:#fff;--shadow:0 18px 45px rgba(37,42,49,.12);font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}[hidden]{display:none!important}html{scroll-behavior:smooth}body{margin:0;color:var(--text);background:var(--white);line-height:1.55}a{color:inherit}.container{width:min(1160px,calc(100% - 28px));margin:0 auto}.skip-link{position:absolute;left:12px;top:-80px;background:#111;color:#fff;padding:10px 12px;border-radius:10px;z-index:100}.skip-link:focus{top:12px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.topbar{background:var(--orange-dark);color:#fff;font-size:.86rem}.topbar-inner{display:flex;gap:14px;justify-content:space-between;padding:8px 0}.nav-wrap{position:sticky;top:0;z-index:50;background:var(--orange);box-shadow:0 2px 14px rgba(0,0,0,.14)}.nav-inner{min-height:74px;display:flex;align-items:center;gap:18px}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff;min-width:220px}.brand-badge{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:#fff;color:var(--orange-dark)}.brand-badge svg{width:26px;height:26px}.brand strong,.brand small{display:block}.brand strong{line-height:1.1;font-size:1rem}.brand small{font-size:.78rem;opacity:.9}.desktop-nav{display:flex;gap:3px;flex:1;justify-content:center}.desktop-nav a{color:#fff;text-decoration:none;font-weight:800;padding:11px 10px;border-radius:10px}.desktop-nav a:hover{background:rgba(255,255,255,.18)}.nav-actions{display:flex;align-items:center;gap:9px}.language-select{height:39px;border:0;border-radius:999px;padding:0 9px;font-weight:800;color:#333;background:#fff}.header-wa,.book-button{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:999px;background:var(--blue);color:#fff;text-decoration:none;font-weight:900;min-height:46px;padding:12px 20px;box-shadow:0 8px 20px rgba(7,87,230,.22);cursor:pointer}.header-wa{min-height:40px;padding:9px 15px;background:#fff;color:var(--blue)}.book-button:hover{background:var(--blue-dark)}.menu-toggle,.menu-close{display:none;border:0;background:transparent;color:#fff;cursor:pointer}.menu-toggle span{display:block;width:25px;height:3px;background:#fff;margin:5px 0;border-radius:999px}.mobile-menu{position:fixed;inset:0;background:rgba(37,42,49,.48);z-index:80}.mobile-menu-panel{margin-left:auto;max-width:360px;height:100%;background:var(--orange);color:#fff;padding:20px;display:flex;flex-direction:column;gap:18px}.mobile-menu-head{display:flex;justify-content:space-between;align-items:center}.menu-close{display:block;font-size:2rem}.mobile-language{display:grid;gap:8px;font-weight:800}.mobile-nav{display:grid;gap:8px}.mobile-nav a{color:#fff;text-decoration:none;font-size:1.15rem;font-weight:900;padding:12px;border-radius:10px;background:rgba(255,255,255,.14)}.mobile-contact{margin-top:auto;display:grid;gap:10px}.telegram-open,.telegram-button{border:2px solid var(--telegram);background:#fff;color:var(--telegram);border-radius:999px;min-height:46px;padding:11px 17px;font-weight:900;cursor:pointer}.hero{background:linear-gradient(180deg,var(--cream),#fff);padding:58px 0}.hero-grid,.route-hero-grid,.split,.two-col,.booking-layout,.route-detail-grid,.contact-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.82fr);gap:32px;align-items:start}.eyebrow{margin:0 0 8px;color:var(--orange-dark);font-size:.78rem;text-transform:uppercase;font-weight:900;letter-spacing:0}h1,h2,h3,p{overflow-wrap:anywhere}h1{font-size:clamp(2.2rem,7vw,4.8rem);line-height:1.02;margin:0 0 14px}h2{font-size:clamp(1.8rem,4vw,3rem);line-height:1.1;margin:0 0 12px}h3{font-size:1.22rem;line-height:1.22;margin:0 0 9px}.hero-lead,.page-hero p,.route-hero p,.muted{color:var(--muted);font-size:1.08rem}.hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.trust-chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:24px}.trust-chips span{background:#fff;border:1px solid var(--line);border-radius:999px;padding:8px 10px;font-size:.86rem;font-weight:800}.hero-panel,.info-box,.detail-main,.booking-side{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow);padding:16px}.photo-slot{min-height:220px;border-radius:18px;background-color:#dfe7ef;background-image:linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.28)),var(--photo);background-size:cover;background-position:center;position:relative;overflow:hidden}.photo-fallback{display:none;position:absolute;left:16px;right:16px;bottom:16px;color:#fff;font-weight:900;text-shadow:0 1px 5px rgba(0,0,0,.3)}.hero-photo{min-height:330px}.quick-card{display:grid;gap:8px;margin-top:12px;background:var(--card);border-radius:14px;padding:15px}.section{padding:64px 0}.soft{background:var(--cream)}.section-head{max-width:780px;margin-bottom:24px}.section-head p{color:var(--muted)}.route-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.route-card{display:grid;grid-template-rows:auto auto 1fr;gap:13px}.route-photo{min-height:210px}.route-copy{padding:0 2px}.route-copy p{color:var(--muted);margin:0 0 12px}.details-button,.outline-light{display:inline-flex;justify-content:center;align-items:center;min-height:44px;border:2px solid #c7cfd9;border-radius:999px;padding:10px 16px;color:var(--text);font-weight:900;text-decoration:none;background:#fff}.details-button.wide,.book-button.wide{width:100%}.details-button:hover{border-color:var(--blue);color:var(--blue)}.trip-card{background:var(--card);border:2px solid var(--blue);border-radius:18px;padding:18px;display:grid;gap:12px;align-self:start}.trip-price{font-weight:900;color:var(--blue);font-size:1.45rem}.price-prefix{font-size:.95rem;color:var(--muted);margin-right:4px}.price-main{color:var(--blue)}.trip-row{display:flex;align-items:center;gap:10px;color:#3d4650;font-weight:750}.icon{width:21px;height:21px;color:#7d8793;flex:0 0 auto}.page-hero,.route-hero{background:linear-gradient(180deg,var(--cream),#fff);padding:54px 0}.route-hero{background:linear-gradient(135deg,#26313c,#0d2f62);color:#fff}.route-hero h1,.route-hero p{color:#fff}.on-dark{background:transparent;color:#fff;border-color:rgba(255,255,255,.5)}.note-band{background:#10233f;color:#fff;padding:30px 0}.note-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.note-grid p{color:rgba(255,255,255,.78);margin:5px 0 0}.cta-band{background:var(--orange);color:#fff;padding:38px 0}.cta-inner{display:flex;gap:22px;justify-content:space-between;align-items:center}.cta-inner h2{color:#fff}.cta-inner p{margin:0;color:rgba(255,255,255,.9)}.cta-actions{display:grid;gap:10px;min-width:240px}.outline-light{background:transparent;color:#fff;border-color:rgba(255,255,255,.7)}.vehicle-preview,.vehicle-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.mini-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px}.mini-cards div,.price-box{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px}.mini-cards strong,.mini-cards span{display:block}.steps{display:grid;grid-template-columns:.7fr 1fr;gap:28px}.steps ol{margin:0;padding-left:22px;font-weight:800}.steps li{margin-bottom:12px}.faq-list{display:grid;gap:10px}details{background:#fff;border:1px solid var(--line);border-radius:14px}summary{cursor:pointer;padding:16px;font-weight:900}details p{padding:0 16px 16px;margin:0;color:var(--muted)}.vehicle-card{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow);overflow:hidden}.vehicle-card>div:not(.photo-slot){padding:22px}.vehicle-card li,.detail-main li,.booking-side li,.contact-grid li{margin-bottom:8px}.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.gallery-photo{min-height:250px}.booking-form{display:grid;grid-template-columns:1fr 1fr;gap:15px;background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow);padding:22px}.booking-form label{display:grid;gap:6px;font-weight:900}.booking-form input,.booking-form select,.booking-form textarea{width:100%;border:1px solid #cbd3dc;border-radius:12px;padding:12px;font:inherit}.full{grid-column:1/-1}.form-error{min-height:24px;color:#b32418;font-weight:800;margin:0}.route-detail-grid{grid-template-columns:minmax(0,1fr) 340px}.detail-main h2{margin-top:20px}.detail-side{display:grid;gap:16px;position:sticky;top:95px}.price-box{display:grid;gap:10px}.price-box div{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--line);padding-top:10px}.price-box strong{color:var(--blue);font-size:1.2rem}.khmer{font-family:"Noto Sans Khmer",Inter,system-ui,sans-serif}.site-footer{background:#242a31;color:#fff;padding:34px 0 84px}.footer-grid{display:grid;grid-template-columns:1.1fr .7fr 1fr;gap:26px}.site-footer p,.footer-contact span{color:rgba(255,255,255,.76)}.site-footer nav,.footer-contact{display:grid;gap:8px}.site-footer a{color:#fff;text-decoration:none;font-weight:800}.floating-contact{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom));z-index:70;display:flex;align-items:center;gap:10px}.float-wa{background:var(--wa);color:#fff;text-decoration:none;border-radius:999px;padding:13px 18px;font-weight:900;box-shadow:var(--shadow)}.float-telegram{width:52px;height:52px;border-radius:50%;border:0;background:var(--telegram);color:#fff;font-size:1.3rem;font-weight:900;box-shadow:var(--shadow);cursor:pointer}.telegram-modal{position:fixed;inset:0;z-index:90;background:rgba(37,42,49,.48);display:grid;place-items:center;padding:20px}.telegram-card{position:relative;background:#fff;border-radius:18px;padding:24px;box-shadow:var(--shadow);width:min(380px,100%)}.telegram-card h2{margin:0 0 12px;font-size:1.7rem;line-height:1.15}.telegram-close{position:absolute;right:12px;top:10px;border:0;background:transparent;font-size:1.8rem;cursor:pointer}.telegram-actions{display:flex;gap:10px;flex-wrap:wrap}.telegram-actions button,.telegram-actions a{border:1px solid var(--line);border-radius:999px;padding:10px 14px;background:var(--card);font-weight:900;color:var(--text);text-decoration:none;cursor:pointer}@media (max-width:980px){.desktop-nav,.header-wa,.language-label{display:none}.menu-toggle{display:block}.nav-inner{justify-content:space-between}.route-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-grid,.route-hero-grid,.split,.two-col,.booking-layout,.route-detail-grid,.contact-grid,.steps{grid-template-columns:1fr}.detail-side{position:static}.note-grid,.footer-grid{grid-template-columns:1fr 1fr}.topbar-inner{display:grid}.menu-toggle{margin-left:auto}}@media (max-width:680px){.container{width:min(100% - 20px,1160px)}.route-grid,.note-grid,.vehicle-preview,.vehicle-grid,.gallery-grid,.booking-form,.footer-grid{grid-template-columns:1fr}.hero,.page-hero,.route-hero{padding:38px 0}.section{padding:46px 0}.hero-actions,.cta-inner{display:grid}.cta-actions{min-width:0}.trust-chips span{border-radius:12px}.photo-slot{min-height:190px}.hero-photo{min-height:260px}.floating-contact{right:12px;justify-content:flex-end}.float-wa{flex:0 0 auto;text-align:center}.topbar{font-size:.78rem}.brand{min-width:0}.brand small{display:none}.brand strong{max-width:180px}.route-card{gap:10px}}@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}`;
}

function script() {
  return `(function(){const WA="85512960940";const TG="0964800081";function msg(route){return["Hello Tha, I would like to book or request a quote.","Route: "+(route||""),"Vehicle: SUV or Van","Travel date/time:","Pickup location:","Destination:","Number of passengers:","Luggage:","Name:","Notes:"].join("\\n")}function href(route){return"https://wa.me/"+WA+"?text="+encodeURIComponent(msg(route))}document.querySelectorAll("[data-wa-route]").forEach(a=>{a.href=href(a.dataset.waRoute||"")});document.querySelectorAll(".menu-toggle").forEach(btn=>btn.addEventListener("click",()=>{const m=document.getElementById("mobile-menu");if(!m)return;m.hidden=false;btn.setAttribute("aria-expanded","true")}));document.querySelectorAll(".menu-close").forEach(btn=>btn.addEventListener("click",()=>{const m=document.getElementById("mobile-menu");const t=document.querySelector(".menu-toggle");if(!m)return;m.hidden=true;t&&t.setAttribute("aria-expanded","false")}));const langs=["zh-CN","en","fr","de","it","ko","pt","ru","es","vi"];const labels={"zh-CN":"Chinese","en":"English","fr":"French","de":"German","it":"Italian","ko":"Korean","pt":"Portuguese","ru":"Russian","es":"Spanish","vi":"Vietnamese"};const selects=[...document.querySelectorAll(".language-select")];if(selects.length>1&&selects[1].options.length===0){langs.forEach(l=>selects[1].append(new Option(labels[l],l)))}function detect(){const saved=localStorage.getItem("kt_lang");if(saved&&langs.includes(saved))return saved;const nav=(navigator.language||"en").toLowerCase();if(nav.startsWith("zh"))return"zh-CN";const base=nav.split("-")[0];return langs.includes(base)?base:"en"}function applyLang(lang){const dict=(window.KT_I18N&&window.KT_I18N[lang])||window.KT_I18N.en;document.documentElement.lang=lang;localStorage.setItem("kt_lang",lang);selects.forEach(s=>s.value=lang);document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(dict[key])el.textContent=dict[key]})}selects.forEach(s=>s.addEventListener("change",e=>applyLang(e.target.value)));if(window.KT_I18N)applyLang(detect());const modal=document.getElementById("telegram-modal");document.querySelectorAll(".telegram-open").forEach(btn=>btn.addEventListener("click",()=>{if(modal)modal.hidden=false}));document.querySelectorAll(".telegram-close").forEach(btn=>btn.addEventListener("click",()=>{if(modal)modal.hidden=true}));modal&&modal.addEventListener("click",e=>{if(e.target===modal)modal.hidden=true});document.querySelectorAll(".copy-telegram").forEach(btn=>btn.addEventListener("click",async()=>{const status=document.querySelector(".copy-status");try{await navigator.clipboard.writeText(btn.dataset.copy||TG);if(status)status.textContent="Copied Telegram number."}catch(e){if(status)status.textContent="Telegram: "+TG}}));const form=document.getElementById("booking-form");if(form){form.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(form);const route=String(fd.get("route")||"").trim();const pickup=String(fd.get("pickup")||"").trim();const dest=String(fd.get("destination")||"").trim();const date=String(fd.get("date")||"").trim();const err=document.getElementById("form-error");if(!route||!pickup||!dest||!date){if(err)err.textContent="Please add route, pickup location, destination, and travel date.";return}if(err)err.textContent="";const dateTime=[date,String(fd.get("time")||"").trim()].filter(Boolean).join(" ");const lines=["Hello Tha, I would like to book or request a quote.","Route: "+route,"Vehicle: "+String(fd.get("vehicle")||"SUV or Van"),"Travel date/time: "+dateTime,"Pickup location: "+pickup,"Destination: "+dest,"Number of passengers: "+String(fd.get("passengers")||""),"Luggage: "+String(fd.get("luggage")||""),"Name: "+String(fd.get("name")||""),"Contact number / WhatsApp: "+String(fd.get("contact")||""),"Notes: "+String(fd.get("notes")||"")];window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(lines.join("\\n")),"_blank","noopener,noreferrer")})}})();`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;
}

function sitemap() {
  const paths = [
    "",
    "taxi-transfers/",
    "kampot-tours/",
    "vehicles/",
    "booking/",
    "contact/",
    ...routes.map((r) => `routes/${r.slug}/`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${domain}/${p}</loc><changefreq>monthly</changefreq><priority>${p ? "0.8" : "1.0"}</priority></url>`).join("\n")}
</urlset>
`;
}

write("index.html", homePage());
write(
  "taxi-transfers/index.html",
  catalogPage({
    kind: "Taxi Transfers",
    title: "Private Taxi Transfers from Kampot",
    desc: "Browse from-price private taxi transfers with Kampot Taxi by Tha, including Phnom Penh, Phnom Penh Airport, Sihanoukville, Kep, Siem Reap, Koh Rong ferry, and custom Cambodia routes.",
    intro:
      "Compare popular private taxi routes, check From prices, then book by WhatsApp.",
    slugs: transfers,
    urlPath: "taxi-transfers/",
  }),
);
write(
  "kampot-tours/index.html",
  catalogPage({
    kind: "Kampot Tours",
    title: "Kampot Private Tours and Local Driver",
    desc: "Book Kampot private tours with Tha for Bokor Mountain, mangrove forest trips, full-day tours, half-day tours, and flexible local stops.",
    intro: "Plan Kampot sightseeing with a private driver and flexible stops.",
    slugs: tours,
    urlPath: "kampot-tours/",
  }),
);
write("vehicles/index.html", vehiclesPage());
write("booking/index.html", bookingPage());
write("contact/index.html", contactPage());
routes.forEach((route) =>
  write(`routes/${route.slug}/index.html`, routeDetailPage(route)),
);
write("data/routes.js", dataRoutes());
write("data/i18n.js", i18n());
write("styles.css", styles());
write("script.js", script());
write("README.md", readme());
write("WEBSITE_BUILD_CONTRACT.md", contract());
write("robots.txt", robots());
write("sitemap.xml", sitemap());
write(
  "assets/images/README.md",
  `# Vehicle Photos

Place the confirmed public vehicle photos here:

- kampot-taxi-van-front.jpg
- kampot-taxi-van-scenic.jpg
- kampot-taxi-suv-highlander.jpg

The site references these exact filenames and displays styled placeholders until the real images are added.
`,
);
write(
  "assets/icons/README.md",
  `# Icons

The current site uses inline SVG icons in HTML/CSS and JavaScript. This folder is reserved for future static icon assets if needed.
`,
);
