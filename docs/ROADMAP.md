# StempelMap – Timeline & Roadmap (updated 2026-11-24)

## Phase 0 – Launch (now → Dec 2026)
| When | What | Who |
|---|---|---|
| by 30 Nov 2026 | Buy stempelmap.de · submit Prototype Fund (Resilienz) | Owner |
| right after purchase | Connect domain, remove noindex, DNSSEC, Google Search Console | Claude |
| Dec 2026 | Native-speaker check ar / uk / tr (then the rest) · test with 5–10 newcomers + 1 advice centre in Bonn | Owner + volunteers |

## Phase 1 – Versions (fixed release dates: 1 Jan / 1 Apr / 1 Jul / 1 Oct)
| Version | Date | Content |
|---|---|---|
| **v1.0–1.1** ✅ | Nov 2026 | 17 buildings, 71 guides, 11 languages, accessibility, living map, route "First 30 days", Stempel-Pass, share/WhatsApp, German-flag design, responsive, security headers, **local links for all 11,100 municipalities** |
| **v2.0** | 1 Jan 2027 | Yearly numbers (min. wage 14,60 €, Minijob 633 €, D-Ticket 66,80 € …) · 📮 post office · fixes from user tests · checked translations marked ✓ |
| **v3.0** | 1 Apr 2027 | Deadline reminders (e.g. Anmeldung within 2 weeks) · offline/PWA · tested direct links for the 50 biggest cities · **decision point**: continue if users/funding, else keep as finished portfolio |
| Funding | Jun–Nov 2027 | *If Prototype Fund approved:* open data format (JSON schema), reusable engine, automatic link check, 2 pilot towns, WCAG 2.2 AA test |
| **v4.0** | 1 Jul 2027 | 🏭 Work district (Gewerbe, pension, legal aid) · letter explainer (opt-in AI, nothing stored) |
| **v5.0** | 1 Oct 2027 | More languages (Kurdish, Albanian, Pashto, Tigrinya, Spanish, French) · audio guides |
| **v6.0** | 1 Jan 2028 | Engine 1.0 public: any town/advice centre builds its own map |
| **v7.0** | 1 Apr 2028 | Real city maps with office addresses & opening hours (open data) |
| **v8.0** | 1 Jul 2028 | Partner version for employers/cities (own logo & checklist) – main income idea |
| **v9.0** | 1 Oct 2028 | 💬 Moderated community tips ("what happened at my appointment") |
| **v10.0** | 1 Jan 2029 | 🇦🇹 🇨🇭 Austria & Switzerland · Android app · 20 languages |

**Rule:** every release date also = content check (fees, laws, dead links). Time budget: 2–3 h/week.

## Release checklist (every fixed date)
1. Check all numbers/fees against official sources (search "<topic> <year>" on bund.de, BAMF, Arbeitsagentur, DRV).
2. Update guides (`content/guides_*.py`), rebuild translations for changed guides only.
3. Set `VERSION`, `STAND`, `NEXT_UPDATE` in `src/version.ts`.
4. Add a changelog entry ("Was ist neu") and post it on the video channels.
5. Build, test (map, search, list view, read aloud, RTL), deploy.
