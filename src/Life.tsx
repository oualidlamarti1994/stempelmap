import { useEffect, useRef } from 'preact/hooks';

/** A living city: traffic, an ICE-style train, Rhine boats, walkers, day/night. Own drawings, no brand logos.
 *  Moves calmly; stops when the tab is hidden; frozen for prefers-reduced-motion. */

const RIVER = 'M -50 100 C 120 140, 160 40, 330 70 S 620 20, 860 90';
type Car = { kind: 'beetle' | 'van' | 'sedan'; color: string; road: number; dir: 1 | -1; speed: number; offset: number; vertical?: boolean };
const H_ROADS = [150, 285, 435, 590, 860], V_ROADS = [215, 545, 780];
const CARS: Car[] = [
  { kind: 'beetle', color: '#4aa3ff', road: 150, dir: 1, speed: 38, offset: 0 },
  { kind: 'sedan', color: '#2b2d42', road: 285, dir: -1, speed: 46, offset: 300 },
  { kind: 'van', color: '#ff8c42', road: 435, dir: 1, speed: 32, offset: 500 },
  { kind: 'beetle', color: '#06d6a0', road: 590, dir: -1, speed: 36, offset: 150 },
  { kind: 'sedan', color: '#c0c4d6', road: 860, dir: 1, speed: 42, offset: 650 },
  { kind: 'van', color: '#ef476f', road: 215, dir: 1, speed: 30, offset: 200, vertical: true },
  { kind: 'beetle', color: '#ffd166', road: 545, dir: -1, speed: 34, offset: 600, vertical: true },
  { kind: 'sedan', color: '#3d405b', road: 780, dir: 1, speed: 40, offset: 400, vertical: true },
];
const WALKERS = [[200, 170, 1], [560, 300, -1], [200, 610, 1], [560, 880, -1], [760, 450, 1]] as const;

function CarShape({ kind, color }: { kind: Car['kind']; color: string }) {
  if (kind === 'beetle') return (<g>
    <ellipse cx="0" cy="0" rx="14" ry="8" fill={color} /><ellipse cx="1" cy="0" rx="7" ry="6" fill="#fff" opacity=".55" />
    <circle cx="-9" cy="-7" r="2.6" fill="#222" /><circle cx="9" cy="-7" r="2.6" fill="#222" /><circle cx="-9" cy="7" r="2.6" fill="#222" /><circle cx="9" cy="7" r="2.6" fill="#222" />
  </g>);
  if (kind === 'van') return (<g>
    <rect x="-15" y="-8" width="30" height="16" rx="5" fill={color} /><rect x="-15" y="-8" width="15" height="16" rx="5" fill="#fff" opacity=".9" />
    <rect x="4" y="-6" width="9" height="12" rx="2" fill="#fff" opacity=".6" /><circle cx="-9" cy="-8" r="2.4" fill="#222" /><circle cx="9" cy="-8" r="2.4" fill="#222" /><circle cx="-9" cy="8" r="2.4" fill="#222" /><circle cx="9" cy="8" r="2.4" fill="#222" />
  </g>);
  return (<g>
    <rect x="-17" y="-7" width="34" height="14" rx="6" fill={color} /><rect x="-5" y="-5.5" width="13" height="11" rx="3" fill="#aeb7d6" opacity=".7" />
    <circle cx="16" cy="-4" r="1.3" fill="#fff8c4" /><circle cx="16" cy="4" r="1.3" fill="#fff8c4" />
  </g>);
}

