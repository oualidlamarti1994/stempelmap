import { render } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { BUILDINGS, LANGS, UI, tr, type Building, type Errand, type Lang } from './data';
import { CityMap } from './CityMap';
import './i18n_v2';
import guidesJson from './guides.json';
import { NEXT_UPDATE, STAND, VERSION, fmtDate } from './version';
import './styles.css';

const STAMP = '<svg viewBox="0 0 64 64" width="38" height="38" aria-hidden="true"><circle cx="32" cy="32" r="29" fill="none" stroke="#e63946" stroke-width="5"/><circle cx="32" cy="32" r="21" fill="none" stroke="#e63946" stroke-width="2.5" stroke-dasharray="4 3"/><text x="32" y="41" text-anchor="middle" font-size="26" font-weight="900" fill="#e63946" font-family="system-ui,sans-serif">S</text></svg>';

const initLang = (): Lang => {
  const n = (navigator.language || 'en').slice(0, 2);
  const map: Record<string, Lang> = { de: 'de', ar: 'ar', tr: 'tr', uk: 'uk', ru: 'ru', pl: 'pl', ro: 'ro', fa: 'fa', ur: 'ur', hi: 'hi' };
  return map[n] ?? 'en';
};

function App() {
  const [lang, setLang] = useState<Lang>(initLang());
  const [active, setActive] = useState<Building | null>(null);
  const [errand, setErrand] = useState<Errand | null>(null);
  const [q, setQ] = useState('');
  const rtl = !!LANGS.find(l => l.id === lang)?.rtl;
  const u = (k: string) => tr(UI[k], lang);
  const back = rtl ? '→' : '←';

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase(); if (s.length < 2) return [];
    return BUILDINGS.flatMap(b => b.errands.filter(x => Object.values(x.t).some(v => v?.toLowerCase().includes(s))).map(x => ({ b, x }))).slice(0, 6);
  }, [q]);

  const pick = (b: Building, x?: Errand) => { setActive(b); setErrand(x ?? null); setQ(''); };

  // deep links: #e=<errand id> opens that guide (shareable)
  useEffect(() => {
    const open = () => { const m = location.hash.match(/e=([a-z_0-9]+)/); if (!m) return;
      for (const b of BUILDINGS) { const x = b.errands.find(y => y.id === m[1]); if (x) { setActive(b); setErrand(x); return; } } };
    open(); addEventListener('hashchange', open); return () => removeEventListener('hashchange', open);
  }, []);
  useEffect(() => { const h = errand ? '#e=' + errand.id : ''; if (location.hash !== h) history.replaceState(null, '', location.pathname + location.search + h); }, [errand]);

  // Stempel-Pass (browser only)
  const [done, setDone] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('pc.done') || '[]'); } catch { return []; } });
  const toggleDone = (id: string) => { const n = done.includes(id) ? done.filter(x => x !== id) : [...done, id]; setDone(n); try { localStorage.setItem('pc.done', JSON.stringify(n)); } catch { /* ignore */ } };
  const total = BUILDINGS.reduce((a, b) => a + b.errands.length, 0);
  const [route, setRoute] = useState(false);

  // accessibility preferences (kept in this browser only)
  const load = (k: string) => { try { return localStorage.getItem('pc.' + k) === '1'; } catch { return false; } };
  const [listMode, setListMode] = useState(load('list'));
  const [big, setBig] = useState(load('big'));
  const [contrast, setContrast] = useState(load('contrast'));
  const [panel, setPanel] = useState(false);
  const save = (k: string, v: boolean) => { try { localStorage.setItem('pc.' + k, v ? '1' : '0'); } catch { /* ignore */ } };
  useEffect(() => { document.documentElement.classList.toggle('big', big); save('big', big); }, [big]);
  useEffect(() => { document.documentElement.classList.toggle('hc', contrast); save('contrast', contrast); }, [contrast]);
  useEffect(() => save('list', listMode), [listMode]);

  // screen reader announcement + move focus to the opened panel
  const [say, setSay] = useState('');
  const sheetHead = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!active) return;
    setSay(`${tr(errand ? errand.t : active.t, lang)} ${u('opened')}` + (errand ? '' : `, ${active.errands.length} ${u('errands')}`));
    setTimeout(() => sheetHead.current?.focus(), 50);
  }, [active, errand]);
  const listHead = useRef<HTMLHeadingElement>(null);
  const skipToList = (e: Event) => { e.preventDefault(); setListMode(true); setTimeout(() => listHead.current?.focus(), 50); };

  return (
    <div class={'app' + (active || route ? ' has-sheet' : '')} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <a href="#list" class="skip" onClick={skipToList}>{u('skip')}</a>
      <div class="sr" aria-live="polite">{say}</div>
      <header>
        <div class="brand"><span class="logo" dangerouslySetInnerHTML={{ __html: STAMP }} /><div><b>StempelMap</b><small>{u('title')} · {u('sub')}</small></div></div>
        <div class="tools">
        <button class="route-btn" aria-pressed={route} onClick={() => { setRoute(!route); setActive(null); setErrand(null); }}>🧭 <span class="lbl">{u('route')}</span></button>
        <span class="pass" title={u('passNote')}>🎫 <span class="lbl">{u('pass')}</span> <b>{done.length}/{total}</b></span>
        <button class="a11y-btn" aria-expanded={panel} aria-controls="a11y-panel" onClick={() => setPanel(!panel)}>♿ <span class="lbl">{u('a11y')}</span></button>
        <select value={lang} onChange={ev => setLang((ev.target as HTMLSelectElement).value as Lang)} aria-label="Language">
          {LANGS.map(l => <option value={l.id}>{l.name}</option>)}
        </select>
        </div>
      </header>
      {panel && (
        <div id="a11y-panel" class="a11y-panel" role="group" aria-label={u('a11y')}>
          <label><input type="checkbox" checked={listMode} onChange={() => setListMode(!listMode)} /> 📋 {u('listView')}</label>
          <label><input type="checkbox" checked={big} onChange={() => setBig(!big)} /> 🔠 {u('bigText')}</label>
          <label><input type="checkbox" checked={contrast} onChange={() => setContrast(!contrast)} /> 🌓 {u('contrast')}</label>
        </div>
      )}
      <div class="search">
        <input value={q} onInput={ev => setQ((ev.target as HTMLInputElement).value)} placeholder={u('search')} aria-label={u('search')} />
        {hits.length > 0 && (
          <ul class="hits">{hits.map(({ b, x }) => <li><button onClick={() => pick(b, x)}><span>{b.icon}</span> {tr(x.t, lang)} <small>· {tr(b.t, lang)}</small></button></li>)}</ul>
        )}
      </div>

      <div class="stage">
      {listMode ? (
        <nav class="list-view" id="list" aria-labelledby="list-h">
          <h2 id="list-h" ref={listHead} tabIndex={-1}>{u('allPlaces')}</h2>
          {BUILDINGS.map(b => (
            <section class="lv-b">
              <h3><span aria-hidden="true">{b.icon}</span> {tr(b.t, lang)}</h3>
              <ul>{b.errands.map(x => <li><button aria-current={errand?.id === x.id} onClick={() => pick(b, x)}>{tr(x.t, lang)}</button></li>)}</ul>
            </section>
          ))}
        </nav>
      ) : (
      <div class="map-wrap">
        <CityMap lang={lang} active={active} onPick={b => pick(b)} done={done} route={route ? ROUTE : null} />
        {!active && <span class="hint">🖐️ {u('hint')}</span>}
        {active && <button class="map-back" onClick={() => { setActive(null); setErrand(null); }}>{back} {u('back')}</button>}
      </div>
      )}

      {route && !active && (
        <section class="sheet route-sheet" style={{ '--c': '#e63946' } as any}>
          <div class="sheet-head"><span class="big-icon" aria-hidden="true">🧭</span><h2>{u('route')}</h2></div>
          <p class="muted">{u('routeSub')}</p>
          <ol class="route-list">{ROUTE.map((id, i) => { const b = BUILDINGS.find(bb => bb.errands.some(x => x.id === id))!; const x = b.errands.find(y => y.id === id)!;
            return <li><button onClick={() => pick(b, x)}><span class="rn">{done.includes(id) ? '✓' : i + 1}</span><span>{b.icon} {tr(x.t, lang)}</span></button></li>; })}</ol>
          <button class="btn-ghost" onClick={() => setRoute(false)}>{u('close')}</button>
        </section>
      )}
      {active && (
        <section class="sheet" aria-label={tr(active.t, lang)} style={{ '--c': active.color } as any}>
          <div class="sheet-head"><span class="big-icon" aria-hidden="true">{active.icon}</span><h2 ref={sheetHead} tabIndex={-1}>{tr(active.t, lang)}</h2></div>
          {!errand ? (
            <>
              <p class="muted">{u('errands')}</p>
              <ul class="errands">
                {active.errands.map(x => <li><button onClick={() => setErrand(x)}><span>{tr(x.t, lang)}</span><i>›</i></button></li>)}
              </ul>
            </>
          ) : (
            <div class="guide">
              <button class="link-back" onClick={() => setErrand(null)}>{back} {tr(active.t, lang)}</button>
              <h3>{tr(errand.t, lang)}</h3>
              <Guide id={errand.id} lang={lang} u={u} />
              <div class="g-actions">
                <button class={'stamp-btn' + (done.includes(errand.id) ? ' on' : '')} onClick={() => toggleDone(errand.id)}>{done.includes(errand.id) ? '🔴 ' + u('stamped') : u('getStamp')}</button>
                <ShareBtn id={errand.id} title={tr(errand.t, lang)} u={u} />
              </div>
            </div>
          )}
          <p class="disclaimer">ℹ️ {u('notAuthority')}</p>
        </section>
      )}
      </div>
      <footer class="foot"><span>StempelMap v{VERSION} · {fmtDate(STAND, lang)} · ⟳ {fmtDate(NEXT_UPDATE, lang)}</span> · <a href="./impressum.html">Impressum</a> · <a href="./datenschutz.html">Datenschutz</a> · <span>{u('notAuthority')}</span></footer>
    </div>
  );
}

