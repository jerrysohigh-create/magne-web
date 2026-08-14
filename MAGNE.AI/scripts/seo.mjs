export const siteOrigin = "https://www.magne.ai";

export const defaultSocialImage = `${siteOrigin}/assets/images/cover-hold-the-future.webp`;

export const seoByPage = {
  "index.html": {
    title: "MAGNE.AI｜把所有權，放回手上",
    description: "MAGNE.AI 繁體中文官網：探索 MAG1 智能終端、端側 AI、安全架構、開放網絡、合作夥伴與公司進展。",
  },
  "phone.html": {
    title: "MAG1 智能終端｜MAGNE.AI",
    description: "MAG1 智能終端：端側 AI、獨立安全元件、NFC 復原、Android 15、AgentPay 與完整產品規格。",
  },
  "phone-specs.html": {
    title: "MAG1 完整技術規格｜MAGNE.AI",
    description: "查閱 MAG1 完整技術規格：顯示、UNISOC T9100、50MP ISOCELL 相機、電池、連接、安全，以及 WW / EEA 韌體與行動網絡頻段。",
  },
  "phone-architecture.html": {
    title: "MAG1 互動工程視圖｜MAGNE.AI",
    description: "互動拆解 MAGNE.AI MAG1，查看影像、供電、主板、安全元件與離線復原硬件架構。",
  },
  "mainboard-3d.html": {
    title: "MAG1 主板正反面實拍｜MAGNE.AI",
    description: "以 MAG1 EVT PCBA 實拍資料呈現主板元件面與屏蔽面，支援切換、縮放與細節查看。",
  },
  "ai.html": {
    title: "端側 AI｜MAGNE.AI",
    description: "探索 MAG1 的端側 AI 架構：IMG AX3596 8 TOPS、本地模型、選擇性雲端與硬件安全邊界。",
  },
  "network.html": {
    title: "MAGNE Network｜MAGNE.AI",
    description: "MAGNE Network 由 MAG1 邊緣裝置、MAGNE L1 與基於 OP Stack 的 MHash L2 組成三層網絡架構。",
  },
  "security.html": {
    title: "安全架構｜MAGNE.AI",
    description: "了解 MAG1 的三層硬件安全架構：可信執行環境、安全元件與離線 NFC 復原。",
  },
  "compliance.html": {
    title: "合規與設備護照｜MAGNE.AI",
    description: "查閱 MAG1 設備護照：GMS、Widevine L1、GSMA TAC、FCC、CB、UN38.3、Prop 65 與 CE 資料。",
  },
  "google-approval.html": {
    title: "Google GMS 參考資料｜MAGNE.AI",
    description: "了解 MAG1 與 Android、Google Mobile Services 及 Widevine L1 相關的生態接入文件與審閱方式。",
  },
  "fcc-lookup.html": {
    title: "FCC 公開文件中心｜MAGNE.AI",
    description: "以 FCC ID 為索引，查驗 MAG1 在美國無線、EMC、SAR、HAC 等公開記錄中的合規資料。",
  },
  "gsma-tac-lookup.html": {
    title: "GSMA TAC 資料｜MAGNE.AI",
    description: "了解 TAC 01681300 作為 MAG1 全球行動設備身份索引的作用，以及其供應鏈與通路審閱位置。",
  },
  "cb-lookup.html": {
    title: "CB 證書與測試報告｜MAGNE.AI",
    description: "查閱 MAG1 電池相關 CB Scheme 文件，了解 IEC 62133 安全測試在產品審閱中的意義。",
  },
  "un383-lookup.html": {
    title: "UN38.3 出貨資料｜MAGNE.AI",
    description: "了解鋰電池運輸測試、MSDS、包裝跌落與堆疊文件如何共同支持 MAG1 的出貨與物流審閱。",
  },
  "cp65-lookup.html": {
    title: "Prop 65 報告｜MAGNE.AI",
    description: "了解 California Proposition 65 測試報告在消費者披露與化學物質合規審閱中的用途。",
  },
  "ce-lookup.html": {
    title: "CE 證書與技術文件｜MAGNE.AI",
    description: "查閱 MAG1 歐盟 CE EU-Type Examination 證書，以及無線電、EMC、SAR、安全與支持性測試文件索引。",
  },
  "progress.html": {
    title: "項目進展與公開紀錄｜MAGNE.AI",
    description: "MAGNE.AI 公開進展：合規證據、可檢視產品成果、公開時間線與下一階段披露邊界。",
  },
  "stories.html": {
    title: "影像檔案與產品演示｜MAGNE.AI",
    description: "觀看 MAGNE.AI 產品操作演示、公開活動與現場影像紀錄；影片按需載入，事件脈絡清楚歸檔。",
  },
  "partners.html": {
    title: "合作、供應鏈與生態｜MAGNE.AI",
    description: "探索 MAGNE.AI 的製造、平台、生態、市場准入、媒體與資本合作夥伴。",
  },
  "media-kit.html": {
    title: "媒體資料包與品牌資產｜MAGNE.AI",
    description: "下載 MAGNE.AI 官方 Media Kit，包括品牌架構、Logo、產品圖片、包裝素材與媒體聯絡方式。",
  },
  "privacy-policy.html": {
    title: "隱私政策｜MAGNE.AI",
    description: "閱讀 MAGNE.AI 隱私政策，了解個人資訊的收集、使用、處理、披露方式與資料權利。",
  },
  "contact.html": {
    title: "聯絡 MAGNE.AI",
    description: "聯絡 MAGNE.AI，取得產品支援、商務合作、媒體研究與社群相關資訊。",
  },
};