export function Landmarks() {
  return (<g class="landmarks" aria-hidden="true">
    {/* Kölner Dom */}
    <g transform="translate(-95 420)">
      <ellipse cx="0" cy="62" rx="70" ry="12" fill="#000" opacity=".12" />
      <rect x="-48" y="-10" width="96" height="70" rx="4" fill="#6b6f7a" /><rect x="-40" y="0" width="80" height="60" fill="#7c808c" />
      {[-30, 30].map((x) => <g><rect x={x - 12} y="-80" width="24" height="140" fill="#5f6370" /><path d={`M ${x - 12} -80 L ${x} -140 L ${x + 12} -80 Z`} fill="#555966" />
        {[-60, -35, -10, 15].map((y) => <rect x={x - 4} y={y} width="8" height="16" rx="4" fill="#3a3d48" />)}</g>)}
      <path d="M -10 60 L -10 20 Q 0 6 10 20 L 10 60 Z" fill="#3a3d48" /><circle cx="0" cy="-4" r="9" fill="#3a3d48" />
      <text x="0" y="92" text-anchor="middle" class="lm-label">Kölner Dom</text>
    </g>
    {/* Brandenburger Tor */}
    <g transform="translate(-95 770)">
      <ellipse cx="0" cy="44" rx="72" ry="10" fill="#000" opacity=".12" />
      <rect x="-62" y="-14" width="124" height="14" fill="#e9dcb8" /><rect x="-30" y="-34" width="60" height="20" rx="3" fill="#e9dcb8" />
      {[-56, -36, -16, 4, 24, 44].map((x) => <rect x={x} y="0" width="12" height="42" fill="#f3e9cc" stroke="#d8c79c" />)}
      <path d="M -14 -34 L -6 -48 L 6 -48 L 14 -34 Z" fill="#3f8f6f" /><rect x="-60" y="42" width="120" height="5" fill="#d8c79c" />
      <text x="0" y="70" text-anchor="middle" class="lm-label">Brandenburger Tor</text>
    </g>
    {/* Fernsehturm */}
    <g transform="translate(900 400)">
      <ellipse cx="0" cy="96" rx="40" ry="9" fill="#000" opacity=".12" />
      <path d="M -6 96 L -3 -10 L 3 -10 L 6 96 Z" fill="#cfd3dc" /><circle cx="0" cy="-22" r="19" fill="#c7ccd8" stroke="#9aa1b5" />
      {[-30, -18, -6, 6, 18].map((x) => <rect x={x - 2} y="-24" width="4" height="4" fill="#6b7290" />)}
      <rect x="-1.5" y="-90" width="3" height="68" fill="#e63946" /><rect x="-1.5" y="-90" width="3" height="10" fill="#fff" /><rect x="-1.5" y="-66" width="3" height="10" fill="#fff" />
      <text x="0" y="122" text-anchor="middle" class="lm-label">Fernsehturm</text>
    </g>
    {/* Neuschwanstein */}
    <g transform="translate(905 780)">
      <path d="M -80 60 L -30 0 L 20 40 L 60 10 L 90 60 Z" fill="#8fbf74" />
      <rect x="-40" y="-20" width="80" height="60" fill="#f1efe9" /><rect x="-58" y="-44" width="22" height="84" fill="#ecebe4" /><rect x="30" y="-60" width="18" height="100" fill="#ecebe4" />
      <path d="M -60 -44 L -47 -76 L -34 -44 Z" fill="#4a6fa5" /><path d="M 28 -60 L 39 -96 L 50 -60 Z" fill="#4a6fa5" /><path d="M -44 -20 L 0 -46 L 44 -20 Z" fill="#4a6fa5" />
      {[-26, -10, 6, 22].map((x) => <rect x={x} y="-4" width="7" height="12" rx="3.5" fill="#6b7290" />)}
      <text x="0" y="84" text-anchor="middle" class="lm-label">Neuschwanstein</text>
    </g>
    <text x="640" y="80" class="lm-river">Rhein</text>
  </g>);
}

