import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von Haiyen Hairdesign in Dresden.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      eyebrow="Deine Daten"
      title="Datenschutz"
      intro="Hier erfährst du transparent, welche Daten beim Besuch dieser Website verarbeitet werden und welche Wahlmöglichkeiten du hast."
      updatedAt="August 2026"
      highlights={[
        {
          label: "Keine Tracker",
          value: "Wir setzen kein Analyse- oder Werbetracking ein.",
        },
        {
          label: "Externe Inhalte",
          value: "Karten und Terminbuchung laden erst nach deiner Einwilligung.",
        },
        {
          label: "Deine Kontrolle",
          value: "Die Auswahl lässt sich jederzeit über den Footer ändern.",
        },
      ]}
      sections={[
        {
          id: "verantwortliche",
          title: "Verantwortliche",
          content: (
            <div className="legal-card">
              <p>
                Thi Hai Yen Cu, Haiyen Hairdesign
                <br />
                Borsbergstraße 21, 01309 Dresden
                <br />
                Telefon: <a href="tel:+4935132322434">0351 323 22 434</a>
                <br />
                E-Mail: <a href="mailto:info@haiyen-hairdesign.de">info@haiyen-hairdesign.de</a>
              </p>
            </div>
          ),
        },
        {
          id: "hosting",
          title: "Hosting und Server-Logfiles",
          content: (
            <>
              <p>
                Beim Aufruf dieser Website verarbeitet der eingesetzte Hostinganbieter technisch erforderliche
                Verbindungsdaten. Dazu können IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Seite, übertragene
                Datenmenge, Browsertyp, Betriebssystem und Referrer-URL gehören. Die Verarbeitung ist erforderlich, um die
                Website sicher und zuverlässig bereitzustellen.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren,
                stabilen und fehlerfreien Bereitstellung der Website. Logdaten werden nur so lange gespeichert, wie dies
                für Betrieb und Sicherheit erforderlich ist, und anschließend gelöscht, sofern keine gesetzliche
                Aufbewahrungspflicht oder ein konkreter Sicherheitsvorfall entgegensteht.
              </p>
            </>
          ),
        },
        {
          id: "einwilligung",
          title: "Einwilligungsverwaltung",
          content: (
            <>
              <p>
                Wir speichern deine Auswahl zu externen Medien ausschließlich im lokalen Speicher deines Browsers. Die
                Einstellung enthält die gewählte Kategorie, eine Versionsnummer und den Zeitpunkt der Auswahl. Sie wird
                nicht an unseren Server übertragen. Diese Speicherung ist erforderlich, um deine Datenschutzentscheidung zu
                beachten (§ 25 Abs. 2 Nr. 2 TDDDG).
              </p>
              <p>
                Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern oder widerrufen. Bei einem
                Widerruf werden bereits geladene externe Inhalte entfernt; die Rechtmäßigkeit der Verarbeitung bis zum
                Widerruf bleibt unberührt.
              </p>
            </>
          ),
        },
        {
          id: "google-maps",
          title: "Google Maps",
          content: (
            <>
              <p>
                Auf der Startseite können Karten von Google Maps geladen werden. Anbieter ist Google Ireland Limited,
                Gordon House, Barrow Street, Dublin 4, Irland. Die Karten werden standardmäßig blockiert. Erst wenn du
                „Externe Medien“ erlaubst oder eine Karte aktiv lädst, wird eine Verbindung zu Google hergestellt. Dabei
                können insbesondere deine IP-Adresse, Geräte- und Browserinformationen sowie Nutzungsdaten verarbeitet
                werden. Eine Übermittlung an verbundene Unternehmen in Drittländern, insbesondere in die USA, kann nicht
                ausgeschlossen werden.
              </p>
              <p>
                Rechtsgrundlagen sind deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Weitere
                Informationen findest du in der{" "}
                <a href="https://policies.google.com/privacy?hl=de" rel="noreferrer" target="_blank">
                  Datenschutzerklärung von Google
                </a>
                .
              </p>
            </>
          ),
        },
        {
          id: "planity",
          title: "Online-Terminbuchung über Planity",
          content: (
            <>
              <p>
                Auf der Buchungsseite binden wir das Buchungssystem von Planity (Planity SAS, 9 Rue des Colonnes, 75002
                Paris, Frankreich) in einem eingebetteten Fenster (iFrame) ein. Die Einbindung ist standardmäßig blockiert
                und wird erst geladen, nachdem du der Kategorie „Externe Medien“ zugestimmt oder die Buchung aktiv
                gestartet hast.
              </p>
              <p>
                Beim Laden wird eine Verbindung zu Servern von Planity und den dort eingesetzten Dienstleistern
                hergestellt. Dabei können insbesondere deine IP-Adresse, Geräte- und Browserinformationen sowie
                Nutzungsdaten verarbeitet werden. Die für Auswahl und Buchung eines Termins eingegebenen Daten verarbeitet
                Planity in eigener Verantwortung. Vor deiner Zustimmung übertragen wir keine Daten an Planity.
              </p>
              <p>
                Rechtsgrundlagen sind deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG sowie – für
                die anschließende Terminabwicklung – Art. 6 Abs. 1 lit. b DSGVO. Informationen zur Verarbeitung bei der
                Buchung findest du in den Datenschutzhinweisen, die Planity auf der Buchungsseite bereitstellt.
              </p>
            </>
          ),
        },
        {
          id: "kontakt",
          title: "Kontakt per E-Mail, Telefon oder WhatsApp",
          content: (
            <>
              <p>
                Wenn du uns kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung deiner Anfrage. Das Formular auf
                dieser Website speichert oder versendet keine Daten über unseren Server, sondern bereitet eine E-Mail in
                deinem E-Mail-Programm vor. Bei einer Kontaktaufnahme über WhatsApp gelten zusätzlich die
                Datenschutzbestimmungen des jeweiligen Anbieters.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen oder vertraglichen Anfragen und im
                Übrigen Art. 6 Abs. 1 lit. f DSGVO. Wir löschen Anfragedaten, sobald sie für die Bearbeitung nicht mehr
                erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </>
          ),
        },
        {
          id: "rechte",
          title: "Deine Rechte",
          content: (
            <>
              <p>Du hast nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte:</p>
              <ul>
                <li>Auskunft über deine verarbeiteten personenbezogenen Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung oder Einschränkung der Verarbeitung (Art. 17 und 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)</li>
                <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
            </>
          ),
        },
        {
          id: "beschwerderecht",
          title: "Beschwerderecht",
          content: (
            <p>
              Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für unseren Sitz ist
              insbesondere der Sächsische Datenschutz- und Transparenzbeauftragte zuständig: Devrientstraße 5, 01067
              Dresden, E-Mail: <a href="mailto:saechsdsb@slt.sachsen.de">saechsdsb@slt.sachsen.de</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
