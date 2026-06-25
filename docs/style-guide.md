# Jazzmatinee Langenhagen — Style Guide

## Farb- und Typografiesystem

### Farb-Variablen
- `--color-white: #ffffff`
- `--color-black: #1d1d1b`
- `--color-red: #e30613`
- `--color-gray-100: #f6f5f2`
- `--color-gray-200: #e9e7e3`
- `--color-gray-400: #c4beb8`
- `--color-gray-700: #3a3a38`

### Typografie
- Basis-Font-Familie: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- `font-weight` für Headlines: `700`
- `font-weight` für Text: `400`
- Zeilenhöhe: `1.5` für Fließtext, `1.1–1.3` für Headlines

### Typografische Skala
- `--fs-hero: clamp(3rem, 5vw, 5.5rem)`
- `--fs-display: clamp(2.5rem, 4vw, 4rem)`
- `--fs-heading: clamp(1.6rem, 2vw, 2.5rem)`
- `--fs-body: 1rem`
- `--fs-small: 0.9rem`

## Layout und Container

### Grundlayout
- `max-width: 1240px`
- horizontale Innenabstände: `1.5rem` bis `3rem`
- zentrierte Inhalte mit `margin: 0 auto`
- Sektionen mit großzügigem Außenabstand: `6rem` bis `10rem` auf Desktop

### Raster
- Desktop: 12-Spalten-System
- Tablet: 2 Spalten oder 1 Spalte mit mittiger Ausrichtung
- Mobil: 1 Spalte

### Abstände
- `--space-xs: 0.5rem`
- `--space-sm: 1rem`
- `--space-md: 2rem`
- `--space-lg: 3rem`
- `--space-xl: 4.5rem`
- `--space-xxl: 6rem`

## Komponenten

### Navigation
- Position: `sticky` oder `static` oben
- Hintergrund: Weiß oder leicht transparent bei Hero-Fixierung
- Text: Schwarz mit rotem Hover-Akzent
- Aktiver Zustand: Rot unterstrichen oder farblich hervorgehoben
- Logo: vorhandene horizontale Wortmarke in der Desktop-Navigation, reduzierte Emblemvariante im Mobile-Header

### Hero
- Vollflächige Auftaktsektion
- Headline linksbündig, prägnant
- Textblock mit großzügiger Breite
- CTA-Gruppe mit zwei Buttons
- Bild mindestens 60–70 % der Ansicht auf Desktop
- Eventuell subtile Kreisgrafik oder ausgeschnittene Platzierung des Emblems zur Markenführung

### Buttons

#### Primär
- Hintergrund: `var(--color-red)`
- Text: `var(--color-white)`
- Border: `none`
- Padding: `1rem 1.75rem`
- Border-Radius: `0.5rem`
- Hover: `opacity: 0.95`, leichte Translation nach oben
- Fokus: deutlicher Outline-Ring

#### Sekundär
- Hintergrund: `transparent`
- Farbe: `var(--color-black)`
- Border: `1px solid var(--color-black)`
- Hover: `background: rgba(227,6,19,0.08)`

### Links
- Basisfarbe: `var(--color-black)`
- Hover/Fokus: `var(--color-red)`
- Unterstreichung nur bei Bedarf

### Karten
- Hintergrund: `var(--color-white)` oder `var(--color-gray-100)`
- Box-Shadow: `0 20px 40px rgba(29,29,27,0.08)`
- Border-Radius: `1rem`
- Innenabstand: `2rem`

### Bilder
- Einsatz großer Bildflächen
- Bildformat: mindestens 16:9, optional 4:3 für Portraits
- Objekt-Position: `center center`
- responsive `object-fit: cover`
- Schatten sparsam verwenden

### Container
- `section` als strukturelle Einheit
- `main` mit klarer Reihenfolge
- Karten innerhalb von `article` oder `div.card`

### Hover-Effekte
- dezent und sauber
- sanfte Farbwechsel
- keine übermäßigen Übergangseffekte

### Schatten
- minimal und weich
- Beispiel: `box-shadow: 0 12px 32px rgba(29,29,27,0.08)`

### Border-Radius
- Buttons: `0.5rem`
- Karten: `1rem`
- Bildkacheln: `0.75rem`

### Animationen
- Dauer: `250ms` bis `400ms`
- Timing-Funktion: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- Reduktion bei `prefers-reduced-motion`
- Beispiele: fade-in, slide-up, subtile transform

## CSS-Konventionen
- `:root` für Variablen
- Modulare Klassen wie `.hero`, `.section`, `.card`, `.button`, `.nav-link`
- Keine Utility-Klassen in erster Linie; semantische Komponenten
- Wiederverwendbare Basisstile in `base`-Sektionen
- Kommentare zur Gruppierung von Sektionen

## Barrierefreiheit
- Fokusindikatoren sichtbar
- `button` und `a` korrekt verwenden
- Kontrastwerte mindestens 4.5:1 für Text
- `aria-labels` bei icon-only-Buttons
- klare Struktur für Screenreader
