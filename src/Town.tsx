import { useEffect, useRef, useState } from 'preact/hooks';
import type { Lang } from './data';
import { BAMF_NAVI, CHECKED, LOCAL, STATES, host, loadDetail, loadIndex, search, siteSearch, where, type Detail, type Place } from './places';

export type MyPlace = { name: string; ags: string };
type U = (k: string) => string;

/** Dialog: search all German municipalities; suggests the state (and city) from Cloudflare's IP lookup. */
export function TownPicker({ u, onPick, onClose }: { lang: Lang; u: U; onPick: (p: MyPlace) => void; onClose: () => void }) {
  const [all, setAll] = useState<Place[]>([]);
  const [q, setQ] = useState('');
  const [hint, setHint] = useState<{ state: string | null; city: string | null }>({ state: null, city: null });
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus();
    loadIndex().then(setAll).catch(() => setAll([]));
    where().then(setHint);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', esc); return () => removeEventListener('keydown', esc);
  }, []);
  const ipCity = hint.city && hint.state ? all.find(p => p.ags.startsWith(hint.state!) && p.name.toLowerCase() === hint.city!.toLowerCase()) : undefined;
  const list = search(all, q, hint.state, 8).filter(p => p !== ipCity);
  const row = (p: Place, star = false) => (
    <li><button onClick={() => onPick({ name: p.name, ags: p.ags })}>
      <span>{star ? '⭐ ' : ''}{p.name}</span><small>{STATES[p.ags.slice(0, 2)]?.[0]}</small>
    </button></li>);
  return (
    <div class="town-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div class="town-dlg" role="dialog" aria-modal="true" aria-labelledby="town-h">
        <h2 id="town-h">📍 {u('pickTown')}</h2>
        <p class="muted">{u('pickSub')}</p>
        <input ref={input} value={q} onInput={e => setQ((e.target as HTMLInputElement).value)} placeholder={u('searchTown')} aria-label={u('searchTown')} />
        {!q && hint.state && <p class="town-sug">🛰️ {u('suggested')}: <b>{STATES[hint.state]?.[0]}</b></p>}
        <ul class="town-list" aria-live="polite">
          {!q && ipCity && row(ipCity, true)}
          {list.map(p => row(p))}
        </ul>
        <p class="town-note">🔒 {u('ipNote')}</p>
        <button class="btn-ghost" onClick={onClose}>{u('close')}</button>
      </div>
    </div>
  );
}

/** Official local links for the chosen town, for buildings run by town/district. */
export function LocalLinks({ building, query, place, u, onPick }: { building: string; query: string; place: MyPlace | null; u: U; onPick: () => void }) {
  const level = LOCAL[building];
  const [d, setD] = useState<Detail | null>(null);
  useEffect(() => { setD(null); if (place && level) loadDetail(place.ags.slice(0, 2)).then(setD).catch(() => setD(null)); }, [place?.ags, level]);
  if (!level) return null;
  if (!place) return <button class="town-cta" onClick={onPick}>{u('chooseForLocal')}</button>;
  const st = STATES[place.ags.slice(0, 2)];
  const web = d?.g[place.ags] || '';
  const kreis = d?.k[place.ags.slice(0, 5)];
  const direct = CHECKED[place.ags]?.[building];
  const a = (href: string, label: string, sub?: string) => (
    <a class="official local" href={href} target="_blank" rel="noopener noreferrer">{label}{sub && <small>{sub}</small>}</a>);
  return (
    <div class="g-local">
      <h4>📍 {u('inTown')}: {place.name} <button class="link-back" onClick={onPick}>{u('change')}</button></h4>
      <div class="g-links">
        {direct && a(direct, '✅ ' + u('direct'), host(direct))}
        {(() => { const s = level === 'district' && kreis?.[1] ? kreis[1] : web; return s && level !== 'bamf' && a(siteSearch(query, host(s)), '🔎 ' + u('searchOn'), `„${query}“ · ${host(s)}`); })()}
        {web && a(web, '🏛️ ' + u('townSite'), host(web))}
        {kreis && kreis[1] && (level === 'district' || level === 'bamf') && kreis[1] !== web && a(kreis[1], '🏢 ' + u('district'), kreis[0])}
        {(building === 'immigration' || level === 'bamf') && a(BAMF_NAVI, '🧭 ' + u('bamfNavi'), 'bamf-navi.bamf.de')}
        {st && a(st[1], '🗺️ ' + u('statePortal'), st[0])}
      </div>
    </div>
  );
}
