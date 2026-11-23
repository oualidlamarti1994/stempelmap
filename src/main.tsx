import { render } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { BUILDINGS, LANGS, UI, tr, type Building, type Errand, type Lang } from './data';
import { CityMap } from './CityMap';
import guidesJson from './guides.json';
import './styles.css';

const initLang = (): Lang => {
  const n = (navigator.language || 'en').slice(0, 2);
  const map: Record<string, Lang> = { de: 'de', ar: 'ar', tr: 'tr', uk: 'uk', ru: 'ru', fa: 'fa', ur: 'ur', hi: 'hi' };
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

  return (
    <div class={'app' + (active ? ' has-sheet' : '')} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <header>
        <div class="brand"><span class="logo">🗺️</span><div><b>{u('title')}</b><small>{u('sub')}</small></div></div>
        <select value={lang} onChange={ev => setLang((ev.target as HTMLSelectElement).value as Lang)} aria-label="Language">
          {LANGS.map(l => <option value={l.id}>{l.name}</option>)}
        </select>
      </header>
      <div class="search">
        <input value={q} onInput={ev => setQ((ev.target as HTMLInputElement).value)} placeholder={u('search')} aria-label={u('search')} />
        {hits.length > 0 && (
          <ul class="hits">{hits.map(({ b, x }) => <li><button onClick={() => pick(b, x)}><span>{b.icon}</span> {tr(x.t, lang)} <small>· {tr(b.t, lang)}</small></button></li>)}</ul>
        )}
      </div>

      <div class="stage">
      <div class="map-wrap">
        <CityMap lang={lang} active={active} onPick={b => pick(b)} />
        {!active && <span class="hint">🖐️ {u('hint')}</span>}
        {active && <button class="map-back" onClick={() => { setActive(null); setErrand(null); }}>{back} {u('back')}</button>}
      </div>

      {active && (
        <section class="sheet" style={{ '--c': active.color } as any}>
          <div class="sheet-head"><span class="big-icon">{active.icon}</span><h2>{tr(active.t, lang)}</h2></div>
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
            </div>
          )}
          <p class="disclaimer">ℹ️ {u('notAuthority')}</p>
        </section>
      )}
      </div>
    </div>
  );
}

type GuideText = { steps: string[]; docs: string[]; cost: string; tip: string };
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
      <p class="g-checked">{u('checked')}</p>
    </div>
  );
}

render(<App />, document.getElementById('app')!);
