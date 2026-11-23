from _g import G
BAMF = "https://www.bamf.de"; VZ = "https://www.verbraucherzentrale.de"
G("integrationskurs", [BAMF],
 (["Kurs aus Sprachkurs (bis B1) und Orientierungskurs (Leben in Deutschland).", "Berechtigung bei der Ausländerbehörde oder beim Jobcenter bekommen.",
   "Kursträger in deiner Nähe suchen (BAMF-Kursfinder) und anmelden.", "Am Ende: Deutsch-Test für Zuwanderer und Test „Leben in Deutschland“."],
  ["Berechtigungsschein", "Pass/Aufenthaltstitel"], "Kleiner Eigenanteil pro Unterrichtsstunde (aktuell beim BAMF prüfen) – Befreiung z. B. bei Grundsicherungsgeld möglich.",
  "Das B1-Zertifikat hilft bei Niederlassungserlaubnis und Einbürgerung."),
 (["The course combines a language course (up to B1) and an orientation course (life in Germany).", "Get your eligibility from the immigration office or job centre.",
   "Find a course provider near you (BAMF course finder) and sign up.", "At the end: German test for immigrants and the \"Life in Germany\" test."],
  ["Eligibility certificate", "Passport / residence permit"], "A small contribution per lesson (check the current amount at BAMF) – exemption possible e.g. with Grundsicherungsgeld.",
  "The B1 certificate helps with permanent residence and citizenship."))

G("deutschkurs", ["https://www.goethe.de", BAMF],
 (["Integrationskurs ist oft der günstigste Weg.", "Volkshochschulen (VHS) bieten günstige Kurse.", "Kostenlos lernen: Apps und Online-Kurse (z. B. Deutsche Welle).",
   "Für den Beruf: Berufssprachkurse (B2/C1) über BAMF und Jobcenter."],
  ["Pass"], "Von kostenlos bis mehrere Hundert Euro.", "Täglich 15 Minuten bringen mehr als einmal pro Woche 2 Stunden."),
 (["The integration course is often the cheapest way.", "Adult education centres (VHS) offer low-cost courses.", "Learn for free: apps and online courses (e.g. Deutsche Welle).",
   "For work: professional language courses (B2/C1) via BAMF and the job centre."],
  ["Passport"], "From free to several hundred euros.", "15 minutes a day beats 2 hours once a week."))

G("studium", ["https://www.daad.de", "https://www.uni-assist.de"],
 (["Studiengang wählen und Zulassungsvoraussetzungen prüfen (DAAD).", "Bewerbung direkt bei der Hochschule oder über uni-assist.",
   "Sprachnachweis (Deutsch oder Englisch) und ggf. Studienkolleg.", "Studentenvisum und Finanzierungsnachweis (Sperrkonto)."],
  ["Schulabschluss + Übersetzung", "Sprachzertifikat", "Pass", "Finanzierungsnachweis"], "Öffentliche Unis meist nur Semesterbeitrag (ca. 150–400 €).",
  "Bewerbungsfristen beachten – oft 15. Januar und 15. Juli."),
 (["Choose a programme and check the admission requirements (DAAD).", "Apply directly at the university or via uni-assist.",
   "Language certificate (German or English) and possibly a preparatory college.", "Student visa and proof of finances (blocked account)."],
  ["School certificate + translation", "Language certificate", "Passport", "Proof of finances"], "Public universities usually only charge a semester fee (about 150–400 €).",
  "Mind the deadlines – often 15 January and 15 July."))

G("bafoeg", ["https://www.bafoeg-digital.de"],
 (["Staatliche Förderung für Studium und Schule.", "Ausländer haben je nach Aufenthaltstitel Anspruch.", "Online über BAföG Digital beantragen.",
   "Beim Studium: Hälfte Zuschuss, Hälfte zinsloses Darlehen."],
  ["Immatrikulationsbescheinigung", "Einkommensnachweise der Eltern", "Aufenthaltstitel", "Mietvertrag"], "Kostenlos.",
  "Schnell beantragen – BAföG gibt es erst ab dem Antragsmonat."),
 (["State funding for university and school.", "Foreigners are eligible depending on their residence permit.", "Apply online via BAföG Digital.",
   "For university: half grant, half interest-free loan."],
  ["Enrolment certificate", "Parents' proof of income", "Residence permit", "Rental contract"], "Free.",
  "Apply quickly – BAföG is only paid from the month you apply."))

