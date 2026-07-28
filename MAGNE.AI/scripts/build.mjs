import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "client"), { recursive: true });
await mkdir(resolve(dist, "server"), { recursive: true });

const pages = ["index.html", "phone.html", "ai.html", "network.html", "security.html", "compliance.html", "partners.html", "contact.html"];

for (const page of pages) {
  await cp(resolve(root, page), resolve(dist, "client", page));
}
await cp(resolve(root, "assets"), resolve(dist, "client", "assets"), { recursive: true });
await cp(resolve(root, "worker", "index.js"), resolve(dist, "server", "index.js"));

for (const page of pages) {
  const html = await readFile(resolve(dist, "client", page), "utf8");
  if (!html.includes("<!doctype html>") || !html.includes('lang="zh-Hant"')) {
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
  ""
].join("\n"));

console.log("Built MAGNE.AI TC INDEX");
