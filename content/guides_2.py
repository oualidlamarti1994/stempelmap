from _g import G
MB = "https://www.mieterbund.de"; VZ = "https://www.verbraucherzentrale.de"; BNA = "https://www.bundesnetzagentur.de"
G("wohnungssuche", [MB],
 (["Auf großen Wohnungsportalen, bei Wohnungsgenossenschaften und städtischen Wohnungsgesellschaften suchen.",
   "Bewerbungsmappe vorbereiten: Selbstauskunft, Gehaltsnachweise, SCHUFA-Auskunft, Ausweis.", "Besichtigungen schnell zusagen – gute Wohnungen gehen schnell weg.",
   "Mit geringem Einkommen: Wohnberechtigungsschein (WBS) beim Wohnungsamt beantragen."],
  ["Ausweis/Pass", "Aufenthaltstitel", "Gehaltsnachweise der letzten 3 Monate", "SCHUFA-Auskunft"], "Suche kostenlos. Makler zahlt meist der Vermieter.",
  "⚠️ Betrug: Niemals Geld überweisen, bevor du die Wohnung gesehen und den Vertrag unterschrieben hast."),
 (["Search on big flat portals, with housing cooperatives and municipal housing companies.",
   "Prepare an application folder: self-disclosure form, pay slips, SCHUFA report, ID.", "Accept viewings quickly – good flats go fast.",
   "With a low income: apply for a housing entitlement certificate (WBS) at the housing office."],
  ["ID / passport", "Residence permit", "Pay slips for the last 3 months", "SCHUFA report"], "Searching is free. The agent fee is usually paid by the landlord.",
  "⚠️ Scam warning: never transfer money before you've seen the flat and signed the contract."))

G("mietvertrag", [MB],
 (["Kaltmiete, Nebenkosten und Warmmiete prüfen.", "Kündigungsfrist (für Mieter meist 3 Monate) und Mindestlaufzeit ansehen.",
   "Klauseln zu Renovierung und Haustieren lesen.", "Übergabeprotokoll mit Fotos machen, wenn du einziehst.", "Bei Fragen: Mieterverein."],
  ["Ausweis", "Unterschrift"], "Kostenlos.", "Unterschreib nichts, was du nicht verstehst – lass dir den Vertrag erklären."),
 (["Check base rent (Kaltmiete), service charges and total rent (Warmmiete).", "Check the notice period (usually 3 months for tenants) and minimum term.",
   "Read the clauses on renovation and pets.", "Make a handover report with photos when you move in.", "Questions: tenants' association."],
  ["ID", "Signature"], "Free.", "Don't sign anything you don't understand – get the contract explained."))

G("kaution", [MB],
 (["Höchstens 3 Monats-Kaltmieten.", "Du darfst sie in 3 Monatsraten zahlen.", "Der Vermieter muss sie getrennt von seinem Geld anlegen.",
   "Nach dem Auszug bekommst du sie zurück, minus berechtigte Forderungen (meist innerhalb einiger Monate)."],
  ["Mietvertrag", "Zahlungsbeleg"], "Bis zu 3 Kaltmieten.", "Alternativ gibt es Kautionsbürgschaften – vergleiche die jährlichen Kosten."),
 (["At most 3 months' base rent.", "You may pay it in 3 monthly instalments.", "The landlord must keep it separate from their own money.",
   "After moving out you get it back, minus justified claims (usually within a few months)."],
  ["Rental contract", "Proof of payment"], "Up to 3 months' base rent.", "Alternatively there are deposit guarantees – compare the yearly cost."))

G("wohnungsgeber", ["https://verwaltung.bund.de"],
 (["Den Vermieter (oder Hauptmieter) um die Bestätigung bitten.", "Er muss sie dir innerhalb von 2 Wochen nach Einzug geben.",
   "Formular gibt es auf der Website deiner Stadt.", "Bring sie zur Anmeldung beim Bürgeramt mit."],
  ["Name und Adresse des Vermieters", "Einzugsdatum"], "Kostenlos.", "Ohne diese Bestätigung keine Anmeldung."),
 (["Ask your landlord (or main tenant) for the confirmation.", "They must give it to you within 2 weeks of moving in.",
   "The form is on your town's website.", "Take it to your registration at the Bürgeramt."],
  ["Landlord's name and address", "Move-in date"], "Free.", "Without this confirmation you can't register."))

