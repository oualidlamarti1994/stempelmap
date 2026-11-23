/** City map content. Titles: de/en/ar now; other languages fall back to en until translated. */
export type Lang = 'de' | 'en' | 'ar' | 'tr' | 'uk' | 'ru' | 'fa' | 'ur' | 'hi';
export type T = Partial<Record<Lang, string>> & { de: string; en: string };

export interface Errand { id: string; t: T; link?: string }
export interface Building { id: string; icon: string; color: string; x: number; y: number; s: T; t: T; errands: Errand[] }

const e = (id: string, de: string, en: string, ar: string, link?: string): Errand => ({ id, t: { de, en, ar }, link });

export const BUILDINGS: Building[] = [
  { id: 'townhall', icon: '🏛️', color: '#5b6cff', x: 320, y: 360, s: { de: 'Bürgeramt', en: 'Town hall', ar: 'البلدية' }, t: { de: 'Bürgeramt', en: 'Town hall', ar: 'دائرة المواطنين' }, errands: [
    e('anmeldung', 'Wohnung anmelden', 'Register your address', 'تسجيل السكن'),
    e('ummeldung', 'Umzug ummelden', 'Change your address', 'تغيير عنوان السكن'),
    e('abmeldung', 'Abmelden (Wegzug ins Ausland)', 'Deregister (moving abroad)', 'إلغاء التسجيل عند السفر'),
    e('meldebescheinigung', 'Meldebescheinigung', 'Registration certificate', 'شهادة التسجيل'),
    e('ausweis', 'Personalausweis / Reisepass', 'ID card / passport', 'بطاقة الهوية / جواز السفر'),
    e('fuehrungszeugnis', 'Führungszeugnis', 'Certificate of good conduct', 'شهادة حسن السيرة والسلوك', 'https://www.fuehrungszeugnis.bund.de'),
  ] },
  { id: 'registry', icon: '💍', color: '#ff8ec7', x: 455, y: 228, s: { de: 'Standesamt', en: 'Registry', ar: 'الأحوال المدنية' }, t: { de: 'Standesamt', en: 'Registry office', ar: 'مكتب الأحوال المدنية' }, errands: [
    e('geburt', 'Geburt anmelden / Geburtsurkunde', 'Register a birth / birth certificate', 'تسجيل المولود / شهادة الميلاد'),
    e('heirat', 'Heiraten in Deutschland', 'Getting married in Germany', 'الزواج في ألمانيا'),
    e('namensaenderung', 'Namensänderung', 'Change of name', 'تغيير الاسم'),
  ] },
  { id: 'immigration', icon: '🛂', color: '#ff6b6b', x: 320, y: 228, s: { de: 'Ausländerbehörde', en: 'Immigration', ar: 'دائرة الأجانب' }, t: { de: 'Ausländerbehörde', en: 'Immigration office', ar: 'دائرة الأجانب' }, errands: [
    e('aufenthalt', 'Aufenthaltstitel beantragen', 'Apply for a residence permit', 'طلب الإقامة', 'https://www.bamf.de'),
    e('verlaengerung', 'Aufenthalt verlängern', 'Extend your residence permit', 'تمديد الإقامة'),
    e('bluecard', 'Blaue Karte EU', 'EU Blue Card', 'البطاقة الزرقاء', 'https://www.make-it-in-germany.com'),
    e('familie', 'Familiennachzug', 'Family reunification', 'لم شمل العائلة'),
    e('niederlassung', 'Niederlassungserlaubnis', 'Permanent residence', 'الإقامة الدائمة'),
    e('einbuergerung', 'Einbürgerung (deutscher Pass)', 'Citizenship (German passport)', 'التجنيس (الجنسية الألمانية)'),
  ] },
  { id: 'home', icon: '🏠', color: '#f5a623', x: 120, y: 528, s: { de: 'Wohnung', en: 'Home', ar: 'السكن' }, t: { de: 'Wohnhaus', en: 'Apartment', ar: 'السكن' }, errands: [
    e('wohnungssuche', 'Wohnung finden', 'Finding a flat', 'البحث عن شقة'),
    e('mietvertrag', 'Mietvertrag verstehen', 'Understanding a rental contract', 'فهم عقد الإيجار'),
    e('kaution', 'Kaution', 'Rental deposit', 'التأمين (الكفالة)'),
    e('wohnungsgeber', 'Wohnungsgeberbestätigung', 'Landlord confirmation', 'تأكيد المؤجر'),
    e('strom', 'Strom & Gas anmelden', 'Set up electricity & gas', 'تسجيل الكهرباء والغاز'),
    e('internet', 'Internet anschließen', 'Get internet', 'الاشتراك بالإنترنت'),
    e('rundfunk', 'Rundfunkbeitrag (GEZ)', 'Broadcasting fee (GEZ)', 'رسوم البث (GEZ)', 'https://www.rundfunkbeitrag.de'),
    e('nachsenden', 'Nachsendeauftrag', 'Mail forwarding', 'تحويل البريد'),
  ] },
  { id: 'car', icon: '🚗', color: '#2f9d9b', x: 660, y: 510, s: { de: 'Kfz-Stelle', en: 'Car office', ar: 'السيارات' }, t: { de: 'Kfz-Zulassungsstelle', en: 'Car registration office', ar: 'مكتب تسجيل السيارات' }, errands: [
    e('fuehrerschein', 'Führerschein umschreiben', 'Convert your driving licence', 'تحويل رخصة القيادة'),
    e('auto_anmelden', 'Auto anmelden', 'Register a car', 'تسجيل سيارة'),
    e('auto_abmelden', 'Auto abmelden', 'Deregister a car', 'إلغاء تسجيل سيارة'),
    e('kfz_versicherung', 'Kfz-Versicherung', 'Car insurance', 'تأمين السيارة'),
    e('tuev', 'TÜV / Hauptuntersuchung', 'TÜV inspection', 'الفحص الدوري TÜV'),
    e('kfz_steuer', 'Kfz-Steuer', 'Car tax', 'ضريبة السيارة'),
  ] },
  { id: 'bank', icon: '🏦', color: '#3cb98a', x: 455, y: 360, s: { de: 'Bank', en: 'Bank', ar: 'البنك' }, t: { de: 'Bank', en: 'Bank', ar: 'البنك' }, errands: [
    e('konto', 'Girokonto eröffnen', 'Open a bank account', 'فتح حساب بنكي'),
    e('schufa', 'SCHUFA verstehen', 'Understanding SCHUFA', 'فهم شوفا (SCHUFA)'),
    e('ueberweisung', 'Überweisungen & Lastschrift', 'Transfers & direct debit', 'التحويلات والخصم المباشر'),
  ] },
  { id: 'doctor', icon: '🏥', color: '#e94b6a', x: 660, y: 700, s: { de: 'Arzt', en: 'Doctor', ar: 'الطبيب' }, t: { de: 'Arzt & Krankenhaus', en: 'Doctor & hospital', ar: 'الطبيب والمستشفى' }, errands: [
    e('krankenversicherung', 'Krankenversicherung', 'Health insurance', 'التأمين الصحي'),
    e('hausarzt', 'Hausarzt finden', 'Find a GP', 'إيجاد طبيب عام'),
    e('termin116', 'Arzttermin über 116 117', 'Doctor appointment via 116 117', 'موعد طبي عبر 116117', 'https://www.116117.de'),
    e('krankmeldung', 'Krankmeldung', 'Sick note', 'الإجازة المرضية'),
    e('apotheke', 'Apotheke & Rezept', 'Pharmacy & prescription', 'الصيدلية والوصفة'),
    e('notfall', 'Notfall: 112', 'Emergency: 112', 'الطوارئ: 112'),
  ] },
  { id: 'tax', icon: '💶', color: '#8f9bff', x: 120, y: 370, s: { de: 'Finanzamt', en: 'Tax office', ar: 'الضرائب' }, t: { de: 'Finanzamt', en: 'Tax office', ar: 'مكتب الضرائب' }, errands: [
    e('steuerid', 'Steuer-ID', 'Tax ID', 'الرقم الضريبي'),
    e('steuerklasse', 'Steuerklasse', 'Tax class', 'الفئة الضريبية'),
    e('steuererklaerung', 'Steuererklärung (ELSTER)', 'Tax return (ELSTER)', 'الإقرار الضريبي (ELSTER)', 'https://www.elster.de'),
  ] },
  { id: 'jobcenter', icon: '💼', color: '#a26bff', x: 120, y: 720, s: { de: 'Jobcenter', en: 'Job centre', ar: 'مركز العمل' }, t: { de: 'Jobcenter & Arbeitsagentur', en: 'Job centre', ar: 'مركز العمل' }, errands: [
    e('arbeitslosengeld', 'Arbeitslosengeld', 'Unemployment benefit', 'إعانة البطالة', 'https://www.arbeitsagentur.de'),
    e('buergergeld', 'Bürgergeld', 'Citizen\'s income (Bürgergeld)', 'إعانة المواطن (Bürgergeld)'),
    e('jobsuche', 'Arbeit finden', 'Finding a job', 'البحث عن عمل'),
    e('anerkennung', 'Abschluss anerkennen lassen', 'Recognition of your degree', 'معادلة الشهادة', 'https://www.anerkennung-in-deutschland.de'),
    e('arbeitsvertrag', 'Arbeitsvertrag verstehen', 'Understanding a work contract', 'فهم عقد العمل'),
    e('minijob', 'Minijob', 'Mini-job', 'العمل المصغر (Minijob)'),
  ] },
  { id: 'family', icon: '👨‍👩‍👧', color: '#ffb84d', x: 320, y: 510, s: { de: 'Familienkasse', en: 'Family', ar: 'الأسرة' }, t: { de: 'Familienkasse', en: 'Family office', ar: 'صندوق الأسرة' }, errands: [
    e('kindergeld', 'Kindergeld', 'Child benefit', 'إعانة الأطفال (Kindergeld)', 'https://www.arbeitsagentur.de/familie-und-kinder'),
    e('elterngeld', 'Elterngeld', 'Parental allowance', 'إعانة الوالدين (Elterngeld)'),
    e('kita', 'Kita-Platz finden', 'Find a nursery place', 'إيجاد مكان في الحضانة'),
    e('schule', 'Kind in der Schule anmelden', 'Register a child at school', 'تسجيل الطفل في المدرسة'),
    e('wohngeld', 'Wohngeld', 'Housing benefit', 'إعانة السكن (Wohngeld)'),
  ] },
  { id: 'school', icon: '🎓', color: '#4aa3ff', x: 320, y: 690, s: { de: 'Sprachschule', en: 'School', ar: 'المدرسة' }, t: { de: 'Sprachschule & Uni', en: 'Language school & university', ar: 'مدرسة اللغة والجامعة' }, errands: [
    e('integrationskurs', 'Integrationskurs', 'Integration course', 'دورة الاندماج', 'https://www.bamf.de'),
    e('deutschkurs', 'Deutschkurs finden', 'Find a German course', 'إيجاد دورة لغة ألمانية'),
    e('studium', 'Studieren in Deutschland', 'Studying in Germany', 'الدراسة في ألمانيا'),
    e('bafoeg', 'BAföG', 'BAföG student finance', 'منحة BAföG', 'https://www.bafoeg.de'),
  ] },
  { id: 'insurance', icon: '🛡️', color: '#6b7090', x: 660, y: 360, s: { de: 'Versicherung', en: 'Insurance', ar: 'التأمين' }, t: { de: 'Versicherungen', en: 'Insurance', ar: 'التأمينات' }, errands: [
    e('haftpflicht', 'Haftpflichtversicherung', 'Personal liability insurance', 'تأمين المسؤولية الشخصية'),
    e('hausrat', 'Hausratversicherung', 'Household contents insurance', 'تأمين محتويات المنزل'),
    e('rechtsschutz', 'Rechtsschutzversicherung', 'Legal expenses insurance', 'تأمين الحماية القانونية'),
  ] },
  { id: 'phone', icon: '📱', color: '#00b3c7', x: 660, y: 228, s: { de: 'Handyladen', en: 'Phone shop', ar: 'الهواتف' }, t: { de: 'Handyladen', en: 'Phone shop', ar: 'محل الهواتف' }, errands: [
    e('sim', 'SIM-Karte (nur mit Ausweis)', 'SIM card (ID needed)', 'شريحة الهاتف (بالهوية فقط)'),
    e('handyvertrag', 'Handyvertrag', 'Phone contract', 'عقد الهاتف'),
  ] },
  { id: 'station', icon: '🚆', color: '#ff7a45', x: 660, y: 945, s: { de: 'Bahnhof', en: 'Station', ar: 'المحطة' }, t: { de: 'Bahnhof', en: 'Train station', ar: 'محطة القطار' }, errands: [
    e('deutschlandticket', 'Deutschlandticket', 'Deutschlandticket', 'تذكرة ألمانيا (Deutschlandticket)'),
    e('oepnv', 'Bus & Bahn nutzen', 'Using buses & trains', 'استخدام الحافلات والقطارات'),
  ] },
  { id: 'advice', icon: '⚖️', color: '#3c6e71', x: 320, y: 935, s: { de: 'Beratung', en: 'Advice', ar: 'الاستشارات' }, t: { de: 'Beratungsstelle', en: 'Advice centre', ar: 'مركز الاستشارات' }, errands: [
    e('mbe', 'Kostenlose Migrationsberatung', 'Free migration advice', 'استشارة الهجرة المجانية'),
    e('verbraucher', 'Verbraucherzentrale', 'Consumer advice centre', 'مركز حماية المستهلك'),
    e('mieterverein', 'Mieterverein', 'Tenants\' association', 'جمعية المستأجرين'),
  ] },
  { id: 'police', icon: '🚓', color: '#2b4fd8', x: 120, y: 235, s: { de: 'Polizei', en: 'Police', ar: 'الشرطة' }, t: { de: 'Polizei & Feuerwehr', en: 'Police & fire service', ar: 'الشرطة والإطفاء' }, errands: [
    e('notrufe', 'Notrufnummern 110 / 112', 'Emergency numbers 110 / 112', 'أرقام الطوارئ 110 / 112'),
    e('anzeige', 'Anzeige erstatten', 'Report a crime', 'تقديم بلاغ'),
  ] },
  { id: 'market', icon: '🛒', color: '#7cc142', x: 455, y: 510, s: { de: 'Supermarkt', en: 'Supermarket', ar: 'السوبرماركت' }, t: { de: 'Supermarkt & Alltag', en: 'Supermarket & daily life', ar: 'السوبرماركت والحياة اليومية' }, errands: [
    e('pfand', 'Pfand auf Flaschen', 'Bottle deposit (Pfand)', 'استرداد قيمة الزجاجات (Pfand)'),
    e('sonntag', 'Sonntags geschlossen', 'Shops closed on Sundays', 'إغلاق المحلات يوم الأحد'),
    e('muell', 'Müll trennen', 'Sorting rubbish', 'فرز النفايات'),
  ] },
];

