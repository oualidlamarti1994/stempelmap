from _g import G
BMG = "https://www.bundesgesundheitsministerium.de"; T116 = "https://www.116117.de"
G("krankenversicherung", [BMG],
 (["In Deutschland ist eine Krankenversicherung Pflicht.", "Angestellte: meist gesetzlich (z. B. AOK, TK, Barmer) – du wählst die Kasse selbst.",
   "Mitgliedschaft beantragen und dem Arbeitgeber die Bescheinigung geben.", "Gesundheitskarte mit Foto kommt per Post."],
  ["Pass", "Meldebescheinigung", "Arbeitsvertrag oder Studienbescheinigung", "Foto"], "Gesetzlich: ein Prozentsatz vom Lohn, Arbeitgeber zahlt etwa die Hälfte.",
  "Familienmitglieder ohne eigenes Einkommen sind in der gesetzlichen Kasse oft kostenlos mitversichert."),
 (["Health insurance is mandatory in Germany.", "Employees: usually public (e.g. AOK, TK, Barmer) – you choose the insurer yourself.",
   "Apply for membership and give the certificate to your employer.", "Your health card with photo arrives by post."],
  ["Passport", "Registration certificate", "Work contract or student certificate", "Photo"], "Public: a percentage of your salary, the employer pays about half.",
  "Family members without their own income are often insured for free with public insurance."))

G("hausarzt", [T116],
 (["Hausarzt in deiner Nähe suchen (Krankenkasse oder 116117.de helfen).", "Anrufen und fragen, ob neue Patienten aufgenommen werden.",
   "Gesundheitskarte mitbringen.", "Der Hausarzt überweist dich bei Bedarf zu Fachärzten."],
  ["Gesundheitskarte", "Medikamentenliste", "frühere Befunde"], "Mit gesetzlicher Versicherung kostenlos.", "Kein Termin zu bekommen? Die Terminservicestelle 116 117 hilft."),
 (["Find a GP near you (your insurer or 116117.de help).", "Call and ask whether they take new patients.",
   "Bring your health card.", "Your GP refers you to specialists if needed."],
  ["Health card", "List of medication", "Previous medical reports"], "Free with public insurance.", "Can't get an appointment? The 116 117 appointment service helps."))

G("termin116", [T116],
 (["116 117 anrufen oder die 116117-App / Website nutzen.", "Für Haus- und Facharzttermine (Termin-Service) und Bereitschaftsdienst nachts/am Wochenende.",
   "Bei Facharztterminen brauchst du oft eine Überweisung mit Code.", "Lebensgefahr? Dann immer 112."],
  ["Gesundheitskarte", "ggf. Überweisung mit Vermittlungscode"], "Kostenlos.", "116 117 ist für dringende, aber nicht lebensgefährliche Fälle."),
 (["Call 116 117 or use the 116117 app / website.", "For GP and specialist appointments and the on-call service at night/weekends.",
   "Specialist appointments often need a referral with a code.", "Life-threatening? Always call 112."],
  ["Health card", "Referral with code if needed"], "Free.", "116 117 is for urgent but not life-threatening cases."))

G("krankmeldung", [T116],
 (["Am ersten Krankheitstag morgens den Arbeitgeber informieren.", "Ab dem 4. Tag (oft früher – siehe Vertrag) brauchst du eine Bescheinigung vom Arzt.",
   "Der Arzt meldet sie elektronisch an die Krankenkasse; dein Arbeitgeber ruft sie ab (eAU).", "Lohn wird bis zu 6 Wochen weitergezahlt."],
  ["Gesundheitskarte"], "Kostenlos.", "Ohne rechtzeitige Meldung riskierst du eine Abmahnung."),
 (["Inform your employer on the morning of the first sick day.", "From day 4 (often earlier – see your contract) you need a doctor's certificate.",
   "The doctor sends it electronically to your insurer; your employer retrieves it (eAU).", "Your salary continues for up to 6 weeks."],
  ["Health card"], "Free.", "If you don't report in time, you risk a formal warning."))

