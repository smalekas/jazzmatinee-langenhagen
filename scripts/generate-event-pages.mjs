import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const events = [
  {
    slug: "brazzo-brazzone-05-07-2026", name: "Brazzo Brazzone", date: "2026-07-05", dateText: "5. Juli 2026",
    image: "assets/images/bands/brazzo-brazzone.jpg", width: 1918, height: 1079,
    alt: "Brazzo Brazzone bei einem Live-Auftritt",
    description: "Italo-World-Groove mit ordentlich Druck: Die hannoversche Brass Band verbindet Jazz, Balkan, Latin, Funk und Soul zu einer farbenfrohen musikalischen Festa."
  },
  {
    slug: "linden-swing-ensemble-12-07-2026", name: "Linden Swing Ensemble", date: "2026-07-12", dateText: "12. Juli 2026",
    image: "assets/images/optimized/linden-swing-ensemble.jpg", width: 900, height: 1200,
    alt: "Mitglieder des Linden Swing Ensemble",
    description: "Klassischer Swing aus Hannover, leichtfüßig und tanzbar gespielt. Das Ensemble bringt den Klang der großen Swing-Ära in entspannter Atmosphäre auf die Bühne."
  },
  {
    slug: "lulu-white-19-07-2026", name: "Lulu White", date: "2026-07-19", dateText: "19. Juli 2026",
    image: "assets/images/bands/lulu-white.jpg", width: 576, height: 864,
    alt: "Lulu White Salon Orchestra",
    description: "Das Salon Orchestra feiert den Jazz der 1920er-Jahre und das Nachtleben von New Orleans. Hot Jazz, Swing und charmanter Gesang sorgen für stilvolles Flair."
  },
  {
    slug: "music-unlimited-big-band-26-07-2026", name: "Music Unlimited Big Band", date: "2026-07-26", dateText: "26. Juli 2026",
    image: "assets/images/bands/music-unlimited-big-band.jpg", width: 1500, height: 1500,
    alt: "Music Unlimited Big Band",
    description: "Satter Big-Band-Sound trifft auf Motown, Soul, Disco, Rock und Pop. Music Unlimited präsentiert bekannte Grooves in kraftvollen Arrangements."
  },
  {
    slug: "dixie-company-poznan-02-08-2026", name: "Dixie Company Poznań", date: "2026-08-02", dateText: "2. August 2026",
    image: "assets/images/bands/dixie-company-poznan.jpg", width: 960, height: 638,
    alt: "Dixie Company Poznań bei einem Live-Auftritt",
    description: "Seit mehr als drei Jahrzehnten steht die Formation aus Poznań für traditionellen Jazz und die Musik New Orleans’. Spielfreude und internationale Bühnenerfahrung prägen ihren Dixieland-Sound."
  },
  {
    slug: "hot-jazz-orchestra-hannover-09-08-2026", name: "Hot Jazz Orchestra Hannover", date: "2026-08-09", dateText: "9. August 2026",
    image: "assets/images/optimized/hot-jazz-orchestra-hannover.jpg", width: 1200, height: 800,
    alt: "Hot Jazz Orchestra Hannover",
    description: "Traditioneller Hot Jazz aus Hannover mit lebendiger Improvisation und markantem Ensembleklang. Die Musik knüpft an die energiegeladene Jazztradition der frühen Jahrzehnte an."
  },
  {
    slug: "greta-groening-quartett-16-08-2026", name: "Greta Gröning Quartett", date: "2026-08-16", dateText: "16. August 2026",
    image: "assets/images/bands/greta-groening-quartett.jpg", width: 2560, height: 1654,
    alt: "Greta Gröning Quartett",
    description: "Junger Vocal Jazz aus Hannover: Greta Gröning und ihr Quartett verbinden ausdrucksstarken Gesang mit dem offenen, nuancenreichen Zusammenspiel einer modernen Jazzbesetzung."
  },
  {
    slug: "bb-the-blues-shacks-23-08-2026", name: "B.B. & The Blues Shacks", date: "2026-08-23", dateText: "23. August 2026",
    image: "assets/images/bands/bb-the-blues-shacks-band.jpg", width: 500, height: 365,
    alt: "B.B. & The Blues Shacks",
    description: "Handgemachter Blues und Rhythm ’n’ Blues mit mehr als 30 Jahren Bühnenerfahrung. Die vielfach ausgezeichnete Band verbindet tiefes Gefühl mit ansteckender Spielfreude."
  }
];

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function render(event, index) {
  const canonical = `https://jazzmatinee-langenhagen.de/programm/${event.slug}/`;
  const imageUrl = `https://jazzmatinee-langenhagen.de/${event.image}`;
  const title = `${event.name} | Jazzmatinee ${event.dateText}`;
  const metaDescription = `${event.name} live bei der Jazzmatinee Langenhagen am ${event.dateText}, 11–14 Uhr im Rathausinnenhof. Eintritt frei.`;
  const previous = events[index - 1];
  const next = events[index + 1];
  const eventJson = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.name} bei der Jazzmatinee Langenhagen 2026`,
    description: event.description,
    startDate: `${event.date}T11:00:00+02:00`,
    endDate: `${event.date}T14:00:00+02:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Innenhof des Rathauses Langenhagen",
      address: { "@type": "PostalAddress", streetAddress: "Marktplatz 1", postalCode: "30853", addressLocality: "Langenhagen", addressCountry: "DE" }
    },
    image: [imageUrl], url: canonical,
    organizer: { "@type": "Organization", name: "City of Music e. V.", url: "https://jazzmatinee-langenhagen.de/" },
    performer: { "@type": "MusicGroup", name: event.name },
    offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: canonical },
    isAccessibleForFree: true
  };

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../../assets/images/logos/logo-jazzmatinee-round.svg" type="image/svg+xml" sizes="any">
  <link rel="manifest" href="../../manifest.webmanifest">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(metaDescription)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Jazzmatinee Langenhagen">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(metaDescription)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="${esc(event.alt)}">
  <meta property="og:locale" content="de_DE">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(metaDescription)}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:image:alt" content="${esc(event.alt)}">
  <link rel="stylesheet" href="../../assets/css/style.css?v=20260721-6">
  <script defer src="../../assets/js/main.js"></script>
  <script type="application/ld+json">${JSON.stringify(eventJson)}</script>
