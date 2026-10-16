import { readFileSync } from "node:fs";

// Software versions and firmware filenames are distinct, centrally defined values.
export const guideVersionNames = JSON.parse(readFileSync(new URL("../content/mag1-guide/version-names.json", import.meta.url), "utf8"));
export const guideManifest = {
  edition: "review-20261016",
  evidenceBuilds: [guideVersionNames.currentSoftwareVersion],
  softwareVersion: guideVersionNames.currentSoftwareVersion,
  firmware: guideVersionNames.currentSoftwareVersion,
  targetFirmware: guideVersionNames.currentSoftwareVersion,
  firmwarePackage: guideVersionNames.firmwarePackage,
  captureFirmware: guideVersionNames.currentSoftwareVersion,
  availableFirmwareVersions: guideVersionNames.softwareVersions,
  locales: [
    { code: "zh-Hant", prefix: "mag1-guide", content: "content/mag1-guide/review-20261016/zh-Hant.json", shell: "phone.html" },
    { code: "en", prefix: "en/mag1-guide", content: "content/mag1-guide/review-20261016/en.json", shell: "en/phone.html" },
  ],
};
export const guideDocuments = guideManifest.locales.map(locale => ({
  ...locale,
  document: JSON.parse(readFileSync(new URL(`../${locale.content}`, import.meta.url), "utf8")),
}));
export const guidePages = guideDocuments.flatMap(locale => locale.document.pages.map(page => `${locale.prefix}/${page.file}`));
