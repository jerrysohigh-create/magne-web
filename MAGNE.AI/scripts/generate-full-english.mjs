import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputRoot = resolve(root, "en");
const cachePath = resolve(root, "scripts", ".english-translation-cache.json");

const pages = [
  "index.html", "ai.html", "network.html", "security.html", "compliance.html",
  "progress.html", "stories.html", "partners.html", "media-kit.html", "contact.html",
  "privacy-policy.html", "phone-architecture.html", "mainboard-3d.html",
  "google-approval.html", "fcc-lookup.html", "gsma-tac-lookup.html", "cb-lookup.html",
  "un383-lookup.html", "cp65-lookup.html", "ce-lookup.html",
];

const containsHan = (value) => /[\u3400-\u9fff]/u.test(value);

const editorialOverrides = {
  "MAGNE.AI｜把所有權，放回手上": "MAGNE.AI | Put ownership back in your hands",
  "MAGNE.AI 繁體中文官網：探索 MAG1 智能終端、端側 AI、安全架構、開放網絡、合作夥伴與公司進展。": "Explore MAG1, MAGNE.AI's intelligent terminal, on-device AI, hardware security, open network, partners and verifiable progress.",
  "端側 AI｜MAGNE.AI": "On-device AI | MAGNE.AI",
  "不是更聰明的手機。": "Not a smarter phone.",
  "是把": "Putting ",
  "所有權": "ownership",
  "放回手上。": "back in your hands.",
  "雲端負責助理。": "Cloud AI assists.",
  "端側負責本地智能。": "On-device AI keeps intelligence local.",
  "不是準備": "It is not about preparing to",
  "走向市場。": "enter the market.",
  "是留下走過的證據。": "It is about leaving evidence of the journey.",
  "不要填一張": "Do not submit a form",
  "不知道會去哪裡的表單。": "without knowing where it goes.",
  "別填一張": "Skip the form",
  "不知道會去哪裡的表單。": "that disappears into a black box.",
  "隱私政策": "Privacy Policy",
  "繁中": "EN",
  "繁體中文": "English",
  "繁體中文 · VOL. 01": "ENGLISH · VOL. 01",
  "繁體中文 · LEGAL 01": "ENGLISH · LEGAL 01",
  "主要導覽": "Primary navigation",
  "開啟導覽": "Open navigation",
  "資源": "Resources",
  "關注": "Follow",
  "獨立安全處理器負責離線復原材料。它不替主系統背書，只保存一條可被授權喚回的所有權路徑。": "A dedicated secure processor protects offline recovery material. It does not vouch for the main system; it preserves an independently authorized path back to ownership.",
  "主頻、峰值算力與 INT8 精度依 MAG1 實機 ADB 結果呈現。NNA 為受支援的神經網絡工作負載提供硬件推理；固定瓦數會隨頻率、模型與負載改變，因此不以單一功耗值宣稱。": "Clock speed, peak compute and INT8 precision are reported from MAG1 device ADB results. The NNA accelerates supported neural-network workloads; power varies by frequency, model and load, so no single fixed wattage is claimed.",
  "本地語言模型負責翻譯工作流，不包裝成獨立的本地 AI 助理。": "The local language model supports the translation workflow; it is not presented as a separate on-device assistant.",
  "只呈現 MAG1 EVT 階段的主板實拍，不補造厚度，也不以代理幾何取代真實輪廓。元件面與屏蔽面保留各自的原始視角與可見細節。": "This viewer uses photographs of the MAG1 EVT mainboard. It does not invent board thickness or substitute proxy geometry for the real outline. Both component and shield sides preserve their original perspective and visible detail.",
  "展示使用修復後實拍影像；畫面可放大查看，但不宣稱為尺寸量測、ECAD 或三維模型。": "The restored photographs can be enlarged for inspection, but they are not presented as dimensional measurements, ECAD data or a 3D model.",
  "您的個人資料及某些其他使用者生成內容可能對服務的其他使用者或公眾可見。例如，您可能選擇透過服務向他人提供您的個人資料，例如當您提供評論、評論、調查回覆或分享其他內容時。此類資訊可被他人查看、收集及使用，包括被他人緩存、複製、螢幕截圖或儲存於其他地方（例如搜尋引擎），我們對此類使用不承擔責任；及": "Your profile and certain user-generated content may be visible to other users or the public. For example, you may choose to share personal information through comments, survey responses or other content. Others may view, collect, cache, copy, screenshot or store that information elsewhere, including in search engines, and we are not responsible for their use of it; and",
  "兩個表面。": "Two sides.",
  "同一塊": "One real",
  "真實主板。": "mainboard.",
  "可以下載。": "Ready to download.",
  "可以引用。": "Ready to use.",
  "但不能失去語境。": "Always with the right context.",
  "但不能失去上下文。": "Always with the right context.",
  "三層各自說話。": "Three layers speak for themselves.",
  "各自可信。": "Each is independently verifiable.",
  "三層各自說話，各自可信。": "Three layers speak for themselves. Each is independently verifiable.",
  "三層各自可信。": "Three independently verifiable layers.",
  "不靠彼此背書。": "No layer relies on another to vouch for it.",
  "三層各自可信，不靠彼此背書。": "Three independently verifiable layers. No layer relies on another to vouch for it.",
  "裝置負責簽署，根鏈負責留下，L2 負責讓應用運行。沒有任何一層需要假裝自己是全部。": "The device signs. The base chain records. L2 keeps applications moving. No layer pretends to be the whole system.",
  "一台終端，": "One terminal,",
  "不是獨自誕生。": "built by more than one company.",
  "它穿過的是一整條生態。": "It moves through an entire ecosystem.",
  "不是孤立誕生。": "built by more than one company.",
  "它穿過一整個生態。": "It moves through an entire ecosystem.",
  "從外殼，": "From the enclosure,",
  "一路看見信任根。": "all the way to the root of trust.",
  "進展不是": "Progress is not",
  "進度不是": "Progress is not",
  "一條進度條。": "a progress bar.",
  "是留下證據。": "It is a record of evidence.",
  "安全不是一面牆。": "Security is not one wall.",
  "安全不是": "Security is not",
  "一堵牆。": "one wall.",
  "是三道門。": "It is three distinct gates.",
  "現場留下的不只日期。": "A field record holds more than a date.",
  "還留下聲音與動作。": "It preserves voices, movement and context.",
  "現場不只留下日期。": "A field record holds more than a date.",
  "也留下聲音與動作。": "It preserves voices, movement and context.",
  "真正主板正反面｜MAGNE.AI": "MAG1 Mainboard, Front and Back | MAGNE.AI",
  "MAG1 主板正反面實拍｜MAGNE.AI": "MAG1 Mainboard, Front and Back | MAGNE.AI",
  "MAG1 互動工程視圖｜MAGNE.AI": "MAG1 Interactive Engineering View | MAGNE.AI",
  "合作、供應鏈與生態｜MAGNE.AI": "Partners, Supply Chain and Ecosystem | MAGNE.AI",
  "項目進展與公開紀錄｜MAGNE.AI": "Progress and Public Record | MAGNE.AI",
  "影像檔案｜MAGNE.AI": "Stories and Field Archive | MAGNE.AI",
  "影像檔案 | MAGNE.AI": "Stories and Field Archive | MAGNE.AI",
  "一直看到信任根。": "all the way to the root of trust.",
};

