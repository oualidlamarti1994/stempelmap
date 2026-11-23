import { useEffect, useRef, useState } from 'preact/hooks';
import { BUILDINGS, tr, type Building, type Lang } from './data';

const FULL = [0, 0, 800, 1100];
const BLOCKS = [[40, 170, 160, 255], [230, 170, 300, 100], [560, 170, 200, 100], [230, 300, 300, 120], [560, 300, 200, 120],
  [40, 450, 160, 125], [230, 450, 300, 125], [560, 450, 200, 125], [40, 605, 160, 240], [560, 605, 200, 240],
  [40, 875, 160, 120], [230, 875, 300, 120], [560, 875, 200, 120]];
// little decorative houses [x, y, roof colour]
const HOUSES: [number, number, string][] = [[60, 300, '#e07a5f'], [160, 300, '#81b29a'], [60, 470, '#f2cc8f'], [170, 590, '#e07a5f'],
  [250, 190, '#3d5a80'], [520, 300, '#e07a5f'], [580, 300, '#f2cc8f'], [740, 300, '#81b29a'], [740, 190, '#e07a5f'], [580, 470, '#3d5a80'],
  [740, 560, '#e07a5f'], [60, 630, '#81b29a'], [170, 820, '#f2cc8f'], [580, 625, '#e07a5f'], [740, 820, '#81b29a'], [60, 900, '#e07a5f'],
  [170, 975, '#3d5a80'], [250, 980, '#81b29a'], [520, 980, '#f2cc8f'], [740, 900, '#e07a5f']];
const CARS: [number, number, string, boolean][] = [[90, 150, '#ff6b6b', true], [610, 150, '#4aa3ff', true], [380, 435, '#ffd166', true],
  [700, 590, '#06d6a0', true], [215, 520, '#ef476f', false], [545, 760, '#118ab2', false], [780, 380, '#ffd166', false], [300, 860, '#8338ec', true]];
const TREES = [[30, 445], [210, 165], [550, 595], [790, 600], [30, 860], [210, 600], [550, 1000], [790, 280], [400, 870]];

/** Original cartoon city map (own design) with a game-style camera:
 *  drag = move, wheel / pinch = zoom (towards pointer), double-click = zoom in, tap building = fly there. */
const WORLD = { x: -150, y: -60, w: 1100, h: 1220 };       // pannable area
const MIN_W = 220, MAX_W = 2600;