G("strom", [BNA, VZ],
 (["Beim Einzug Zählerstand fotografieren.", "Ohne Vertrag beliefert dich automatisch der Grundversorger – meist teuer.",
   "Tarife vergleichen und einen Anbieter wählen (Kündigungsfrist, Preisgarantie beachten).", "Zählernummer und Zählerstand beim Anbieter angeben."],
  ["Zählernummer", "Zählerstand", "Einzugsdatum", "IBAN"], "Je nach Verbrauch, für 1 Person oft ca. 30–50 € im Monat.",
  "Vergleichen lohnt sich – der Grundversorgungstarif ist oft der teuerste."),
 (["Photograph the meter reading when you move in.", "Without a contract the default supplier (Grundversorger) supplies you automatically – usually expensive.",
   "Compare tariffs and choose a provider (check notice period and price guarantee).", "Give the provider the meter number and reading."],
  ["Meter number", "Meter reading", "Move-in date", "IBAN"], "Depends on use, for 1 person often about 30–50 € a month.",
  "Comparing pays off – the default tariff is often the most expensive."))

G("internet", [BNA],
 (["Prüfen, welche Anschlüsse an deiner Adresse verfügbar sind (DSL, Kabel, Glasfaser).", "Tarife vergleichen – oft 24 Monate Laufzeit.",
   "Termin für Freischaltung vereinbaren (kann Wochen dauern).", "Übergangsweise: mobiles Internet über Handy-Hotspot."],
  ["Ausweis", "Meldeadresse", "IBAN"], "Meist ca. 30–50 € im Monat.", "Nach der Mindestlaufzeit kannst du monatlich kündigen."),
 (["Check which connections are available at your address (DSL, cable, fibre).", "Compare tariffs – often 24-month contracts.",
   "Book an activation date (can take weeks).", "In the meantime: mobile internet via phone hotspot."],
  ["ID", "Registered address", "IBAN"], "Usually about 30–50 € a month.", "After the minimum term you can cancel monthly."))

G("rundfunk", ["https://www.rundfunkbeitrag.de"],
 (["Jede Wohnung zahlt einmal – egal wie viele Personen dort leben.", "Nach der Anmeldung kommt meist automatisch ein Brief.",
   "Online auf rundfunkbeitrag.de anmelden oder zu einer bestehenden Beitragsnummer in der WG zuordnen.",
   "Befreiung möglich bei Grundsicherungsgeld, BAföG oder Sozialhilfe."],
  ["Adresse", "Beitragsnummer (falls vorhanden)", "Bescheid für Befreiung"], "18,36 € pro Monat pro Wohnung (Stand 2026).",
  "Nicht ignorieren – sonst kommen Mahnungen und Gebühren."),
 (["Each household pays once – no matter how many people live there.", "After registration a letter usually arrives automatically.",
   "Register online at rundfunkbeitrag.de or link to an existing contribution number in a shared flat.",
   "Exemption possible with Grundsicherungsgeld, BAföG or social assistance."],
  ["Address", "Contribution number (if any)", "Benefit notice for exemption"], "18.36 € a month per household (as of 2026).",
  "Don't ignore it – otherwise reminders and fees follow."))

G("nachsenden", ["https://www.deutschepost.de"],
 (["Direkt bei der Deutschen Post beantragen (online oder in der Filiale).", "Zeitraum wählen (6 oder 12 Monate).", "Trotzdem allen wichtigen Stellen die neue Adresse mitteilen."],
  ["Alte und neue Adresse", "Ausweis"], "Bei der Deutschen Post ca. 32 € für 6 Monate.",
  "⚠️ Private Seiten verlangen dafür teils über 100 € – nur direkt bei der Post buchen."),
 (["Order it directly from Deutsche Post (online or at a post office).", "Choose the period (6 or 12 months).", "Still tell all important offices your new address."],
  ["Old and new address", "ID"], "At Deutsche Post about 32 € for 6 months.",
  "⚠️ Private sites sometimes charge over 100 € – only book directly with Deutsche Post."))

