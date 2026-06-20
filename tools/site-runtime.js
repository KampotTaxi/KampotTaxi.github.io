(function () {
  const WA = "85512960940";
  const TG = "0964800081";
  const langs = [
    "zh-CN",
    "en",
    "fr",
    "de",
    "it",
    "km",
    "ko",
    "pt",
    "ru",
    "es",
    "vi",
  ];
  const labels = {
    "zh-CN": "Chinese",
    en: "English",
    fr: "French",
    de: "German",
    it: "Italian",
    km: "Khmer (Cambodian)",
    ko: "Korean",
    pt: "Portuguese",
    ru: "Russian",
    es: "Spanish",
    vi: "Vietnamese",
  };
  const textNodes = [];
  const attrNodes = [];
  let currentLang = "en";

  function normalize(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function storedLang() {
    try {
      return localStorage.getItem("kt_lang");
    } catch (e) {
      return "";
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem("kt_lang", lang);
    } catch (e) {
      /* Local storage may be disabled. Language still applies for this page. */
    }
  }

  function mapLocale(locale) {
    const nav = String(locale || "en").toLowerCase();
    if (nav.startsWith("zh")) return "zh-CN";
    if (nav.startsWith("km") || nav.startsWith("kh")) return "km";
    const base = nav.split("-")[0];
    return langs.includes(base) ? base : "";
  }

  function detect() {
    const saved = storedLang();
    if (saved && langs.includes(saved)) return saved;
    const preferred = [
      ...((navigator.languages && Array.from(navigator.languages)) || []),
      navigator.language,
    ];
    for (const locale of preferred) {
      const mapped = mapLocale(locale);
      if (mapped) return mapped;
    }
    return "en";
  }

  function message(route) {
    return [
      "Hello Tha, I would like to book or request a quote.",
      "Route: " + (route || ""),
      "Vehicle: SUV or Van",
      "Travel date/time:",
      "Pickup location:",
      "Destination:",
      "Number of passengers:",
      "Luggage:",
      "Name:",
      "Notes:",
    ].join("\n");
  }

  function whatsappHref(route) {
    return (
      "https://wa.me/" + WA + "?text=" + encodeURIComponent(message(route))
    );
  }

  function shouldSkipTextNode(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    if (parent.closest(".language-select")) return true;
    if (parent.closest("[data-i18n]")) return true;
    return Boolean(parent.closest("script,style,noscript,template"));
  }

  function shouldTranslateMeta(el) {
    const marker = (
      el.getAttribute("name") ||
      el.getAttribute("property") ||
      ""
    ).toLowerCase();
    return (
      marker.includes("title") ||
      marker.includes("description") ||
      marker.includes("site_name") ||
      marker.includes("image:alt")
    );
  }

  function captureOriginals() {
    const walker = document.createTreeWalker(
      document.documentElement,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (shouldSkipTextNode(node)) return NodeFilter.FILTER_REJECT;
          return normalize(node.nodeValue)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      },
    );
    let node = walker.nextNode();
    while (node) {
      textNodes.push({ node, original: node.nodeValue });
      node = walker.nextNode();
    }

    document.querySelectorAll("*").forEach((el) => {
      if (el.closest(".language-select")) return;
      ["placeholder", "aria-label", "title", "alt"].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (normalize(value)) attrNodes.push({ el, attr, original: value });
      });
      if (el.tagName === "META" && shouldTranslateMeta(el)) {
        const value = el.getAttribute("content");
        if (normalize(value))
          attrNodes.push({ el, attr: "content", original: value });
      }
    });
  }

  function phrase(source, lang) {
    if (lang === "en") return source;
    const dict = (window.KT_TEXT_I18N && window.KT_TEXT_I18N[lang]) || {};
    return dict[normalize(source)] || source;
  }

  function translateVisibleText(lang) {
    textNodes.forEach(({ node, original }) => {
      const key = normalize(original);
      const translated = phrase(key, lang);
      const lead = String(original).match(/^\s*/)[0];
      const tail = String(original).match(/\s*$/)[0];
      node.nodeValue = lead + translated + tail;
    });

    attrNodes.forEach(({ el, attr, original }) => {
      el.setAttribute(attr, phrase(original, lang));
    });
  }

  function applyKeyedLabels(lang) {
    const all = window.KT_I18N || {};
    const dict = all[lang] || all.en || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });
  }

  function applyLang(lang) {
    currentLang = langs.includes(lang) ? lang : "en";
    document.documentElement.lang = currentLang;
    saveLang(currentLang);
    document.querySelectorAll(".language-select").forEach((select) => {
      select.value = currentLang;
    });
    applyKeyedLabels(currentLang);
    translateVisibleText(currentLang);
  }

  function translated(source) {
    return phrase(source, currentLang);
  }

  function setupLanguages() {
    document.querySelectorAll(".language-select").forEach((select) => {
      if (select.options.length === 0) {
        langs.forEach((lang) => select.append(new Option(labels[lang], lang)));
      }
      select.addEventListener("change", (event) =>
        applyLang(event.target.value),
      );
    });
    applyLang(detect());
  }

  document.querySelectorAll("[data-wa-route]").forEach((anchor) => {
    anchor.href = whatsappHref(anchor.dataset.waRoute || "");
  });

  document.querySelectorAll(".menu-toggle").forEach((button) =>
    button.addEventListener("click", () => {
      const menu = document.getElementById("mobile-menu");
      if (!menu) return;
      menu.hidden = false;
      button.setAttribute("aria-expanded", "true");
    }),
  );

  document.querySelectorAll(".menu-close").forEach((button) =>
    button.addEventListener("click", () => {
      const menu = document.getElementById("mobile-menu");
      const toggle = document.querySelector(".menu-toggle");
      if (!menu) return;
      menu.hidden = true;
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }),
  );

  captureOriginals();
  setupLanguages();

  const modal = document.getElementById("telegram-modal");
  document.querySelectorAll(".telegram-open").forEach((button) =>
    button.addEventListener("click", () => {
      if (modal) modal.hidden = false;
    }),
  );
  document.querySelectorAll(".telegram-close").forEach((button) =>
    button.addEventListener("click", () => {
      if (modal) modal.hidden = true;
    }),
  );
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.hidden = true;
    });
  }

  document.querySelectorAll(".copy-telegram").forEach((button) =>
    button.addEventListener("click", async () => {
      const status = document.querySelector(".copy-status");
      try {
        await navigator.clipboard.writeText(button.dataset.copy || TG);
        if (status) status.textContent = translated("Copied Telegram number.");
      } catch (e) {
        if (status) status.textContent = "Telegram: " + TG;
      }
    }),
  );

  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fd = new FormData(form);
      const route = String(fd.get("route") || "").trim();
      const pickup = String(fd.get("pickup") || "").trim();
      const dest = String(fd.get("destination") || "").trim();
      const date = String(fd.get("date") || "").trim();
      const error = document.getElementById("form-error");
      if (!route || !pickup || !dest || !date) {
        if (error) {
          error.textContent = translated(
            "Please add route, pickup location, destination, and travel date.",
          );
        }
        return;
      }
      if (error) error.textContent = "";
      const dateTime = [date, String(fd.get("time") || "").trim()]
        .filter(Boolean)
        .join(" ");
      const lines = [
        "Hello Tha, I would like to book or request a quote.",
        "Route: " + route,
        "Vehicle: " + String(fd.get("vehicle") || "SUV or Van"),
        "Travel date/time: " + dateTime,
        "Pickup location: " + pickup,
        "Destination: " + dest,
        "Number of passengers: " + String(fd.get("passengers") || ""),
        "Luggage: " + String(fd.get("luggage") || ""),
        "Name: " + String(fd.get("name") || ""),
        "Contact number / WhatsApp: " + String(fd.get("contact") || ""),
        "Notes: " + String(fd.get("notes") || ""),
      ];
      window.open(
        "https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n")),
        "_blank",
        "noopener,noreferrer",
      );
    });
  }
})();
