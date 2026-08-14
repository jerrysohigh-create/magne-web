import { writeFile } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const pages = [
  {
    file: "google-approval.html",
    chapter: "GMS",
    eyebrow: "ANDROID ECOSYSTEM",
    title: "Google GMS 參考資料",
    lead: "說明 MAG1 與 Android / Google Mobile Services / Widevine L1 相關的生態接入文件，幫助審閱方理解這組資料為何重要。",
    summary: [
      ["平台", "Android 15 + GMS"],
      ["內容保護", "Widevine L1"],
      ["用途", "Google 生態接入與合作審閱"],
      ["資料層級", "公開 PDF + 夥伴參考"]
    ],
    meaning: [
      "GMS 參考資料不是單一證書，而是一組與 Android 相容性、Google Play 生態、授權與裝置資訊相關的 supporting records。",
      "Widevine L1 用於說明裝置具備高等級內容保護能力，通常會被串流影音、媒體相容性與平台合作方納入審閱。",
      "G0 Explanatory Note 作為入口說明文件，用來降低審閱方第一次閱讀整包 Google 相關 PDF 的門檻。"
    ],
    steps: [
      ["01", "先閱讀 G0 Explanatory Note", "理解這組文件的邊界、用途與閱讀順序。"],
      ["02", "核對 Android / Partner / Regional 資料", "確認平台相容性與合作審閱所需的基礎資訊。"],
      ["03", "再查看 Widevine L1 相關資料", "將內容保護能力與裝置平台資料一起解讀。"]
    ],
    docs: [
      ["G0", "G0 Explanatory Note", "assets/pdfs/G0-Explanatory_Note.pdf"],
      ["G10", "Android Partner Approvals", "assets/pdfs/G10-Android_Partner_Approvals.pdf"],
      ["G9", "Widevine L1", "assets/pdfs/G9-WidevineL1.pdf"]
    ],
    note: "Google / Android 相關資料應與裝置配置、銷售市場與合作情境一起閱讀，不應被解讀為所有地區、所有商業配置的單一總括承諾。"
  },
  {
    file: "fcc-lookup.html",
    chapter: "FCC",
    eyebrow: "UNITED STATES MARKET ACCESS",
    title: "FCC 公開文件中心",
    lead: "以 FCC ID 為主索引，說明 MAG1 在美國無線、EMC、SAR、HAC 等公開記錄中的查驗方式。",
    summary: [
      ["FCC ID", "2BVCPGC603606"],
      ["市場", "United States"],
      ["涵蓋", "RF / EMC / SAR / HAC"],
      ["資料層級", "FCC public filings"]
    ],
    meaning: [
      "FCC 文件中心用於驗證 MAG1 在美國市場相關的射頻與電磁相容性公開提交資料。",
      "SAR 與 HAC 類文件通常用於健康安全、無障礙相容與監管審閱；它們應與具體測試報告及公開資料庫結果一起閱讀。",
      "FCC ID 是這組資料的核心查驗索引，合作方可用它在 FCC 官方系統中交叉核對。"
    ],
    steps: [
      ["01", "打開 FCC Equipment Authorization Search", "進入 FCC 官方設備授權查詢系統。"],
      ["02", "輸入 FCC ID", "Grantee Code 與 Product Code 可由 2BVCPGC603606 拆分查詢。"],
      ["03", "核對公開文件", "將結果中的 Grant、Test Report、SAR、HAC、Label 等項目與本站 PDF 對照。"]
    ],
    official: ["FCC 官方查詢", "https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm"],
    docs: [
      ["PCE", "FCC PCE Grant", "assets/pdfs/fcc/2BVCPGC603606_PCE.pdf"],
      ["SAR", "SAR Test Report", "assets/pdfs/fcc/2BVCPGC603606_TestRpt_SAR_v1.pdf"],
      ["HAC", "HAC RF Test Report", "assets/pdfs/fcc/2BVCPGC603606_TestRpt_HAC RF.pdf"]
    ],
    note: "FCC 文件以官方資料庫與原始測試報告為準；本站整理用於提高審閱效率，不取代官方查詢結果。"
  },
  {
    file: "gsma-tac-lookup.html",
    chapter: "TAC",
    eyebrow: "GLOBAL DEVICE IDENTITY",
    title: "GSMA TAC 資料",
    lead: "說明 TAC 01681300 作為 MAG1 全球行動設備身份索引的作用，以及它在供應鏈與通路審閱中的位置。",
    summary: [
      ["TAC", "01681300"],
      ["識別", "Device identity"],
      ["用途", "IMEI / 型號身份參考"],
      ["資料層級", "GSMA TAC certificate"]
    ],
    meaning: [
      "TAC 是 IMEI 前 8 位的 Type Allocation Code，用於識別行動裝置型號與設備身份。",
      "對運營商、通路、合規與供應鏈審閱來說，TAC 能幫助把設備身份與產品資料、認證文件和市場記錄串起來。",
      "MAG1 的 TAC 參考資料應與型號、產品配置、FCC/CE 等市場准入文件一起閱讀。"
    ],
    steps: [
      ["01", "核對 TAC 編號", "以 01681300 作為設備身份主索引。"],
      ["02", "查看 GSMA TAC Certificate", "確認證書中的品牌、型號與分配資料。"],
      ["03", "與其他合規文件交叉閱讀", "把設備身份與 FCC、CE、GMS 等文件對齊。"]
    ],
    docs: [
      ["TAC", "GSMA TAC Certificate", "assets/pdfs/GSMA-TAC-Certificate.pdf"]
    ],
    note: "TAC 說明的是設備身份分配，不等同於無線、電池、安全或市場准入測試本身。"
  },
  {
    file: "cb-lookup.html",
    chapter: "CB",
    eyebrow: "BATTERY SAFETY",
    title: "CB 證書與測試報告",
    lead: "說明 MAG1 電池相關 CB Scheme 文件，以及 IEC 62133 安全測試在產品審閱中的意義。",
    summary: [
      ["CB Number", "JPTUV-182068"],
      ["標準", "IEC 62133-2:2017 + AMD1:2021"],
      ["發證", "TUV Rheinland Japan Ltd."],
      ["用途", "電池安全與市場准入參考"]
    ],
    meaning: [
      "CB Scheme 是國際電工產品合格測試與認證互認機制，可支援多國市場的安全審閱。",
      "MAG1 相關 CB 文件聚焦於電池安全，包含短路、異常充電、熱濫用、機械衝擊等測試背景。",
      "CB 文件應與 UN38.3 運輸安全和 CE / FCC 等市場准入資料分開理解，但可共同組成完整設備合規視圖。"
    ],
    steps: [
      ["01", "前往 IECEE 官方證書資料庫", "使用官方系統查驗 CB 證書記錄。"],
      ["02", "輸入 CB Number", "使用 JPTUV-182068 搜尋對應證書。"],
      ["03", "對照證書與測試報告", "確認產品、電池型號、標準與測試範圍。"]
    ],
    official: ["IECEE 官方查詢", "https://certificates.iecee.org/"],
    docs: [
      ["CERT", "CB Battery Certificate", "assets/pdfs/cb/JPTUV-182068_MGU_62133_Certificate.pdf"],
      ["REPORT", "IEC 62133 Test Report", "assets/pdfs/cb/CN25UQGP_001_TR_MGU_62133_Test-Report.pdf"]
    ],
    note: "CB 證書聚焦電池安全，不應被擴大解讀為整機所有功能或所有市場要求均已由同一證書覆蓋。"
  },
  {
    file: "un383-lookup.html",
    chapter: "UN38.3",
    eyebrow: "TRANSPORT SAFETY",
    title: "UN38.3 出貨資料",
    lead: "說明鋰電池運輸測試、MSDS、包裝跌落與堆疊文件如何共同支持 MAG1 的出貨與物流審閱。",
    summary: [
      ["電池型號", "MGU"],
      ["規格", "3.87V / 4900mAh / 18.97Wh"],
      ["涵蓋", "MSDS / UN Test / Summary / Packaging"],
      ["用途", "空運、海運與物流審閱"]
    ],
    meaning: [
      "UN38.3 測試是鋰電池運輸安全的重要基礎，用於支援空運、海運、陸運等物流場景的文件審閱。",
      "MSDS、UN Test、Summary、包裝跌落與堆疊文件共同說明電池與包裝在出貨條件下的安全背景。",
      "UN38.3 不取代 CB、FCC、CE、GMS 等文件；它是物流與電池運輸安全的一層證據。"
    ],
    steps: [
      ["01", "先看核心三份文件", "MSDS、UN38.3 Test Report、UN38.3 Summary。"],
      ["02", "再看包裝驗證", "跌落、堆疊與不同出貨配置的測試材料。"],
      ["03", "依運輸方式查閱分類文件", "空運與海運資料可提供物流審閱背景。"]
    ],
    docs: [
      ["MSDS", "Battery MSDS", "assets/pdfs/un38/DSP25120089_001_MSDS.pdf"],
      ["UN", "UN38.3 Test Report", "assets/pdfs/un38/DSP25120089_002_UN-Test.pdf"],
      ["SUM", "UN38.3 Summary", "assets/pdfs/un38/DSP25120089_003_Summary.pdf"],
      ["AIR", "Air Transport", "assets/pdfs/un38/S45C-Air-Transport.pdf"],
      ["SEA", "Sea Transport", "assets/pdfs/un38/S45C-Sea-Transport.pdf"]
    ],
    note: "運輸文件應依實際出貨配置、包裝方式、目的地與承運要求解讀。"
  },
  {
    file: "cp65-lookup.html",
    chapter: "CP65",
    eyebrow: "CALIFORNIA DISCLOSURE",
    title: "Prop 65 報告",
    lead: "說明 California Proposition 65 測試報告在消費者披露與化學物質合規審閱中的用途。",
    summary: [
      ["市場", "California"],
      ["主題", "Chemical exposure disclosure"],
      ["文件", "TUV Rheinland CP65 Report"],
      ["用途", "消費者披露與通路審閱"]
    ],
    meaning: [
      "California Proposition 65 要求企業針對特定化學物質暴露提供警示或證明相關合規背景。",
      "MAG1 的 CP65 報告可用於支持通路、平台與消費者合規審閱。",
      "它與無線、電池、安全晶片類文件不同，重點在化學物質披露與消費品要求。"
    ],
    steps: [
      ["01", "查看 CP65 報告", "確認報告範圍、樣品描述與測試結論。"],
      ["02", "核對市場用途", "判斷文件是否用於 California 市場或相關通路審閱。"],
      ["03", "與包裝/產品材料資訊一起閱讀", "避免把化學披露報告誤解為其他類型認證。"]
    ],
    docs: [
      ["CP65", "TUV Rheinland CP65 Report", "assets/pdfs/cp65/TUV-Rheinland-CP65-Report-27220370a-001.pdf"]
    ],
    note: "Prop 65 文件聚焦 California 披露要求，不代表其他國家、市場或技術領域的合規結論。"
  },
  {
    file: "ce-lookup.html",
    chapter: "CE",
    eyebrow: "EU MARKET ACCESS",
    title: "CE 證書與技術文件",
    lead: "從 EU-Type Examination 證書，到無線電、EMC、SAR 與產品安全報告；目前收錄的 23 份 CE 原始 PDF 全部可查看與下載。",
    summary: [
      ["Certificate", "SN26C0174"],
      ["Notified Body", "NB 2907"],
      ["公開文件", "23 PDFs"],
      ["市場", "European Union"]
    ],
    meaning: [
      "CE EU-Type Examination 證書用於支持 MAG1 在歐盟市場准入審閱中的合規背景。",
      "本頁公開 CE 證書、16 份正式測試報告、5 份 SAR 附件及 1 份測試樣機照片資料，均可直接查看與下載。",
      "證書與測試資料應連同實際硬件、軟件及銷售地區一起解讀，不能只看頁面上的 CE 標記。"
    ],
    steps: [
      ["01", "先核對證書", "使用 SN26C0174、NB 2907 與 RED 2014/53/EU 作為主索引。"],
      ["02", "再按測試領域查報告", "依無線電、EMC、SAR 與產品安全分組追溯報告編號。"],
      ["03", "查看原始 PDF", "每一條記錄都提供原文件查看與下載入口。"]
    ],
    docs: [
      ["CE", "SN26C0174 Sporton CE Certificate", "assets/ce/SN26C0174-Sporton-CE-Certificate.pdf"]
    ],
    note: "本頁公開目前收錄的 23 份 CE 原始 PDF。文件仍應連同正文、測試配置與實際銷售版本一起解讀，不应被擴張為所有地區、配置或未來軟件版本的無條件聲明。"
  }
];