G("apotheke", ["https://www.aponet.de"],
 (["Mit dem E-Rezept (Gesundheitskarte) oder Papierrezept in die Apotheke gehen.", "Zuzahlung pro Medikament zahlen.",
   "Nachts/am Wochenende: Notdienst-Apotheke suchen.", "Viele einfache Medikamente gibt es ohne Rezept – frag die Apotheke."],
  ["Gesundheitskarte / Rezept"], "Meist 5–10 € Zuzahlung pro Medikament, Kinder befreit.", "Apotheker beraten kostenlos – auch zu Wechselwirkungen."),
 (["Go to a pharmacy with your e-prescription (health card) or paper prescription.", "Pay the co-payment per medicine.",
   "At night/weekends: find an emergency pharmacy.", "Many simple medicines don't need a prescription – ask the pharmacy."],
  ["Health card / prescription"], "Usually 5–10 € co-payment per medicine, children exempt.", "Pharmacists advise for free – also about interactions."))

G("notfall", [T116],
 (["Lebensgefahr, schwerer Unfall, Feuer: 112 anrufen.", "Sagen: Wo? Was ist passiert? Wie viele Verletzte? Dann auf Fragen warten.",
   "Dringend, aber nicht lebensgefährlich: 116 117.", "Notaufnahme im Krankenhaus ist rund um die Uhr offen."],
  ["Gesundheitskarte (wenn möglich)"], "Notruf kostenlos.", "112 funktioniert in ganz Europa, auch ohne SIM-Karte."),
 (["Danger to life, serious accident, fire: call 112.", "Say: where? what happened? how many injured? Then wait for questions.",
   "Urgent but not life-threatening: 116 117.", "Hospital emergency rooms are open around the clock."],
  ["Health card (if possible)"], "Emergency calls are free.", "112 works across Europe, even without a SIM card."))

BZST = "https://www.bzst.de"; EL = "https://www.elster.de"
G("steuerid", [BZST],
 (["Kommt automatisch per Post ein paar Wochen nach der Anmeldung.", "Dein Arbeitgeber braucht sie für die Lohnabrechnung.",
   "Verloren? Auf bzst.de neu anfordern – sie kommt erneut per Post."],
  ["Meldeadresse"], "Kostenlos.", "Die Steuer-ID bleibt dein ganzes Leben gleich."),
 (["It arrives automatically by post a few weeks after registration.", "Your employer needs it for payroll.",
   "Lost it? Request it again on bzst.de – it comes by post."],
  ["Registered address"], "Free.", "Your tax ID stays the same for life."))

G("steuerklasse", [EL],
 (["Ledig: Klasse I. Alleinerziehend: II. Verheiratet: IV/IV oder III/V (Kombination wählbar).", "Nach der Heirat automatisch IV/IV.",
   "Wechsel über ELSTER beantragen.", "Die Klasse bestimmt nur den monatlichen Abzug – die Jahressteuer klärt die Steuererklärung."],
  ["Steuer-ID", "ELSTER-Zugang"], "Kostenlos.", "Bei III/V ist eine Steuererklärung Pflicht."),
 (["Single: class I. Single parent: II. Married: IV/IV or III/V (you can choose).", "After marriage automatically IV/IV.",
   "Apply for a change via ELSTER.", "The class only sets the monthly deduction – the yearly tax is settled by the tax return."],
  ["Tax ID", "ELSTER account"], "Free.", "With III/V a tax return is mandatory."))

