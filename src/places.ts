/** All German municipalities (Wikidata, AGS codes) → local official links. Loaded on demand. */
export type Place = { name: string; ags: string; popK: number };
export type Detail = { g: Record<string, string>; k: Record<string, [string, string]> };

export const STATES: Record<string, [string, string]> = {
  '01': ['Schleswig-Holstein', 'https://www.schleswig-holstein.de/'], '02': ['Hamburg', 'https://www.hamburg.de/'],
  '03': ['Niedersachsen', 'https://www.niedersachsen.de/'], '04': ['Bremen', 'https://www.bremen.de/'],
  '05': ['Nordrhein-Westfalen', 'https://www.land.nrw/'], '06': ['Hessen', 'https://hessen.de/'],
  '07': ['Rheinland-Pfalz', 'https://www.rlp.de/'], '08': ['Baden-Württemberg', 'https://www.baden-wuerttemberg.de/'],
  '09': ['Bayern', 'https://bayern.de/'], '10': ['Saarland', 'https://www.saarland.de/'],
  '11': ['Berlin', 'https://www.berlin.de/'], '12': ['Brandenburg', 'https://www.brandenburg.de/'],
  '13': ['Mecklenburg-Vorpommern', 'https://www.regierung-mv.de/'], '14': ['Sachsen', 'https://www.sachsen.de/'],
  '15': ['Sachsen-Anhalt', 'https://www.sachsen-anhalt.de/'], '16': ['Thüringen', 'https://thueringen.de/'],
};

/** Direct links that were tested (HTTP 200, right page) on 2026-11-24. Key: AGS → building id → url. */
export const CHECKED: Record<string, Record<string, string>> = {
  '11000000': { townhall: 'https://service.berlin.de/dienstleistung/120686/', immigration: 'https://www.berlin.de/einwanderung/' },
  '02000000': { immigration: 'https://www.hamburg.de/politik-und-verwaltung/behoerden/behoerde-fuer-inneres-und-sport/aemter/amt-fuer-migration' },
  '09162000': { townhall: 'https://stadt.muenchen.de/service/info/wohnsitzanmeldung/1063475/n0/', immigration: 'https://stadt.muenchen.de/infos/auslaenderbehoerde.html' },
  '05315000': { townhall: 'https://www.stadt-koeln.de/service/produkte/00374/index.html' },
  '08111000': { townhall: 'https://www.stuttgart.de/service/buergerbueros' },
  '05111000': { townhall: 'https://service.duesseldorf.de/', immigration: 'https://www.duesseldorf.de/auslaenderamt' },
  '09564000': { immigration: 'https://www.nuernberg.de/internet/auslaenderbehoerde/' },
  '05911000': { townhall: 'https://www.bochum.de/Buergerbuero', immigration: 'https://www.bochum.de/Auslaenderbuero' },
  '05711000': { townhall: 'https://www.bielefeld.de/buergerberatung' },
  '05515000': { immigration: 'https://www.stadt-muenster.de/zuwanderung/startseite' },
  '04011000': { immigration: 'https://www.service.bremen.de/die-senatorin-fuer-inneres-und-sport/migrationsamt-100086' },
};

/** Which buildings are run locally, and at which level. */
export const LOCAL: Record<string, 'town' | 'district' | 'bamf'> = {
  townhall: 'town', registry: 'town', home: 'town', police: 'town',
  car: 'district', immigration: 'district', jobcenter: 'district', family: 'town',
  school: 'bamf', advice: 'bamf',
};

let idx: Promise<Place[]> | null = null;
export const loadIndex = () => idx ??= fetch('./places/index.json').then(r => r.json()).then((a: [string, string, number][]) => a.map(([name, ags, popK]) => ({ name, ags, popK })));
const det: Record<string, Promise<Detail>> = {};
export const loadDetail = (state: string) => det[state] ??= fetch(`./places/${state}.json`).then(r => r.json());

export const where = (): Promise<{ state: string | null; city: string | null }> =>
  fetch('./api/where').then(r => (r.ok ? r.json() : { state: null, city: null })).catch(() => ({ state: null, city: null }));

const fold = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
export function search(all: Place[], q: string, state?: string | null, n = 8): Place[] {
  const f = fold(q.trim());
  const pool = state && !f ? all.filter(p => p.ags.startsWith(state)) : all;
  if (!f) return pool.slice(0, n);
  const starts: Place[] = [], inc: Place[] = [];
  for (const p of pool) { const x = fold(p.name); if (x.startsWith(f)) starts.push(p); else if (x.includes(f)) inc.push(p); if (starts.length >= n) break; }
  return [...starts, ...inc].slice(0, n);
}

export const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
export const siteSearch = (query: string, site: string) => 'https://duckduckgo.com/?q=' + encodeURIComponent(`${query} site:${site}`);
export const BAMF_NAVI = 'https://bamf-navi.bamf.de/de/';
