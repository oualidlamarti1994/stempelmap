# StempelMap – Roadmap v1 → v10

**Update rhythm (fixed timestamps):** a release on **1 Jan · 1 Apr · 1 Jul · 1 Oct**.
Why these dates: most German rules change on **1 January and 1 July** (minimum wage, Minijob limit, child benefit,
Deutschlandticket, social benefits). Every release: re-check all numbers → set `STAND` in `src/version.ts` → changelog → deploy.
Each guide shows "🕓 Stand: <date>", the footer shows version + next update.

| Version | Date | Map grows by | Content / features |
|---|---|---|---|
| **v1.0** | Nov 2026 | 17 buildings, 71 errands | 11 languages, guides with official links, accessibility (list, read aloud, contrast) |
| **v2.0** | 1 Jan 2027 | 📮 Post office, 🏢 "City centre" district | Yearly number update (min. wage 14,60 €, Minijob 633 €, D-Ticket 66,80 € …). "First 30 days in Germany" route drawn on the map. City links for the 10 biggest cities (booking pages of Bürgeramt / Ausländerbehörde). |
| **v3.0** | 1 Apr 2027 | – | **Stempel-Pass:** personal checklist, collect a stamp per finished errand, deadline reminders (e.g. Anmeldung within 2 weeks). Data stays in the browser. |
| **v4.0** | 1 Jul 2027 | 🏭 Work district: self-employment/Gewerbe, 🧓 pension office, ⚖️ court & legal aid | **Letter explainer:** upload a German letter → explained in your language (opt-in AI, nothing stored). |
| **v5.0** | 1 Oct 2027 | – | More languages: Kurdish, Albanian, Pashto, Persian (Iran), Tigrinya, Spanish, French. Native-speaker review of all translations. Audio versions of guides. |
| **v6.0** | 1 Jan 2028 | 🤝 Partner street | Verified partner marketplace: language schools, translators, driving schools, tax help (clearly marked as ads). |
| **v7.0** | 1 Apr 2028 | 🗺️ Real city maps | Own map per big city with real office addresses and opening hours (open data), starting with Bonn, Köln, Berlin, Hamburg, München. |
| **v8.0** | 1 Jul 2028 | 🏢 Company campus | B2B: white-label onboarding for employers and cities (own logo, own checklist, own languages). |
| **v9.0** | 1 Oct 2028 | 💬 Community square | Moderated Q&A, tips from people who did it, "what happened at my appointment". |
| **v10.0** | 1 Jan 2029 | 🇦🇹 🇨🇭 new countries | Austria & Switzerland maps; installable app (PWA/Android); 20 languages. |

## Release checklist (every fixed date)
1. Check all numbers/fees against official sources (search "<topic> <year>" on bund.de, BAMF, Arbeitsagentur, DRV).
2. Update guides (`content/guides_*.py`), rebuild translations for changed guides only.
3. Set `VERSION`, `STAND`, `NEXT_UPDATE` in `src/version.ts`.
4. Add a changelog entry ("Was ist neu") and post it on the video channels.
5. Build, test (map, search, list view, read aloud, RTL), deploy.
