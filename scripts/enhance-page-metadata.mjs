import { readFile, writeFile } from "node:fs/promises";

const pages = {
  "pages/geschichte.html": ["geschichte", "Geschichte der Jazzmatinee Langenhagen", "Die Geschichte der Jazzmatinee Langenhagen seit 1991: eine kostenlose sommerliche Konzertreihe im Rathausinnenhof."],
  "pages/spenden.html": ["spenden", "Jazzmatinee Langenhagen unterstützen", "Mit einer Spende die kostenlose Jazzmatinee Langenhagen und ihre Live-Konzerte im Rathausinnenhof unterstützen."],
  "pages/presse.html": ["presse", "Presse | Jazzmatinee Langenhagen 2026", "Presseinformationen, Plakat und Kontakt zur Jazzmatinee Langenhagen 2026 im Rathausinnenhof."],
  "pages/kontakt.html": ["kontakt", "Kontakt | Jazzmatinee Langenhagen", "Kontakt zur Jazzmatinee Langenhagen für Organisation, Presseanfragen, Sponsoring und Kooperationen."],
  "pages/impressum.html": ["impressum", "Impressum | Jazzmatinee Langenhagen", "Impressum und Anbieterkennzeichnung der Website der Jazzmatinee Langenhagen."],
  "pages/datenschutz.html": ["datenschutz", "Datenschutz | Jazzmatinee Langenhagen", "Datenschutzhinweise für die Website der Jazzmatinee Langenhagen."],
};

for (const [file, [slug, title, description]] of Object.entries(pages)) {
  let html = await readFile(file, "utf8");
  html = html.replace(/  <title>[^<]+<\/title>/, `  <title>${title}</title>`);
  html = html.replace(/  <meta name="description" content="[^"]*">/, `  <meta name="description" content="${description}">`);
  html = html.replace(/  <link rel="canonical"[^>]*>\n(?:  <meta (?:property|name)="(?:og:|twitter:)[^\n]+\n)*/g, "");
  const canonical = `https://jazzmatinee-langenhagen.de/pages/${slug}.html`;
  const social = `  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Jazzmatinee Langenhagen">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://jazzmatinee-langenhagen.de/assets/images/optimized/jazzmatinee-poster-a2.jpg">
  <meta property="og:image:alt" content="Plakat der Jazzmatinee Langenhagen 2026">
  <meta property="og:locale" content="de_DE">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://jazzmatinee-langenhagen.de/assets/images/optimized/jazzmatinee-poster-a2.jpg">
  <meta name="twitter:image:alt" content="Plakat der Jazzmatinee Langenhagen 2026">
`;
  html = html.replace(/(  <meta name="description"[^>]+>\n)/, `$1${social}`);
  html = html.replace(/style\.css\?v=[^"]+/, "style.css?v=20260721-6");
  html = html.replace(/href="\.\.\/index\.html/g, 'href="../');
  if (!html.includes('rel="manifest"')) html = html.replace(/(  <link rel="apple-touch-icon"[^>]+>\n)/, '$1  <link rel="manifest" href="../manifest.webmanifest">\n');
  await writeFile(file, html);
}

console.log(`Enhanced metadata for ${Object.keys(pages).length} pages.`);