KBA = "https://www.kba.de"; ZOLL = "https://www.zoll.de"
G("fuehrerschein", [KBA],
 (["Ein Führerschein aus einem Nicht-EU-Land gilt nach deiner Anmeldung meist nur 6 Monate.", "Rechtzeitig bei der Führerscheinstelle umschreiben lassen.",
   "Je nach Land: ohne Prüfung, nur Theorie, oder Theorie + Praxis (Fahrschule nötig).", "EU-Führerscheine gelten weiter."],
  ["Ausländischer Führerschein + Übersetzung", "Pass", "Meldebescheinigung", "Sehtest", "Erste-Hilfe-Kurs", "Biometrisches Foto"],
  "Behörde ca. 40–60 €, mit Prüfungen und Fahrschule deutlich mehr.", "Nach 6 Monaten ohne Umschreibung fährst du ohne gültigen Führerschein – das ist strafbar."),
 (["A licence from a non-EU country is usually only valid for 6 months after you register.", "Convert it in time at the driving licence office.",
   "Depending on the country: no test, theory only, or theory + practical (driving school needed).", "EU licences stay valid."],
  ["Foreign licence + translation", "Passport", "Registration certificate", "Eye test", "First-aid course", "Biometric photo"],
  "Office about 40–60 €, much more with tests and driving school.", "After 6 months without conversion you drive without a valid licence – that's a criminal offence."))

G("auto_anmelden", [KBA],
 (["Kfz-Versicherung abschließen – du bekommst eine eVB-Nummer.", "Termin bei der Zulassungsstelle (oder online über i-Kfz auf der Website deiner Zulassungsbehörde).",
   "Kennzeichen prägen lassen (vor Ort).", "Plaketten und Zulassungsbescheinigung bekommen.", "Kfz-Steuer wird per Lastschrift vom Zoll eingezogen."],
  ["Ausweis/Pass + Meldebescheinigung", "eVB-Nummer", "Zulassungsbescheinigung Teil I und II", "HU-Nachweis (TÜV)", "SEPA-Mandat für die Kfz-Steuer"],
  "Zulassung meist ca. 30–40 € + Kennzeichen ca. 20–40 €.", "⚠️ Online-Zulassung nur über die Website deiner Zulassungsbehörde. Private Seiten verlangen teils über 200 €."),
 (["Take out car insurance – you get an eVB number.", "Appointment at the registration office (or online via i-Kfz on your registration authority's website).",
   "Have number plates made (on site).", "Get the stickers and registration certificate.", "Car tax is collected by direct debit by customs (Zoll)."],
  ["ID / passport + registration certificate", "eVB number", "Registration certificate parts I and II", "Inspection proof (TÜV)", "SEPA mandate for car tax"],
  "Registration usually about 30–40 € + plates about 20–40 €.", "⚠️ Online registration only via your registration authority's website. Private sites charge over 200 €."))

G("auto_abmelden", [KBA],
 (["Bei der Zulassungsstelle oder online über i-Kfz der Behörde abmelden.", "Kennzeichen und Zulassungsbescheinigung Teil I mitbringen.",
   "Versicherung und Kfz-Steuer enden danach automatisch."],
  ["Kennzeichen", "Zulassungsbescheinigung Teil I", "Ausweis"], "Ca. 5–20 € je nach Stadt.",
  "⚠️ Private Seiten verlangen dafür ca. 50 € – bei der Behörde ist es viel günstiger."),
 (["Deregister at the registration office or online via the authority's i-Kfz.", "Bring the number plates and registration certificate part I.",
   "Insurance and car tax then end automatically."],
  ["Number plates", "Registration certificate part I", "ID"], "About 5–20 € depending on the town.",
  "⚠️ Private sites charge about 50 € for this – at the authority it's much cheaper."))

G("kfz_versicherung", [VZ],
 (["Haftpflicht ist Pflicht, Teil- und Vollkasko sind freiwillig.", "Angebote vergleichen.", "Schadenfreiheitsklasse aus dem Ausland anerkennen lassen (fragen!).",
   "eVB-Nummer für die Zulassung bekommen."],
  ["Führerschein", "Fahrzeugdaten", "IBAN"], "Stark unterschiedlich – Fahranfänger zahlen deutlich mehr.", "Wechsel ist meist zum 30. November zum Jahresende möglich."),
 (["Liability insurance is mandatory, partial and comprehensive cover are optional.", "Compare offers.", "Ask whether your no-claims history from abroad is recognised.",
   "Get the eVB number for registration."],
  ["Driving licence", "Vehicle data", "IBAN"], "Varies a lot – new drivers pay much more.", "Switching is usually possible by 30 November for the end of the year."))