G("haftpflicht", [VZ],
 (["Zahlt, wenn du aus Versehen Schäden bei anderen verursachst (z. B. Wasserschaden, kaputtes Handy).", "Gilt als wichtigste private Versicherung.",
   "Tarife vergleichen – Familie kann mitversichert werden.", "Deckungssumme mindestens 10 Mio. €."],
  ["Ausweis", "IBAN"], "Oft ca. 40–80 € im Jahr.", "Viele Vermieter erwarten sie."),
 (["Pays if you accidentally damage other people's property (e.g. water damage, a broken phone).", "Considered the most important private insurance.",
   "Compare tariffs – family members can be included.", "Cover of at least 10 million €."],
  ["ID", "IBAN"], "Often about 40–80 € a year.", "Many landlords expect it."))

G("hausrat", [VZ],
 (["Schützt deine Sachen in der Wohnung bei Feuer, Wasser, Einbruch, Sturm.", "Versicherungssumme an den Wert deiner Sachen anpassen.",
   "Fahrraddiebstahl ggf. extra einschließen."],
  ["Adresse", "Wohnfläche", "IBAN"], "Oft ca. 50–150 € im Jahr.", "Mit wenigen Sachen oft nicht unbedingt nötig."),
 (["Protects your belongings at home against fire, water, burglary, storm.", "Match the insured sum to the value of your belongings.",
   "Add bicycle theft if needed."],
  ["Address", "Living space", "IBAN"], "Often about 50–150 € a year.", "With few belongings often not essential."))

G("rechtsschutz", [VZ],
 (["Zahlt Anwalts- und Gerichtskosten, z. B. im Arbeits- oder Mietrecht.", "Meist 3 Monate Wartezeit, bevor sie zahlt.",
   "Alternative: Mieterverein oder Gewerkschaft bieten oft Rechtsschutz für Mitglieder."],
  ["Ausweis", "IBAN"], "Oft ca. 200–400 € im Jahr.", "Für alte Streitfälle zahlt sie nicht."),
 (["Pays lawyer and court costs, e.g. in employment or tenancy disputes.", "Usually a 3-month waiting period before it pays.",
   "Alternative: tenants' associations and trade unions often include legal protection for members."],
  ["ID", "IBAN"], "Often about 200–400 € a year.", "It doesn't pay for disputes that started before."))

BNA = "https://www.bundesnetzagentur.de"
G("sim", [BNA],
 (["Prepaid- oder Vertrags-SIM im Laden, Supermarkt oder online kaufen.", "Gesetzlich Pflicht: Identität mit Pass/Ausweis bestätigen (Video oder im Laden).",
   "Freischaltung abwarten."], ["Pass oder Ausweis", "Adresse"], "Prepaid ab ca. 5–10 €.", "Prepaid ist gut für den Start – kein Vertrag, keine SCHUFA."),
 (["Buy a prepaid or contract SIM in a shop, supermarket or online.", "Required by law: confirm your identity with passport/ID (video or in the shop).",
   "Wait for activation."], ["Passport or ID", "Address"], "Prepaid from about 5–10 €.", "Prepaid is good to start – no contract, no SCHUFA."))

G("handyvertrag", [BNA, VZ],
 (["Tarife vergleichen: Datenvolumen, Laufzeit (monatlich kündbar oder 24 Monate).", "Für Verträge wird oft die SCHUFA geprüft.",
   "Rufnummer vom alten Anbieter mitnehmen (Portierung)."], ["Ausweis", "Meldeadresse", "IBAN"], "Oft ca. 10–30 € im Monat.",
  "⚠️ Vorsicht bei Haustür- und Telefonverkäufen – du hast 14 Tage Widerrufsrecht."),
 (["Compare tariffs: data, term (monthly cancellable or 24 months).", "Contracts often require a SCHUFA check.",
   "Take your number from your old provider (porting)."], ["ID", "Registered address", "IBAN"], "Often about 10–30 € a month.",
  "⚠️ Be careful with door-to-door and phone sales – you have a 14-day right of withdrawal."))

