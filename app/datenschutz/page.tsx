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
      intro="Hier erfährst du transparent, welche Daten beim Besuch dieser Website verarbeitet werden und welche Wahlmöglichkeiten du hast. Stand: August 2026."
    >
      <section>
        <h2>1. Verantwortliche</h2>
        <p>
          Thi Hai Yen Cu, Haiyen Hairdesign<br />
          Borsbergstraße 21, 01309 Dresden<br />
          Telefon: <a href="tel:+4935132322434">0351 323 22 434</a><br />
          E-Mail: <a href="mailto:info@haiyen-hairdesign.de">info@haiyen-hairdesign.de</a>
        </p>
      </section>

      <section>
        <h2>2. Hosting und Server-Logfiles</h2>
        <p>
          Beim Aufruf dieser Website verarbeitet der eingesetzte Hostinganbieter technisch erforderliche Verbindungsdaten. Dazu können
          IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Seite, übertragene Datenmenge, Browsertyp, Betriebssystem und Referrer-URL gehören.
          Die Verarbeitung ist erforderlich, um die Website sicher und zuverlässig bereitzustellen.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren, stabilen und fehlerfreien
          Bereitstellung der Website. Logdaten werden nur so lange gespeichert, wie dies für Betrieb und Sicherheit erforderlich ist, und
          anschließend gelöscht, sofern keine gesetzliche Aufbewahrungspflicht oder ein konkreter Sicherheitsvorfall entgegensteht.
        </p>
      </section>

      <section>
        <h2>3. Einwilligungsverwaltung</h2>
        <p>
          Wir speichern deine Auswahl zu externen Medien ausschließlich im lokalen Speicher deines Browsers. Die Einstellung enthält die
          gewählte Kategorie, eine Versionsnummer und den Zeitpunkt der Auswahl. Sie wird nicht an unseren Server übertragen. Diese Speicherung
          ist erforderlich, um deine Datenschutzentscheidung zu beachten (§ 25 Abs. 2 Nr. 2 TDDDG).
        </p>
        <p>
          Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern oder widerrufen. Bei einem Widerruf werden bereits
          geladene externe Inhalte entfernt; die Rechtmäßigkeit der Verarbeitung bis zum Widerruf bleibt unberührt.
        </p>
      </section>

      <section>
        <h2>4. Google Maps</h2>
        <p>
          Auf der Startseite können Karten von Google Maps geladen werden. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland. Die Karten werden standardmäßig blockiert. Erst wenn du „Externe Medien“ erlaubst oder eine Karte aktiv lädst,
          wird eine Verbindung zu Google hergestellt. Dabei können insbesondere deine IP-Adresse, Geräte- und Browserinformationen sowie
          Nutzungsdaten verarbeitet werden. Eine Übermittlung an verbundene Unternehmen in Drittländern, insbesondere in die USA, kann nicht ausgeschlossen werden.
        </p>
        <p>
          Rechtsgrundlagen sind deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Weitere Informationen findest du in der{" "}
          <a href="https://policies.google.com/privacy?hl=de" rel="noreferrer" target="_blank">Datenschutzerklärung von Google</a>.
        </p>
      </section>

      <section>
        <h2>5. Online-Terminbuchung über Planity</h2>
        <p>
          Die Terminbuchung ist als klar gekennzeichneter externer Link eingebunden. Erst wenn du den Link anklickst, verlässt du diese Website
          und rufst den Dienst von Planity auf. Dort werden die für Auswahl und Buchung eines Termins erforderlichen Daten in eigener Verantwortung
          von Planity verarbeitet. Vor deinem Klick übertragen wir keine Daten an Planity.
        </p>
        <p>
          Informationen zur Verarbeitung bei der Buchung findest du in den Datenschutzhinweisen, die Planity auf der Buchungsseite bereitstellt.
        </p>
      </section>

      <section>
        <h2>6. Kontakt per E-Mail, Telefon oder WhatsApp</h2>
        <p>
          Wenn du uns kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung deiner Anfrage. Das Formular auf dieser Website speichert oder
          versendet keine Daten über unseren Server, sondern bereitet eine E-Mail in deinem E-Mail-Programm vor. Bei einer Kontaktaufnahme über
          WhatsApp gelten zusätzlich die Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen oder vertraglichen Anfragen und im Übrigen Art. 6 Abs. 1 lit. f DSGVO.
          Wir löschen Anfragedaten, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      <section>
        <h2>7. Deine Rechte</h2>
        <p>Du hast nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte:</p>
        <ul>
          <li>Auskunft über deine verarbeiteten personenbezogenen Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung oder Einschränkung der Verarbeitung (Art. 17 und 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)</li>
          <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
      </section>

      <section>
        <h2>8. Beschwerderecht</h2>
        <p>
          Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für unseren Sitz ist insbesondere der Sächsische
          Datenschutz- und Transparenzbeauftragte zuständig: Devrientstraße 5, 01067 Dresden, E-Mail: saechsdsb@slt.sachsen.de.
        </p>
      </section>
    </LegalPage>
  );
}