const nav = (currentFile) => `
  <nav class="site-nav" aria-label="主要導覽"><a class="site-nav__brand" href="./">INDEX</a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu"><span class="sr-only">開啟導覽</span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="site-nav__menu" id="site-menu"><a href="./">INDEX</a><a href="phone.html">PHONE</a><a href="ai.html">AI</a><a href="network.html">NETWORK</a><a href="security.html">SECURITY</a><a href="compliance.html" aria-current="${currentFile === "compliance.html" ? "page" : "false"}">COMPLIANCE</a><a href="progress.html">PROGRESS</a><a href="partners.html">PARTNERS</a><a href="contact.html">CONTACT</a></div><div class="site-nav__actions"><div class="language-menu"><span>繁中</span></div><a class="nav-cta" href="https://payment.magne.ai/buy">預購 MAG1 ↗</a></div></nav>`;

const pageLinks = pages.map((page) => `<a href="${page.file}">${page.chapter}</a>`).join("");

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const titleFromHref = (href) => decodeURIComponent(href.split("/").pop().replace(/\.pdf$/i, ""))
  .replace(/^2BVCPGC603606_/, "")
  .replaceAll("_", " ")
  .replaceAll("-", " ");

const listPdfs = (relativeDir) => readdirSync(resolve(root, relativeDir))
  .filter((name) => name.toLowerCase().endsWith(".pdf"))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
  .map((name) => `${relativeDir}/${name}`);

