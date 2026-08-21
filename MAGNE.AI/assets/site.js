(() => {
  const ga4MeasurementId = "G-NGKT224G39";
  const consentKey = "magne.analytics-consent.v2";
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
    en: {
      label: "PRIVACY / 01",
      title: "YOU CONTROL OPTIONAL COOKIES.",
      body: "Necessary storage keeps the site working and remembers your choice. Google Analytics helps us understand site performance; advertising storage stays disabled.",
      privacy: "Privacy Policy",
      accept: "ACCEPT ALL",
      necessary: "NECESSARY ONLY",
      manage: "MANAGE PREFERENCES",
      settings: "Cookie settings",
      managerLabel: "PRIVACY CONTROL / MAGNE.AI",
      managerTitle: "COOKIE PREFERENCES",
      managerIntro: "Choose whether MAGNE.AI may use optional analytics storage. Necessary storage is always active so the site can remember this preference.",
      necessaryTitle: "NECESSARY",
      necessaryBody: "Consent record and essential site operation. Always active.",
      analyticsTitle: "ANALYTICS",
      analyticsBody: "Google Analytics 4 · G-NGKT224G39. No advertising personalization.",
      save: "SAVE PREFERENCES",
      close: "Close cookie preferences",
    },
    "zh-Hant": {
      label: "隱私 / 01",
      title: "選用 COOKIE，由您控制。",
      body: "必要儲存用於網站運作並記住您的選擇。Google Analytics 協助我們了解網站效能；廣告儲存功能始終停用。",
      privacy: "隱私政策",
      accept: "接受全部",
      necessary: "僅使用必要 COOKIE",
      manage: "管理偏好",
      settings: "Cookie 設定",
      managerLabel: "隱私控制 / MAGNE.AI",
      managerTitle: "COOKIE 偏好設定",
      managerIntro: "您可選擇 MAGNE.AI 是否使用選用分析儲存。必要儲存永遠啟用，以便網站記住此偏好。",
      necessaryTitle: "必要",
      necessaryBody: "同意記錄及網站基本運作。永遠啟用。",
      analyticsTitle: "分析",
      analyticsBody: "Google Analytics 4 · G-NGKT224G39。不啟用廣告個人化。",
      save: "儲存偏好",
      close: "關閉 Cookie 偏好設定",
    },
  }[languageCode];
  const consentStyles = document.createElement("style");
  consentStyles.textContent = '.analytics-consent{position:fixed;z-index:1200;right:18px;bottom:18px;width:min(560px,calc(100vw - 36px));box-sizing:border-box;padding:22px;color:#f2eee4;background:rgb(17 17 15/.985);border:1px solid #5d5a50;border-top:3px solid #b51f2e;box-shadow:0 20px 70px rgb(0 0 0/.42);font-family:Arial,sans-serif}.analytics-consent__index{display:block;margin-bottom:18px;color:#b9b3a6;font:600 10px/1.2 monospace;letter-spacing:.15em}.analytics-consent strong{display:block;margin:0 0 10px;color:#f2eee4;font:700 13px/1.3 monospace;letter-spacing:.08em}.analytics-consent p{margin:0;color:#c7c0b2;font-size:13px;line-height:1.65}.analytics-consent__links,.consent-manager__links{display:flex;flex-wrap:wrap;gap:18px;margin-top:15px}.analytics-consent a,.consent-manager a{color:#f2eee4;text-decoration:underline;text-underline-offset:3px}.analytics-consent__actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:18px}.analytics-consent button,.consent-manager button{min-height:44px;padding:0 14px;color:#f2eee4;background:transparent;border:1px solid #777267;border-radius:0;font:600 10px/1 monospace;letter-spacing:.05em;cursor:pointer}.analytics-consent button[data-consent="granted"],.consent-manager button.primary{color:#fff;background:#b51f2e;border-color:#b51f2e}.analytics-consent button[data-consent-manage]{grid-column:1/-1}.analytics-consent button:hover,.consent-manager button:hover{border-color:#f2eee4}.analytics-consent button:focus-visible,.consent-manager button:focus-visible,.consent-manager input:focus-visible,.analytics-settings:focus-visible{outline:2px solid #b51f2e;outline-offset:3px}.consent-manager{position:fixed;inset:0;z-index:1210;display:grid;place-items:center;padding:24px;background:rgb(0 0 0/.74)}.consent-manager__panel{width:min(720px,100%);max-height:min(760px,calc(100vh - 48px));overflow:auto;color:#f2eee4;background:#11110f;border:1px solid #5d5a50;border-top:3px solid #b51f2e;box-shadow:0 24px 90px rgb(0 0 0/.7);font-family:Arial,sans-serif}.consent-manager__header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:24px;border-bottom:1px solid #49463e}.consent-manager__header span{color:#c55a65;font:600 10px/1.2 monospace;letter-spacing:.14em}.consent-manager__header h2{margin:12px 0 0;font:500 clamp(28px,4vw,46px)/1 Georgia,serif;letter-spacing:0}.consent-manager__close{flex:0 0 44px;padding:0!important;font-size:21px!important}.consent-manager__intro{margin:0;padding:22px 24px;border-bottom:1px solid #49463e;color:#c7c0b2;font-size:14px;line-height:1.7}.consent-manager__rows{border-bottom:1px solid #49463e}.consent-manager__rows label{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:center;min-height:112px;padding:20px 24px;border-bottom:1px solid #49463e}.consent-manager__rows label:last-child{border-bottom:0}.consent-manager__rows strong,.consent-manager__rows small{display:block}.consent-manager__rows strong{color:#f2eee4;font:600 11px/1.2 monospace;letter-spacing:.1em}.consent-manager__rows small{max-width:510px;margin-top:9px;color:#b9b3a6;font:11px/1.6 monospace}.consent-manager__rows input{appearance:none;width:48px;height:26px;margin:0;border:1px solid #777267;background:#22211e;cursor:pointer}.consent-manager__rows input::after{content:"";display:block;width:18px;height:18px;margin:3px;background:#777267;transition:transform .18s ease,background .18s ease}.consent-manager__rows input:checked{border-color:#b51f2e}.consent-manager__rows input:checked::after{transform:translateX(22px);background:#b51f2e}.consent-manager__rows input:disabled{opacity:.65;cursor:not-allowed}.consent-manager__links{margin:0;padding:18px 24px}.consent-manager__actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 24px 24px}.analytics-settings{padding:0;color:inherit;background:none;border:0;font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer}html.consent-manager-open{overflow:hidden}@media(max-width:560px){.analytics-consent{right:10px;bottom:10px;width:calc(100vw - 20px);max-height:calc(100vh - 20px);overflow:auto;padding:18px}.analytics-consent__actions,.consent-manager__actions{grid-template-columns:1fr}.analytics-consent button[data-consent-manage]{grid-column:auto}.consent-manager{padding:10px}.consent-manager__panel{max-height:calc(100vh - 20px)}.consent-manager__header,.consent-manager__intro,.consent-manager__rows label,.consent-manager__links,.consent-manager__actions{padding-left:18px;padding-right:18px}}';
  document.head.append(consentStyles);

  const closeConsentUi = () => {
    document.querySelector(".analytics-consent")?.remove();
    document.querySelector(".consent-manager")?.remove();
    document.documentElement.classList.remove("consent-manager-open");
  };

  const saveConsent = (value) => {
    analyticsConsent = value;
    try { window.localStorage.setItem(consentKey, value); } catch {}
    window.gtag("consent", "update", { analytics_storage: value });
    closeConsentUi();
  };

  const openConsentManager = () => {
    document.querySelector(".analytics-consent")?.remove();
    document.querySelector(".consent-manager")?.remove();
    const manager = document.createElement("div");
    manager.className = "consent-manager";
    manager.innerHTML = `<section class="consent-manager__panel" role="dialog" aria-modal="true" aria-labelledby="consent-title"><div class="consent-manager__header"><div><span>${consentCopy.managerLabel}</span><h2 id="consent-title">${consentCopy.managerTitle}</h2></div><button type="button" class="consent-manager__close" data-consent-close aria-label="${consentCopy.close}">&times;</button></div><p class="consent-manager__intro">${consentCopy.managerIntro}</p><div class="consent-manager__rows"><label><span><strong>${consentCopy.necessaryTitle}</strong><small>${consentCopy.necessaryBody}</small></span><input type="checkbox" checked disabled></label><label><span><strong>${consentCopy.analyticsTitle}</strong><small>${consentCopy.analyticsBody}</small></span><input type="checkbox" data-consent-analytics></label></div><p class="consent-manager__links"><a href="${privacyHref}">${consentCopy.privacy}</a></p><div class="consent-manager__actions"><button type="button" data-consent-save>${consentCopy.save}</button><button type="button" class="primary" data-consent-accept>${consentCopy.accept}</button></div></section>`;
    document.body.append(manager);
    document.documentElement.classList.add("consent-manager-open");
    const analyticsToggle = manager.querySelector("[data-consent-analytics]");
    analyticsToggle.checked = analyticsConsent !== "denied";
    manager.querySelector("[data-consent-close]").addEventListener("click", closeConsentUi);
    manager.querySelector("[data-consent-save]").addEventListener("click", () => saveConsent(analyticsToggle.checked ? "granted" : "denied"));
    manager.querySelector("[data-consent-accept]").addEventListener("click", () => saveConsent("granted"));
    manager.addEventListener("click", (event) => { if (event.target === manager && analyticsConsent !== null) closeConsentUi(); });
    manager.addEventListener("keydown", (event) => { if (event.key === "Escape" && analyticsConsent !== null) closeConsentUi(); });
    analyticsToggle.focus();
  };

  const openConsentNotice = () => {
    document.querySelector(".analytics-consent")?.remove();
    const consentNotice = document.createElement("aside");
    consentNotice.className = "analytics-consent";
    consentNotice.setAttribute("role", "dialog");
    consentNotice.setAttribute("aria-modal", "false");
    consentNotice.setAttribute("aria-label", consentCopy.settings);
    consentNotice.innerHTML = `<span class="analytics-consent__index">${consentCopy.label}</span><strong>${consentCopy.title}</strong><p>${consentCopy.body}</p><p class="analytics-consent__links"><a href="${privacyHref}">${consentCopy.privacy}</a></p><div class="analytics-consent__actions"><button type="button" data-consent="granted">${consentCopy.accept}</button><button type="button" data-consent="denied">${consentCopy.necessary}</button><button type="button" data-consent-manage>${consentCopy.manage}</button></div>`;
    document.body.append(consentNotice);
    consentNotice.querySelectorAll("[data-consent]").forEach((button) => button.addEventListener("click", () => saveConsent(button.dataset.consent)));
    consentNotice.querySelector("[data-consent-manage]").addEventListener("click", openConsentManager);
  };

  const footerLegal = document.querySelector(".footer__legal");
  if (footerLegal) {
    const settingsButton = document.createElement("button");
    settingsButton.className = "analytics-settings";
    settingsButton.type = "button";
    settingsButton.textContent = consentCopy.settings;
    settingsButton.addEventListener("click", openConsentManager);
    footerLegal.append(settingsButton);
  }

  if (analyticsConsent === null) {
    window.requestAnimationFrame(openConsentNotice);
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
