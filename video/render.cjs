const puppeteer = require('../../calm_app/node_modules/puppeteer-core');
const { spawn } = require('child_process');
const FPS = 30, OUT = process.argv[2] || 'stempelmap_explainer.mp4', ONLY = process.argv[3]; // ONLY = "t1,t2" for preview stills
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  await p.goto('http://127.0.0.1:8765/stage.html'); await p.waitForFunction('window.ready === true', { timeout: 60000 });
  const total = await p.evaluate('S.total');
  if (ONLY) { for (const t of ONLY.split(',').map(Number)) { await p.evaluate(t => render(t), t); await new Promise(r => setTimeout(r, 120)); await p.screenshot({ path: `prev_${t}.png` }); } await b.close(); return; }
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-i', 'vo/voice.wav',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.ceil(total * FPS);
  for (let f = 0; f < N; f++) {
    await p.evaluate(t => render(t), f / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log('frame', f, '/', N);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', OUT);
})().catch(e => { console.error(e.message); process.exit(1); });
