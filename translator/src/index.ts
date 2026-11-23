// Local-only helper (wrangler dev): translates one guide JSON with Workers AI.
export interface Env { AI: { run(m: string, i: unknown): Promise<any> } }
const MODELS = ['@cf/google/gemma-4-26b-a4b-it', '@cf/mistralai/mistral-small-3.1-24b-instruct'];
export default {
  async fetch(req: Request, env: Env) {
    const { lang, json } = await req.json() as { lang: string; json: string };
    const system = `You are a professional translator for a public-information website that helps immigrants with German bureaucracy.
Translate all string values of the given JSON from English into ${lang}.
Rules: keep the JSON keys and structure exactly; arrays must keep the same number of items in the same order;
keep emojis, numbers, euro amounts, dates and URLs unchanged; keep German official words (e.g. Bürgeramt, Anmeldung, ELSTER, eVB, SCHUFA, Jobcenter, Grundsicherungsgeld) in Latin letters and, where helpful, add a short explanation in brackets;
use clear, simple, respectful language. Output ONLY the JSON, no comments, no code fences.`;
    for (const m of MODELS) {
      try {
        const out = await env.AI.run(m, { messages: [{ role: 'system', content: system }, { role: 'user', content: json }], max_tokens: 4000, temperature: 0.2, reasoning_effort: 'none', chat_template_kwargs: { enable_thinking: false } });
        const text: string = typeof out?.response === 'string' && out.response ? out.response
          : out?.choices?.[0]?.message?.content ?? (typeof out?.response === 'object' ? JSON.stringify(out.response) : '');
        if (!text) continue;
        return Response.json({ model: m, text });
      } catch (e: any) { if (m === MODELS[MODELS.length - 1]) return Response.json({ error: String(e?.message ?? e) }, { status: 502 }); }
    }
  },
};
