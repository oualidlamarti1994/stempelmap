# StempelMap

**Behördengänge in Deutschland – einfach erklärt, als Stadtkarte, in 11 Sprachen.**
Live: https://stempelmap.de · kostenlos · ohne Konto · ohne Tracking · keine Behörde

StempelMap erklärt Neuzugewanderten die wichtigsten Behördengänge (Anmeldung, Konto, Krankenversicherung, Steuer-ID, Aufenthaltstitel …) als interaktive Stadtkarte: 17 Gebäude, 71 Schritt-für-Schritt-Anleitungen, Route „Erste 30 Tage“, Stempel-Pass und offizielle Links für alle 11.100 Gemeinden.

## Funktionen
- 11 Sprachen: de, en, ar, tr, uk, ru, pl, ro, fa (Dari), ur, hi (nicht-deutsche Texte maschinell vorbereitet, Prüfung durch Muttersprachler*innen geplant)
- Ortsauswahl für alle Gemeinden (Daten: Wikidata) mit Links zu Gemeinde, Kreis und Land
- Barrierefrei: Listenansicht, Vorlesen, große Schrift, hoher Kontrast
- Datenschutz: keine Cookies, kein Tracking, Fortschritt nur im Browser; strikte Content-Security-Policy

## Technik
Preact + TypeScript + Vite, SVG-Karte, statische Auslieferung über Cloudflare Workers (`worker/index.ts`).
Ortsdaten: `content/places/build_places.py` (Wikidata-Export → `public/places/`).

```bash
npm install
npm run dev      # lokale Entwicklung
npm run build    # Produktions-Build nach dist/
```

## Roadmap
Siehe [docs/ROADMAP.md](docs/ROADMAP.md): offenes Datenformat (JSON-Schema), konfigurierbare Engine für eigene Stadt-Instanzen, Link-Checks, Offline-Modus, WCAG 2.2 AA.

## Lizenz
Code: [MIT](LICENSE). Inhalte (Anleitungen, Texte): CC BY-SA 4.0. Ortsdaten: Wikidata (CC0).
