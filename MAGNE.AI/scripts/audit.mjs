import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirectories = new Set(["assets", "dist", "ja", "ko", "node_modules", "worker"]);

async function collectHtml(directory = root) {
  const pages = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) continue;
    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) pages.push(...await collectHtml(absolute));
    else if (entry.isFile() && extname(entry.name).toLowerCase() === ".html") pages.push(absolute);
  }
  return pages;
}

const pages = (await collectHtml()).sort();
const failures = [];
const warnings = [];
const localReferencePattern = /(?:href|src)=["']([^"']+)["']/g;
const idPattern = /\sid=["']([^"']+)["']/g;

for (const absolute of pages) {
  const page = relative(root, absolute).replaceAll("\\", "/");
  const html = await readFile(absolute, "utf8");
  const ids = [...html.matchAll(idPattern)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${page}: missing title`);
  if (!/<meta\s+name=["']description["'][^>]+content=["'][^"']+/i.test(html)) failures.push(`${page}: missing meta description`);
  if (!/<h1(?:\s|>)/i.test(html)) failures.push(`${page}: missing h1`);
  if (duplicateIds.length) failures.push(`${page}: duplicate ids ${duplicateIds.join(", ")}`);

  for (const match of html.matchAll(localReferencePattern)) {
    const raw = match[1].replaceAll("&amp;", "&");
    if (/^(?:[a-z]+:|#|\/\/|mailto:|tel:|javascript:)/i.test(raw)) continue;
    const path = decodeURIComponent(raw.split(/[?#]/, 1)[0]);
    if (!path || path === "/") continue;
    const target = path.startsWith("/") ? resolve(root, `.${path}`) : resolve(dirname(absolute), path);
    try {
      const targetStat = await stat(target);
      if (targetStat.isDirectory()) await stat(resolve(target, "index.html"));
    } catch {
      failures.push(`${page}: missing local reference ${raw}`);
    }
  }
}

const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>https:\/\/www\.magne\.ai\/(.*?)<\/loc>/g)].map((match) => {
  const path = match[1];
  if (!path) return "index.html";
  return path.endsWith("/") ? `${path}index.html` : path;
}));
for (const absolute of pages) {
  const page = relative(root, absolute).replaceAll("\\", "/");
  if (!sitemapUrls.has(page)) failures.push(`${page}: missing from sitemap.xml`);
}

const allHtml = await Promise.all(pages.map((page) => readFile(page, "utf8")));
const allScripts = await readFile(resolve(root, "assets", "site.js"), "utf8");
const analyticsSource = `${allHtml.join("\n")}\n${allScripts}`;
const ga4Ids = [...new Set(analyticsSource.match(/G-[A-Z0-9]{6,}/g) ?? [])];
if (!ga4Ids.length) warnings.push("GA4 is not configured: no G- measurement ID found");

console.log(`Pages checked: ${pages.length}`);
console.log(`GA4: ${ga4Ids.length ? ga4Ids.join(", ") : "NOT_CONFIGURED"}`);
warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
if (failures.length) {
  failures.forEach((failure) => console.error(`ERROR: ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Structure: PASS");
}