/** First 30 days in Germany – order matters (registration unlocks bank, tax ID, contracts). */
const ROUTE = ['anmeldung', 'konto', 'krankenversicherung', 'steuerid', 'sim', 'aufenthalt', 'hausarzt', 'haftpflicht', 'rundfunk', 'integrationskurs'];

function ShareBtn({ id, title, u }: { id: string; title: string; u: (k: string) => string }) {
  const [ok, setOk] = useState(false);
  const url = location.origin + location.pathname + '#e=' + id;
  const share = async () => {
    try { if (navigator.share) { await navigator.share({ title: 'StempelMap – ' + title, url }); return; } } catch { return; }
    try { await navigator.clipboard.writeText(url); setOk(true); setTimeout(() => setOk(false), 2500); } catch { /* ignore */ }
  };
  return (<>
    <button class="share-btn" onClick={share}>🔗 {ok ? u('copied') : u('share')}</button>
    <a class="share-btn wa" href={'https://wa.me/?text=' + encodeURIComponent('StempelMap – ' + title + ': ' + url)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
  </>);
}

type GuideText = { steps: string[]; docs: string[]; cost: string; tip: string; ai?: boolean };
const GUIDES = guidesJson as Record<string, { links: string[]; de: GuideText; en: GuideText }>;

/** Step-by-step guide. de/en written by hand; other languages show English with a note until translated. */
function Guide({ id, lang, u }: { id: string; lang: Lang; u: (k: string) => string }) {
  const g = GUIDES[id];
  if (!g) return <p>{u('soon')}</p>;
  const own = (g as any)[lang] as GuideText | undefined;
  const t = own ?? g.en;
  const isWarn = (s: string) => s.startsWith('⚠️');
  return (
    <div class="g">
      {!own && u('guideEn') && <p class="g-note">🌐 {u('guideEn')}</p>}
      {own?.ai && u('aiNote') && <p class="g-note">🤖 {u('aiNote')}</p>}
      <ReadAloud lang={own ? lang : 'en'} text={[...t.steps, ...t.docs, t.cost, t.tip].join('. ')} u={u} />
      <h4>{u('steps')}</h4>
      <ol class="g-steps" dir={own ? undefined : 'ltr'}>{t.steps.map(s => <li>{s}</li>)}</ol>
      <h4>{u('docs')}</h4>
      <ul class="g-docs" dir={own ? undefined : 'ltr'}>{t.docs.map(s => <li>{s}</li>)}</ul>
      <div class="g-cost"><b>💶 {u('cost')}:</b> <span dir={own ? undefined : 'ltr'}>{t.cost}</span></div>
      {t.tip && <div class={'g-tip' + (isWarn(t.tip) ? ' warn' : '')} dir={own ? undefined : 'ltr'}>{isWarn(t.tip) ? '' : '💡 '}{t.tip}</div>}
      <h4>{u('links')}</h4>
      <div class="g-links">
        {g.links.map(l => <a class="official" href={l} target="_blank" rel="noopener noreferrer">🔗 {new URL(l).hostname.replace(/^www\./, '')}</a>)}
      </div>
      <p class="g-checked">🕓 {fmtDate(STAND, lang)} · {u('checked')}</p>
    </div>
  );
}

const VOICE: Record<string, string> = { pl: 'pl-PL', ro: 'ro-RO', de: 'de-DE', en: 'en-US', ar: 'ar-SA', tr: 'tr-TR', uk: 'uk-UA', ru: 'ru-RU', fa: 'fa-IR', ur: 'ur-PK', hi: 'hi-IN' };
/** Read the guide aloud with the device's own voice (free, offline, nothing is sent). */
function ReadAloud({ lang, text, u }: { lang: string; text: string; u: (k: string) => string }) {
  const [on, setOn] = useState(false);
  if (typeof speechSynthesis === 'undefined') return null;
  const go = () => {
    speechSynthesis.cancel();
    if (on) { setOn(false); return; }
    const x = new SpeechSynthesisUtterance(text.replace(/⚠️|💡/g, '')); x.lang = VOICE[lang] ?? 'en-US'; x.rate = 0.95;
    x.onend = () => setOn(false); speechSynthesis.speak(x); setOn(true);
  };
  return <button class="read-btn" onClick={go} aria-pressed={on}>{on ? '⏹ ' + u('stop') : '🔊 ' + u('read')}</button>;
}

render(<App />, document.getElementById('app')!);