G("deutschlandticket", ["https://www.bahn.de"],
 (["Monatsabo für alle Busse, Straßenbahnen, U-/S-Bahnen und Regionalzüge in ganz Deutschland.", "Online bei Verkehrsbetrieben oder der Bahn kaufen.",
   "Monatlich kündbar.", "Fragen: Gibt es ein Job- oder Semesterticket günstiger?"], ["IBAN", "Handy oder Chipkarte"], "2026: 63 € im Monat (ab 2027: 66,80 €).",
  "Gilt nicht in ICE/IC/EC (Fernverkehr)."),
 (["Monthly subscription for all buses, trams, underground/S-Bahn and regional trains in Germany.", "Buy online from transport companies or Deutsche Bahn.",
   "Cancellable monthly.", "Ask: is there a cheaper job or student ticket?"], ["IBAN", "Phone or smart card"], "2026: 63 € a month (from 2027: 66.80 €).",
  "Not valid on ICE/IC/EC (long-distance trains)."))

G("oepnv", ["https://www.bahn.de"],
 (["Ticket vor der Fahrt kaufen (Automat, App) – oft vor dem Einsteigen entwerten.", "Ohne gültiges Ticket kostet es meist 60 € Strafe.",
   "Apps der lokalen Verkehrsbetriebe zeigen Verbindungen.", "Kinder unter 6 fahren meist kostenlos."], ["Ticket"], "Je nach Stadt.",
  "Mit dem Deutschlandticket brauchst du keine Einzeltickets im Nahverkehr."),
 (["Buy your ticket before the ride (machine, app) – often validate before boarding.", "Without a valid ticket the fine is usually 60 €.",
   "Local transport apps show connections.", "Children under 6 usually travel free."], ["Ticket"], "Depends on the town.",
  "With the Deutschlandticket you don't need single tickets for local transport."))

G("mbe", [BAMF, "https://www.jugendmigrationsdienste.de"],
 (["Migrationsberatung für Erwachsene (MBE) und Jugendmigrationsdienste (bis 27) helfen kostenlos.", "Bei Briefen von Ämtern, Anträgen, Sprachkursen, Arbeit und Wohnen.",
   "Beratungsstelle in deiner Nähe über den BAMF-Suchdienst finden.", "Oft in mehreren Sprachen."],
  ["Deine Briefe und Unterlagen"], "Kostenlos.", "Ein guter erster Anlaufpunkt – bevor du für Hilfe bezahlst."),
 (["Migration advice for adults (MBE) and youth migration services (up to 27) help for free.", "With letters from authorities, applications, language courses, work and housing.",
   "Find an advice centre near you via the BAMF search.", "Often in several languages."],
  ["Your letters and documents"], "Free.", "A good first stop – before paying for help."))

G("verbraucher", [VZ],
 (["Hilft bei Verträgen, Abofallen, Energie, Versicherungen und unseriösen Websites.", "Viele Infos kostenlos online.", "Persönliche Beratung oft gegen kleine Gebühr."],
  ["Vertrag / Rechnung"], "Infos kostenlos, Beratung meist günstig.", "Gute Hilfe, wenn du einen Vertrag nicht verstehst oder abgezockt wurdest."),
 (["Helps with contracts, subscription traps, energy, insurance and dubious websites.", "Lots of free information online.", "Personal advice often for a small fee."],
  ["Contract / invoice"], "Info free, advice usually cheap.", "Good help if you don't understand a contract or were ripped off."))

G("mieterverein", ["https://www.mieterbund.de"],
 (["Mitglied werden und bei Fragen zu Miete, Nebenkosten, Kaution und Mängeln beraten lassen.", "Oft inklusive Rechtsschutz im Mietrecht.",
   "Nebenkostenabrechnung prüfen lassen."], ["Mietvertrag", "Schreiben des Vermieters"], "Oft ca. 5–10 € im Monat.", "Lohnt sich besonders bei Streit mit dem Vermieter."),
 (["Become a member and get advice on rent, service charges, deposit and defects.", "Often includes legal protection in tenancy law.",
   "Have your service charge statement checked."], ["Rental contract", "Landlord's letters"], "Often about 5–10 € a month.", "Especially worth it in disputes with your landlord."))