const managedMetaNames = new Set([
  "description",
  "robots",
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
]);

const managedMetaProperties = new Set([
  "og:locale",
  "og:type",
  "og:site_name",
  "og:title",
  "og:description",
  "og:url",
  "og:image",
  "og:image:alt",
]);

function attributeValue(tag, attribute) {
  return tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"))?.[1]?.toLowerCase();
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function canonicalUrl(page) {
  return page === "index.html" ? `${siteOrigin}/index.html` : `${siteOrigin}/${page}`;
}

export function injectSeo(html, page) {
  const seo = seoByPage[page];
  if (!seo) throw new Error(`Missing SEO configuration for ${page}`);

  const url = canonicalUrl(page);
  const title = escapeAttribute(seo.title);
  const description = escapeAttribute(seo.description);

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`)
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const name = attributeValue(tag, "name");
      const property = attributeValue(tag, "property");
      return managedMetaNames.has(name) || managedMetaProperties.has(property) ? "" : tag;
    })
    .replace(/<link\b[^>]*>/gi, (tag) => {
      const rel = attributeValue(tag, "rel");
      return rel === "canonical" || rel === "manifest" || rel === "icon" ? "" : tag;
    });

  const tags = [
    `  <meta name="description" content="${description}">`,
    '  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    `  <link rel="canonical" href="${url}">`,
    '  <meta property="og:locale" content="zh_TW">',
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="MAGNE.AI">',
    `  <meta property="og:title" content="${title}">`,
    `  <meta property="og:description" content="${description}">`,
    `  <meta property="og:url" content="${url}">`,
    `  <meta property="og:image" content="${defaultSocialImage}">`,
    '  <meta property="og:image:alt" content="MAGNE.AI MAG1 智能終端">',
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${title}">`,
    `  <meta name="twitter:description" content="${description}">`,
    `  <meta name="twitter:image" content="${defaultSocialImage}">`,
    '  <link rel="icon" href="favicon.svg" type="image/svg+xml">',
    '  <link rel="manifest" href="site.webmanifest">',
  ].join("\n");

  output = output.replace(/\s*<\/head>/i, `\n${tags}\n</head>`);
  return output;
}
