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

const UPDATED = 'September 2026';

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
            { label: 'Rechtsform', value: 'wird ergänzt', pending: true },
            { label: 'Anschrift', value: site.street + ', ' + site.city },
            { label: 'Bezirk', value: site.district + ', Österreich' },
            { label: 'E-Mail', value: site.email },
            { label: 'Telefon', value: site.phone },
          ],
        },
        {
          kind: 'note',
          text: 'Rechtsform, Firmenbuchnummer und UID stehen fest, sobald die Gründung abgeschlossen ist. Bis dahin bleiben die Felder als offen gekennzeichnet — sie werden nicht geschätzt.',
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
            { label: 'Firmenbuch', value: 'wird ergänzt', pending: true },
            { label: 'Firmenbuchgericht', value: 'wird ergänzt', pending: true },
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
            { label: 'Gewerbe', value: 'wird ergänzt', pending: true },
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
        {
          kind: 'note',
          text: 'Die Bereitschaft zur Schlichtung ist eine unternehmerische Entscheidung — dieser Absatz ist vor dem Livegang zu bestätigen.',
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
        { kind: 'note', text: DRAFT_NOTE },
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
  lead: 'Was diese Seite überträgt, an wen und warum. Kurz: sehr wenig — und die Karte erst, wenn du sie anklickst.',
  updated: UPDATED,
  metaTitle: 'Datenschutzerklärung',
  metaDescription:
    'Datenschutzerklärung von FightLab Wien nach DSGVO: Server-Protokolle, Kontaktaufnahme, Google Maps nur auf Klick, kein Tracking.',
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
          text: 'Diese Seite ist so gebaut, dass beim bloßen Aufruf keine Verbindung zu Dritten entsteht. Schriften liegen auf unserem Server statt bei einer Schriften-CDN, es läuft keine Analyse-Software mit, und eingebettete Inhalte laden erst nach ausdrücklichem Klick.',
        },
        {
          kind: 'text',
          text: 'Du kannst die gesamte Seite lesen, ohne Daten an jemanden außerhalb unseres Hosters zu senden.',
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
            { label: 'Hoster', value: 'wird ergänzt', pending: true },
            {
              label: 'Verarbeitung',
              value: 'Vertrag nach Art. 28 DSGVO — wird ergänzt',
              pending: true,
            },
          ],
        },
        {
          kind: 'note',
          text: 'Hoster, Serverstandort, konkrete Speicherdauer und der Auftragsverarbeitungsvertrag sind vor dem Livegang einzutragen.',
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
      heading: 'Google Maps — nur auf Klick',
      blocks: [
        {
          kind: 'text',
          text: 'Im Fuß der Startseite liegt eine Karte. Im Grundzustand ist sie nicht geladen: Du siehst eine Fläche mit unserer Adresse, und es besteht keine Verbindung zu Google.',
        },
        {
          kind: 'text',
          text: 'Erst wenn du „Karte laden“ anklickst, wird sie von Google Maps nachgeladen. Dabei erfährt Google deine IP-Adresse und kann Cookies setzen; Daten können in die USA übertragen werden.',
        },
        {
          kind: 'facts',
          rows: [
            {
              label: 'Rechtsgrundlage',
              value: 'Art. 6 Abs. 1 lit. a DSGVO — deine Einwilligung durch den Klick',
            },
            {
              label: 'Empfänger',
              value: 'Google Ireland Limited, Gordon House, Barrow Street, Dublin 4',
            },
            {
              label: 'Drittland',
              value: 'USA, gestützt auf das EU-US Data Privacy Framework',
            },
            {
              label: 'Widerruf',
              value: 'Seite neu laden — die Karte ist dann wieder inaktiv',
            },
          ],
        },
        {
          kind: 'text',
          text:
            'Der Routen-Link daneben lädt nichts nach. Er öffnet Google Maps erst, wenn du ihn anklickst — und führt zur selben Adresse: ' +
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
          text: 'Auf dieser Seite gibt es derzeit kein Kontaktformular. Es bleibt bei E-Mail und Telefon.',
        },
      ],
    },
    {
      no: '07',
      id: 'geplant',
      heading: 'Noch nicht aktiv',
      blocks: [
        {
          kind: 'text',
          text: 'Die Buchungsstrecke, die Zahlungsabwicklung und die Mitgliederverwaltung sind vorbereitet, aber nicht in Betrieb. Sobald sie laufen, wird diese Erklärung vorher um Empfänger, Rechtsgrundlagen und Speicherdauer ergänzt.',
        },
        {
          kind: 'text',
          text: 'Auch Reichweitenmessung findet derzeit nicht statt. Sie käme erst mit einem Einwilligungsdialog und nicht vorher.',
        },
        {
          kind: 'note',
          text: 'Vor Aktivierung der Buchung ist dieser Abschnitt zu ersetzen.',
        },
      ],
    },
    {
      no: '08',
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
  lead: 'Diese Seite setzt von sich aus keine Cookies. Kein Banner, weil es nichts wegzuklicken gibt.',
  updated: UPDATED,
  metaTitle: 'Cookies',
  metaDescription:
    'Cookie-Hinweis für FightLab Wien: Die Seite setzt keine eigenen Cookies. Google Maps lädt erst auf Klick.',
  sections: [
    {
      no: '01',
      id: 'stand',
      heading: 'Aktueller Stand',
      blocks: [
        {
          kind: 'text',
          text: 'Beim Aufruf dieser Seite werden keine Cookies gesetzt und es wird nichts in der lokalen Ablage deines Browsers gespeichert. Es läuft keine Reichweitenmessung, kein Werbenetzwerk und kein Wiedererkennungsdienst mit.',
        },
        {
          kind: 'text',
          text: 'Deshalb steht hier auch kein Einwilligungsbanner. Ein Banner, das nur die eigene Existenz bestätigt, hilft niemandem.',
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
          text: 'Eine Ausnahme entsteht erst durch dich selbst: Wenn du im Fuß der Startseite die Karte lädst, setzt Google beim Ausliefern der Karte eigene Cookies.',
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
          ],
        },
        {
          kind: 'text',
          text: 'Diese Cookies entstehen ausschließlich nach deinem Klick auf „Karte laden“. Lädst du die Seite neu, ohne die Karte anzufordern, bleibt es beim Grundzustand ohne Cookies.',
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
          text: 'Nach § 165 Abs. 3 Telekommunikationsgesetz 2021 dürfen Daten in deinem Endgerät nur mit deiner Einwilligung gespeichert oder ausgelesen werden, sofern sie für den Betrieb nicht unbedingt erforderlich sind. Da wir nichts speichern, braucht der Grundzustand keine Einwilligung. Für die Karte holen wir sie über den Klick ein.',
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
          text: 'Das Blockieren von Cookies schränkt diese Seite nicht ein. Nur die eingebettete Karte kann dann fehlschlagen — der Routen-Link funktioniert weiterhin.',
        },
      ],
    },
    {
      no: '05',
      id: 'aenderung',
      heading: 'Wenn sich das ändert',
      blocks: [
        {
          kind: 'text',
          text: 'Sobald Buchung, Zahlung oder Reichweitenmessung dazukommen, brauchen sie einen Einwilligungsdialog. Der kommt vor der Funktion, nicht danach, und diese Seite wird vorher aktualisiert.',
        },
        { kind: 'note', text: DRAFT_NOTE },
      ],
    },
  ],
};

/** Reihenfolge im Fuß und in der Querverweisleiste der Rechtsseiten. */
export const legalDocs = [impressum, datenschutz, cookies] as const;
