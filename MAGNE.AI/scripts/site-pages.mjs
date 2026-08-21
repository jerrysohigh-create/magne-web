import { complianceDetailPages } from "./generate-compliance-detail-pages.mjs";

export const tcPages = [
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

export const enPages = tcPages.map((page) => `en/${page}`);
export const publishedPages = [...tcPages, ...enPages];
export const standalonePages = ["404.html"];
export const buildPages = [...publishedPages, ...standalonePages];
