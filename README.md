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

Der vorhandene Workflow `.github/workflows/deploy-pages.yml` veröffentlicht das Repository über GitHub Pages. `CNAME` legt die kanonische Domain ohne `www` fest. „Enforce HTTPS“, DNS-Einträge und die Weiterleitung der `www`-Domain müssen in den GitHub-Pages- beziehungsweise DNS-Einstellungen kontrolliert werden; konkrete Prüfkommandos stehen im Übergabebericht.