const doc = (id, href, title = titleFromHref(href)) => [id, title, href, "public"];

const report = (id, title) => [id, title, null, "summary"];

const controlled = (id, title, subject) => [id, title, `mailto:jerry_kao@magne.ai?subject=${encodeURIComponent(subject)}`, "controlled"];

const ceDoc = (id, title, filename) => doc(id, `assets/ce/${filename}`, title);

const group = (title, body, docs, countLabel = null) => ({ title, body, docs, countLabel });

const googleDocs = listPdfs("assets/pdfs")
  .filter((href) => /\/G(?:\d|0-)/.test(href))
  .sort((a, b) => {
    const numberOf = (href) => Number(href.match(/\/G(\d+)/)?.[1] ?? 0);
    return numberOf(a) - numberOf(b);
  });

const fccDocs = listPdfs("assets/pdfs/fcc");
const fccBy = (pattern) => fccDocs.filter((href) => pattern.test(href));
const fccUsed = new Set();
const fccGroup = (title, body, test) => {
  const docs = fccBy(test);
  docs.forEach((href) => fccUsed.add(href));
  return group(title, body, docs.map((href, index) => doc(`FCC ${String(index + 1).padStart(2, "0")}`, href)));
};

const assignDocGroups = () => {
  const findGoogle = (pattern) => googleDocs.filter((href) => pattern.test(href));
  const googleUsed = new Set();
  const googleGroup = (title, body, pattern) => {
    const docs = findGoogle(pattern);
    docs.forEach((href) => googleUsed.add(href));
    return group(title, body, docs.map((href) => doc(href.match(/\/(G\d+|G0)/)?.[1] ?? "G", href)));
  };

  pages.find((page) => page.file === "google-approval.html").docGroups = [
    googleGroup("說明文件 / Explanatory Note", "先讀入口說明，再進入 Google / Android 全套文件。", /G0-Explanatory/),
    googleGroup("平台與合作參考 / Android Records", "Android、Partner、Regional、Worldwide、device info、build 與 approvals 相關資料。", /G(1|2|3|4|5|6|7|8|10|11|12|13|14|15)-/),
    googleGroup("內容保護 / Widevine", "Widevine L1 相關 supporting record。", /G9-/)
  ];
  const remainingGoogle = googleDocs.filter((href) => !googleUsed.has(href));
  if (remainingGoogle.length) {
    pages.find((page) => page.file === "google-approval.html").docGroups.push(group("其他 Google 文件", "未歸入上方分類的 Google 相關 PDF。", remainingGoogle.map((href) => doc("G", href))));
  }

  const fccGroups = [
    fccGroup("授權 / Grant Classes", "FCC grant 類文件，用於核對不同無線與設備類別的公開授權項目。", /_(CXX|DSS|DTS|DXX|JBP|NII|PCE)\.pdf$/),
    fccGroup("測試報告 / RF & EMC Test Reports", "射頻、EMC、LTE、5G、WLAN、DFS 等測試報告與分冊。", /TestRpt_(?!SAR|HAC)/),
    fccGroup("SAR 測試 / Exposure Reports", "SAR 主報告與 Appendix，用於健康安全與暴露評估審閱。", /TestRpt_SAR/),
    fccGroup("HAC 測試 / Accessibility Reports", "HAC RF、T-Coil、VOIP、Volume Control 等聽障相容性測試資料。", /TestRpt_HAC/),
    fccGroup("聲明與授權函 / Letters & Declarations", "Agent、POA、confidentiality、declaration、permissive change、RF exposure 等信函與聲明。", /cvrltr|Declaration/),
    fccGroup("標籤與天線 / Label & Antenna", "Label、Label Location、Antenna Report 等外觀與天線相關公開文件。", /Label|Antenna/),
    fccGroup("FCC 補充文件 / Supporting References", "FCC 程序或補充參考文件。", /DA-23-914/)
  ];
  const remainingFcc = fccDocs.filter((href) => !fccUsed.has(href));
  if (remainingFcc.length) {
    fccGroups.push(group("其他 FCC 文件", "未歸入上方分類但仍屬 FCC 公開文件中心的 PDF。", remainingFcc.map((href, index) => doc(`FCC ${String(index + 1).padStart(2, "0")}`, href))));
  }
  pages.find((page) => page.file === "fcc-lookup.html").docGroups = fccGroups;

  pages.find((page) => page.file === "gsma-tac-lookup.html").docGroups = [
    group("證書 / Certificate", "設備身份與 TAC 分配的核心證明文件。", [doc("TAC", "assets/pdfs/GSMA-TAC-Certificate.pdf", "GSMA TAC Certificate")])
  ];
  pages.find((page) => page.file === "cb-lookup.html").docGroups = [
    group("證書 / Certificate", "CB Scheme 證書本體，用於核對 CB Number、發證機構與產品範圍。", [doc("CERT", "assets/pdfs/cb/JPTUV-182068_MGU_62133_Certificate.pdf", "CB Battery Certificate")]),
    group("測試報告 / Test Report", "IEC 62133 電池安全測試報告。", [doc("REPORT", "assets/pdfs/cb/CN25UQGP_001_TR_MGU_62133_Test-Report.pdf", "IEC 62133 Test Report")])
  ];
  pages.find((page) => page.file === "un383-lookup.html").docGroups = [
    group("核心運輸文件 / Core Transport Records", "MSDS、UN38.3 測試報告與摘要，構成物流審閱的主證據。", [
      doc("MSDS", "assets/pdfs/un38/DSP25120089_001_MSDS.pdf", "Battery MSDS"),
      doc("UN", "assets/pdfs/un38/DSP25120089_002_UN-Test.pdf", "UN38.3 Test Report"),
      doc("SUM", "assets/pdfs/un38/DSP25120089_003_Summary.pdf", "UN38.3 Summary")
    ]),
    group("包裝驗證 / Packaging Tests", "跌落、堆疊與出貨包裝驗證資料。", [
      doc("DROP", "assets/pdfs/un38/DSP25120089_004_12m-Drop.pdf", "1.2m Drop Test"),
      doc("STACK", "assets/pdfs/un38/DSP25120089_005_Stacking.pdf", "Stacking Test"),
      doc("PACK", "assets/pdfs/un38/DSP25120089_006_12m-Transport.pdf", "1.2m Transport Drop Test")
    ]),
    group("空運與海運 / Air & Sea Transport", "不同運輸方式的分類與補充參考文件。", [
      doc("AIR", "assets/pdfs/un38/S45C-Air-Transport.pdf", "Air Transport"),
      doc("SEA", "assets/pdfs/un38/S45C-Sea-Transport.pdf", "Sea Transport"),
      doc("S45C", "assets/pdfs/un38/S45C-0i26020917430_0006.pdf"),
      doc("S45C", "assets/pdfs/un38/S45C-0i26020917430_0007.pdf")
    ])
  ];
  pages.find((page) => page.file === "cp65-lookup.html").docGroups = [
    group("測試報告 / Test Report", "California Proposition 65 相關測試與披露文件。", [doc("CP65", "assets/pdfs/cp65/TUV-Rheinland-CP65-Report-27220370a-001.pdf", "TUV Rheinland CP65 Report")])
  ];
  pages.find((page) => page.file === "ce-lookup.html").docGroups = [
    group("證書 / Certificate", "EU-Type Examination 證書本體，可直接查看與下載。", [
      doc("CE", "assets/ce/SN26C0174-Sporton-CE-Certificate.pdf", "SN26C0174 Sporton CE Certificate")
    ], "1 PUBLIC PDF"),
    group("無線電與頻譜 / Radio & Spectrum", "蜂窩、Wi-Fi、Bluetooth、GNSS、NFC、無線充電與 RED Article 3.3(g) 測試。", [
      ceDoc("RADIO", "EG612311 · ETSI EN 301 511 · GSM", "EG612311_R01_EN301511_Magne_MA1_Report.pdf"),
      ceDoc("RADIO", "EM612311A · ETSI EN 301 908-1 · Cellular Common Requirements", "EM612311A_R01_EN301908-1_Magne_MA1_Report.pdf"),
      ceDoc("RADIO", "EM612311B · ETSI EN 301 908-2 / -13 · UMTS / LTE", "EM612311B_R01_EN301908-2,-13_Magne_MA1_Report.pdf"),
      ceDoc("5G NR", "EM612311C · ETSI EN 301 908-25 · 5G NR", "EM612311C_R01_EN301908-25_Magne_MA1_Report.pdf"),
      ceDoc("SRD", "EQ612311 · ETSI EN 300 440 · Short Range Devices", "EQ612311_R01_EN300440_Magne_MA1_Report.pdf"),
      ceDoc("2.4G", "ER612311A · ETSI EN 300 328 · Wi-Fi / Bluetooth", "ER612311A_R01_EN300328_Magne_MA1_Report.pdf"),
      ceDoc("5G WLAN", "ER612311B · ETSI EN 301 893 · 5 GHz RLAN", "ER612311B_R01_EN301893_Magne_MA1_Report.pdf"),
      ceDoc("GNSS", "ER612311C · ETSI EN 303 413 · GNSS Receiver", "ER612311C_R01_EN303413_Magne AI Global_MA1_Report.pdf"),
      ceDoc("NFC", "ER612311D · ETSI EN 300 330 · NFC / Low Frequency", "ER612311D_R01_EN300330_Magne_MA1_Report.pdf"),
      ceDoc("WPT", "ER612311E · ETSI EN 303 417 · Wireless Power", "ER612311E_R01_EN303417_Magne_MA1_Report.pdf"),
      ceDoc("RED 3.3(g)", "RA612311 · Advanced Mobile Location", "RA612311_R01_RED 3.3g_Magne_MA1_Report.pdf")
    ], "11 PUBLIC PDFs"),
    group("電磁相容性 / EMC", "多媒體設備與無線設備的電磁相容性測試。", [
      ceDoc("EMC", "EC612311 · EN 55032 / EN 55035", "EC612311_R01_EN55032+35_Magne_MA1_Report.pdf"),
      ceDoc("EMC", "EW612311 · ETSI EN 301 489", "EW612311_R01_EN301489_Magne_MA1_Report.pdf")
    ], "2 PUBLIC PDFs"),
    group("人體曝露 / SAR", "SAR 主報告、系統檢查、量測結果、原始圖表、測試照片與輸出功率附件。", [
      ceDoc("SAR", "EA612311 · CE SAR / RF Exposure Test Report", "EA612311_R01_CE SAR_Magne_MA1_Report.pdf"),
      ceDoc("APPX A", "EA612311 Appendix A · System Check Data", "EA612311_R01_CE SAR_Magne_MA1_Appendix A.pdf"),
      ceDoc("APPX B", "EA612311 Appendix B · Measurement Results", "EA612311_R01_CE SAR_Magne_MA1_Appendix B.pdf"),
      ceDoc("APPX C", "EA612311 Appendix C · Raw Plots and Calibration", "EA612311_R01_CE SAR_Magne_MA1_Appendix C.pdf"),
      ceDoc("APPX D", "EA612311 Appendix D · Test Setup Photos", "EA612311_R01_CE SAR_Magne_MA1_Appendix D.pdf"),
      ceDoc("APPX E", "EA612311 Appendix E · Output Power Data", "EA612311_R01_CE SAR_Magne_MA1_Appendix E.pdf")
    ], "6 PUBLIC PDFs"),
    group("產品安全與支持資料 / Safety & Supporting", "產品安全、聲學輸出與測試樣機外觀照片。", [
      ceDoc("SAFETY", "L612311KS012 · EN IEC 62368-1 Product Safety", "L612311KS012 Report.pdf"),
      ceDoc("ACOUSTIC", "EO612311 · EN 50332-2 Acoustic Output", "EO612311_R01_EN50332-2_Magne_MA1_Report.pdf"),
      ceDoc("PHOTOS", "EP612311A · EUT External Photographs", "EP612311A_R01_Magne AI Global_MA1 for CE.pdf")
    ], "3 PUBLIC PDFs")
  ];
};

