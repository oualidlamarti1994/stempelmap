import { useEffect, useRef } from 'preact/hooks';
import { VERSION } from './version';

/** Lively surroundings around the city (own drawings): Siebengebirge + Drachenfels, vineyards, sheep, forest,
 *  wind turbines, Ferris wheel, farm, fields + football pitch, balloon, clouds, birds, weather, seasons. */

const today = new Date();
const M = today.getMonth() + 1, Dd = today.getDate();
const WINTER = M === 12 || M <= 2;
const XMAS = (M === 11 && Dd >= 20) || M === 12 || (M === 1 && Dd <= 6);
const NYE = (M === 12 && Dd === 31) || (M === 1 && Dd === 1);
const seed = today.getFullYear() * 400 + M * 32 + Dd;
const rnd = (n: number) => { const x = Math.sin(seed * 9301 + n * 49297) * 233280; return x - Math.floor(x); };
const WEATHER: 'snow' | 'rain' | 'clear' = WINTER && rnd(1) < 0.55 ? 'snow' : !WINTER && rnd(2) < 0.3 ? 'rain' : 'clear';

const Tree = ({ x, y, s = 1, c = '#5fae4a' }: { x: number; y: number; s?: number; c?: string }) =>
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-2" y="6" width="4" height="10" fill="#7a5233" /><circle r="12" fill={c} /><circle cx="-4" cy="-4" r="5" fill="#ffffff" opacity=".18" /></g>;
const Pine = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) =>
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-2" y="10" width="4" height="8" fill="#6b4a2e" /><path d="M 0 -18 L 12 10 L -12 10 Z" fill="#2f7d4a" /><path d="M 0 -10 L 9 6 L -9 6 Z" fill="#3c9a5c" /></g>;

