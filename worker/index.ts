/** Only job: /api/where returns the visitor's approximate state (+ city name) from Cloudflare's IP lookup.
 *  Nothing is stored or logged. Everything else is served from static assets. */
interface Env { ASSETS: { fetch: (r: Request) => Promise<Response> } }
const STATE: Record<string, string> = { SH: '01', HH: '02', NI: '03', HB: '04', NW: '05', HE: '06', RP: '07', BW: '08', BY: '09', SL: '10', BE: '11', BB: '12', MV: '13', SN: '14', ST: '15', TH: '16' };
export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === '/api/where') {
      const cf = (req as any).cf || {};
      const inDE = cf.country === 'DE';
      const body = { state: inDE ? STATE[cf.regionCode] ?? null : null, city: inDE ? cf.city ?? null : null };
      return new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
    }
    if (url.hostname === 'www.stempelmap.de') return Response.redirect('https://stempelmap.de' + url.pathname + url.search, 301);
    const res = await env.ASSETS.fetch(req);
    if (url.hostname !== 'stempelmap.de') { // keep the old workers.dev address out of search engines
      const r = new Response(res.body, res); r.headers.set('X-Robots-Tag', 'noindex, nofollow'); return r;
    }
    return res;
  },
};