export function Life({ houses }: { houses: [number, number, string][] }) {
  const cars = useRef<(SVGGElement | null)[]>([]);
  const train = useRef<SVGGElement>(null);
  const boats = useRef<(SVGGElement | null)[]>([]);
  const walkers = useRef<(SVGGElement | null)[]>([]);
  const river = useRef<SVGPathElement>(null);
  const night = useRef<SVGRectElement>(null);
  const windows = useRef<SVGGElement>(null);

  useEffect(() => {
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const len = river.current!.getTotalLength();
    let raf = 0, t0 = 0;
    const dayNight = () => { // 0 = full day, 1 = full night, from the real local time
      const h = new Date().getHours() + new Date().getMinutes() / 60;
      const d = h < 6 ? 1 : h < 8 ? 1 - (h - 6) / 2 : h < 18 ? 0 : h < 20 ? (h - 18) / 2 : 1;
      night.current!.setAttribute('opacity', String(d * 0.62));
      windows.current!.setAttribute('opacity', String(d));
    };
    const frame = (now: number) => {
      if (!t0) t0 = now; const t = still ? 6 : (now - t0) / 1000;
      CARS.forEach((c, i) => {
        const span = c.vertical ? 920 : 920, p = ((c.offset + t * c.speed) % span + span) % span;
        const s = c.dir > 0 ? -60 + p : 860 - p, lane = c.dir > 0 ? 6 : -6;
        const tr = c.vertical ? `translate(${c.road + lane} ${s + 80}) rotate(${c.dir > 0 ? 90 : -90})` : `translate(${s} ${c.road + lane}) rotate(${c.dir > 0 ? 0 : 180})`;
        cars.current[i]?.setAttribute('transform', tr);
      });
      const tp = ((t * 70) % 1700) - 450; // ICE crosses, then a pause
      train.current?.setAttribute('transform', `translate(${tp} 1025)`);
      [0, 0.5].forEach((o, i) => {
        const pt = river.current!.getPointAtLength(((t * 0.02 + o) % 1) * len);
        boats.current[i]?.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
      });
      WALKERS.forEach(([x, y, dir], i) => {
        const p = Math.sin(t * 0.25 + i) * 40 * dir;
        walkers.current[i]?.setAttribute('transform', `translate(${x + (i % 2 ? 0 : p)} ${y + (i % 2 ? p : 0)})`);
      });
      if (!still) raf = requestAnimationFrame(frame);
    };
    dayNight(); const dn = setInterval(dayNight, 60000);
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); };
    document.addEventListener('visibilitychange', vis); raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); clearInterval(dn); document.removeEventListener('visibilitychange', vis); };
  }, []);

  return (<g class="life" aria-hidden="true">
    <path ref={river} d={RIVER} fill="none" stroke="none" />
    {[0, 1].map((i) => (
      <g ref={(e) => { boats.current[i] = e; }}>
        {i === 0
          ? <g><path d="M -22 0 L 22 0 L 16 8 L -16 8 Z" fill="#f1f1f1" /><rect x="-10" y="-8" width="18" height="8" rx="2" fill="#2b4fd8" /><rect x="-6" y="-12" width="6" height="4" fill="#e63946" /></g>
          : <g><path d="M -12 2 L 12 2 L 8 8 L -8 8 Z" fill="#8c5a3c" /><path d="M 0 2 L 0 -16 L 10 0 Z" fill="#fff" /></g>}
      </g>))}
    {/* ICE-style train: white, red stripe, no logo */}
    <g ref={train}>
      {[0, 1, 2, 3].map((k) => (
        <g transform={`translate(${-k * 92} 0)`}>
          {k === 0
            ? <path d="M -46 -12 L 30 -12 Q 50 -12 58 0 Q 50 12 30 12 L -46 12 Z" fill="#f7f7f7" stroke="#c9ccd6" />
            : <rect x="-46" y="-12" width="88" height="24" rx="4" fill="#f7f7f7" stroke="#c9ccd6" />}
          <rect x="-46" y="4" width={k === 0 ? 96 : 88} height="3.5" fill="#e63946" />
          {[-38, -24, -10, 4, 18].map((x) => <rect x={x} y="-7" width="10" height="6" rx="1.5" fill="#3a3f5c" />)}
        </g>))}
    </g>
    {CARS.map((c, i) => <g ref={(e) => { cars.current[i] = e; }}><CarShape kind={c.kind} color={c.color} /></g>)}
    {WALKERS.map((_, i) => <g ref={(e) => { walkers.current[i] = e; }}><circle cx="0" cy="-5" r="3" fill="#f2c9a0" /><rect x="-3" y="-2" width="6" height="9" rx="3" fill={['#5b6cff', '#e63946', '#3cb98a', '#ffb84d', '#a26bff'][i]} /></g>)}
    <rect ref={night} x="-2000" y="-1000" width="4800" height="3100" fill="#2a3a8c" opacity="0" style="pointer-events:none;mix-blend-mode:multiply" />
    <g ref={windows} opacity="0">
      {houses.map(([x, y]) => <rect x={x - 6} y={y - 2} width="5" height="5" fill="#ffd166" style="filter:drop-shadow(0 0 3px #ffd166)" />)}
      {houses.map(([x, y]) => <rect x={x + 2} y={y - 2} width="5" height="5" fill="#ffe8a3" />)}
    </g>
  </g>);
}
