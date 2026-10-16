import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { publishedPages } from "./site-pages.mjs";

const siteOrigin = "https://www.magne.ai";
const lastModified = "2026-08-21";

function publicUrl(page) {
  if (page === "index.html") return `${siteOrigin}/`;
  if (page === "en/index.html") return `${siteOrigin}/en/`;
  if (page === "ja/index.html") return `${siteOrigin}/ja/`;
  if (page === "ko/index.html") return `${siteOrigin}/ko/`;
  return `${siteOrigin}/${page}`;
}

function priority(page) {
  if (page === "en/index.html") return "1.0";
  if (page === "phone.html") return "0.9";
  if (page.endsWith("phone.html") || page.endsWith("phone-architecture.html")) return "0.8";
  if (/^(?:en\/)?(?:ai|network|security|compliance|progress)\.html$/.test(page)) return "0.8";
  if (page.endsWith("phone-specs.html") || page.endsWith("stories.html") || page.endsWith("partners.html")) return "0.7";
  if (page.endsWith("index.html")) return "0.7";
  if (page.endsWith("media-kit.html") || page.endsWith("contact.html")) return "0.5";
  if (page.endsWith("privacy-policy.html")) return "0.3";
  return "0.6";
}

export async function generateSitemap(root) {
  const urls = publishedPages.map((page) =>
    `  <url><loc>${publicUrl(page)}</loc><lastmod>${lastModified}</lastmod><priority>${priority(page)}</priority></url>`
  );
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join("\n");
  await writeFile(resolve(root, "sitemap.xml"), xml, "utf8");
}