async function loadCache() {
  try { return JSON.parse(await readFile(cachePath, "utf8")); }
  catch { return {}; }
}

function requestTranslations(values) {
  const query = values.map((value) => `q=${encodeURIComponent(value)}`).join("&");
  const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=zh-TW&tl=en&${query}`;
  return new Promise((resolveRequest, reject) => {
    const command = "$ProgressPreference='SilentlyContinue'; [Console]::OutputEncoding=[Text.UTF8Encoding]::new(); (Invoke-WebRequest -Uri $env:MAGNE_TRANSLATE_URL -UseBasicParsing -TimeoutSec 20 -Headers @{'User-Agent'='Mozilla/5.0'}).Content";
    execFile("powershell.exe", ["-NoProfile", "-Command", command], { encoding: "utf8", timeout: 30000, maxBuffer: 1024 * 1024, env: { ...process.env, MAGNE_TRANSLATE_URL: url } }, (error, stdout) => {
      if (error) return reject(error);
      try {
        const result = JSON.parse(stdout.trim());
        resolveRequest(Array.isArray(result) ? result.flat().map(String) : []);
      } catch (parseError) { reject(parseError); }
    });
  });
}

async function translateAll(values, cache) {
  const unique = [...new Set(values.map((value) => value.trim()).filter((value) => value && containsHan(value)))];
  const missing = unique.filter((value) => !cache[value]);
  for (let index = 0; index < missing.length; index += 12) {
    const batch = missing.slice(index, index + 12);
    let translated;
    for (let attempt = 1; attempt <= 6; attempt += 1) {
      try { translated = await requestTranslations(batch); break; }
      catch (error) {
        if (attempt === 6) throw error;
        await new Promise((done) => setTimeout(done, attempt * 1800));
      }
    }
    if (translated.length !== batch.length) throw new Error(`Translation count mismatch at batch ${index / 12 + 1}`);
    batch.forEach((source, offset) => { cache[source] = translated[offset]; });
    await writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
    await new Promise((done) => setTimeout(done, 180));
  }
  return cache;
}

function collectTranslatable(html) {
  const values = [];
  const withoutCode = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "");
  for (const match of withoutCode.matchAll(/>([^<>]+)</g)) {
    const value = match[1].trim();
    if (containsHan(value)) values.push(value);
  }
  for (const match of html.matchAll(/\b(?:title|content|alt|aria-label|placeholder)="([^"]*[\u3400-\u9fff][^"]*)"/giu)) {
    values.push(match[1].trim());
  }
  return values;
}

function replacePreservingSpace(value, cache) {
  const trimmed = value.trim();
  if (!containsHan(trimmed) || !cache[trimmed]) return value;
  return `${value.slice(0, value.indexOf(trimmed))}${cache[trimmed]}${value.slice(value.indexOf(trimmed) + trimmed.length)}`;
}

function localizeHtml(source, page, cache) {
  const codeBlocks = [];
  let html = source.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, (block) => {
    const marker = `___MAGNE_CODE_BLOCK_${codeBlocks.length}___`;
    codeBlocks.push(block);
    return marker;
  });

  html = html.replace(/>([^<>]+)</g, (full, value) => `>${replacePreservingSpace(value, cache)}<`);
  html = html.replace(/\b(title|content|alt|aria-label|placeholder)="([^"]+)"/giu, (full, name, value) => `${name}="${replacePreservingSpace(value, cache)}"`);
  html = html.replace(/<html\s+lang="[^"]+"(?:\s+data-asset-base="[^"]*")?/i, '<html lang="en" data-asset-base="../"');
  html = html.replaceAll("｜", " | ").replaceAll("，", ",");
  html = html.replaceAll("Device-side", "On-device").replaceAll("device-side", "on-device");
  html = html
    .replaceAll("SMART TERMINALS", "INTELLIGENT TERMINALS")
    .replaceAll("SMART TERMINAL", "INTELLIGENT TERMINAL")
    .replaceAll("Smart terminals", "Intelligent terminals")
    .replaceAll("Smart terminal", "Intelligent terminal")
    .replaceAll("smart terminals", "intelligent terminals")
    .replaceAll("smart terminal", "intelligent terminal");
  html = html
    .replaceAll("Intelligence · THE INTELLIGENCE", "THE INTELLIGENCE")
    .replaceAll("Network · THE NETWORK", "THE NETWORK")
    .replaceAll("Object · THE OBJECT", "THE OBJECT")
    .replaceAll("Office · THE OFFICE", "THE OFFICE")
    .replaceAll("Response · THE RESPONSE", "THE RESPONSE")
    .replaceAll("THE MOMENT · THE MOMENT", "THE MOMENT")
    .replaceAll("Those present · THE WITNESSES", "THE WITNESSES")
    .replaceAll("Open · THE OPEN RECORD", "THE OPEN RECORD");
  if (!html.includes('href="media-kit.html"') && html.includes('href="contact.html"')) {
    html = html.replace('href="contact.html"', 'href="media-kit.html">MEDIA KIT</a><a href="contact.html"');
  }
  html = html.replace(/<meta\s+property="og:locale"\s+content="[^"]+"\s*\/?>/i, '<meta property="og:locale" content="en_US">');
  html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang="(?:ja|ko)"[^>]*>\s*/gi, "\n");

  codeBlocks.forEach((block, index) => { html = html.replace(`___MAGNE_CODE_BLOCK_${index}___`, block); });

  html = html.replace(/\b(href|src)="(?!https?:|mailto:|tel:|#|\/\/)([^"]+)"/gi, (full, attr, target) => {
    if (target === "./" || target.startsWith("en/")) return `${attr}="${target === "./" ? "./" : target.slice(3)}"`;
    if (/^(?:assets\/|favicon\.svg|site\.webmanifest)/.test(target)) return `${attr}="../${target}"`;
    return `${attr}="${target}"`;
  });

  const canonicalPath = page === "index.html" ? "en/" : `en/${page}`;
  if (page === "index.html") {
    html = html.replace('hreflang="zh-Hant" href="https://www.magne.ai/"', 'hreflang="zh-Hant" href="https://www.magne.ai/index.html"');
  }
  if (page === "phone-architecture.html") {
    html = html.replaceAll("step=0", "step=0&amp;lang=en&amp;v=2");
  }
  if (page === "progress.html") {
    html = html.replaceAll("progress-evidence-index.svg", "progress-evidence-index-en.svg");
  }
  html = html.replace(/(<link\s+rel="canonical"\s+href=")https:\/\/www\.magne\.ai\/[^\"]*(")/i, `$1https://www.magne.ai/${canonicalPath}$2`);
  html = html.replace(/(<meta\s+property="og:url"\s+content=")https:\/\/www\.magne\.ai\/[^\"]*(")/i, `$1https://www.magne.ai/${canonicalPath}$2`);
  if (!/<link\s+rel="canonical"/i.test(html)) {
    const traditionalPath = page === "index.html" ? "" : page;
    const seoLinks = `  <link rel="canonical" href="https://www.magne.ai/${canonicalPath}">\n  <link rel="alternate" hreflang="en" href="https://www.magne.ai/${canonicalPath}">\n  <link rel="alternate" hreflang="zh-Hant" href="https://www.magne.ai/${traditionalPath}">\n`;
    html = html.replace(/<\/head>/i, `${seoLinks}</head>`);
  }

  return html;
}

async function main() {
  await mkdir(outputRoot, { recursive: true });
  const cache = await loadCache();
  Object.assign(cache, editorialOverrides);
  const sources = new Map();
  const values = [];
  for (const page of pages) {
    const source = await readFile(resolve(root, page), "utf8");
    sources.set(page, source);
    values.push(...collectTranslatable(source));
  }
  await translateAll(values, cache);
  for (const page of pages) {
    await writeFile(resolve(outputRoot, page), localizeHtml(sources.get(page), page, cache), "utf8");
  }
  console.log(`Generated ${pages.length} English pages from the Traditional Chinese source structure.`);
}

await main();
