import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { complianceDetailPages } from "./generate-compliance-detail-pages.mjs";
import { generateCoreLocales } from "./generate-core-locales.mjs";
import { injectSeo, seoByPage } from "./seo.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

await generateCoreLocales();

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "client"), { recursive: true });
await mkdir(resolve(dist, "server"), { recursive: true });

const tcPages = [
  "index.html",
  "phone.html",
  "phone-specs.html",
  "phone-architecture.html",
  "mainboard-3d.html",
  "ai.html",
  "network.html",
  "security.html",
  "compliance.html",
  ...complianceDetailPages,
  "progress.html",
  "stories.html",
  "partners.html",
  "media-kit.html",
  "privacy-policy.html",
  "contact.html",
];
const localizedPages = [
  "en/index.html",
  "en/phone.html",
  "en/phone-specs.html",
  "en/phone-architecture.html",
  "en/mainboard-3d.html",
  "en/ai.html",
  "en/network.html",
  "en/security.html",
  "en/compliance.html",
  "en/progress.html",
  "en/stories.html",
  "en/partners.html",
  "en/media-kit.html",
  "en/privacy-policy.html",
  "en/contact.html",
  "en/google-approval.html",
  "en/fcc-lookup.html",
  "en/gsma-tac-lookup.html",
  "en/cb-lookup.html",
  "en/un383-lookup.html",
  "en/cp65-lookup.html",
  "en/ce-lookup.html",
];
const pages = [...tcPages, ...localizedPages];

const publicFiles = ["robots.txt", "sitemap.xml", "favicon.svg", "site.webmanifest"];

if (tcPages.some((page) => !seoByPage[page]) || Object.keys(seoByPage).length !== tcPages.length) {
  throw new Error("SEO page configuration does not match the published page list.");
}

for (const page of pages) {
  const destination = resolve(dist, "client", page);
  await mkdir(dirname(destination), { recursive: true });
  await cp(resolve(root, page), destination);
}

for (const file of publicFiles) {
  await cp(resolve(root, file), resolve(dist, "client", file));
}

const assetRoot = resolve(root, "assets");
const publishedAssetRoot = resolve(dist, "client", "assets");
const referencedAssets = new Set();
const rawAssetReferences = new Map();
const assetPattern = /(?:href|src)=["'](?:\.\.\/)?assets\/([^"'?#]+)(?:[?#][^"']*)?["']/g;

for (const page of pages) {
  const html = await readFile(resolve(root, page), "utf8");
  for (const match of html.matchAll(assetPattern)) {
    const rawAssetPath = match[1].replaceAll("&amp;", "&");
    const assetPath = decodeURIComponent(rawAssetPath);
    referencedAssets.add(assetPath);
    rawAssetReferences.set(rawAssetPath, assetPath);
  }
}

const assetsByHash = new Map();
for (const assetPath of referencedAssets) {
  const source = resolve(assetRoot, assetPath);
  if (relative(assetRoot, source).startsWith("..")) {
    throw new Error(`Asset path escapes the assets directory: ${assetPath}`);
  }
  const hash = createHash("sha256").update(await readFile(source)).digest("hex");
  const matches = assetsByHash.get(hash) ?? [];
  matches.push(assetPath);
  assetsByHash.set(hash, matches);
}

const duplicateAssetAliases = new Map();
const publishedAssets = [];
for (const matches of assetsByHash.values()) {
  const [canonical, ...duplicates] = [...matches].sort((left, right) =>
    left.length - right.length || left.localeCompare(right, "en")
  );
  publishedAssets.push(canonical);
  duplicates.forEach((assetPath) => duplicateAssetAliases.set(assetPath, canonical));
}

for (const assetPath of publishedAssets.sort()) {
  const source = resolve(assetRoot, assetPath);
  const destination = resolve(publishedAssetRoot, assetPath);
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
}

for (const page of tcPages) {
  const destination = resolve(dist, "client", page);
  let html = await readFile(destination, "utf8");
  for (const [rawAssetPath, assetPath] of rawAssetReferences) {
    const canonical = duplicateAssetAliases.get(assetPath);
    if (canonical) html = html.replaceAll(`assets/${rawAssetPath}`, `assets/${canonical}`);
  }
  html = injectSeo(html, page);
  await writeFile(destination, html);
}

// These viewers resolve models, Draco decoders and data files dynamically.
for (const bundle of ["phone-3d", "phone-architecture-viewer", "mainboard-3d"]) {
  await cp(resolve(assetRoot, bundle), resolve(publishedAssetRoot, bundle), { recursive: true });
}

await cp(resolve(root, "worker", "index.js"), resolve(dist, "server", "index.js"));

for (const page of pages) {
  const html = await readFile(resolve(dist, "client", page), "utf8");
  const expectedLanguage = page.startsWith("en/")
    ? "en"
    : page.startsWith("ja/")
      ? "ja"
      : page.startsWith("ko/")
        ? "ko"
        : "zh-Hant";
  if (!html.includes("<!doctype html>") || !html.includes(`lang="${expectedLanguage}"`)) {
    throw new Error(`${page} is missing its expected HTML document markers.`);
  }
}

await writeFile(resolve(dist, "client", "_headers"), [
  "/*",
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  Permissions-Policy: camera=(), microphone=(), geolocation=()",
  "",
  "/assets/*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
  "/robots.txt",
  "  Content-Type: text/plain; charset=utf-8",
  "",
  "/sitemap.xml",
  "  Content-Type: application/xml; charset=utf-8",
  "",
  "/site.webmanifest",
  "  Content-Type: application/manifest+json; charset=utf-8",
  "",
  "/favicon.svg",
  "  Content-Type: image/svg+xml",
  ""
].join("\n"));

console.log(`Built MAGNE.AI with ${pages.length} pages, ${publishedAssets.length} unique assets, ${duplicateAssetAliases.size} aliases and 3 runtime bundles`);