</head>
<body data-page="event">
  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>
  <header class="site-header site-header--solid">
    <div class="container site-header__inner">
      <a class="brand" href="../../" aria-label="Startseite Jazzmatinee Langenhagen">
        <img class="brand__logo brand__logo--horizontal" src="../../assets/images/logos/logo-jazzmatinee-horizontal.svg" alt="Jazzmatinee Langenhagen">
        <img class="brand__logo brand__logo--initials" src="../../assets/images/logos/logo-jazzmatinee-initials.png" width="1182" height="1183" alt="">
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="Navigation öffnen"><span></span><span></span></button>
      <nav class="site-nav" id="site-navigation" aria-label="Hauptnavigation">
        <a href="../../#programm" aria-current="page">Programm</a><a href="../../pages/geschichte.html">Geschichte</a><a href="../../pages/presse.html">Presse</a><a href="../../pages/kontakt.html">Kontakt</a>
      </nav>
    </div>
  </header>
  <main id="main-content" class="subpage-main">
    <section class="page-hero event-hero">
      <div class="container event-hero__grid">
        <div data-reveal>
          <p class="eyebrow">Jazzmatinee Langenhagen 2026</p>
          <h1>${esc(event.name)}</h1>
          <div class="event-hero__meta">
            <p><strong>${event.dateText} · 11–14 Uhr</strong></p>
            <p>Rathausinnenhof Langenhagen</p>
            <p><strong>Eintritt frei</strong></p>
          </div>
        </div>
        <img class="event-hero__image" src="../../${event.image}" width="${event.width}" height="${event.height}" fetchpriority="high" alt="${esc(event.alt)}">
      </div>
    </section>
    <section class="section">
      <div class="container event-details">
        <article class="prose" data-reveal><h2>Über ${esc(event.name)}</h2><p>${esc(event.description)}</p><p>Die Jazzmatinee wird von City of Music e. V. veranstaltet und von Probehafen Events umgesetzt.</p></article>
        <aside class="highlight-panel" data-reveal><p class="highlight-panel__label">Ort und Zeit</p><address><strong>Innenhof des Rathauses Langenhagen</strong><br>Marktplatz 1<br>30853 Langenhagen<br>Deutschland</address><p>Sonntag, ${event.dateText}<br>11:00 bis 14:00 Uhr</p><p><strong>Eintritt frei</strong></p></aside>
      </div>
      <nav class="container event-navigation" aria-label="Weitere Konzerte">
        ${previous ? `<a href="../${previous.slug}/">← ${esc(previous.name)}</a>` : `<a href="../../#programm">← Gesamtprogramm</a>`}
        ${next ? `<a href="../${next.slug}/">${esc(next.name)} →</a>` : `<a href="../../#programm">Gesamtprogramm →</a>`}
      </nav>
    </section>
  </main>
  <footer class="site-footer"><div class="container site-footer__inner"><div><img class="site-footer__logo" src="../../assets/images/logos/logo-jazzmatinee-round.svg" alt="Jazzmatinee Langenhagen"></div><nav class="footer-nav" aria-label="Footer Navigation"><a href="../../">Startseite</a><a href="../../pages/impressum.html">Impressum</a><a href="../../pages/datenschutz.html">Datenschutz</a></nav></div></footer>
</body>
</html>
`;
}

for (const [index, event] of events.entries()) {
  const directory = path.join("programm", event.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), render(event, index));
}

console.log(`Generated ${events.length} event pages.`);