G("steuererklaerung", [EL],
 (["ELSTER-Konto anlegen (Aktivierungscode kommt per Post).", "Belege sammeln: Lohnsteuerbescheinigung, Fahrtkosten, Arbeitsmittel, Spenden.",
   "Erklärung online ausfüllen – viele Daten sind schon vorausgefüllt.", "Absenden und auf den Bescheid warten."],
  ["Steuer-ID", "Lohnsteuerbescheinigung", "Belege", "IBAN"], "Kostenlos über ELSTER.",
  "Freiwillig rückwirkend für 4 Jahre möglich – viele bekommen Geld zurück. Pflicht-Abgabe meist bis 31. Juli des Folgejahres."),
 (["Create an ELSTER account (activation code comes by post).", "Collect receipts: payroll tax certificate, commuting costs, work equipment, donations.",
   "Fill in the return online – much data is pre-filled.", "Submit and wait for the tax notice."],
  ["Tax ID", "Payroll tax certificate", "Receipts", "IBAN"], "Free via ELSTER.",
  "Voluntary returns are possible for 4 years back – many people get money back. Mandatory returns are usually due by 31 July of the following year."))

BA = "https://www.arbeitsagentur.de"
G("arbeitslosengeld", [BA],
 (["Sobald du von der Kündigung weißt: innerhalb von 3 Tagen arbeitssuchend melden (spätestens 3 Monate vor Ende).",
   "Am ersten Tag ohne Job arbeitslos melden (online oder vor Ort).", "Antrag auf Arbeitslosengeld stellen.", "Termine bei der Agentur wahrnehmen."],
  ["Pass/Aufenthaltstitel", "Kündigung", "Arbeitsbescheinigung", "IBAN"], "Kostenlos. Du bekommst ca. 60 % (mit Kind 67 %) deines Nettolohns.",
  "Wer sich zu spät meldet, bekommt eine Sperrzeit."),
 (["As soon as you know about the dismissal: register as job-seeking within 3 days (at the latest 3 months before the end).",
   "On your first day without a job register as unemployed (online or in person).", "Apply for unemployment benefit.", "Attend the agency appointments."],
  ["Passport / residence permit", "Notice of dismissal", "Employment certificate", "IBAN"], "Free. You get about 60 % (67 % with a child) of your net salary.",
  "Registering late leads to a blocking period."))

G("buergergeld", [BA],
 (["Für Menschen ohne ausreichendes Einkommen (auch ergänzend zum Lohn).", "Antrag beim Jobcenter stellen (online oder vor Ort).",
   "Einkommen, Vermögen und Wohnkosten nachweisen.", "Regelmäßig mit dem Jobcenter zusammenarbeiten."],
  ["Pass/Aufenthaltstitel", "Mietvertrag", "Kontoauszüge", "Einkommensnachweise"], "Kostenlos.",
  "Die Grundsicherung wird gerade reformiert – Namen und Regeln können sich ändern. Aktuelles auf arbeitsagentur.de. Der Anspruch hängt auch vom Aufenthaltstitel ab."),
 (["For people without enough income (also as a top-up to wages).", "Apply at the job centre (online or in person).",
   "Prove income, savings and housing costs.", "Work with the job centre regularly."],
  ["Passport / residence permit", "Rental contract", "Bank statements", "Proof of income"], "Free.",
  "Basic income support is being reformed – names and rules may change. Current info on arbeitsagentur.de. Eligibility also depends on your residence permit."))

G("jobsuche", [BA, "https://www.make-it-in-germany.com"],
 (["Jobbörse der Arbeitsagentur und große Jobportale nutzen.", "Lebenslauf im deutschen Format (tabellarisch, mit Foto optional).",
   "Anschreiben kurz und konkret.", "Prüfen, ob dein Aufenthaltstitel die Arbeit erlaubt."],
  ["Lebenslauf", "Zeugnisse (übersetzt)", "Anerkennung des Abschlusses"], "Kostenlos.", "Die Arbeitsagentur berät kostenlos zur Jobsuche."),
 (["Use the employment agency's job portal and big job sites.", "CV in German format (table style, photo optional).",
   "Keep the cover letter short and specific.", "Check that your residence permit allows the job."],
  ["CV", "Certificates (translated)", "Degree recognition"], "Free.", "The employment agency gives free job-search advice."))

