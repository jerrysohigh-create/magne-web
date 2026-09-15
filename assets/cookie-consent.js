/*!
 * MAGNE.AI Cookie Consent + Google Analytics 4
 * - Auto-detects page language from <html lang>
 * - Uses GA4 consent mode v2 (default = denied)
 * - Stores consent in localStorage
 * - "Privacy Choices" link in footer re-opens the banner
 *
 * GA4 ID: G-NGKT224G39
 * Data Stream: https://www.magne.ai (ID: 15261886269)
 */
(function () {
  'use strict';

  // === Configuration ===
  var GA4_ID = 'G-NGKT224G39';
  var CONSENT_KEY = 'magne-consent-v1';
  var CONSENT_VERSION = 1; // bump if consent policy changes to re-prompt

  // === Strings (i18n) ===
  var LANG = (document.documentElement.lang || 'en').toLowerCase();
  var IS_ZH = LANG.indexOf('zh') === 0;
  var STRINGS = IS_ZH ? {
    title: '我們尊重您的隱私。',
    body: '本站使用 Google Analytics (GA4) 了解訪客使用情況。分析 Cookie 僅在您接受後才會設置。您可以隨時通過頁尾的「隱私選擇」連結更改設定。詳見',
    accept: '接受',
    reject: '拒絕',
    policy: '隱私政策',
    openLink: '隱私選擇',
    openAria: '開啟隱私設定'
  } : {
    title: 'We respect your privacy.',
    body: 'This site uses Google Analytics (GA4) to understand how visitors use it. Analytics cookies are only set if you accept. You can change your choice anytime via the "Privacy Choices" link in the footer. See our',
    accept: 'Accept',
    reject: 'Reject',
    policy: 'Privacy Policy',
    openLink: 'Privacy Choices',
    openAria: 'Open privacy settings'
  };

  // Privacy Policy URL (relative to current page)
  var POLICY_URL = IS_ZH ? 'tc/privacy-policy.html' : 'privacy-policy.html';
  // If we're already in /tc/, adjust relative URL
  if (window.location.pathname.indexOf('/tc/') >= 0) {
    POLICY_URL = 'privacy-policy.html';
  }

  // === GA4 init (always load, consent mode default = denied) ===
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  gtag('js', new Date());

  // Load GA4 script asynchronously
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
  document.head.appendChild(gaScript);

  gtag('config', GA4_ID, { anonymize_ip: true, send_page_view: true });

  // === Consent storage ===
  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed.version !== CONSENT_VERSION) return null;
      return parsed.value; // 'accepted' | 'rejected'
    } catch (e) { return null; }
  }
  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        value: value,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
  }
  function clearConsent() {
    try { localStorage.removeItem(CONSENT_KEY); } catch (e) {}
  }
  function updateGAConsent(granted) {
    var state = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      analytics_storage: state,
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state
    });
  }

  // === Banner UI ===
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function buildBanner() {
    if (document.getElementById('cookie-consent-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', escapeHtml(STRINGS.title));
    banner.innerHTML =
      '<div class="cookie-consent-text">' +
        '<p><strong>' + escapeHtml(STRINGS.title) + '</strong> ' +
        escapeHtml(STRINGS.body) + ' ' +
        '<a href="' + escapeHtml(POLICY_URL) + '" class="cookie-consent-policy-link">' +
          escapeHtml(STRINGS.policy) +
        '</a>.</p>' +
      '</div>' +
      '<div class="cookie-consent-actions">' +
        '<button type="button" class="cookie-consent-btn cookie-consent-accept" data-action="accept">' +
          escapeHtml(STRINGS.accept) +
        '</button>' +
        '<button type="button" class="cookie-consent-btn cookie-consent-reject" data-action="reject">' +
          escapeHtml(STRINGS.reject) +
        '</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('[data-action="accept"]').addEventListener('click', function () {
      setConsent('accepted');
      updateGAConsent(true);
      hideBanner();
    });
    banner.querySelector('[data-action="reject"]').addEventListener('click', function () {
      setConsent('rejected');
      updateGAConsent(false);
      hideBanner();
    });
  }

  function showBanner() {
    var b = document.getElementById('cookie-consent-banner');
    if (b) b.classList.add('cookie-consent-visible');
  }
  function hideBanner() {
    var b = document.getElementById('cookie-consent-banner');
    if (b) b.classList.remove('cookie-consent-visible');
  }

  // === Footer "Privacy Choices" link re-opener ===
  function wireFooterLink() {
    var links = document.querySelectorAll('[data-privacy-choices], #open-privacy-choices');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        clearConsent();
        buildBanner();
        // small delay so user sees the slide-in animation
        setTimeout(showBanner, 50);
      });
    });
  }

  // === Init ===
  function init() {
    wireFooterLink();

    var consent = getConsent();
    if (consent === 'accepted') {
      updateGAConsent(true);
    } else if (consent === 'rejected') {
      updateGAConsent(false);
    } else {
      // No consent recorded — show banner
      buildBanner();
      // small delay so the page settles first
      setTimeout(showBanner, 600);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