G("tuev", [KBA],
 (["Hauptuntersuchung (HU) alle 2 Jahre, bei Neuwagen zuerst nach 3 Jahren.", "Fälligkeit steht auf der Plakette am hinteren Kennzeichen.",
   "Termin bei TÜV, DEKRA, GTÜ o. Ä. buchen.", "Mängel reparieren lassen und ggf. Nachprüfung."],
  ["Zulassungsbescheinigung Teil I", "Auto"], "Ca. 140–170 €.", "Überzogene HU kann Bußgeld kosten."),
 (["Main inspection (HU) every 2 years, new cars first after 3 years.", "The due date is on the sticker on the rear number plate.",
   "Book at TÜV, DEKRA, GTÜ or similar.", "Have defects repaired and re-inspected if needed."],
  ["Registration certificate part I", "Car"], "About 140–170 €.", "An overdue inspection can mean a fine."))

G("kfz_steuer", [ZOLL],
 (["Bei der Zulassung gibst du ein SEPA-Mandat ab.", "Der Zoll schickt den Steuerbescheid und bucht jährlich ab.", "Höhe nach Hubraum und CO₂ – Rechner auf zoll.de."],
  ["IBAN", "Fahrzeugdaten"], "Je nach Auto, oft ca. 50–300 € im Jahr. E-Autos zeitweise befreit.", "Konto gedeckt halten – sonst Mahnung."),
 (["You give a SEPA mandate at registration.", "Customs (Zoll) sends the tax notice and debits it yearly.", "The amount depends on engine size and CO₂ – calculator on zoll.de."],
  ["IBAN", "Vehicle data"], "Depends on the car, often about 50–300 € a year. Electric cars are temporarily exempt.", "Keep your account funded – otherwise reminders."))

G("konto", ["https://www.bafin.de"],
 (["Jeder mit legalem Aufenthalt in der EU hat ein Recht auf ein Basiskonto.", "Bank oder Online-Bank wählen und Kontoeröffnung starten.",
   "Identität per Video oder in der Filiale bestätigen.", "Karte und Zugangsdaten kommen per Post."],
  ["Pass", "Aufenthaltstitel", "Meldebescheinigung"], "Oft 0–10 € im Monat.", "Wird ein Basiskonto abgelehnt, kannst du dich bei der BaFin beschweren."),
 (["Everyone with legal residence in the EU has a right to a basic account (Basiskonto).", "Choose a bank or online bank and start the account opening.",
   "Confirm your identity by video or at a branch.", "Card and login details arrive by post."],
  ["Passport", "Residence permit", "Registration certificate"], "Often 0–10 € a month.", "If a basic account is refused, you can complain to BaFin."))

G("schufa", ["https://www.meineschufa.de"],
 (["Die SCHUFA speichert, ob du Rechnungen und Kredite bezahlst.", "Vermieter und Handyanbieter fragen oft danach.",
   "Kostenlose Datenkopie (nach Art. 15 DSGVO) auf meineschufa.de bestellen.", "Rechnungen pünktlich zahlen, um einen guten Score zu behalten."],
  ["Ausweis", "Adresse"], "Datenkopie kostenlos.", "⚠️ Kostenpflichtige SCHUFA-Produkte sind nicht nötig – die kostenlose Datenkopie reicht meist."),
 (["SCHUFA records whether you pay bills and loans.", "Landlords and phone providers often ask for it.",
   "Order the free data copy (Art. 15 GDPR) on meineschufa.de.", "Pay bills on time to keep a good score."],
  ["ID", "Address"], "Data copy free.", "⚠️ Paid SCHUFA products aren't needed – the free data copy is usually enough."))

G("ueberweisung", [VZ],
 (["Überweisung: Geld mit IBAN und Name des Empfängers senden.", "Lastschrift: Du erlaubst einer Firma, Geld abzubuchen (z. B. Miete, Strom).",
   "Falsche Lastschriften kannst du 8 Wochen lang zurückholen.", "Daueraufträge für regelmäßige Zahlungen einrichten."],
  ["IBAN des Empfängers", "Online-Banking"], "Meist kostenlos.", "⚠️ Niemals TANs oder Passwörter am Telefon nennen – Banken fragen nie danach."),
 (["Transfer: send money with the recipient's IBAN and name.", "Direct debit: you allow a company to take money (e.g. rent, electricity).",
   "You can reverse wrong direct debits for 8 weeks.", "Set up standing orders for regular payments."],
  ["Recipient's IBAN", "Online banking"], "Usually free.", "⚠️ Never give TANs or passwords on the phone – banks never ask for them."))