G("anerkennung", ["https://www.anerkennung-in-deutschland.de"],
 (["Auf anerkennung-in-deutschland.de prüfen, welche Stelle zuständig ist.", "Für reglementierte Berufe (Arzt, Pflege, Lehrer) ist die Anerkennung Pflicht.",
   "Antrag mit Zeugnissen und Übersetzungen stellen.", "Hochschulabschlüsse: Zeugnisbewertung bei der ZAB."],
  ["Zeugnisse + beglaubigte Übersetzungen", "Lebenslauf", "Pass"], "Meist ca. 100–600 €, je nach Beruf. Förderung möglich.",
  "Die Hotline „Arbeiten und Leben in Deutschland“ und IQ-Beratungsstellen helfen kostenlos."),
 (["Check on anerkennung-in-deutschland.de which office is responsible.", "For regulated professions (doctor, nursing, teacher) recognition is mandatory.",
   "Apply with certificates and translations.", "University degrees: statement of comparability from the ZAB."],
  ["Certificates + certified translations", "CV", "Passport"], "Usually about 100–600 €, depending on the profession. Funding possible.",
  "The \"Working and Living in Germany\" hotline and IQ advice centres help for free."))

G("arbeitsvertrag", ["https://www.bmas.de"],
 (["Prüfen: Lohn, Arbeitszeit, Urlaub, Probezeit, Kündigungsfrist.", "Mindestlohn gilt (2026: 13,90 € pro Stunde).",
   "Mindestens 20 Urlaubstage bei 5-Tage-Woche (gesetzlich).", "Vertrag schriftlich geben lassen."],
  ["Steuer-ID", "Sozialversicherungsnummer", "Krankenkasse", "IBAN"], "Kostenlos.", "Unklar? Gewerkschaft oder Migrationsberatung fragen."),
 (["Check: pay, working hours, holidays, probation, notice period.", "The minimum wage applies (2026: 13.90 € per hour).",
   "At least 20 days' holiday for a 5-day week (by law).", "Get the contract in writing."],
  ["Tax ID", "Social security number", "Health insurer", "IBAN"], "Free.", "Unsure? Ask a trade union or migration advice."))

G("minijob", ["https://www.minijob-zentrale.de"],
 (["Ein Minijob ist eine kleine Beschäftigung bis zu einer Verdienstgrenze (2026: 603 € im Monat).", "Arbeitgeber meldet dich bei der Minijob-Zentrale an.",
   "Auch im Minijob: Mindestlohn, Urlaub und Lohnfortzahlung bei Krankheit.", "Prüfen, ob dein Aufenthaltstitel das erlaubt."],
  ["Steuer-ID", "Sozialversicherungsnummer", "IBAN"], "Kostenlos.", "Für dich meist steuer- und abgabenfrei (Rentenversicherung optional)."),
 (["A mini-job is small employment up to an earnings limit (2026: 603 € a month).", "Your employer registers you with the Minijob-Zentrale.",
   "Mini-jobs also have minimum wage, holidays and sick pay.", "Check that your residence permit allows it."],
  ["Tax ID", "Social security number", "IBAN"], "Free.", "For you usually free of tax and contributions (pension insurance optional)."))

FK = "https://www.arbeitsagentur.de/familie-und-kinder"; FP = "https://familienportal.de"
G("kindergeld", [FK],
 (["Bei der Familienkasse beantragen (online oder per Post).", "Steuer-IDs von dir und dem Kind angeben.", "Bescheid abwarten – Zahlung monatlich."],
  ["Geburtsurkunde des Kindes", "Steuer-IDs", "Aufenthaltstitel", "IBAN"], "Kostenlos. 2026: 259 € pro Kind und Monat.",
  "Bis zu 6 Monate rückwirkend. Anspruch hängt vom Aufenthaltstitel ab."),
 (["Apply at the family benefits office (Familienkasse) online or by post.", "Give your and your child's tax IDs.", "Wait for the notice – paid monthly."],
  ["Child's birth certificate", "Tax IDs", "Residence permit", "IBAN"], "Free. 2026: 259 € per child per month.",
  "Up to 6 months back. Eligibility depends on your residence permit."))

