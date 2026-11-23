// Translate all guides (en -> 7 languages) via the local translator; resumable; stops on quota errors.
import fs from 'node:fs';
const LANGS = { ar: 'Arabic (Modern Standard Arabic)', tr: 'Turkish', uk: 'Ukrainian', ru: 'Russian', fa: 'Dari (Afghan Persian – use Afghan vocabulary)', ur: 'Urdu', hi: 'Hindi' };
const guides = JSON.parse(fs.readFileSync('../src/guides.json', 'utf8'));
const dir = '../content/translations'; fs.mkdirSync(dir, { recursive: true });
const only = process.argv[2]?.split(',');
let done = 0, failed = 0, retries = 0;
for (const [lang, name] of Object.entries(LANGS)) {
  if (only && !only.includes(lang)) continue;
  const file = `${dir}/${lang}.json`; const out = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  for (const [id, g] of Object.entries(guides)) {
    if (out[id]) continue;
    const src = g.en; let ok = null;
    for (let attempt = 0; attempt < 2 && !ok; attempt++) {
      let j;
      try { const r = await fetch('http://127.0.0.1:8799', { method: 'POST', body: JSON.stringify({ lang: name, json: JSON.stringify(src) }) }); j = JSON.parse(await r.text()); }
      catch (e) { console.log('retry', lang, id, String(e).slice(0, 80)); await new Promise(r => setTimeout(r, 5000)); attempt--; if (++retries > 20) process.exit(3); continue; }
      if (j.error) { console.log('ERROR', lang, id, j.error.slice(0, 200)); if (/quota|limit|neuron|429|exceed/i.test(j.error)) { console.log('QUOTA – stopping'); process.exit(2); } continue; }
      try {
        const m = j.text.match(/\{[\s\S]*\}/); const t = JSON.parse(m[0]);
        if (t.steps?.length === src.steps.length && t.docs?.length === src.docs.length && typeof t.cost === 'string' && typeof t.tip === 'string') ok = t;
      } catch {}
    }
    if (ok) { out[id] = ok; done++; fs.writeFileSync(file, JSON.stringify(out, null, 1)); }
    else { failed++; console.log('FAILED', lang, id); }
  }
  console.log(lang, Object.keys(out).length, '/', Object.keys(guides).length);
}
console.log('done', done, 'failed', failed);
