(() => {
  const ga4MeasurementId = "G-NGKT224G39";
  const consentKey = "magne.analytics-consent";
  const restrictedAnalyticsRegions = [
    "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
    "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL",
    "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH",
  ];
  const pageLanguage = document.documentElement.lang.toLowerCase();
  const isEnglishPage = pageLanguage.startsWith("en");
  const languageCode = isEnglishPage ? "en" : "zh-Hant";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    region: restrictedAnalyticsRegions,
    wait_for_update: 500,
  });
  window.gtag("js", new Date());

  let analyticsConsent = null;
  try { analyticsConsent = window.localStorage.getItem(consentKey); } catch {}
  if (analyticsConsent === "granted" || analyticsConsent === "denied") {
    window.gtag("consent", "update", { analytics_storage: analyticsConsent });
  }

  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
  document.head.append(analyticsScript);
  window.gtag("config", ga4MeasurementId, { anonymize_ip: true });
  document.documentElement.dataset.ga4 = ga4MeasurementId;

  const privacyHref = "privacy-policy.html";
  const consentCopy = {
    en: ["Analytics settings", "Google Analytics helps us understand site performance. Advertising storage stays disabled.", "Privacy Policy", "Disable analytics", "Allow analytics", "Analytics settings"],
    "zh-Hant": ["分析設定", "我們使用 Google Analytics 了解網站效能；廣告儲存功能始終停用。", "隱私政策", "停用分析", "允許分析", "Cookie 設定"],
  }[languageCode];
  const consentStyles = document.createElement("style");
  consentStyles.textContent = '.analytics-consent{position:fixed;z-index:1200;right:18px;bottom:18px;width:min(440px,calc(100vw - 36px));box-sizing:border-box;padding:18px;color:#f2eee4;background:#11110f;border:1px solid #5d5a50;box-shadow:0 18px 45px rgb(0 0 0/.24);font-family:Arial,sans-serif}.analytics-consent strong{display:block;margin:0 0 8px;font-size:14px}.analytics-consent p{margin:0;font-size:13px;line-height:1.55}.analytics-consent a{color:#f2eee4;text-decoration:underline;text-underline-offset:3px}.analytics-consent__actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:8px;margin-top:14px}.analytics-consent button{min-height:38px;padding:0 13px;color:#f2eee4;background:transparent;border:1px solid #777267;font:500 10px/1 monospace;cursor:pointer}.analytics-consent button:last-child{color:#11110f;background:#f2eee4;border-color:#f2eee4}.analytics-settings{padding:0;color:inherit;background:none;border:0;font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer}';
  document.head.append(consentStyles);

  const openConsentNotice = () => {
    document.querySelector(".analytics-consent")?.remove();
    const consentNotice = document.createElement("aside");
    consentNotice.className = "analytics-consent";
    consentNotice.setAttribute("role", "dialog");
    consentNotice.setAttribute("aria-modal", "false");
    consentNotice.setAttribute("aria-label", consentCopy[0]);
    consentNotice.innerHTML = `<strong>${consentCopy[0]}</strong><p>${consentCopy[1]} <a href="${privacyHref}">${consentCopy[2]}</a></p><div class="analytics-consent__actions"><button type="button" data-consent="denied">${consentCopy[3]}</button><button type="button" data-consent="granted">${consentCopy[4]}</button></div>`;
    document.body.append(consentNotice);
    consentNotice.querySelector("button")?.focus();
    consentNotice.querySelectorAll("[data-consent]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.consent;
        try { window.localStorage.setItem(consentKey, value); } catch {}
        window.gtag("consent", "update", { analytics_storage: value });
        consentNotice.remove();
      });
    });
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      consentNotice.remove();
      document.removeEventListener("keydown", closeOnEscape);
    };
    document.addEventListener("keydown", closeOnEscape);
  };

  const footerLegal = document.querySelector(".footer__legal");
  if (footerLegal) {
    const settingsButton = document.createElement("button");
    settingsButton.className = "analytics-settings";
    settingsButton.type = "button";
    settingsButton.textContent = consentCopy[5];
    settingsButton.addEventListener("click", openConsentNotice);
    footerLegal.append(settingsButton);
  }

  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector("#site-menu");
  const languageMenu = document.querySelector(".language-menu");

  if (languageMenu) {
    const localizedMatch = window.location.pathname.match(/\/en\/([^/]*)$/);
    const currentFile = localizedMatch?.[1] || window.location.pathname.split("/").pop() || "index.html";
    const englishPages = new Set([
      "index.html", "phone.html", "phone-specs.html", "phone-architecture.html", "mainboard-3d.html",
      "ai.html", "network.html", "security.html", "compliance.html", "progress.html", "stories.html",
      "partners.html", "media-kit.html", "privacy-policy.html", "contact.html", "google-approval.html",
      "fcc-lookup.html", "gsma-tac-lookup.html", "cb-lookup.html", "un383-lookup.html", "cp65-lookup.html",
      "ce-lookup.html",
    ]);
    const root = localizedMatch ? "../" : "./";
    const englishSuffix = englishPages.has(currentFile) ? currentFile : "index.html";
    const labels = { en: "EN", "zh-Hant": "\u7e41\u4e2d" };
    const languageLabels = { en: "Language", "zh-Hant": "\u8a9e\u8a00" };
    const destinations = {
      en: `${root}en/${englishSuffix}`,
      "zh-Hant": `${root}${currentFile}`,
    };
    const select = document.createElement("select");
    select.setAttribute("aria-label", languageLabels[languageCode]);
    select.className = "language-select";
    Object.entries(labels).forEach(([code, label]) => {
      const option = document.createElement("option");
      option.value = destinations[code];
      option.textContent = label;
      option.selected = code === languageCode;
      select.append(option);
    });
    select.addEventListener("change", () => { window.location.href = select.value; });
    languageMenu.replaceChildren(select);
  }

  const setMenuButtonState = (expanded) => {
    if (!menuButton) return;
    const navigationLabels = {
      en: ["Open navigation", "Close navigation"],
      "zh-Hant": ["開啟導覽", "關閉導覽"],
    }[languageCode];
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute("aria-label", expanded ? navigationLabels[1] : navigationLabels[0]);
  };

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    setMenuButtonState(false);
    menu.classList.remove("is-open");
  };

  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    setMenuButtonState(!expanded);
    menu?.classList.toggle("is-open", !expanded);
  });

  setMenuButtonState(false);

  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const progress = document.querySelector(".reading-progress span");
  const updateProgress = () => {
    if (!progress) return;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const value = available > 0 ? Math.min(1, window.scrollY / available) : 0;
    progress.style.width = `${value * 100}%`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((element) => revealObserver.observe(element));
  }

  const navLinks = [...document.querySelectorAll('.site-nav__menu a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.25] });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const timelineFilters = document.querySelector("[data-timeline-filters]");
  if (timelineFilters) {
    const buttons = [...timelineFilters.querySelectorAll("[data-timeline-filter]")];
    const rows = [...document.querySelectorAll(".timeline-list [data-track]")];
    const status = document.querySelector("[data-timeline-status]");

    const applyTimelineFilter = (filter) => {
      let visible = 0;
      buttons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.timelineFilter === filter));
      });
      rows.forEach((row) => {
        const show = filter === "all" || row.dataset.track === filter;
        row.hidden = !show;
        if (show) visible += 1;
      });
      if (status) status.textContent = `顯示 ${visible} 個時間線節點`;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => applyTimelineFilter(button.dataset.timelineFilter));
    });
  }

  document.querySelectorAll("[data-youtube-id]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const videoId = trigger.dataset.youtubeId;
      const media = trigger.closest(".story-video-card__media");
      if (!videoId || !media) return;

      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
      frame.title = trigger.dataset.videoTitle || "MAGNE.AI video";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allowFullscreen = true;
      media.replaceChildren(frame);
    }, { once: true });
  });
})();
