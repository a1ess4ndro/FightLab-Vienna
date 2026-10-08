/**
 * Rechtstexte an einer Stelle — Impressum, Datenschutz, Cookies.
 *
 * Wie `content.ts`: Inhalt gehört in Daten, nicht in Markup. Drei Seiten mit
 * gleicher Form rendern aus derselben Struktur, und der Anwalt bekommt eine
 * Datei statt drei Komponenten.
 *
 * Stand: Entwurf. Alles, was noch nicht feststeht (Rechtsform, Firmenbuch,
 * UID, Hoster), ist als `pending` markiert und wird auf der Seite sichtbar als
 * offen ausgewiesen — lieber eine gekennzeichnete Lücke als eine erfundene
 * Nummer. Vor dem Livegang: Punkt 2 der offenen Liste in der README.
 */

import { site } from './content';

/* -------------------------------------------------------------------------- */
/* Formen                                                                      */
/* -------------------------------------------------------------------------- */

export type LegalBlock =
  /** Fließtext, ein Absatz. */
  | { kind: 'text'; text: string }
  /** Aufzählung ohne Nummern. */
  | { kind: 'list'; items: string[] }
  /** Beschriftung und Wert — Werte stehen in Monospace, weil sie Daten sind. */
  | { kind: 'facts'; rows: LegalFact[] }
  /** Tabelle, derzeit nur für die Cookie-Übersicht. */
  | { kind: 'table'; head: string[]; rows: string[][] }
  /** Entwurfshinweis: gestrichelte Kontur, nicht zu übersehen. */
  | { kind: 'note'; text: string };

export type LegalFact = {
  label: string;
  value: string;
  /** Wert steht noch aus und wird als offen gekennzeichnet. */
  pending?: boolean;
};

export type LegalSection = {
  no: string;
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  slug: string;
  /** Überschrift der Seite, genau eine h1. */
  title: string;
  lead: string;
  /** Datum der letzten Fassung — Monospace, weil messbar. */
  updated: string;
  metaTitle: string;
  metaDescription: string;
  sections: LegalSection[];
};

const UPDATED = 'Oktober 2026';

/** Steht unter jeder der drei Seiten, solange die Texte ungeprüft sind. */
const DRAFT_NOTE =
  'Entwurfsfassung. Dieser Text ist noch nicht anwaltlich geprüft und vor der Eröffnung zu ersetzen.';

/* -------------------------------------------------------------------------- */
/* Impressum — § 5 ECG, § 14 UGB, §§ 24 f. MedienG                             */
/* -------------------------------------------------------------------------- */

