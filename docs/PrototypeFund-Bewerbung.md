# Prototype Fund – Bewerbung StempelMap (Jahrgang 03, Förderlinie „Resilienz“)

Frist: **30.11.2026** · Portal: https://bewerben.prototypefund.de · Sprache: Deutsch
Die Felder im Portal können anders heißen – die Texte passen auf die üblichen Fragen. Zeichenlimits im Formular prüfen und notfalls kürzen.

---

## Projekttitel
StempelMap – offene, mehrsprachige Wegweiser-Engine für deutsche Behördengänge

## Kurzbeschreibung (1–2 Sätze)
StempelMap erklärt Behördengänge in Deutschland Schritt für Schritt, in 11 Sprachen, barrierearm und mit Links nur zu offiziellen, meist kostenlosen Stellen. Im Förderzeitraum machen wir daraus eine offene Engine und einen offenen Datensatz, den jede Kommune, Beratungsstelle und Initiative frei nutzen und erweitern kann.

## Welches Problem löst das Projekt?
Wer neu in Deutschland ist, muss in den ersten Wochen viele Behördengänge erledigen: Anmeldung, Konto, Krankenversicherung, Steuer-ID, Aufenthaltstitel. Die offiziellen Informationen sind über hunderte Seiten verteilt, fast nur auf Deutsch und in Amtssprache.
In diese Lücke stoßen kommerzielle Seiten, die kostenlose Behördenleistungen gegen Gebühr „vermitteln“ und dabei persönliche Daten einsammeln. Sie sind zentralisiert, intransparent und dominieren oft die Suchergebnisse.
Beratungsstellen bauen dieses Wissen jeweils selbst neu auf, in PDFs und Word-Dokumenten, ohne gemeinsame, wiederverwendbare Grundlage.

## Lösung / Was wird im Förderzeitraum gebaut?
Ein funktionierender Prototyp ist bereits online (stempelmap.de): eine spielerische Stadtkarte mit 17 Gebäuden und 71 Schritt-für-Schritt-Anleitungen in 11 Sprachen (de, en, ar, tr, uk, ru, pl, ro, fa, ur, hi). Er hat eine Listenansicht für Screenreader, Vorlesen, große Schrift und hohen Kontrast, kein Tracking und keine Konten.

Im Förderzeitraum entsteht daraus offene Infrastruktur:
1. **Offenes Datenformat** für Behördengänge (Schritte, Unterlagen, Kosten, offizielle Links, Stand-Datum, Sprache), dokumentiert als JSON-Schema und unter CC BY-SA veröffentlicht.
2. **Wiederverwendbare Engine**: Jede Stadt oder Beratungsstelle kann ihre eigene Karte mit lokalen Links (Bürgeramt, Ausländerbehörde) per Konfigurationsdatei erzeugen, ohne Programmierkenntnisse und ohne Server (statisches Hosting).
3. **Prüf-Workflow**: Muttersprachliche Freiwillige und Fachleute aus der Beratung prüfen die Übersetzungen. Ein automatischer Link-Check meldet tote oder geänderte offizielle Seiten.
4. **Offline/PWA**: nutzbar mit schlechtem Netz und auf günstigen Smartphones.
5. **Barrierefreiheit nach WCAG 2.2 AA**, getestet mit Screenreader-Nutzer*innen.

## Warum passt das in die Förderlinie „Resilienz“?
StempelMap ist eine freie, dezentrale Alternative zu proprietären, zentralisierten Vermittlungsportalen, die mit Behördeninformationen Geld verdienen und Daten sammeln. Die Engine läuft ohne Backend, ohne Datenbank und ohne Nutzerdaten auf jedem Webspace. Inhalte und Code sind offen, sodass Kommunen und Zivilgesellschaft nicht von einem Anbieter abhängig sind. Das macht den Zugang zu Verwaltungswissen widerstandsfähiger: Fällt ein Anbieter weg, kann jede*r das Projekt weiterbetreiben.

## Zielgruppen
- Neu Zugewanderte, Geflüchtete und internationale Fachkräfte
- Migrationsberatungen, Integrationskurse und Ehrenamtliche, die die Karte als Material nutzen
- Kommunen, die lokale Instanzen mit eigenen Links betreiben wollen

## Technischer Ansatz
Preact + TypeScript (Vite) als statische Single-Page-App mit einer SVG-Karte. Inhalte liegen als JSON und werden aus Python-Quelldateien gebaut. Hosting ist ohne Server möglich, z. B. auf Cloudflare oder GitHub Pages. Strikte Content-Security-Policy, keine Cookies, kein Tracking. Fortschritt („Stempel-Pass“) wird nur lokal im Browser gespeichert.
Übersetzungen werden maschinell vorbereitet, als solche gekennzeichnet und von Menschen geprüft.

## Bisheriger Stand
- Live-Prototyp mit Karte, 71 Anleitungen, 11 Sprachen und Barrierefreiheits-Funktionen
- Teilen-Links (auch WhatsApp), Route „Erste 30 Tage“, Versionsplan mit festen Update-Terminen (v1–v10)
- Impressum und Datenschutzerklärung vorhanden

## Meilensteine (6 Monate, ab 1. Juni 2027)
| Monat | Ergebnis |
|---|---|
| 1 | Code-Repository öffentlich, Lizenzen (Code: MIT oder AGPL; Inhalte: CC BY-SA), JSON-Schema v1 |
| 2 | Engine konfigurierbar: eigene Stadt-Instanz per Konfigurationsdatei, Doku „In 30 Minuten zur eigenen Karte“ |
| 3 | Automatischer Link-Check und Stand-Datum pro Anleitung, Beitragsleitfaden |
| 4 | Übersetzungsprüfung mit 2–3 Beratungsstellen, Fehlerkorrekturen |
| 5 | PWA/Offline, WCAG-2.2-AA-Test mit Screenreader-Nutzer*innen |
| 6 | Zwei Pilot-Instanzen (z. B. Bonn und eine weitere Stadt), Abschlussdoku, Release 2.0 |

## Lizenz / Open Source
Der gesamte Quellcode wird unter einer freien Lizenz veröffentlicht (MIT oder AGPL-3.0), die Inhalte unter CC BY-SA 4.0. Die Entwicklung findet öffentlich statt.

## Team
Einzelentwickler: [Name], Bonn. IT-Service-Manager mit Erfahrung in Prozessautomatisierung und Webentwicklung. Hat den Prototyp allein konzipiert und umgesetzt.
[Optional: eigene Migrations-/Sprachbezüge in 1–2 Sätzen ergänzen – das macht die Bewerbung glaubwürdiger.]

## Was passiert nach der Förderung?
Die Engine bleibt ohne laufende Serverkosten betreibbar. Beratungsstellen und Kommunen können eigene Instanzen pflegen. Weitere Mittel werden bei Stiftungen und Integrationsprogrammen beantragt. Werbung oder kostenpflichtige Vermittlung wird es nicht geben.

---

### Vor dem Absenden – Checkliste
- [ ] Im Portal registrieren und „Jahrgang 03 – Resilienz“ wählen
- [ ] [Name] und Team-Text ergänzen
- [ ] Domain stempelmap.de gekauft und verbunden (sonst die workers.dev-Adresse angeben)
- [ ] Optional: Code vorab öffentlich auf GitHub stellen – ich bereite das auf Wunsch vor
- [ ] Bis spätestens **30.11.2026** absenden
