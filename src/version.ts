/** Release stamp – update on every release (fixed dates: 1 Jan, 1 Apr, 1 Jul, 1 Oct). */
export const VERSION = '1.0';
export const STAND = '2026-11-24';       // date all facts were last checked
export const NEXT_UPDATE = '2027-01-01'; // next scheduled content update
export const fmtDate = (iso: string, lang: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString(lang === 'fa' ? 'fa-AF' : lang, { day: 'numeric', month: 'long', year: 'numeric' });