export const LANGS: { id: Lang; name: string; rtl?: boolean }[] = [
  { id: 'de', name: 'Deutsch' }, { id: 'en', name: 'English' }, { id: 'ar', name: 'العربية', rtl: true },
  { id: 'tr', name: 'Türkçe' }, { id: 'uk', name: 'Українська' }, { id: 'ru', name: 'Русский' },
  { id: 'fa', name: 'دری', rtl: true }, { id: 'ur', name: 'اردو', rtl: true }, { id: 'hi', name: 'हिन्दी' },
];

export const UI: Record<string, T> = {
  title: { de: 'Ankommen in Deutschland', en: 'Arriving in Germany', ar: 'الوصول إلى ألمانيا' },
  sub: { de: 'Tippe auf ein Gebäude – wir zeigen dir den Weg.', en: 'Tap a building – we show you the way.', ar: 'اضغط على مبنى – وسنرشدك إلى الطريق.' },
  search: { de: 'Was brauchst du? z. B. Auto anmelden', en: 'What do you need? e.g. register a car', ar: 'ماذا تحتاج؟ مثلاً تسجيل سيارة' },
  official: { de: 'Offizielle Seite', en: 'Official site', ar: 'الموقع الرسمي' },
  soon: { de: 'Schritt-für-Schritt-Anleitung kommt bald.', en: 'Step-by-step guide coming soon.', ar: 'الدليل خطوة بخطوة قريباً.' },
  notAuthority: { de: 'Wir sind keine Behörde. Wir zeigen dir den offiziellen, meist kostenlosen Weg.', en: 'We are not an authority. We show you the official, usually free route.', ar: 'نحن لسنا جهة حكومية. نرشدك إلى الطريق الرسمي والمجاني غالباً.' },
  back: { de: 'Zurück zur Karte', en: 'Back to map', ar: 'العودة إلى الخريطة' },
  errands: { de: 'Erledigungen', en: 'Errands', ar: 'المعاملات' },
  hint: { de: 'Ziehen zum Bewegen · Mausrad zum Zoomen', en: 'Drag to move · scroll to zoom', ar: 'اسحب للتحريك · استخدم العجلة للتكبير' },
  machine: { de: '', en: 'Translation coming soon – showing English.', ar: '' },
};

export const tr = (t: T, l: Lang) => t[l] ?? t.en;
