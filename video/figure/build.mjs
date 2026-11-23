// Fig 1 – "The StempelMap press": an official letter rides in on a carriage, the language dial picks one of
// 11 languages, the press stamps it, and a step card leaves for the out-tray. Built with the anatomy kit.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "file:///C:/Users/ouali/.claude/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "file:///C:/Users/ouali/.claude/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";
const W = 760, H = 470;

// ---- world (units ≈ px of a desk machine; x right, y back, z up) ----
const PLATE = { x: -150, y: -66, w: 300, d: 132, r: 9 };
const PH = 12, FH = 5;
const RAIL_Y = [-15, 14], RAIL_X = [-132, 132];
const CAR = { x: -24, y: -21, w: 48, d: 42, r: 3 };     // carriage plan at x = 0
const CAR_Z = 3, CAR_TOP = 8;
const CARD = { x: -19, y: -16, w: 38, d: 32, r: 1.2 }; // the letter / step card
const CARD_TOP = CAR_TOP + 1.2;
const STOPS = { in: -100, press: 0, out: 100 };
const POSTS = [[-6, -44], [-6, 44]];
const BEAM_Z = 112, HEAD_R = 13, HEAD_REST = 46, HEAD_H = 7;
const DIAL = [92, -40], DIAL_R = 17, PED = { x: 74, y: -58, w: 36, d: 36, r: 4 }, PED_H = 34, DIAL_TOP = PED_H + 6;
const LANGS = 11;
const TRAY_IN = { x: -144, y: -62, w: 54, d: 40, r: 3 }, TRAY_OUT = { x: 86, y: 26, w: 52, d: 36, r: 3 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PH - FH, 0), [POSTS[0][0], POSTS[0][1], BEAM_Z + 10], [POSTS[1][0], POSTS[1][1], BEAM_Z + 10], [DIAL[0], DIAL[1], DIAL_TOP + 4]],
  W, H, { pad: 34, azimuth: 40 },
);
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (pts, style) => k.dotsSvg(pts, style);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PH - FH, PH, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 24))) {
    out.push(S(k.cylinder(x, y, 7.5, -PH - FH, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.8, -PH - FH + 1.6, FH - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PH, PH, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.3, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // ruler strip along the front edge
  const strip = { x: -120, y: PLATE.y + 7, w: 240, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const t = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.8], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  // label plate with three rule lines + engraved name
  const lab = { x: -60, y: PLATE.y + PLATE.d - 20, w: 64, d: 13, r: 1.5 };
  out.push(S(k.slabOf(lab, 0, 0.8, P, 3, 0.3), { tone: "lo" }));
  out.push(k.faceTextSvg(k.topMatrix([lab.x + 4, lab.y + 8.6], 0.8, P, "x"), "STEMPELMAP", { size: 4.2, tone: "mid" }));
  out.push(L([4, 2.4].map((dy) => k.lineOnTop([lab.x + 4, lab.y + dy], [lab.x + lab.w - 4, lab.y + dy], 0.8, P)).join(""), { tone: "faint", free: true }));
  out.push(D([at([lab.x + 1.8, lab.y + 6.5, 0.8]), at([lab.x + lab.w - 1.8, lab.y + 6.5, 0.8])], { size: 0.45 }));
  return out.join("");
}

function rails() {
  const out = [];
  for (const y of RAIL_Y) {
    out.push(S(k.slabOf({ x: RAIL_X[0], y, w: RAIL_X[1] - RAIL_X[0], d: 5, r: 1 }, 0, 3, P, 3, 0.4), { tone: "mid" }));
    out.push(D([RAIL_X[0] + 6, -40, 40, RAIL_X[1] - 6].map((x) => at([x, y + 2.5, 3])), { size: 0.4 }));
  }
  for (const x of [RAIL_X[0] - 5, RAIL_X[1]]) {
    out.push(S(k.slabOf({ x, y: -19, w: 5, d: 43, r: 1.2 }, 0, 7, P, 3, 0.5), { tone: "mid" }));
    out.push(D([at([x + 2.5, -14, 7]), at([x + 2.5, 19, 7])], { size: 0.45 }));
  }
  return out.join("");
}

function tray(plan, h) {
  const out = [S(k.slabOf(plan, 0, 1.6, P, 4, 0.4), { tone: "lo" })];
  const wall = 2;
  const back = { x: plan.x, y: plan.y + plan.d - wall, w: plan.w, d: wall, r: 0.6 };
  const side = { x: plan.x, y: plan.y, w: wall, d: plan.d, r: 0.6 };
  out.push(S(k.slabOf(back, 1.6, h, P, 2), { tone: "mid" }), S(k.slabOf(side, 1.6, h, P, 2), { tone: "mid" }));
  return out.join("");
}

function stack(plan, n, z0, stamped) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const c = { ...plan, x: plan.x + i * 0.8, y: plan.y - i * 0.6 };
    const z = z0 + i * 1.3;
    out.push(S(k.slabOf(c, z, 1.1, P, 3), { tone: "hi", crease: "none" }));
    if (i === n - 1) {
      out.push(L([0.25, 0.4, 0.55, 0.7].map((f) => k.lineOnTop([c.x + 4, c.y + c.d * f], [c.x + c.w * 0.62, c.y + c.d * f], z + 1.1, P)).join(""), { tone: "lo", free: true }));
      if (stamped) out.push(`<path class="iso-line stamp-ink" d="${k.ring(c.x + c.w - 9, c.y + c.d * 0.36, 5.5, z + 1.1, P, 28)}"/>`);
    }
  }
  return out.join("");
}

const NEAR = k.depthOf([POSTS[0][0], POSTS[0][1], 0], P) > k.depthOf([POSTS[1][0], POSTS[1][1], 0], P) ? 0 : 1;
function frame(side) { // side = "back" | "front" post; "beam" = crossbar, bushing and lever
  const out = [];
  const [px, py] = side === "back" ? POSTS[1 - NEAR] : POSTS[NEAR];
  if (side !== "beam") {
  const foot = { x: px - 9, y: py - 9, w: 18, d: 18, r: 2.5 };
  out.push(S(k.slabOf(foot, 0, 5, P, 4, 0.6), { tone: "mid" }));
  out.push(D(k.corners(foot, 3).map(([x, y]) => at([x, y, 5])), { size: 0.45 }));
  out.push(S(k.cylinder(px, py, 4.2, 5, BEAM_Z - 5, P, 28), { tone: "mid", crease: "none" }));
  out.push(L([30, 60, 90].map((z) => k.sideArc(px, py, 4.2, z, P, 16)).join(""), { tone: "faint" }));
  }
  if (side === "beam") {
    const beam = { x: -14, y: -52, w: 16, d: 104, r: 3 };
    out.push(S(k.slabOf(beam, BEAM_Z, 10, P, 4, 0.8), { tone: "mid" }));
    out.push(L(k.planOutline(k.insetPlan(beam, 2.5), BEAM_Z + 10, P, 3), { tone: "faint" }));
    out.push(D([-44, -20, 20, 44].map((y) => at([-6, y, BEAM_Z + 10])), { size: 0.45 }));
    // guide bushing under the beam
    out.push(S(k.cylinder(0, 0, 6.5, BEAM_Z - 8, 8, P, 28, 0.5), { tone: "mid" }));
    // handle lever on top
    out.push(S(k.cylinder(0, 0, 4, BEAM_Z + 10, 4, P, 24), { tone: "mid" }));
    out.push(S(k.slabOf({ x: -2, y: -2, w: 46, d: 4, r: 1.8 }, BEAM_Z + 14, 3, P, 3), { tone: "mid" }));
    out.push(S(k.cylinder(46, 0, 4.5, BEAM_Z + 12, 9, P, 24), { tone: "mid" }));
    out.push(L(k.knurl(46, 0, 4.5, BEAM_Z + 12, BEAM_Z + 21, 24, P), { tone: "lo" }));
  }
  return out.join("");
}

// the moving plunger: built at rest (head bottom at z = HEAD_REST), moved with translateAlong
function plunger() {
  const out = [];
  out.push(S(k.cylinder(0, 0, 2.6, HEAD_REST + HEAD_H, BEAM_Z - 6 - HEAD_REST - HEAD_H, P, 20), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(0, 0, HEAD_R + 2, HEAD_REST + 3, HEAD_H - 3, P, 48, 0.6), { tone: "mid" }));
  out.push(L(k.knurl(0, 0, HEAD_R + 2, HEAD_REST + 3.6, HEAD_REST + HEAD_H - 0.6, 56, P), { tone: "lo" }));
  out.push(S(k.cylinder(0, 0, HEAD_R, HEAD_REST, 3, P, 48), { tone: "hi", lit: true }));
  return out.join("");
}

function inkPad() { // stamp pad beside the press: tin, felt and lid hinge
  const tin = { x: -74, y: 32, w: 26, d: 18, r: 2 };
  const out = [S(k.slabOf(tin, 0, 4, P, 4, 0.5), { tone: "mid" })];
  out.push(S(k.slabOf(k.insetPlan(tin, 2), 4, 0.6, P, 3), { tone: "lo", crease: "none", flat: true }));
  out.push(`<path class="stamp-pad" d="${k.slabOf(k.insetPlan(tin, 3), 4.6, 0.1, P, 3).fill}"/>`);
  out.push(D([at([tin.x + 3, tin.y + tin.d - 1, 4]), at([tin.x + tin.w - 3, tin.y + tin.d - 1, 4])], { size: 0.45 }));
  return out.join("");
}

function carriage() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(CAR, 3), CAR_Z, 0.1, P)}" style="filter:blur(4px)"/>`];
  out.push(S(k.slabOf(CAR, CAR_Z, CAR_TOP - CAR_Z, P, 5, 0.6), { tone: "mid" }));
  out.push(D([-18, -6, 6, 18].map((x) => at([x, CAR.y + CAR.d - 2.4, CAR_TOP])), { size: 0.4, tone: "lo" }));
  for (const y of RAIL_Y) out.push(L(k.lineOnTop([CAR.x, y + 2.5], [CAR.x + CAR.w, y + 2.5], CAR_TOP, P), { tone: "faint" }));
  out.push(S(k.slabOf(CARD, CAR_TOP, 1.2, P, 3), { tone: "hi", crease: "none" }));
  out.push(L([0.22, 0.36, 0.5, 0.64, 0.78].map((f) => k.lineOnTop([CARD.x + 4, CARD.y + CARD.d * f], [CARD.x + CARD.w * 0.58, CARD.y + CARD.d * f], CARD_TOP, P)).join(""), { tone: "lo", free: true }));
  out.push(`<path data-part="ink" class="iso-line stamp-ink" style="opacity:0" d="${k.ring(CARD.x + CARD.w - 9, CARD.y + CARD.d * 0.4, 6, CARD_TOP, P, 28)}"/>`);
  return out.join("");
}

