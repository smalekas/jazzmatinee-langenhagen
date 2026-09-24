# Jazzmatinee Langenhagen

Statische Website ohne Framework oder externe Laufzeitabhängigkeiten. Die acht Konzertseiten werden aus der zentralen Datenliste in `scripts/generate-event-pages.mjs` erzeugt.

## Lokale Entwicklung

```bash
npm run generate
npm test
python3 -m http.server 8000
```

Danach ist die Website unter `http://localhost:8000/` erreichbar. `npm run build` generiert die Konzertseiten neu und führt anschließend alle SEO-, Metadaten-, Sitemap-, Link- und Dateiprüfungen aus.

## Deployment

Die Website wird von Hostinger direkt aus dem Branch `main` ausgeliefert. Ein Push auf `main` ist nach etwa 30 Sekunden live. Die generierten Seiten müssen deshalb vor dem Push mit `npm run build` erzeugt und mit committet werden.

Die `.htaccess` im Projektstamm leitet die `www`-Domain per 301 auf `https://jazzmatinee-langenhagen.de/` um. HTTPS und DNS werden im Hostinger-Panel verwaltet.

Der Workflow `.github/workflows/checks.yml` führt bei jedem Push und Pull Request `npm run build` aus und schlägt fehl, wenn eine SEO-Prüfung scheitert oder generierte Seiten nicht committet wurden. Er veröffentlicht nichts.