export const impressum: LegalDoc = {
  slug: 'impressum',
  title: 'Impressum',
  lead: 'Offenlegung nach § 5 E-Commerce-Gesetz, § 14 Unternehmensgesetzbuch und §§ 24 f. Mediengesetz.',
  updated: UPDATED,
  metaTitle: 'Impressum',
  metaDescription:
    'Offenlegung und Medieninhaber von FightLab, Pottendorfer Straße 9, 1120 Wien — nach ECG, UGB und Mediengesetz.',
  sections: [
    {
      no: '01',
      id: 'medieninhaber',
      heading: 'Medieninhaber und Diensteanbieter',
      blocks: [
        {
          kind: 'facts',
          rows: [
            { label: 'Unternehmen', value: site.name + ' — ' + site.sublabel },
            { label: 'Inhaber', value: 'Aaron Kaplan' },
            { label: 'Anschrift', value: site.street + ', ' + site.city },
            { label: 'Bezirk', value: site.district + ', Österreich' },
            { label: 'E-Mail', value: site.email },
          ],
        },
      ],
    },
    {
      no: '02',
      id: 'unternehmensdaten',
      heading: 'Unternehmensdaten',
      blocks: [
        {
          kind: 'facts',
          rows: [
            {
              label: 'Firmenbuchgericht',
              value: 'Handelsgericht Wien',
            },
            { label: 'UID-Nummer', value: 'wird ergänzt', pending: true },
            {
              label: 'Gegenstand',
              value: 'Betrieb eines Kampfsport-Gyms, Sportunterricht',
            },
          ],
        },
      ],
    },
    {
      no: '03',
      id: 'gewerbe',
      heading: 'Gewerbe und Aufsicht',
      blocks: [
        {
          kind: 'facts',
          rows: [
            { label: 'Gewerbe', value: 'Einzelunternehmen' },
            {
              label: 'Gewerbebehörde',
              value: 'Magistratisches Bezirksamt für den 12. Bezirk, Wien',
            },
            {
              label: 'Kammer',
              value:
                'Wirtschaftskammer Wien, Fachgruppe Freizeit- und Sportbetriebe',
            },
            {
              label: 'Rechtsvorschrift',
              value: 'Gewerbeordnung 1994, abrufbar unter ris.bka.gv.at',
            },
            { label: 'Anwendbares Recht', value: 'Österreichisches Recht' },
          ],
        },
      ],
    },
    {
      no: '04',
      id: 'blattlinie',
      heading: 'Blattlinie nach § 25 Mediengesetz',
      blocks: [
        {
          kind: 'text',
          text:
            'Diese Website informiert über das Kursangebot, die Trainingszeiten und die Preise von ' +
            site.name +
            '. Sie verfolgt keinen darüber hinausgehenden redaktionellen Zweck und ist weder Nachrichtenmedium noch Werbeplattform Dritter.',
        },
      ],
    },
    {
      no: '05',
      id: 'streitbeilegung',
      heading: 'Verbraucherstreitbeilegung',
      blocks: [
        {
          kind: 'text',
          text: 'Wir sind weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Beschwerden nehmen wir direkt entgegen und beantworten sie — der kürzere Weg ist eine E-Mail an uns.',
        },
        {
          kind: 'text',
          text: 'Die Online-Streitbeilegungsplattform der Europäischen Kommission wurde mit 20. Juli 2025 eingestellt. Ein Verweis darauf entfällt daher.',
        },
      ],
    },
    {
      no: '06',
      id: 'haftung',
      heading: 'Haftung und Urheberrecht',
      blocks: [
        {
          kind: 'text',
          text: 'Inhalte dieser Seite werden mit Sorgfalt erstellt. Für Vollständigkeit und Aktualität — insbesondere bei Trainingszeiten und Preisen im Entwurfsstand — wird keine Gewähr übernommen. Verbindlich ist, was im Vertrag steht.',
        },
        {
          kind: 'text',
          text: 'Für Inhalte externer Seiten, auf die verlinkt wird, ist deren jeweiliger Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.',
        },
        {
          kind: 'text',
          text: 'Texte, Gestaltung, Bildmarke und Fotografien dieser Seite sind urheberrechtlich geschützt. Nutzung außerhalb der gesetzlichen Schranken nur mit unserer schriftlichen Zustimmung.',
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Datenschutz — DSGVO                                                         */
/* -------------------------------------------------------------------------- */

export const datenschutz: LegalDoc = {
  slug: 'datenschutz',
  title: 'Datenschutz',
  lead: 'Was diese Seite überträgt, an wen und warum. Kurz: kein Tracking, eine Karte von Google, Formulare von Jotform, Bezahlung über Stripe und eine Mitgliederverwaltung mit Airtable, Make und Hostinger.',
  updated: UPDATED,
  metaTitle: 'Datenschutzerklärung',
  metaDescription:
    'Datenschutzerklärung von FightLab Wien nach DSGVO: Server-Protokolle, Google Maps, Formulare über Jotform, Kontaktaufnahme, kein Tracking.',
  sections: [
    {
      no: '01',
      id: 'verantwortlich',
      heading: 'Verantwortlicher',
      blocks: [
        {
          kind: 'text',
          text: 'Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinn von Art. 4 Z 7 DSGVO ist:',
        },
        {
          kind: 'facts',
          rows: [
            { label: 'Unternehmen', value: site.name + ' — ' + site.sublabel },
            { label: 'Anschrift', value: site.street + ', ' + site.city },
            { label: 'E-Mail', value: site.email },
            { label: 'Telefon', value: site.phone },
            {
              label: 'Beauftragter',
              value: 'nicht bestellt — gesetzlich nicht erforderlich',
            },
          ],
        },
      ],
    },
    {
      no: '02',
      id: 'grundsatz',
      heading: 'Grundsatz',
      blocks: [
        {
          kind: 'text',
          text: 'Diese Seite überträgt so wenig wie möglich. Schriften liegen auf unserem Server statt bei einer Schriften-CDN, und es läuft keine Analyse-Software mit.',
        },
        {
          kind: 'text',
          text: 'Zwei Dienste binden wir ein, weil die Seite ihren Zweck sonst nicht erfüllt: eine Karte von Google Maps im Fuß jeder Seite und die Formulare von Jotform auf den Seiten Probetraining und Mitgliedschaft. Beide laden direkt aus dem jeweiligen Dienst; was dabei übertragen wird, steht in den Abschnitten 05 und 07. Bezahlt wird auf der Seite von Stripe, siehe Abschnitt 08.',
        },
      ],
    },
    {
      no: '03',
      id: 'logfiles',
      heading: 'Aufruf der Seite und Server-Protokolle',
      blocks: [
        {
          kind: 'text',
          text: 'Beim Abruf der Seite verarbeitet unser Hoster technisch notwendige Zugriffsdaten. Ohne sie lässt sich die Seite nicht ausliefern und nicht gegen Angriffe absichern.',
        },
        {
          kind: 'list',
          items: [
            'IP-Adresse des anfragenden Geräts',
            'Datum und Uhrzeit des Abrufs',
            'aufgerufene Adresse und übertragene Datenmenge',
            'Statusmeldung, Browsertyp und Betriebssystem',
            'verweisende Seite, sofern der Browser sie sendet',
          ],
        },
        {
          kind: 'facts',
          rows: [
            {
              label: 'Rechtsgrundlage',
              value:
                'Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an Betrieb und Sicherheit',
            },
            { label: 'Speicherdauer', value: 'kurzfristig, danach Löschung' },
            {
              label: 'Hoster',
              value:
                'HOSTINGER, UAB, Švitrigailos g. 34, LT-03230 Vilnius, Litauen',
            },
            {
              label: 'Verarbeitung',
              value: 'Vertrag nach Art. 28 DSGVO — wird ergänzt',
              pending: true,
            },
          ],
        },
        {
          kind: 'note',
          text: 'Serverstandort, konkrete Speicherdauer und der Auftragsverarbeitungsvertrag mit Hostinger sind noch einzutragen.',
        },
      ],
    },
    {
      no: '04',
      id: 'schriften',
      heading: 'Schriften',
      blocks: [
        {
          kind: 'text',
          text: 'Die beiden verwendeten Schriften werden bereits beim Bauen der Seite heruntergeladen und von unserem eigenen Server ausgeliefert. Dein Browser baut keine Verbindung zu Google Fonts auf, es wird dabei keine IP-Adresse an Dritte übertragen.',
        },
      ],
    },
    {
      no: '05',
      id: 'karte',
      heading: 'Google Maps',
      blocks: [
        {
          kind: 'text',
          text: 'Im Fuß jeder Seite zeigt eine Karte von Google Maps, wo das Gym liegt. Sie lädt, sobald du in die Nähe des Fußes scrollst. Dabei erfährt Google deine IP-Adresse und kann Cookies setzen; Daten können in die USA übertragen werden.',
        },
        {
          kind: 'facts',
          rows: [
            {
              label: 'Rechtsgrundlage',
              value:
                'Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse, unseren Standort auffindbar zu zeigen',
            },
            {
              label: 'Empfänger',
              value:
                'Google Ireland Limited, Gordon House, Barrow Street, Dublin 4',
            },
            {
              label: 'Drittland',
              value: 'USA, gestützt auf das EU-US Data Privacy Framework',
            },
            {
              label: 'Widerspruch',
              value: 'jederzeit nach Art. 21 DSGVO, formlos per E-Mail',
            },
          ],
        },
        {
          kind: 'text',
          text:
            'Der Routen-Link daneben öffnet Google Maps erst, wenn du ihn anklickst — und führt zur selben Adresse: ' +
            site.street +
            ', ' +
            site.city +
            '.',
        },
      ],
    },
    {
      no: '06',
      id: 'kontakt',
      heading: 'Kontaktaufnahme',
      blocks: [
        {
          kind: 'text',
          text: 'Wenn du uns schreibst oder anrufst, verarbeiten wir die Angaben, die du dabei machst — Name, E-Mail-Adresse oder Telefonnummer und den Inhalt deiner Nachricht —, um sie zu beantworten.',
        },
        {
          kind: 'facts',
          rows: [
            {
              label: 'Rechtsgrundlage',
              value:
                'Art. 6 Abs. 1 lit. b DSGVO bei Anfragen zum Training, sonst lit. f',
            },
            {
              label: 'Speicherdauer',
              value:
                'bis die Anfrage erledigt ist, darüber hinaus nur im Rahmen der Aufbewahrungsfristen',
            },
          ],
        },
        {
          kind: 'text',
          text: 'Ein allgemeines Kontaktformular gibt es nicht. Für Probetraining und Mitgliedschaft gibt es eigene Formulare, siehe Abschnitt 07.',
        },
      ],
    },
    {
      no: '07',
      id: 'formulare',
      heading: 'Probetraining und Mitgliedschaft',
      blocks: [
        {
          kind: 'text',
          text: 'Die Formulare zum Buchen eines Probetrainings und zum Abschließen einer Mitgliedschaft stellt der Formulardienst Jotform bereit. Sie laden mit der jeweiligen Seite direkt von Jotform; dabei erfährt Jotform deine IP-Adresse und kann Cookies setzen. Was du einträgst, speichert Jotform in unserem Auftrag.',
        },
        {
          kind: 'text',
          text: 'Probetraining: Name, Alter, E-Mail-Adresse, Wunschtermin und, falls vorhanden, ein Probetraining-Code.',
        },
        {
          kind: 'text',
          text: 'Mitgliedschaft: Name, E-Mail-Adresse, Telefonnummer, Geburtsdatum, Adresse, Tarif und Laufzeit, deine Unterschrift und — für den Studenten- und den Kombitarif — ein hochgeladener Nachweis. Bei Minderjährigen zusätzlich Name, E-Mail-Adresse und Unterschrift eines Erziehungsberechtigten.',
        },
        {
          kind: 'facts',
          rows: [
            {
              label: 'Zweck',
              value:
                'Probetraining vereinbaren, Mitgliedschaftsvertrag abschließen und durchführen',
            },
            {
              label: 'Rechtsgrundlage',
              value:
                'Art. 6 Abs. 1 lit. b DSGVO — Vertrag und vorvertragliche Anfrage; für das Laden der Formulare lit. f',
            },
            {
              label: 'Empfänger',
              value:
                'Jotform Inc., 4 Embarcadero Center, Suite 780, San Francisco, CA 94111, USA',
            },
            {
              label: 'Drittland',
              value: 'USA, gestützt auf das EU-US Data Privacy Framework',
            },
            {
              label: 'Verarbeitung',
              value: 'Vertrag nach Art. 28 DSGVO mit Jotform — wird ergänzt',
              pending: true,
            },
            {
              label: 'Speicherdauer',
              value:
                'Probetraining: bis es stattgefunden hat oder abgesagt ist. Mitgliedschaft: für die Dauer des Vertrags, danach im Rahmen der gesetzlichen Aufbewahrungsfristen',
            },
          ],
        },
        {
          kind: 'note',
          text: 'Den Auftragsverarbeitungsvertrag mit Jotform abschließen und die Speicherdauer bestätigen. Jotform bietet auch Speicherung in der EU an — mit einem EU-Konto entfiele die Übermittlung in die USA.',
        },
      ],
    },
    {
      no: '08',
      id: 'zahlung',
      heading: 'Bezahlung über Stripe',
      blocks: [
        {
          kind: 'text',
          text: 'Nach dem Absenden des Mitgliedschaftsformulars leitet dich Jotform zur Bezahlseite von Stripe weiter. Dort gibst du deine Zahlungsdaten direkt bei Stripe ein; wir sehen sie nicht. Von Stripe erfahren wir, ob und welchen Betrag du bezahlt hast, deinen Namen und deine E-Mail-Adresse.',
        },
        {
          kind: 'text',
          text: 'Stripe verarbeitet die Zahlungsdaten teils in unserem Auftrag, teils als eigener Verantwortlicher, etwa zur Betrugsabwehr und um gesetzliche Pflichten zu erfüllen. Dafür gilt die Datenschutzerklärung von Stripe.',
        },
        {
          kind: 'facts',
          rows: [
            {
              label: 'Zweck',
              value: 'Mitgliedsbeiträge und Aktivierungsgebühr einziehen',
            },
            {
              label: 'Rechtsgrundlage',
              value:
                'Art. 6 Abs. 1 lit. b DSGVO — Durchführung des Mitgliedschaftsvertrags',
            },
            {
              label: 'Empfänger',
              value:
                'Stripe Payments Europe, Limited, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irland',
              pending: true,
            },
            {
              label: 'Drittland',
              value: 'USA, gestützt auf das EU-US Data Privacy Framework',
            },
            {
              label: 'Speicherdauer',
              value:
                'Zahlungsbelege sieben Jahre, wie es die Bundesabgabenordnung vorschreibt',
            },
          ],
        },
        {
          kind: 'note',
          text: 'Im Stripe-Konto nachsehen, welche Stripe-Gesellschaft Vertragspartner ist, und den Empfänger danach bestätigen.',
        },
      ],
    },
    {
      no: '09',
      id: 'mitglieder',
      heading: 'Mitgliederverwaltung',
      blocks: [
        {
          kind: 'text',
          text: 'Ist deine Anmeldung eingegangen, führen wir dich als Mitglied: mit den Angaben aus dem Formular, Tarif, Laufzeit, Zahlungsstand und, bei Studenten- und Kombitarif, dem Nachweis. Dafür nutzen wir drei Dienste, alle in unserem Auftrag:',
        },
        {
          kind: 'list',
          items: [
            'Airtable — Datenbank, in der die Mitgliederdaten liegen',
            'Make — verbindet Formular, Bezahlung, Datenbank und E-Mail, damit Daten nicht von Hand übertragen werden',
            'Hostinger — verschickt die E-Mails an dich, etwa Bestätigungen und Hinweise zu deiner Mitgliedschaft',
          ],
        },
        {
          kind: 'facts',
          rows: [
            {
              label: 'Zweck',
              value:
                'Mitgliedschaft verwalten, Beiträge zuordnen, dich informieren',
            },
            {
              label: 'Rechtsgrundlage',
              value:
                'Art. 6 Abs. 1 lit. b DSGVO — Durchführung des Mitgliedschaftsvertrags',
            },
            {
              label: 'Airtable',
              value:
                'Formagrid Inc. (Airtable), 1 Front Street, Fl 28, San Francisco, CA 94111, USA',
            },
            {
              label: 'Make',
              value:
                'Celonis Inc., One World Trade Center, 87th Floor, New York, NY 10007, USA',
            },
            {
              label: 'Hostinger',
              value:
                'HOSTINGER, UAB, Švitrigailos g. 34, LT-03230 Vilnius, Litauen',
            },
            {
              label: 'Drittland',
              value:
                'USA für Airtable und Make; Make gestützt auf das EU-US Data Privacy Framework',
            },
            {
              label: 'Grundlage Airtable',
              value:
                'Data Privacy Framework oder Standardvertragsklauseln — wird ergänzt',
              pending: true,
            },
            {
              label: 'Verarbeitung',
              value:
                'Verträge nach Art. 28 DSGVO mit allen drei — wird ergänzt',
              pending: true,
            },
            {
              label: 'Speicherdauer',
              value:
                'für die Dauer der Mitgliedschaft, danach im Rahmen der gesetzlichen Aufbewahrungsfristen',
            },
          ],
        },
        {
          kind: 'note',
          text: 'Auftragsverarbeitungsverträge mit Airtable, Make und Hostinger abschließen. Für Airtable klären, worauf die Übermittlung in die USA gestützt ist — die Datenschutzerklärung von Airtable nennt das nicht.',
        },
      ],
    },
    {
      no: '10',
      id: 'tracking',
      heading: 'Keine Reichweitenmessung',
      blocks: [
        {
          kind: 'text',
          text: 'Reichweitenmessung findet nicht statt. Käme sie dazu, wird diese Erklärung vorher ergänzt.',
        },
      ],
    },
    {
      no: '11',
      id: 'rechte',
      heading: 'Deine Rechte',
      blocks: [
        {
          kind: 'text',
          text: 'Dir stehen gegenüber uns die folgenden Rechte zu. Eine formlose E-Mail genügt, wir antworten innerhalb eines Monats.',
        },
        {
          kind: 'list',
          items: [
            'Auskunft über die zu dir gespeicherten Daten (Art. 15 DSGVO)',
            'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
            'Löschung (Art. 17 DSGVO)',
            'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
            'Datenübertragbarkeit (Art. 20 DSGVO)',
            'Widerspruch gegen Verarbeitungen auf Basis berechtigter Interessen (Art. 21 DSGVO)',
            'Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
          ],
        },
        {
          kind: 'text',
          text: 'Es findet keine automatisierte Entscheidungsfindung und kein Profiling statt.',
        },
        {
          kind: 'text',
          text: 'Wenn du glaubst, dass wir deine Daten unrechtmäßig verarbeiten, kannst du dich bei der Aufsichtsbehörde beschweren:',
        },
        {
          kind: 'facts',
          rows: [
            { label: 'Behörde', value: 'Österreichische Datenschutzbehörde' },
            { label: 'Anschrift', value: 'Barichgasse 40—42, 1030 Wien' },
            { label: 'E-Mail', value: 'dsb@dsb.gv.at' },
            { label: 'Web', value: 'dsb.gv.at' },
          ],
        },
        { kind: 'note', text: DRAFT_NOTE },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Cookies — § 165 TKG 2021                                                    */
/* -------------------------------------------------------------------------- */

export const cookies: LegalDoc = {
  slug: 'cookies',
  title: 'Cookies',
  lead: 'Diese Seite setzt von sich aus keine Cookies. Die eingebettete Karte und die Formulare kommen von Google und Jotform und können eigene setzen.',
  updated: UPDATED,
  metaTitle: 'Cookies',
  metaDescription:
    'Cookie-Hinweis für FightLab Wien: keine eigenen Cookies. Google Maps und die Formulare von Jotform können eigene setzen.',
  sections: [
    {
      no: '01',
      id: 'stand',
      heading: 'Aktueller Stand',
      blocks: [
        {
          kind: 'text',
          text: 'Wir selbst setzen keine Cookies und speichern nichts in der lokalen Ablage deines Browsers. Es läuft keine Reichweitenmessung, kein Werbenetzwerk und kein Wiedererkennungsdienst mit.',
        },
        {
          kind: 'text',
          text: 'Zwei eingebettete Dienste laden direkt von ihren Anbietern und können dabei eigene Cookies setzen: die Karte von Google Maps im Fuß jeder Seite und die Formulare von Jotform auf den Seiten Probetraining und Mitgliedschaft.',
        },
      ],
    },
    {
      no: '02',
      id: 'uebersicht',
      heading: 'Übersicht',
      blocks: [
        {
          kind: 'table',
          head: ['Cookie', 'Anbieter', 'Zweck', 'Dauer'],
          rows: [['keines', site.name, 'Die Seite funktioniert ohne', '—']],
        },
        {
          kind: 'text',
          text: 'Cookies der eingebetteten Dienste:',
        },
        {
          kind: 'table',
          head: ['Cookie', 'Anbieter', 'Zweck', 'Dauer'],
          rows: [
            [
              'Google Maps',
              'Google Ireland Limited',
              'Auslieferung und Einstellungen der Karte, Missbrauchsabwehr',
              'nach Angaben von Google bis zu 6 Monate',
            ],
            [
              'Jotform',
              'Jotform Inc.',
              'Betrieb des Formulars, Schutz vor Missbrauch',
              'wird ergänzt',
            ],
          ],
        },
      ],
    },
    {
      no: '03',
      id: 'rechtsgrundlage',
      heading: 'Rechtsgrundlage',
      blocks: [
        {
          kind: 'text',
          text: 'Nach § 165 Abs. 3 Telekommunikationsgesetz 2021 dürfen Daten in deinem Endgerät nur mit deiner Einwilligung gespeichert oder ausgelesen werden, sofern sie nicht unbedingt erforderlich sind, um einen von dir ausdrücklich gewünschten Dienst bereitzustellen. Wir selbst speichern nichts.',
        },
        {
          kind: 'text',
          text: 'Die Formulare von Jotform rufst du gezielt auf, um ein Probetraining zu buchen oder Mitglied zu werden; ihre Cookies dienen dem Betrieb dieses Formulars. Die Karte binden wir ein, damit du das Gym findest — wer sie nicht nutzen will, kommt über den Routen-Link oder die Adresse genauso hin.',
        },
      ],
    },
    {
      no: '04',
      id: 'verwalten',
      heading: 'Cookies im Browser verwalten',
      blocks: [
        {
          kind: 'text',
          text: 'Unabhängig von dieser Seite kannst du Cookies in deinem Browser jederzeit ansehen, einzeln löschen oder generell blockieren. Die Einstellung findest du üblicherweise unter Datenschutz und Sicherheit:',
        },
        {
          kind: 'list',
          items: [
            'Firefox — Einstellungen, Datenschutz & Sicherheit, Cookies und Website-Daten',
            'Chrome — Einstellungen, Datenschutz und Sicherheit, Drittanbieter-Cookies',
            'Safari — Einstellungen, Datenschutz, Website-Daten verwalten',
            'Edge — Einstellungen, Cookies und Websiteberechtigungen',
          ],
        },
        {
          kind: 'text',
          text: 'Das Blockieren von Cookies schränkt unsere eigenen Inhalte nicht ein. Karte und Formulare können dann eingeschränkt funktionieren — der Routen-Link und unsere E-Mail-Adresse gehen immer.',
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* AGB — aus dem Mitgliedschaftsvertrag                                        */
/* -------------------------------------------------------------------------- */

/**
 * Wortgleich mit den Geschäftsbedingungen im Jotform-Formular Mitgliedschaft,
 * mit einer Ausnahme: Die Kündigungsfrist in 5.1 ist ein Monat statt drei, wie
 * vom Inhaber festgelegt. Im Formular muss sie genauso lauten — sonst
 * unterschreibt das Mitglied einen anderen Text als den, der hier steht.
 */
export const agb: LegalDoc = {
  slug: 'agb',
  title: 'AGB',
  lead: 'Allgemeine Geschäftsbedingungen für die Mitgliedschaft bei FightLab. Sie sind Bestandteil des Mitgliedsvertrags, den du im Formular unterschreibst.',
  updated: UPDATED,
  metaTitle: 'AGB',
  metaDescription:
    'Allgemeine Geschäftsbedingungen von FightLab Wien: Vertragsabschluss, Mitgliedsbeitrag, Aktivierungsgebühr, Wertsicherung, Kündigung und Haftung.',
  sections: [
    {
      no: '01',
      id: 'vertragsabschluss',
      heading: 'Vertragsabschluss',
      blocks: [
        {
          kind: 'text',
          text: '1.1. Diese allgemeinen Geschäftsbedingungen (AGB) sind integrierter Bestandteil des Mitgliedsvertrages zwischen "Aaron Kaplan Einzelunternehmen" (im Folgenden kurz: FightLab) und dem Mitglied. Die AGB gelten für die Dauermitgliedschaft und die Tageskarte. Das Mitglied erklärt sich mit sämtlichen nachstehenden Bedingungen ausdrücklich einverstanden.',
        },
        {
          kind: 'text',
          text: '1.2. Der Mitgliedsvertrag bei FightLab ist höchstpersönlich und kann nicht übertragen werden. Der Mitgliedsvertrag kommt durch Annahme des vom Mitglied unterzeichneten Antrags auf Mitgliedschaft seitens FightLab zustande. Der Mitgliedsvertrag wird mit dem Datum wirksam, welches als Beginn des Mitgliedsvertrages vereinbart wurde. FightLab behält sich vor, den Abschluss eines Mitgliedsvertrages abzulehnen, insbesondere bei unrichtigen oder unvollständigen Angaben durch den Mitgliedswerber sowie bei Zweifel seiner Bonität oder aus sonstigen Gründen. Allfällige zu diesem Zeitpunkt bereits geleistete Zahlungen werden zurückerstattet.',
        },
        {
          kind: 'text',
          text: '1.3. Bei Jugendlichen unter dem 18. Lebensjahr ist der Abschluss eines Mitgliedsvertrages nur mit Einwilligung des Erziehungsberechtigten und ferner nur bei Unterzeichnung einer Bürgschaftserklärung sowie einer Bank- Einzugsermächtigung durch den Erziehungsberechtigten zwecks Abbuchung der monatlichen Mitgliedsbeiträge von dessen Konto, möglich.',
        },
      ],
    },
    {
      no: '02',
      id: 'nutzung',
      heading: 'Nutzung der Einrichtung FightLab',
      blocks: [
        {
          kind: 'text',
          text: '2.1. Der Mitgliedsvertrag berechtigt das Mitglied zum Besuch sämtlicher vom FightLab angebotenen Kurse/Leistungen. Der Trainingsplan mit den jeweiligen Kurszeiten wird auf der Website fightlab.at veröffentlicht. FightLab behält sich das Recht vor, sein Angebot und die Kurszeiten entsprechend den betrieblichen Erfahrungen und den Wünschen der Mitglieder, insbesondere auch abhängig von den Mitgliedsfrequenzen, einseitig zu ändern, soweit dies dem Mitglied zumutbar ist, insbesondere wenn die Änderung sachlich und/oder wirtschaftlich gerechtfertigt ist. Das Mitglied hat im Falle einer solchen Änderung des Angebotes oder der Kurszeiten keinen Anspruch auf Rückvergütung von Mitgliedsbeiträgen. Weiters kann es aufgrund von notwendigen Reinigungs-, Wartung-, Reparatur- und Umbauarbeiten sowie einer Wettkampfvorbereitung des Headcoaches Aaron Kaplan fallweise zu Einschränkungen bei den angebotenen Kursen kommen. Das Mitglied hat hieraus keinen Anspruch auf eine Rückvergütung, sofern diese Einschränkungen dem Mitglied zumutbar sind, vor allem, weil sie geringfügig und sachlich gerechtfertigt sind.',
        },
        {
          kind: 'text',
          text: '2.2. Das Mitglied verpflichtet sich, die Einrichtungen im FightLab sorgsam zu nutzen und pfleglich zu behandeln.',
        },
      ],
    },
    {
      no: '03',
      id: 'beitrag',
      heading: 'Mitgliedsbeitrag und Aktivierungsgebühr',
      blocks: [
        {
          kind: 'text',
          text: '3.1. Das Mitglied hat sich im Mitgliedschaftsvertrag zur Leistung einer Aktivierungsgebühr in Höhe von einmalig € 60,00 verpflichtet, die zum im Mitgliedschaftsvertrag ausgewiesenen Termin abgebucht wird. Durch die Aktivierungsgebühr wird der Verwaltungsaufwand von FightLab im Zusammenhang mit dem Beginn der Mitgliedschaft abgedeckt. Durch die Leistung der Aktivierungsgebühr erhält das Mitglied außerdem Anspruch auf folgende Leistungen: Das Mitglied hat aufgrund der Bezahlung der Aktivierungsgebühr Anspruch auf einen Rundgang mit einem Mitarbeiter von FightLab durch das Studio sowie eine Erstinformation zur Benutzung des Trainingsbereiches und des sonstigen Leistungsangebotes.',
        },
        {
          kind: 'text',
          text: '3.2. Der Mitgliedsbeitrag ist jeweils monatlich im Voraus am 1. Werktag eines Monats fällig, das Mitglied ist jedoch berechtigt, Vorauszahlungen zu leisten. Ist das Mitglied mit der Bezahlung auch nur eines Teils eines Mitgliedsbeitrages in Verzug, ist FightLab berechtigt dem Mitglied den Zutritt zu den FightLab Einrichtungen bis zur erfolgten Zahlung zu verwehren.',
        },
        {
          kind: 'text',
          text: '3.3. Darüber hinaus ist FightLab bei Zahlungsverzug berechtigt, Verzugszinsen in Höhe von 5% p.a. zu verrechnen. Ferner können bei verschuldetem Zahlungsverzug für jede Mahnung Bearbeitungsgebühren in Höhe von EUR 10,00 sowie sämtliche angefallene der zweckentsprechenden Rechtsverfolgung dienende Kosten von Inkassobüros sowie Rechtsanwälten in Rechnung gestellt werden.',
        },
        {
          kind: 'text',
          text: '3.4. Sollte das Mitglied für die monatlichen Mitgliedsbeiträge eine Bank-Einzugsermächtigung erteilt haben, gehen allfällige Rücklastgebühren der Bank ausschließlich zu Lasten des Mitgliedes.',
        },
        {
          kind: 'text',
          text: '3.5. Sollten die Einrichtungen des FightLab aus persönlichen Gründen des Mitgliedes nicht genutzt werden können, erfolgt keine Rückerstattung von Mitgliedsbeiträgen. Davon unberührt bleibt das Recht zur vorzeitigen Auflösung des Vertrages bei Vorliegen eines wichtigen Grundes, welche nicht vom Mitglied schuldhaft herbeigeführt wurde.',
        },
        {
          kind: 'text',
          text: '3.6. Das Mitglied hat keinen Anspruch darauf von einem bestimmten Trainer unterrichtet zu werden oder stets dieselben Kurse zu denselben Zeiten besuchen zu können. Das Mitglied hat auch keinen Anspruch auf Nutzung eines bestimmten Einrichtungsgegenstandes von FightLab.',
        },
        {
          kind: 'text',
          text: '3.7. Sollte es infolge von außergewöhnlichen Zufällen durch Gesetze und/oder Verordnungen zu einer vorübergehenden Schließung von Sportstätten/der FightLab Einrichtung kommen (etwa in Form von Betretungsverboten), berechtigt dies nicht das Mitglied zur Rückerstattung von bereits bezahlten Mitgliedsbeiträgen und entbindet das Mitglied auch nicht zur Verpflichtung zur Bezahlung der laufenden Mitgliedsbeiträge.',
        },
      ],
    },
    {
      no: '04',
      id: 'wertsicherung',
      heading: 'Wertsicherung',
      blocks: [
        {
          kind: 'text',
          text: '4.1 Es wird die Wertbeständigkeit des Mitgliedsbeitrages vereinbart. Als Maß zur Berechnung der Wertbeständigkeit dient der von der Statistik Austria monatlich verlautbarte Verbraucherpreisindex 2025 oder ein an seine Stelle tretender Index. Das FightLab behält sich das Recht vor, die Mitgliedsbeiträge jährlich einer Überprüfung zu unterziehen und diese entsprechend der Veränderung der für das vorangehende Kalenderjahr veröffentlichten Indexzahl anzupassen, frühestens jedoch nach Ablauf von zwei Monaten ab Vertragsabschluss. Die Nichtausübung des Rechts auf Wertanpassung stellt keinen Verzicht auf spätere Wertanpassungen dar.',
        },
      ],
    },
    {
      no: '05',
      id: 'kuendigung',
      heading: 'Dauer und Kündigung',
      blocks: [
        {
          kind: 'text',
          text: '5.1. Der Mitgliedschaftsvertrag wird auf unbestimmte Zeit geschlossen und kann von beiden Vertragsparteien unter Einhaltung einer einmonatigen Kündigungsfrist zum Monatsletzten schriftlich gekündigt werden.',
        },
        {
          kind: 'text',
          text: '5.2. Unabhängig von einer ordentlichen Kündigung kann der Mitgliedschaftsvertrag von beiden Vertragsparteien aus wichtigem Grund mit sofortiger Wirkung aufgelöst werden. Für das Mitglied liegt ein wichtiger Grund ausschließlich dann vor, wenn das Mitglied durch ein fachärztliches Attest nachweist, dass es infolge einer schweren Erkrankung, Verletzung oder Schwangerschaft, die bei Vertragsabschluss noch nicht bekannt war, die Leistungen und Einrichtungen des FightLab für mehr als drei Monate nicht nutzen kann. Für FightLab liegt ein wichtiger Grund der zu sofortigen Vertragsauflösung berechtigt dann vor, wenn das Mitglied Einrichtungen bzw. Ausstattungen vom FightLab vorsätzlich oder grob fahrlässig beschädigt, die Sicherheit anderer Mitglieder gefährdet oder diese belästigt, Hygienevorschriften vom FightLab nicht einhält oder Weisungen des FightLab-Personals, insbesondere der dort tätigen Trainern nicht befolgt, sich grob ungebührlich verhält (z.B. Tätlichkeiten, Bedrohungen, Beleidigungen, sexuelle Belästigungen, Diebstahl, etc.) oder gegen den Mitgliedsvertrag verstößt oder durch sein Verhalten außerhalb der FightLab Einrichtung das Ansehen vom FightLab beschädigt oder trotz Mahnung und Setzung einer angemessenen Nachfrist mit der Entrichtung von einem Monatsbeitrag in Verzug ist.',
        },
        {
          kind: 'text',
          text: '5.3. Sollte FightLab den Mitgliedsvertrag aus einem der in a. bis e. genannten Gründen vorzeitig auflösen, hat das Mitglied dennoch die bis zum nächstmöglichen ordentlichen Kündigungstermin fälligen Mitgliedsbeiträge zu bezahlen. Sollte FightLab den Mitgliedsvertrag aus einem der in a. bis e. genannten Gründen vorzeitig auflösen, erfolgt keine Rückerstattung allfälliger nicht verbrauchter bzw. vorausbezahlter Mitgliedsbeiträge.',
        },
        {
          kind: 'text',
          text: '5.4. Allfällige offenen Guthaben sind innerhalb der Kündigungsfrist bzw. bis zum Vertragsende zu verbrauchen und können nicht Bar abgelöst werden, hiervon ausgenommen ist lediglich ein Guthaben, welches bei berechtigter vorzeitiger Auflösung des Mitgliedsvertrages durch das Mitglied besteht.',
        },
      ],
    },
    {
      no: '06',
      id: 'haftung',
      heading: 'Haftung',
      blocks: [
        {
          kind: 'text',
          text: '6.1. Eine Haftung von FightLab ist bei leichter Fahrlässigkeit für sämtliche Schäden, ausgenommen Personenschäden, ausgeschlossen.',
        },
        {
          kind: 'text',
          text: '6.2. Das Mitglied nimmt zur Kenntnis, dass FightLab keine Haftung für persönliche Sachen oder Wertgegenstände des Mitgliedes übernimmt. Sollte ein Mitglied einen Diebstahl begehen, berechtigt dies FightLab zur sofortigen Vertragsauflösung; weiters erfolgt eine Anzeige bei der zuständigen Polizeidienststelle bzw. Staatsanwaltschaft.',
        },
        {
          kind: 'text',
          text: '6.3. Hingewiesen wird darauf, dass der Mitgliedsvertrag das Mitglied zur Nutzung der vorhandenen und freien Garderoben nur zu Zeiten berechtigt, in denen er sich in den Räumlichkeiten von FightLab befindet. Das Nutzungsrecht endet mit Verlassen der Räumlichkeiten von FightLab. Das Mitglied hat die Garderobe vor Verlassen von FightLab zu räumen und sauber zu hinterlassen. FightLab ist berechtigt, täglich zu Betriebsschluss die Garderoben zu räumen. FightLab wird die vorgefundenen Gegenstände für eine dem jeweiligen objektiven Wert entsprechend angemessene Zeit in Verwahrung nehmen und sie dann entsorgen. FightLab übernimmt keine Haftung für das Abhandenkommen von in der Garderobe belassenen Gegenständen.',
        },
        {
          kind: 'text',
          text: '6.4. Das Mitglied bestätigt mit seiner Unterschrift, dass es in einer geeigneten körperlichen Verfassung ist, um die Kurse/Leistungen und Einrichtungen von FightLab nutzen zu können. FightLab übernimmt keine Haftungen für Verletzungen oder sonstige gesundheitliche sowie Sachschäden die im Rahmen der Benützung der Einrichtung von FightLab und der Ausübung von Kampfsportangeboten (oder sonstigen Kursen) entstehen. FightLab übernimmt insbesondere keine Haftung für Personenschäden die von anderen Mitgliedern und/oder Trainern einem Mitglied zugefügt werden oder von diesem selbst verschuldet sind.',
        },
        {
          kind: 'text',
          text: '6.5. FightLab ist berechtigt von jedem Mitglied eine ärztliche Bestätigung anfordern zu können, aus welcher hervorgeht, dass die körperliche Eignung für die Inanspruchnahme der Leistungen und Einrichtung von FightLab gegeben ist. Bis zur Erbringung einer solchen ärztlichen Bestätigung kann dem Mitglied der Zutritt zu den Einrichtungen von FightLab verwehrt werden.',
        },
      ],
    },
    {
      no: '07',
      id: 'erfuellungsort',
      heading: 'Erfüllungsort und Änderung von Mitgliedsdaten',
      blocks: [
        {
          kind: 'text',
          text: '7.1. FightLab befindet sich in 1120 Wien, Pottendorferstraße 9. Sofern es zu einem Ortwechsel kommt ist das Mitglied nur dann zur vorzeitigen Auflösung des Mitgliedsvertrages aus wichtigem Grund berechtigt, wenn der neue Ort der FightLab Einrichtung außerhalb von Wien liegt.',
        },
        {
          kind: 'text',
          text: '7.2. Änderungen von Adresse, Kontaktdaten und Bankverbindungen von FightLab sind unverzüglich schriftlich bekanntzugeben.',
        },
      ],
    },
    {
      no: '08',
      id: 'datenschutz',
      heading: 'Datenschutz und Persönlichkeitsrechte',
      blocks: [
        {
          kind: 'text',
          text: '8.1. Das Mitglied stimmt zu, dass seine Daten auf Dauer gespeichert werden und diese ausschließlich zur Begründung, Durchführung und Abwicklung seiner Mitgliedschaft genutzt werden. Weiters dürfen diese Daten zur Übermittlung von Angeboten zu ähnlichen Leistungen an der angegebenen E-Mail genutzt werden. Der Verarbeitung von Daten kann vom Mitglied jederzeit widersprochen werden durch Mitteilung an office@fightlab.at oder postalisch an FightLab, 1120 Wien, Pottendorferstraße 9.',
        },
        {
          kind: 'text',
          text: '8.2. Das Mitglied stimmt darüber hinaus ausdrücklich zu, dass sämtliches Film- und Fotomaterial, welches innerhalb der FightLab Einrichtung angefertigt wird in sämtlichen Medien veröffentlicht, vervielfältigt oder in sonstiger Weise weitergeben werden darf. Hierzu zählen insbesondere die Webseite vom FightLab und sonstige soziale Medien. Ebenso verhält es sich bei Foto- und Filmaufnahmen die bei Veranstaltungen (z.B. Wettkämpfen) angefertigt werden, welche vom FightLab organisiert werden oder an welchen das FightLab und seine Mitglieder teilnehmen.',
        },
      ],
    },
    {
      no: '09',
      id: 'recht',
      heading: 'Anzuwendendes Recht und Gerichtsstandsvereinbarung',
      blocks: [
        {
          kind: 'text',
          text: '9.1. Dieser Vertrag unterliegt ausschließlich österreichischem Recht unter Ausschluss von Kollisionsnormen.',
        },
        {
          kind: 'text',
          text: '9.2. Als Gerichtsstand für allfällige Streitigkeiten aus oder in Zusammenhang mit diesem Mitgliedsvertrag wird die ausschließliche Zuständigkeit des sachlich zuständigen Gerichts in Wien vereinbart. Für Klagen gegen einen Verbraucher im Sinne des KSchG gilt der Gerichtsstand als vereinbart, in dessen Sprengel der Wohnsitz, der gewöhnliche Aufenthalt oder der Beschäftigungsort des Verbrauchers liegt.',
        },
      ],
    },
    {
      no: '10',
      id: 'sonstiges',
      heading: 'Sonstiges',
      blocks: [
        {
          kind: 'text',
          text: 'Sollten einzelne Bestimmungen dieses Mitgliedvertrages ungültig oder sonst unwirksam sein, bleibt die Gültigkeit der übrigen Bestimmungen hiervon unberührt. Die ungültigen und unwirksamen Bestimmungen sind durch, den wirtschaftlichen Zweck entsprechende und dem ursprünglichen Vertragswillen der Parteien möglichst ähnliche gültige Bestimmungen zu ersetzen.',
        },
      ],
    },
  ],
};

/** Reihenfolge im Fuß und in der Querverweisleiste der Rechtsseiten. */
export const legalDocs = [impressum, datenschutz, cookies, agb] as const;