function dial() {
  const out = [];
  const [x, y] = DIAL;
  out.push(S(k.slabOf(PED, 0, PED_H, P, 5, 1), { tone: "mid" }));
  out.push(L(k.sideSeam(PED, PED_H - 8, P), { tone: "faint" }));
  out.push(D(k.corners(PED, 4).map(([px, py]) => at([px, py, PED_H])), { size: 0.45 }));
  out.push(S(k.cylinder(x, y, DIAL_R, PED_H, 6, P, 64, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(x, y, DIAL_R, PED_H + 1, PED_H + 4.5, 80, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(x, y, DIAL_R - 2.2, DIAL_TOP, P, 64), { tone: "lo" }));
  const t = k.radialTicks(x, y, DIAL_R - 3, LANGS * 2, 2, DIAL_TOP, [1.3, 3], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  out.push(L(k.ring(x, y, 1.6, DIAL_TOP, P, 16), { tone: "mid" }));
  return out.join("");
}
const needleAt = (i) => {
  const a = (i / LANGS) * Math.PI * 2, [x, y] = DIAL;
  return k.lineOnTop([x - Math.sin(a) * 3, y + Math.cos(a) * 3], [x + Math.sin(a) * (DIAL_R - 4), y - Math.cos(a) * (DIAL_R - 4)], DIAL_TOP + 0.2, P);
};

const svg = k.figureSvg({
  width: W, height: H,
  label: "A desk stamping press. An official letter rides on a carriage from the in-tray to the press; a dial picks one of eleven languages; the press stamps the letter, which leaves as a step-by-step card for the out-tray.",
  body: [
    base(), rails(), tray(TRAY_IN, 9), stack({ x: TRAY_IN.x + 8, y: TRAY_IN.y + 4, w: 38, d: 30, r: 1.2 }, 4, 1.6, false),
    dial(), `<path data-part="needle" class="iso-line" data-tone="lit" data-free="start" d="${needleAt(0)}" style="stroke-width:1.2"/>`,
    frame("back"),
    `<g data-part="carriage" transform="${k.translateAlong(P, [STOPS.in, 0, 0])}">${carriage()}</g>`,
    inkPad(),
    `<g data-part="spring-back"></g>`,
    `<g data-part="plunger">${plunger()}</g>`,
    `<g data-part="spring-front"></g>`,
    frame("beam"),
    frame("front"),
    tray(TRAY_OUT, 7), stack({ x: TRAY_OUT.x + 7, y: TRAY_OUT.y + 3, w: 38, d: 28, r: 1.2 }, 3, 1.6, true),
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const STOPS = ${JSON.stringify(STOPS)}, LANGS = ${LANGS}, DIAL = ${JSON.stringify(DIAL)}, DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP};
const HEAD_REST = ${HEAD_REST}, HEAD_H = ${HEAD_H}, BEAM_Z = ${BEAM_Z}, CARD_TOP = ${CARD_TOP};
const NAMES = ["Deutsch · Wohnung anmelden","English · Register your address","العربية · تسجيل السكن","Türkçe · İkamet kaydı","Українська · Реєстрація","Русский · Регистрация","Polski · Zameldowanie","Română · Înregistrare","دری · ثبت محل سکونت","اردو · رہائش کا اندراج","हिन्दी · पते का पंजीकरण"];
const svg = document.querySelector(".iso-stage svg");
const q = (n) => svg.querySelector('[data-part="' + n + '"]');
const car = q("carriage"), plg = q("plunger"), ink = q("ink"), needle = q("needle"), sb = q("spring-back"), sf = q("spring-front");
const readout = document.querySelector("[data-readout]");
const needleAt = ${needleAt.toString().replace("k.lineOnTop", "lineOnTop")};
function vcoil(z0, z1, r, turns) {
  const n = Math.round(turns * 18), back = [], front = []; let run = [], near = null;
  for (let i = 0; i <= n; i++) {
    const s = i / n, a = s * turns * Math.PI * 2, p = [Math.cos(a) * r, Math.sin(a) * r, z0 + (z1 - z0) * s];
    const f = depthOf([Math.cos(a), Math.sin(a), 0], P) > 0, xy = iso(p, P);
    if (near === null) near = f;
    if (f !== near) { run.push(xy); (near ? front : back).push(pathOf(run)); run = [xy]; near = f; continue; }
    run.push(xy);
  }
  if (run.length > 1) (near ? front : back).push(pathOf(run));
  return { back: back.join(""), front: front.join("") };
}
const ease = (t) => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const CYCLE = 4.2; let t0 = 0, lang = 0, lastCycle = -1;
function pose(t) {
  const c = Math.floor(t / CYCLE), u = (t % CYCLE) / CYCLE;
  let x, dz = 0, inkOn = 0;
  if (u < 0.28) x = STOPS.in + (STOPS.press - STOPS.in) * ease(u / 0.28);
  else if (u < 0.62) { x = STOPS.press; const v = (u - 0.28) / 0.34; dz = -(HEAD_REST - CARD_TOP) * Math.sin(Math.PI * Math.min(1, v * 1.15)); inkOn = v > 0.45 ? 1 : 0; }
  else { x = STOPS.press + (STOPS.out - STOPS.press) * ease((u - 0.62) / 0.3); inkOn = 1; }
  return { c, x, dz: Math.min(0, dz), inkOn, u };
}
function draw(t) {
  const p = pose(t);
  if (p.c !== lastCycle) { lastCycle = p.c; lang = p.c % LANGS; }
  car.setAttribute("transform", translateAlong(P, [p.x, 0, 0]));
  plg.setAttribute("transform", translateAlong(P, [0, 0, p.dz]));
  ink.style.opacity = p.inkOn;
  const shown = p.u > 0.5 ? lang : (lang + LANGS - 1) % LANGS;
  needle.setAttribute("d", needleAt(shown));
  const spring = vcoil(HEAD_REST + HEAD_H + p.dz, BEAM_Z - 8, 6.4, 6);
  sb.innerHTML = '<path class="iso-line" data-tone="lo" d="' + spring.back + '"/>';
  sf.innerHTML = '<path class="iso-line" data-tone="mid" d="' + spring.front + '"/>';
  const text = NAMES[shown] + (p.inkOn ? " · ✓ gestempelt" : "");
  if (readout.textContent !== text) readout.textContent = text;
}
let manual = false;
function tick(now) { if (manual) return; if (!t0) t0 = now; draw(still ? CYCLE * 0.8 : (now - t0) / 1000); if (!still) requestAnimationFrame(tick); }
window.__setTime = (s) => { manual = true; draw(s); };
requestAnimationFrame(tick);
`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "StempelMap – die Stempelpresse",
  hint: "Brief rein · Sprache wählen · stempeln",
  readout: "Deutsch · Wohnung anmelden",
  keys: [
    { mark: "lit", label: "Stempelkopf: macht aus einem Amtsbrief eine Schritt-für-Schritt-Karte" },
    { mark: "raised", label: "Sprachwahl: 11 Sprachen auf einem Drehknopf" },
  ],
  caption: "Ein Amtsweg kommt links herein, der Drehknopf wählt eine von 11 Sprachen, die Presse stempelt – und rechts liegt eine Karte mit den Schritten, den Unterlagen und dem offiziellen Link.",
  body: `<div class="iso-stage" role="img" aria-label="StempelMap Stempelpresse">${svg}</div>`,
});
const css = `<style>.stamp-ink{stroke:#e63946;stroke-width:1.6;fill:none}.stamp-pad{fill:#7a1d25;opacity:.85}</style>`;
writeFileSync(join(HERE, theme === "light" ? "press-light.html" : "press.html"), k.pageHtml({ title: "StempelMap Presse", theme, body: css + body, script: kitScript() + live, width: 820 }));
console.log("wrote", theme === "light" ? "press-light.html" : "press.html");
