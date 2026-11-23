const puppeteer = require('../../calm_app/node_modules/puppeteer-core');
const OUT = __dirname + '/shots/';
const URL = 'https://paperclip.adhs-ruhe-report.workers.dev/';
const S = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  const p = await b.newPage();
  const setLang = async l => { await p.evaluate(l => { const s = document.querySelector('select'); s.value = l; s.dispatchEvent(new Event('change', { bubbles: true })); }, l); await S(400); };
  const clickText = async t => { await p.evaluate(t => [...document.querySelectorAll('button')].find(b => b.textContent.includes(t)).click(), t); await S(900); };
  const clickPin = async label => { await p.evaluate(l => [...document.querySelectorAll('.pin')].find(g => g.getAttribute('aria-label') === l).dispatchEvent(new MouseEvent('click', { bubbles: true })), label); await S(900); };
  // desktop 1920x1080
  await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  await p.goto(URL, { waitUntil: 'networkidle0' }); await S(1200);
  await setLang('de'); await p.screenshot({ path: OUT + '01-map-de.png' });
  await clickPin('Kfz-Zulassungsstelle'); await p.screenshot({ path: OUT + '02-car-list.png' });
  await clickText('Auto anmelden'); await p.screenshot({ path: OUT + '03-guide-de.png' });
  await p.evaluate(() => { const s = document.querySelector('.sheet'); s.scrollTop = 600; }); await S(300); await p.screenshot({ path: OUT + '04-guide-warning.png' });
  await setLang('ar'); await S(500); await p.screenshot({ path: OUT + '05-guide-ar.png' });
  await setLang('uk'); await S(500); await p.screenshot({ path: OUT + '06-guide-uk.png' });
  await p.goto(URL, { waitUntil: 'networkidle0' }); await S(1000); await setLang('tr');
  await p.type('.search input', 'ehliyet'); await S(600); await p.screenshot({ path: OUT + '07-search-tr.png' });
  await p.goto(URL, { waitUntil: 'networkidle0' }); await S(1000); await setLang('de');
  await clickText('♿'); await p.evaluate(() => { const c = document.querySelectorAll('.a11y-panel input'); c[0].click(); c[2].click(); }); await S(800);
  await p.screenshot({ path: OUT + '08-a11y.png' });
  await p.evaluate(() => { localStorage.clear(); }); 
  // phone 390x844 @3
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await p.goto(URL, { waitUntil: 'networkidle0' }); await S(1200); await setLang('hi'); await S(400);
  await p.screenshot({ path: OUT + '09-phone-hi.png' });
  await clickPin('डॉक्टर और अस्पताल'); await p.screenshot({ path: OUT + '10-phone-doctor.png' });
  await b.close(); console.log('ok');
})().catch(e => { console.error(e.message); process.exit(1); });
