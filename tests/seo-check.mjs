import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { events } from "../scripts/generate-event-pages.mjs";

const root = process.cwd();
const eventFiles = events.map(({ slug }) => `programm/${slug}/index.html`);
const pages = ["index.html", ...eventFiles, "pages/geschichte.html", "pages/spenden.html", "pages/presse.html", "pages/kontakt.html", "pages/impressum.html", "pages/datenschutz.html"];
const titles = new Set();
const canonicals = new Set();
let checks = 0;
const failures = [];

function check(condition, message) {
  checks += 1;
  if (!condition) failures.push(message);
}

function matches(html, expression) {
  return [...html.matchAll(expression)];
}

async function exists(target) {
  try { return (await stat(target)).isFile(); } catch { return false; }
}

function localTarget(file, href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean) return null;
  if (clean.startsWith("/")) return path.join(root, clean === "/" ? "index.html" : clean, clean.endsWith("/") ? "index.html" : "");
  const resolved = path.resolve(root, path.dirname(file), clean);
  return clean.endsWith("/") ? path.join(resolved, "index.html") : resolved;
}

for (const file of pages) {
  const html = await readFile(path.join(root, file), "utf8");
  const h1s = matches(html, /<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/gi);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/gi) ?? [];
  const canonicalUrl = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  check(/^<!DOCTYPE html>/i.test(html), `${file}: HTML5 doctype fehlt`);
  check(/<html lang="de">/i.test(html), `${file}: lang=de fehlt`);
  check(h1s.length === 1, `${file}: erwartet genau eine H1, gefunden ${h1s.length}`);
  check(Boolean(title), `${file}: title fehlt`);
  check(Boolean(description), `${file}: Meta-Description fehlt`);
  check(canonical.length === 1, `${file}: erwartet genau einen Canonical-Link`);
  check(canonicalUrl?.startsWith("https://jazzmatinee-langenhagen.de/") && !canonicalUrl.includes("www."), `${file}: Canonical ist nicht kanonisch`);
  check(/property="og:title"/i.test(html) && /property="og:description"/i.test(html) && /property="og:url"/i.test(html) && /property="og:image"/i.test(html), `${file}: Open-Graph-Daten unvollständig`);
  check(/name="twitter:card" content="summary_large_image"/i.test(html), `${file}: Twitter-Card fehlt`);
  check(!titles.has(title), `${file}: doppelter Seitentitel`); titles.add(title);
  check(!canonicals.has(canonicalUrl), `${file}: doppelter Canonical`); canonicals.add(canonicalUrl);

  for (const match of matches(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); check(true, ""); } catch { check(false, `${file}: ungültiges JSON-LD`); }
  }
  for (const [, attribute, href] of matches(html, /<(?:a|img|script|link)[^>]+(href|src)="([^"]+)"/gi)) {
    if (/^(?:https?:|mailto:|tel:|data:)/.test(href) || (attribute === "href" && href.startsWith("#"))) continue;
    const target = localTarget(file, href);
    check(target && await exists(target), `${file}: lokales Ziel fehlt: ${href}`);
  }
}

for (const [index, event] of events.entries()) {
  const file = eventFiles[index];
  const html = await readFile(path.join(root, file), "utf8");
  check(html.includes(event.name.replaceAll("&", "&amp;")) || html.includes(event.name), `${file}: Bandname fehlt`);
  check(html.includes(event.dateText), `${file}: sichtbares Datum fehlt`);
  check(html.includes("Eintritt frei"), `${file}: Eintritt frei fehlt`);
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)[1]);
  check(data.startDate === `${event.date}T11:00:00+02:00`, `${file}: startDate falsch`);
  check(data.endDate === `${event.date}T14:00:00+02:00`, `${file}: endDate falsch`);
  check(data.location?.address?.streetAddress === "Marktplatz 1" && data.location?.address?.postalCode === "30853", `${file}: Event-Adresse falsch`);
  check(data.organizer?.name === "City of Music e. V." && data.isAccessibleForFree === true && data.offers?.price === 0, `${file}: Veranstalter/Freikarte falsch`);
}

const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
check(/^<\?xml/.test(sitemap) && /<urlset/.test(sitemap), "sitemap.xml: kein valides Grundgerüst");
const sitemapUrls = matches(sitemap, /<loc>([^<]+)<\/loc>/g).map((match) => match[1]);
check(sitemapUrls.length === pages.length, `sitemap.xml: ${sitemapUrls.length} statt ${pages.length} URLs`);
for (const url of sitemapUrls) {
  check(url.startsWith("https://jazzmatinee-langenhagen.de/") && !url.includes("www."), `sitemap.xml: nicht-kanonische URL ${url}`);
  const relative = url.replace("https://jazzmatinee-langenhagen.de/", "");
  check(await exists(path.join(root, relative || "index.html", relative.endsWith("/") ? "index.html" : "")), `sitemap.xml: Ziel fehlt ${url}`);
}
for (const { slug } of events) check(sitemap.includes(`/programm/${slug}/`), `sitemap.xml: Konzert fehlt ${slug}`);
const robots = await readFile(path.join(root, "robots.txt"), "utf8");
check(/User-agent: \*/.test(robots) && /Allow: \//.test(robots), "robots.txt: Crawling nicht erlaubt");
check(robots.includes("Sitemap: https://jazzmatinee-langenhagen.de/sitemap.xml"), "robots.txt: Sitemap-Verweis fehlt");

const stylesheet = await readFile(path.join(root, "assets/css/style.css"), "utf8");
const posterRule = stylesheet.match(/\.hero__poster-image\s*\{([^}]+)\}/)?.[1] ?? "";
check(/width:\s*100%/.test(posterRule), "Hero-Plakat: volle Kartenbreite fehlt");
check(/height:\s*auto/.test(posterRule), "Hero-Plakat: natürliche Höhe fehlt");
check(/object-fit:\s*contain/.test(posterRule), "Hero-Plakat: vollständige Darstellung ist nicht abgesichert");

console.log(`${checks - failures.length}/${checks} SEO- und Integritätsprüfungen bestanden.`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}
