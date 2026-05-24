import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE_URL = "https://docs.iron.sh";
const DIST = "docs/dist";

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === ".vocs" || entry === "assets" || entry === "images") continue;
      out.push(...walk(full));
    } else if (entry === "index.html") {
      out.push({ path: full, mtime: st.mtime });
    }
  }
  return out;
}

const pages = walk(DIST).map(({ path, mtime }) => {
  const rel = relative(DIST, path).split(sep).slice(0, -1).join("/");
  const url = rel === "" ? SITE_URL : `${SITE_URL}/${rel}`;
  return { url, lastmod: mtime.toISOString() };
});

pages.sort((a, b) => a.url.localeCompare(b.url));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(
    ({ url, lastmod }) =>
      `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`,
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(DIST, "sitemap.xml"), xml);
console.log(`wrote ${DIST}/sitemap.xml (${pages.length} urls)`);