G("notrufe", ["https://www.polizei.de"],
 (["110 = Polizei (Gefahr, Gewalt, Einbruch, Unfall mit Verletzten).", "112 = Feuerwehr und Rettungsdienst (Feuer, medizinischer Notfall).",
   "116 117 = ärztlicher Bereitschaftsdienst.", "Ruhig bleiben, Ort nennen, Fragen beantworten."], ["Nichts – Anruf kostenlos"], "Kostenlos.",
  "Missbrauch des Notrufs ist strafbar."),
 (["110 = police (danger, violence, burglary, accidents with injuries).", "112 = fire brigade and ambulance (fire, medical emergency).",
   "116 117 = medical on-call service.", "Stay calm, give your location, answer the questions."], ["Nothing – the call is free"], "Free.",
  "Misusing emergency numbers is a criminal offence."))

G("anzeige", ["https://www.polizei.de"],
 (["Bei der Polizeiwache oder online über die Onlinewache deines Bundeslandes.", "Möglichst genau beschreiben: was, wann, wo, wer.",
   "Beweise sichern (Fotos, Nachrichten, Belege).", "Aktenzeichen notieren – du brauchst es für Versicherung und Ämter."],
  ["Ausweis", "Beweise"], "Kostenlos.", "Bei Gewalt oder Bedrohung: 110 anrufen."),
 (["At a police station or online via your federal state's online police service.", "Describe as precisely as possible: what, when, where, who.",
   "Keep evidence (photos, messages, receipts).", "Note the case number – you need it for insurance and authorities."],
  ["ID", "Evidence"], "Free.", "For violence or threats: call 110."))

G("pfand", ["https://www.umweltbundesamt.de"],
 (["Viele Flaschen und Dosen haben Pfand (Zeichen auf dem Etikett).", "Einweg meist 0,25 €, Mehrweg meist 0,08–0,15 €.",
   "Leere Flaschen in den Pfandautomaten im Supermarkt geben.", "Bon an der Kasse einlösen."], ["Leere Flaschen"], "Du bekommst Geld zurück.",
  "Flaschen ohne Pfand gehören in den Glas- oder gelben Müll."),
 (["Many bottles and cans have a deposit (symbol on the label).", "Single-use usually 0.25 €, reusable usually 0.08–0.15 €.",
   "Put empty bottles into the deposit machine in the supermarket.", "Redeem the receipt at the checkout."], ["Empty bottles"], "You get money back.",
  "Bottles without a deposit go into glass or yellow recycling."))

G("sonntag", ["https://www.bmas.de"],
 (["Sonntags und an Feiertagen sind die meisten Geschäfte geschlossen.", "Offen: Tankstellen, Bahnhofsläden, Bäckereien (oft vormittags), Apotheken-Notdienst.",
   "Samstags einkaufen und Feiertage deines Bundeslandes kennen."], ["–"], "–", "Sonntag ist Ruhetag – laute Arbeiten in der Wohnung vermeiden."),
 (["On Sundays and public holidays most shops are closed.", "Open: petrol stations, station shops, bakeries (often mornings), emergency pharmacies.",
   "Shop on Saturdays and know your federal state's holidays."], ["–"], "–", "Sunday is a rest day – avoid noisy work at home."))

G("muell", ["https://www.umweltbundesamt.de"],
 (["Gelb: Verpackungen aus Plastik und Metall. Blau: Papier. Braun: Bioabfall. Schwarz/Grau: Restmüll.", "Glas nach Farben in Glascontainer.",
   "Abholtermine im Abfallkalender deiner Stadt (oft App).", "Sperrmüll (Möbel) bei der Stadt anmelden."], ["–"], "Müllgebühren meist in den Nebenkosten.",
  "Falsch getrennter Müll kann Ärger mit Vermieter und Nachbarn bringen."),
 (["Yellow: plastic and metal packaging. Blue: paper. Brown: organic waste. Black/grey: residual waste.", "Glass by colour into glass containers.",
   "Collection dates in your town's waste calendar (often an app).", "Register bulky waste (furniture) with the town."], ["–"], "Waste fees are usually part of the service charges.",
  "Wrongly sorted waste can cause trouble with landlord and neighbours."))