export function CityMap({ lang, active, onPick }: { lang: Lang; active: Building | null; onPick: (b: Building) => void }) {
  const svg = useRef<SVGSVGElement>(null);
  const [vb, setVb] = useState(FULL);
  const cur = useRef(FULL);
  const aspect = useRef(1100 / 800);                       // height / width of the element
  const anim = useRef(0);

  const clamp = (v: number[]) => {
    let [x, y, w] = v; w = Math.min(MAX_W, Math.max(MIN_W, w)); const h = w * aspect.current;
    x = w >= WORLD.w ? WORLD.x + (WORLD.w - w) / 2 : Math.min(WORLD.x + WORLD.w - w, Math.max(WORLD.x, x));
    y = h >= WORLD.h ? WORLD.y + (WORLD.h - h) / 2 : Math.min(WORLD.y + WORLD.h - h, Math.max(WORLD.y, y));
    return [x, y, w, h];
  };
  const set = (v: number[]) => { const c = clamp(v); cur.current = c; setVb(c); };
  const fly = (to: number[]) => {
    cancelAnimationFrame(anim.current);
    const from = cur.current; const t0 = performance.now();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = (t: number) => {
      const k = reduce ? 1 : Math.min(1, (t - t0) / 600); const e = 1 - Math.pow(1 - k, 3);
      set(from.map((f, i) => f + (to[i] - f) * e)); if (k < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  };
  const overview = () => { const w = Math.min(MAX_W, Math.max(860, 1130 / aspect.current)); fly([400 - w / 2, 550 - (w * aspect.current) / 2, w, w * aspect.current]); };

  // keep the map filling its element when the window size changes
  useEffect(() => {
    const el = svg.current!; const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect(); if (!r.width) return;
      aspect.current = r.height / r.width; if (!active) overview(); else set(cur.current);
    });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => {
    if (active) { const w = 420; fly([active.x - w / 2, active.y - (w * aspect.current) / 2, w, w * aspect.current]); }
    else if (cur.current !== FULL) overview();
  }, [active]);

  // pointer → world coordinates
  const toWorld = (cx: number, cy: number) => {
    const r = svg.current!.getBoundingClientRect(); const [x, y, w, h] = cur.current;
    return [x + ((cx - r.left) / r.width) * w, y + ((cy - r.top) / r.height) * h];
  };
  const zoomAt = (cx: number, cy: number, f: number) => {
    const [wx, wy] = toWorld(cx, cy); const [x, y, w] = cur.current;
    const nw = Math.min(MAX_W, Math.max(MIN_W, w * f)); const k = nw / w;
    set([wx - (wx - x) * k, wy - (wy - y) * k, nw]);
  };

  const ptrs = useRef(new Map<number, { x: number; y: number }>());
  const moved = useRef(0);
  const pinch = useRef(0);
  const onDown = (e: PointerEvent) => {
    cancelAnimationFrame(anim.current); ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved.current = 0;
    if (ptrs.current.size === 2) { const [a, b] = [...ptrs.current.values()]; pinch.current = Math.hypot(a.x - b.x, a.y - b.y); }
  };
  const onMove = (e: PointerEvent) => {
    const p = ptrs.current.get(e.pointerId); if (!p) return;
    const r = svg.current!.getBoundingClientRect(); const [x, y, w, h] = cur.current;
    if (ptrs.current.size === 1) {
      const dx = e.clientX - p.x, dy = e.clientY - p.y; moved.current += Math.abs(dx) + Math.abs(dy);
      if (moved.current > 6 && !svg.current!.hasPointerCapture(e.pointerId)) svg.current!.setPointerCapture(e.pointerId);
      if (moved.current <= 6) return;
      set([x - (dx / r.width) * w, y - (dy / r.height) * h, w]);
    }
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.current.size === 2) {
      const [a, b] = [...ptrs.current.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch.current) zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, pinch.current / d); pinch.current = d; moved.current += 10;
    }
  };
  const onUp = (e: PointerEvent) => { ptrs.current.delete(e.pointerId); if (ptrs.current.size < 2) pinch.current = 0; };
  const onWheel = (e: WheelEvent) => { e.preventDefault(); cancelAnimationFrame(anim.current); zoomAt(e.clientX, e.clientY, Math.exp(e.deltaY * 0.0015)); };
  useEffect(() => { const el = svg.current!; el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel); }, []);
  // a drag must not count as a tap on a building
  const onClickCapture = (e: MouseEvent) => { if (moved.current > 6) { e.stopPropagation(); e.preventDefault(); } };
  const zoomBtn = (f: number) => { const r = svg.current!.getBoundingClientRect(); const [x, y, w] = cur.current;
    const cx = x + w / 2, cy = y + (w * aspect.current) / 2; const nw = Math.min(MAX_W, Math.max(MIN_W, w * f));
    fly([cx - nw / 2, cy - (nw * aspect.current) / 2, nw, nw * aspect.current]); void r; };

  return (
    <div class="map-cam">
    <div class="zoom-ctl">
      <button onClick={() => zoomBtn(0.7)} aria-label="Zoom in">＋</button>
      <button onClick={() => zoomBtn(1.4)} aria-label="Zoom out">−</button>
      <button onClick={overview} aria-label="Overview">⌂</button>
    </div>
    <svg ref={svg} class="city" viewBox={vb.join(' ')} preserveAspectRatio="xMidYMid slice" role="img" aria-label="City map"
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onClickCapture={onClickCapture}
      onDblClick={(e: MouseEvent) => zoomAt(e.clientX, e.clientY, 0.6)}>
      <defs>
        <pattern id="grass" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#cfe8b5" /><circle cx="8" cy="10" r="1.6" fill="#b5d897" /><circle cx="28" cy="30" r="1.4" fill="#b5d897" />
        </pattern>
        <filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity=".28" /></filter>
      </defs>
      <rect x="-2000" y="-1000" width="4800" height="3100" fill="url(#grass)" />
      <path d="M -50 100 C 120 140, 160 40, 330 70 S 620 20, 860 90" fill="none" stroke="#7cc4f2" stroke-width="62" stroke-linecap="round" />
      <path d="M -50 100 C 120 140, 160 40, 330 70 S 620 20, 860 90" fill="none" stroke="#a9dbfa" stroke-width="14" stroke-dasharray="30 26" opacity=".7" />
      <text x="680" y="58" font-size="18" fill="#fff" opacity=".8">⛵</text>
      {BLOCKS.map(([x, y, w, h]) => <rect x={x} y={y} width={w} height={h} rx="18" fill="#f1ead8" stroke="#e2d6b8" stroke-width="3" />)}
      <rect x="230" y="605" width="300" height="240" rx="26" fill="#a6d77f" stroke="#8cc562" stroke-width="3" />
      <ellipse cx="440" cy="770" rx="62" ry="32" fill="#7cc4f2" opacity=".85" />
      <path d="M 250 830 Q 330 760 400 790" fill="none" stroke="#e9dcc0" stroke-width="8" stroke-linecap="round" />
      {[[260, 625], [500, 640], [270, 800], [500, 810], [400, 640], [380, 820]].map(([x, y]) => <Tree x={x} y={y} />)}
      {TREES.map(([x, y]) => <Tree x={x} y={y} s={0.75} />)}
      {HOUSES.map(([x, y, c]) => (
        <g transform={`translate(${x} ${y})`}><rect x="-13" y="-6" width="26" height="20" rx="3" fill="#fffaf0" stroke="#d8cdb0" stroke-width="1.5" />
          <path d="M -16 -5 L 0 -18 L 16 -5 Z" fill={c} /><rect x="-3" y="5" width="6" height="9" fill="#b58b5a" /></g>
      ))}
      <g stroke="#ffffff" stroke-linecap="round">
        {[150, 285, 435, 590, 860].map(y => <line x1="-20" y1={y} x2="820" y2={y} stroke-width="26" />)}
        {[215, 545, 780].map(x => <line x1={x} y1="130" x2={x} y2="1005" stroke-width="26" />)}
      </g>
      <g stroke="#d9dbe6" stroke-width="2.5" stroke-dasharray="14 14">
        {[150, 285, 435, 590, 860].map(y => <line x1="-20" y1={y} x2="820" y2={y} />)}
        {[215, 545, 780].map(x => <line x1={x} y1="130" x2={x} y2="1005" />)}
      </g>
      {CARS.map(([x, y, c, h]) => (
        <g transform={`translate(${x} ${y}) rotate(${h ? 0 : 90})`}><rect x="-13" y="-7" width="26" height="14" rx="5" fill={c} />
          <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#fff" opacity=".6" /></g>
      ))}
      <rect x="196" y="40" width="38" height="100" rx="6" fill="#c9b48a" /><rect x="526" y="22" width="38" height="118" rx="6" fill="#c9b48a" />
      <rect x="-20" y="1010" width="840" height="30" fill="#9aa0b5" />
      <line x1="-20" y1="1025" x2="820" y2="1025" stroke="#5c6178" stroke-width="4" stroke-dasharray="10 8" />
      <g transform="translate(120 1025)"><rect x="-60" y="-11" width="120" height="22" rx="8" fill="#ff7a45" /><rect x="-50" y="-6" width="20" height="9" rx="2" fill="#fff" opacity=".8" /><rect x="-20" y="-6" width="20" height="9" rx="2" fill="#fff" opacity=".8" /><rect x="10" y="-6" width="20" height="9" rx="2" fill="#fff" opacity=".8" /></g>

      {BUILDINGS.map(b => {
        const on = active?.id === b.id; const label = tr(b.s, lang); const w = Math.max(60, label.length * 8.2 + 22);
        return (
          <g class={'pin' + (on ? ' on' : '')} transform={`translate(${b.x} ${b.y})`} tabIndex={0} role="button"
            aria-label={tr(b.t, lang)} onClick={() => onPick(b)} onKeyDown={(ev: KeyboardEvent) => (ev.key === 'Enter' || ev.key === ' ') && onPick(b)}>
            <ellipse cx="0" cy="34" rx="26" ry="7" fill="#000" opacity=".15" />
            <rect x="-30" y="-30" width="60" height="60" rx="16" fill={b.color} filter="url(#sh)" />
            <rect x="-24" y="-24" width="48" height="48" rx="12" fill="#ffffff" opacity=".22" />
            <text x="0" y="12" text-anchor="middle" font-size="32">{b.icon}</text>
            <g transform="translate(0 50)">
              <rect x={-w / 2} y="-12" width={w} height="23" rx="11.5" fill="#1d2140" opacity=".88" />
              <text x="0" y="4.5" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">{label}</text>
            </g>
          </g>
        );
      })}
    </svg>
    </div>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r="17" fill="#5fae4a" /><circle cx="-5" cy="-5" r="7" fill="#7cc65f" /></g>;
}