/** German theme: black-red-gold bunting over the streets and waving flags. */
const DE = ['#1a1a1a', '#dd0000', '#ffce00'];
function Bunting({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const n = Math.max(4, Math.round((x2 - x1) / 22)), sag = (x2 - x1) * 0.12;
  const at = (t: number) => [x1 + (x2 - x1) * t, y + 4 * sag * t * (1 - t)];
  return (<g>
    <path d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y + 2 * sag} ${x2} ${y}`} stroke="#6b5a3a" stroke-width="1.2" fill="none" />
    {Array.from({ length: n }, (_, i) => { const [a, b] = at((i + 0.15) / n), [c, d] = at((i + 0.85) / n), [m, k] = at((i + 0.5) / n);
      return <path d={`M ${a} ${b} L ${c} ${d} L ${m} ${k + 13} Z`} fill={DE[i % 3]} />; })}
  </g>);
}
function Flag({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (<g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-1.5" y="-70" width="3" height="70" fill="#9aa0b4" /><circle cy="-71" r="3" fill="#ffce00" />
    <g class="de-flag">{DE.map((c, i) => <rect x="1.5" y={-68 + i * 9} width="40" height="9" fill={c} />)}</g>
  </g>);
}

export function Surroundings({ layer }: { layer: 'ground' | 'top' }) {
  const turbines = useRef<(SVGGElement | null)[]>([]);
  const wheel = useRef<SVGGElement>(null);
  const balloon = useRef<SVGGElement>(null);
  const clouds = useRef<(SVGGElement | null)[]>([]);
  const birds = useRef<SVGGElement>(null);
  const sheep = useRef<(SVGGElement | null)[]>([]);
  const drops = useRef<SVGGElement>(null);
  const fireworks = useRef<SVGGElement>(null);

  useEffect(() => {
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, t0 = 0;
    const N = 70, P = Array.from({ length: N }, (_, i) => [rnd(10 + i) * 1300 - 200, rnd(200 + i) * 1250 - 80, 0.6 + rnd(400 + i)]);
    const frame = (now: number) => {
      if (!t0) t0 = now; const t = still ? 3 : (now - t0) / 1000;
      turbines.current.forEach((g, i) => g?.setAttribute('transform', `rotate(${(t * (40 + i * 7)) % 360})`));
      wheel.current?.setAttribute('transform', `rotate(${(t * 6) % 360})`);
      balloon.current?.setAttribute('transform', `translate(${300 + ((t * 6) % 700)} ${-20 + Math.sin(t * 0.5) * 10})`);
      clouds.current.forEach((g, i) => g?.setAttribute('transform', `translate(${((t * (6 + i * 2) + i * 380) % 1500) - 300} ${-40 + i * 22})`));
      birds.current?.setAttribute('transform', `translate(${((t * 28) % 1600) - 300} ${60 + Math.sin(t * 0.8) * 14})`);
      sheep.current.forEach((g, i) => g?.setAttribute('transform', `translate(${Math.sin(t * 0.3 + i * 2) * 6} 0)`));
      if (drops.current && WEATHER !== 'clear') {
        const kids = drops.current.children;
        for (let i = 0; i < N; i++) {
          const [x, y, v] = P[i];
          const yy = ((y + t * (WEATHER === 'snow' ? 26 : 260) * v) % 1250) - 80;
          const xx = x + (WEATHER === 'snow' ? Math.sin(t + i) * 12 : -yy * 0.12);
          kids[i]?.setAttribute('transform', `translate(${xx} ${yy})`);
        }
      }
      if (fireworks.current && NYE) {
        [...fireworks.current.children].forEach((g, i) => {
          const c = (t * 0.6 + i * 0.37) % 1;
          g.setAttribute('transform', `translate(${150 + i * 170} ${200 + (i % 2) * 120}) scale(${0.2 + c * 1.6})`);
          (g as SVGGElement).style.opacity = String(c < 0.75 ? 1 : (1 - c) * 4);
        });
      }
      if (!still) raf = requestAnimationFrame(frame);
    };
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); };
    document.addEventListener('visibilitychange', vis); raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', vis); };
  }, []);

  if (layer === 'ground') return (<g class="surroundings" aria-hidden="true">
    <g class="de-bg">
      <clipPath id="de-shape"><path d="M 271 -200 L 432 -180 L 568 -100 L 754 -120 L 965 0 L 990 120 L 1015 260 L 1027 460 L 1064 560 L 977 600 L 804 720 L 705 720 L 754 820 L 816 920 L 915 1020 L 816 1120 L 791 1240 L 816 1280 L 717 1260 L 506 1280 L 395 1280 L 271 1260 L 147 1260 L 134 1120 L 221 980 L -2 940 L -39 760 L -52 620 L -64 580 L -27 400 L 47 380 L 85 260 L 35 180 L 72 100 L 196 60 L 258 80 L 308 0 Z" /></clipPath>
      <g clip-path="url(#de-shape)" opacity=".5"><rect x="-400" y="-240" width="1800" height="520" fill="#1a1a1a" /><rect x="-400" y="280" width="1800" height="520" fill="#dd0000" /><rect x="-400" y="800" width="1800" height="525" fill="#ffce00" /></g>
      <path d="M 271 -200 L 432 -180 L 568 -100 L 754 -120 L 965 0 L 990 120 L 1015 260 L 1027 460 L 1064 560 L 977 600 L 804 720 L 705 720 L 754 820 L 816 920 L 915 1020 L 816 1120 L 791 1240 L 816 1280 L 717 1260 L 506 1280 L 395 1280 L 271 1260 L 147 1260 L 134 1120 L 221 980 L -2 940 L -39 760 L -52 620 L -64 580 L -27 400 L 47 380 L 85 260 L 35 180 L 72 100 L 196 60 L 258 80 L 308 0 Z" fill="none" stroke="#1a1a1a" stroke-opacity=".4" stroke-width="4" stroke-linejoin="round" />
    </g>
    {/* Siebengebirge + Drachenfels above the Rhine */}
    <path d="M -1400 70 L -260 70 Q -160 -40 -60 30 Q 40 -70 150 20 Q 240 -60 340 30 Q 460 -50 560 25 Q 680 -60 800 30 Q 900 -30 1060 60 L 2200 60 L 2200 90 L -1400 90 Z" fill="#8cbf6e" />
    <path d="M -1400 80 L -260 80 Q -120 10 0 60 Q 160 0 300 55 Q 520 0 700 50 Q 900 10 1060 75 L 2200 75 L 2200 95 L -1400 95 Z" fill="#79b05c" />
    <g transform="translate(150 -2)"><rect x="-12" y="-18" width="24" height="24" fill="#a49a8a" /><rect x="-12" y="-24" width="6" height="6" fill="#a49a8a" /><rect x="0" y="-24" width="6" height="6" fill="#a49a8a" /><rect x="-3" y="-8" width="6" height="14" fill="#6f6658" /></g>
    <text x="150" y="36" text-anchor="middle" class="lm-label" style="font-size:12px">Drachenfels</text>
    {[[-200, 40], [-150, 28], [420, 30], [470, 36], [980, 40]].map(([x, y]) => <Pine x={x} y={y} s={0.8} />)}

    {/* Left: vineyards, sheep meadow, forest */}
    <g>{Array.from({ length: 8 }, (_, i) => <path d={`M -165 ${140 + i * 14} Q -75 ${132 + i * 14} 20 ${140 + i * 14}`} stroke="#5d8f3a" stroke-width="5" stroke-linecap="round" fill="none" />)}
      {Array.from({ length: 24 }, (_, i) => <circle cx={-150 + (i % 8) * 22} cy={140 + Math.floor(i / 8) * 42} r="3" fill="#6b3a7d" />)}</g>
    <rect x="-170" y="545" width="185" height="140" rx="20" fill="#a8d88a" />
    {Array.from({ length: 14 }, (_, i) => <Pine x={-160 + (i % 7) * 28} y={895 + Math.floor(i / 7) * 34 + (i % 2) * 8} s={1.1} />)}

    {/* Right: wind turbines, Ferris wheel, farm */}
    {[[860, 260], [920, 210], [975, 270]].map(([x, y], i) => (
      <g transform={`translate(${x} ${y})`}><path d="M -3 0 L -1.5 -110 L 1.5 -110 L 3 0 Z" fill="#eef0f5" />
        <g transform="translate(0 -110)"><g ref={(e) => { turbines.current[i] = e; }}>{[0, 120, 240].map((a) => <path transform={`rotate(${a})`} d="M -2 0 L 0 -46 L 3 0 Z" fill="#fbfbfd" stroke="#c9ccd6" stroke-width=".8" />)}</g><circle r="3.5" fill="#c9ccd6" /></g></g>))}
    <g transform="translate(880 610)">
      <path d="M -30 58 L 0 0 L 30 58" stroke="#8a90a8" stroke-width="4" fill="none" />
      <g ref={wheel}><circle r="46" fill="none" stroke="#e63946" stroke-width="3" />{Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <g><line x1="0" y1="0" x2={Math.cos(a) * 46} y2={Math.sin(a) * 46} stroke="#f1a7ad" stroke-width="1.5" /><rect x={Math.cos(a) * 46 - 5} y={Math.sin(a) * 46 - 4} width="10" height="9" rx="2" fill={['#ffd166', '#4aa3ff', '#3cb98a'][i % 3]} /></g>; })}</g>
      <circle r="5" fill="#8a90a8" />
    </g>
    <g transform="translate(870 930)">
      <rect x="-60" y="-10" width="160" height="90" rx="14" fill="#d9c58a" opacity=".55" />
      <rect x="-40" y="-36" width="54" height="40" fill="#b5463a" /><path d="M -46 -36 L -13 -62 L 20 -36 Z" fill="#7a2e26" /><rect x="-20" y="-16" width="14" height="20" fill="#5a2a22" />
      {[[40, 20], [70, 45], [30, 55]].map(([x, y]) => <g transform={`translate(${x} ${y})`}><ellipse rx="10" ry="6" fill="#fff" /><circle cx="-4" cy="-1" r="2.5" fill="#222" /><circle cx="9" cy="-3" r="3.5" fill="#fff" stroke="#222" stroke-width=".6" /></g>)}
    </g>

    {/* Below the track: fields + football pitch */}
    {Array.from({ length: 6 }, (_, i) => <rect x={-170 + i * 190} y="1060" width="180" height="90" rx="10" fill={['#e8d48a', '#a6d77f', '#d9c27a', '#9fd071', '#e3cf86', '#b2dc8a'][i]} />)}
    <g transform="translate(380 1105)"><rect x="-70" y="-38" width="140" height="76" rx="6" fill="#4fae5a" stroke="#fff" stroke-width="2" /><line x1="0" y1="-38" x2="0" y2="38" stroke="#fff" stroke-width="2" /><circle r="12" fill="none" stroke="#fff" stroke-width="2" /></g>
    {[[125, 1090], [170, 1105], [135, 1135], [180, 1140], [150, 1115]].map(([x, y], i) => (
      <g transform={`translate(${x} ${y})`}><g ref={(e) => { sheep.current[i] = e; }}><ellipse rx="11" ry="7" fill="#f7f4ec" /><circle cx="10" cy="-3" r="4" fill="#3a3a3a" /><rect x="-7" y="5" width="2" height="5" fill="#3a3a3a" /><rect x="5" y="5" width="2" height="5" fill="#3a3a3a" /></g></g>))}

    {WINTER && <rect x="-2000" y="-1000" width="4800" height="3100" fill="#ffffff" opacity=".28" style="pointer-events:none" />}
  </g>);
  return (<g class="surroundings-top" aria-hidden="true">
    {XMAS && (<g class="xmas">
      <Pine x={380} y={640} s={2.2} />
      {[-30, -10, 10, 30].map((d) => <circle cx={380 + d * 0.6} cy={630 + Math.abs(d) * 0.5} r="2.5" fill={d % 20 ? '#ffd166' : '#e63946'} />)}
      <path d="M 380 588 l 4 8 l 9 1 l -7 6 l 2 9 l -8 -5 l -8 5 l 2 -9 l -7 -6 l 9 -1 Z" fill="#ffd166" />
      {[260, 300, 460, 500].map((x) => <g transform={`translate(${x} 700)`}><rect x="-16" y="-8" width="32" height="20" fill="#8b5a2b" /><path d="M -20 -8 L 0 -22 L 20 -8 Z" fill="#e63946" />{[-12, -4, 4, 12].map((dx) => <circle cx={dx} cy="-9" r="1.6" fill="#ffd166" />)}</g>)}
    </g>)}

    {/* sky life */}
    {[0, 1, 2].map((i) => <g ref={(e) => { clouds.current[i] = e; }} opacity=".85"><ellipse cx="0" cy="0" rx="46" ry="16" fill="#fff" /><ellipse cx="-24" cy="4" rx="26" ry="12" fill="#fff" /><ellipse cx="26" cy="5" rx="30" ry="12" fill="#fff" /></g>)}
    <g ref={birds}>{[0, 1, 2, 3].map((i) => <path transform={`translate(${i * 18} ${(i % 2) * 8})`} d="M -6 0 Q -3 -4 0 0 Q 3 -4 6 0" stroke="#3a3f5c" stroke-width="1.6" fill="none" />)}</g>
    <g ref={balloon}><path d="M 0 -34 C 22 -34 24 -6 6 8 L -6 8 C -24 -6 -22 -34 0 -34 Z" fill="#ffb84d" /><path d="M 0 -34 C 8 -34 9 -6 2 8 L -2 8 C -9 -6 -8 -34 0 -34 Z" fill="#e63946" /><rect x="-5" y="12" width="10" height="7" rx="1.5" fill="#8b5a2b" /><line x1="-5" y1="8" x2="-4" y2="12" stroke="#5a3a20" /><line x1="5" y1="8" x2="4" y2="12" stroke="#5a3a20" /></g>
    <g transform="translate(700 64)"><text class="lm-river" style="font-size:11px;letter-spacing:1px" x="0" y="0">v{VERSION}</text></g>

    {WEATHER !== 'clear' && <g ref={drops} style="pointer-events:none">{Array.from({ length: 70 }, () => WEATHER === 'snow'
      ? <circle r="2.4" fill="#fff" opacity=".9" /> : <line x1="0" y1="0" x2="-2" y2="12" stroke="#b9c8ff" stroke-width="1.4" opacity=".7" />)}</g>}
    {NYE && <g ref={fireworks}>{Array.from({ length: 5 }, (_, i) => <g>{Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <line x1="0" y1="0" x2={Math.cos(a) * 30} y2={Math.sin(a) * 30} stroke={['#ffd166', '#e63946', '#4aa3ff', '#3cb98a', '#ff8ec7'][i]} stroke-width="2.4" stroke-linecap="round" />; })}</g>)}</g>}
  </g>);
}