G("elterngeld", [FP],
 (["Nach der Geburt bei der Elterngeldstelle deines Bundeslandes beantragen (oft online).", "Basiselterngeld oder ElterngeldPlus wählen.",
   "Innerhalb von 3 Monaten nach der Geburt beantragen."],
  ["Geburtsurkunde", "Einkommensnachweise", "Aufenthaltstitel", "Mutterschaftsgeld-Bescheinigung"], "Kostenlos. Meist 65–67 % des Nettoeinkommens (mind. 300 €).",
  "Nur 3 Monate rückwirkend – früh beantragen."),
 (["After the birth apply at your federal state's parental allowance office (often online).", "Choose basic parental allowance or ElterngeldPlus.",
   "Apply within 3 months of the birth."],
  ["Birth certificate", "Proof of income", "Residence permit", "Maternity benefit certificate"], "Free. Usually 65–67 % of net income (at least 300 €).",
  "Only 3 months back – apply early."))

G("kita", [FP],
 (["Kinder ab 1 Jahr haben einen Rechtsanspruch auf einen Betreuungsplatz.", "Früh anmelden – am besten schon vor der Geburt bzw. sofort nach dem Umzug.",
   "Je nach Stadt über ein Online-Portal oder direkt bei den Kitas.", "Mehrere Kitas gleichzeitig anfragen."],
  ["Geburtsurkunde", "Meldebescheinigung", "Impfnachweis (Masern)"], "Je nach Bundesland und Einkommen von kostenlos bis mehrere Hundert Euro.",
  "Kein Platz? Beim Jugendamt melden – der Rechtsanspruch gilt."),
 (["Children from age 1 have a legal right to a childcare place.", "Register early – ideally before the birth or right after moving.",
   "Depending on the town via an online portal or directly at the nurseries.", "Apply to several nurseries at the same time."],
  ["Birth certificate", "Registration certificate", "Measles vaccination proof"], "Depends on state and income, from free to several hundred euros.",
  "No place? Report it to the youth welfare office – the legal right applies."))

G("schule", [FP],
 (["Schulpflicht ab ca. 6 Jahren – auch für neu zugezogene Kinder.", "Beim Schulamt oder der zuständigen Grundschule anmelden.",
   "Kinder ohne Deutschkenntnisse kommen oft erst in eine Willkommens- oder Vorbereitungsklasse.", "Schuleingangsuntersuchung beim Gesundheitsamt."],
  ["Geburtsurkunde", "Meldebescheinigung", "Impfnachweis (Masern)", "frühere Zeugnisse"], "Öffentliche Schulen kostenlos.",
  "Schulpflicht wird kontrolliert – Kinder schnell anmelden."),
 (["School is compulsory from about age 6 – also for newly arrived children.", "Register at the school office or the local primary school.",
   "Children without German often start in a welcome or preparatory class.", "School entry health check at the health office."],
  ["Birth certificate", "Registration certificate", "Measles vaccination proof", "Previous school reports"], "Public schools are free.",
  "Compulsory schooling is checked – register children quickly."))

G("wohngeld", ["https://www.bmwsb.bund.de"],
 (["Zuschuss zur Miete für Menschen mit geringem Einkommen (nicht bei Bürgergeld).", "Mit dem Wohngeldrechner prüfen, ob du Anspruch hast.",
   "Antrag bei der Wohngeldstelle deiner Stadt.", "Bewilligung meist für 12 Monate, dann neu beantragen."],
  ["Mietvertrag", "Einkommensnachweise", "Kontoauszüge", "Aufenthaltstitel"], "Kostenlos.", "Gilt ab dem Monat der Antragstellung – nicht rückwirkend."),
 (["A rent subsidy for people with low income (not with Bürgergeld).", "Use the housing benefit calculator to check eligibility.",
   "Apply at your town's housing benefit office.", "Usually approved for 12 months, then reapply."],
  ["Rental contract", "Proof of income", "Bank statements", "Residence permit"], "Free.", "Paid from the month you apply – not backdated."))
