import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve, posix } from "node:path";
import { guideDocuments } from "./mag1-guide-config.mjs";

const escape = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function relocate(html, source, destination) {
  return html.replace(/\b(href|src)="([^"]+)"/g, (match, attribute, url) => {
    if (/^(?:[a-z]+:|\/\/|#|\/)/i.test(url)) return match;
    const [, path, suffix] = url.match(/^([^?#]*)(.*)$/);
    const target = posix.join(posix.dirname(source), path);
    const relative = posix.relative(posix.dirname(destination), target) || ".";
    return `${attribute}="${relative}${path.endsWith("/") ? "/" : ""}${suffix}"`;
  });
}

export async function buildMag1Guide(root) {
  for (const locale of guideDocuments) {
    const template = await readFile(resolve(root, locale.shell), "utf8");
    const shell = template.match(/<a class="skip-link"[\s\S]*?<\/nav>/)?.[0];
    const footer = template.match(/<footer class="footer">[\s\S]*?<\/footer>/)?.[0];
    const fonts = template.match(/<link[^>]+https:\/\/fonts.googleapis.com\/css2[^>]+>/)?.[0];
    if (!shell || !footer || !fonts) throw new Error(`Missing shared main-site components in ${locale.shell}`);
    for (const page of locale.document.pages) {
      const destination = `${locale.prefix}/${page.file}`;
      const assetRoot = posix.relative(posix.dirname(destination), "assets");
      const body = page.body.replace(/(?:\.\.\/)*assets\/mag1-guide\//g, `${assetRoot}/mag1-guide/`);
      const alternates = Object.fromEntries(guideDocuments.filter(other => other.document.pages.some(p => p.file === page.file)).map(other => [other.code, posix.relative(posix.dirname(destination), `${other.prefix}/${page.file}`)]));
      const html = `<!doctype html>
<html lang="${locale.code}" data-guide-alternates="${escape(JSON.stringify(alternates))}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f2eee4">
  <title>${escape(page.title)}</title>
  <meta name="description" content="${escape(page.description)}">
  <meta name="robots" content="noindex,nofollow">
  <meta name="guide-firmware" content="${escape(locale.document.firmware)}">
  <meta name="guide-revision" content="${escape(locale.document.guideRevision)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${fonts}
  <link rel="icon" href="${posix.relative(posix.dirname(destination), "favicon.svg")}" type="image/svg+xml">
  <link rel="stylesheet" href="${assetRoot}/site.css?v=lang-4-ga4-2">
  <link rel="stylesheet" href="${assetRoot}/mag1-guide/guide.css?v=main-1">
  <script src="${assetRoot}/site.js?v=guide-1" defer></script>
  <script src="${assetRoot}/mag1-guide/guide.js?v=${encodeURIComponent(locale.document.guideRevision)}" defer></script>
</head>
<body class="page-mag1-guide">
${relocate(shell, locale.shell, destination)}
<div class="mag1-guide">
${body}
</div>
${relocate(footer, locale.shell, destination)}
</body>
</html>
`;
      await mkdir(dirname(resolve(root, destination)), { recursive: true });
      await writeFile(resolve(root, destination), html);
    }
  }
}