assignDocGroups();

const renderDoc = ([id, title, href, access = "public"]) => `
          <div class="detail-doc">
            <span>${esc(id)}</span>
            <strong>${esc(title)}</strong>
            <div>${access === "public"
              ? `<a href="${href}" target="_blank" rel="noopener">查看</a><a href="${href}" download>下載</a>`
              : access === "controlled"
                ? `<a href="${href}">NDA 申請</a>`
                : `<em>編號與摘要</em>`}</div>
          </div>`;

const renderDocs = (page) => {
  if (!page.docGroups) return page.docs.map(renderDoc).join("");
  return page.docGroups.map((item) => `
        <section class="detail-doc-group">
          <header class="detail-doc-group__head"><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p><span>${esc(item.countLabel ?? `${item.docs.length} PDF`)}</span></header>
          <div class="detail-docs-list">
            ${item.docs.map(renderDoc).join("")}
          </div>
        </section>`).join("");
};

const renderPage = (page) => `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#d34b2b"><meta name="description" content="${esc(page.lead)}">
  <title>${esc(page.title)}｜MAGNE.AI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Sans+TC:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+TC:wght@400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/site.css?v=lang-4-ga4-2"><script src="assets/site.js?v=lang-4-ga4-2" defer></script>
</head>
<body class="page-compliance page-compliance-detail">
  <a class="skip-link" href="#main">跳至主要內容</a><div class="reading-progress" aria-hidden="true"><span></span></div>
  <header class="masthead"><div class="masthead__edition"><span>MAGNE.AI</span><span>合規查驗 · ${esc(page.chapter)}</span></div><a class="wordmark" href="./" aria-label="MAGNE.AI 首頁"><span class="wordmark__mark" aria-hidden="true">///</span><span class="wordmark__logo"><img src="assets/images/magne-logo-black-wide.png" width="1181" height="116" alt="MAGNE.AI"></span></a><div class="masthead__meta"><span>MAG1 · TAC 01681300</span><span>SUPPORTING PAGE</span></div></header>
${nav(page.file)}
  <main id="main">
    <section class="detail-hero">
      <a class="back-link reveal" href="compliance.html">← 返回 Compliance</a>
      <p class="eyebrow reveal">${esc(page.eyebrow)}</p>
      <h1 class="reveal">${esc(page.title)}</h1>
      <p class="detail-lead reveal">${esc(page.lead)}</p>
      <div class="detail-switcher reveal" aria-label="其他查驗頁">${pageLinks}</div>
    </section>
    <section class="section detail-section detail-summary" aria-labelledby="${page.file}-summary">
      <header class="section-heading"><span class="chapter-index">I</span><div><p class="eyebrow">CERTIFICATE ROLE</p><h2 id="${page.file}-summary">這份資料解決什麼問題。</h2></div></header>
      <div class="detail-grid">
        ${page.summary.map(([label, value]) => `<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}
      </div>
      <div class="detail-copy reveal">
        ${page.meaning.map((item) => `<p>${esc(item)}</p>`).join("")}
      </div>
    </section>
    <section class="section section--dark detail-section" aria-labelledby="${page.file}-route">
      <header class="section-heading"><span class="chapter-index">II</span><div><p class="eyebrow">EVIDENCE ROUTE</p><h2 id="${page.file}-route">如何查驗。</h2></div></header>
      <div class="route-steps">
        ${page.steps.map(([number, title, body]) => `<article class="reveal"><span>${esc(number)}</span><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join("")}
      </div>
      ${page.official ? `<a class="official-link reveal" href="${page.official[1]}" target="_blank" rel="noopener">${esc(page.official[0])} ↗</a>` : ""}
    </section>
    <section class="section detail-section detail-docs-section" aria-labelledby="${page.file}-docs">
      <header class="section-heading"><span class="chapter-index">III</span><div><p class="eyebrow">SUPPORTING PDF</p><h2 id="${page.file}-docs">底層文件。</h2></div></header>
      <div class="detail-docs detail-docs--grouped reveal">
        ${renderDocs(page)}
      </div>
      <p class="scope-note reveal"><strong>審閱邊界：</strong>${esc(page.note)}</p>
      <div class="detail-next reveal"><a href="compliance.html">回到 PDF 資料室</a><a href="contact.html">需要機構審閱協助</a></div>
    </section>
  </main>
  <footer class="footer"><div class="footer__brand"><span class="wordmark__mark" aria-hidden="true">///</span><strong>MAGNE.AI</strong><p>把每一個市場承諾，變成可查的編號。</p></div><div class="footer__column"><strong>查驗頁</strong>${pageLinks}</div><div class="footer__column"><strong>閱讀</strong><a href="compliance.html">Compliance</a><a href="security.html">Security</a><a href="phone.html">Phone</a></div><div class="footer__column"><strong>連接</strong><a href="partners.html">合作</a><a href="contact.html">聯絡</a><a href="mailto:jerry_kao@magne.ai">資料索取</a></div><div class="footer__legal"><span>© 2026 MAGNE.AI</span><span>合規查驗 · ${esc(page.chapter)}</span><a href="privacy-policy.html">隱私政策</a></div></footer>
</body>
</html>
`;

for (const page of pages) {
  await writeFile(resolve(root, page.file), renderPage(page), "utf8");
}

export const complianceDetailPages = pages.map((page) => page.file);
