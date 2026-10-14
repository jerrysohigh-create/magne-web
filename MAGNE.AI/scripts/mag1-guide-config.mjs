import { readFileSync } from "node:fs";

// Firmware identity and editorial revision are separate. Retain older build assets.
export const guideManifest = {
  firmware: "MAG1WW53",
  locales: [
    { code: "zh-Hant", prefix: "mag1-guide", content: "content/mag1-guide/MAG1WW53/zh-Hant.json", shell: "phone.html" },
    { code: "en", prefix: "en/mag1-guide", content: "content/mag1-guide/MAG1WW53/en.json", shell: "en/phone.html" },
  ],
};
export const guideDocuments = guideManifest.locales.map(locale => ({
  ...locale,
  document: JSON.parse(readFileSync(new URL(`../${locale.content}`, import.meta.url), "utf8")),
}));
export const guidePages = guideDocuments.flatMap(locale => locale.document.pages.map(page => `${locale.prefix}/${page.file}`));
