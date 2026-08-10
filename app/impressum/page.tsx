import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung von Haiyen Hairdesign in Dresden.",
};

export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Rechtliche Hinweise" title="Impressum" intro="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).">
      <section>
        <h2>Anbieterin</h2>
        <p>
          Thi Hai Yen Cu<br />
          Haiyen Hairdesign<br />
          Borsbergstraße 21<br />
          01309 Dresden
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+4935132322434">0351 323 22 434</a><br />
          E-Mail: <a href="mailto:info@haiyen-hairdesign.de">info@haiyen-hairdesign.de</a>
        </p>
      </section>

      <section>
        <h2>Berufsrechtliche Angaben</h2>
        <p>
          Berufsbezeichnungen: Friseurin, Kosmetikerin<br />
          Zuständige Kammer: Handwerkskammer Dresden<br />
          Verliehen in: Deutschland
        </p>
        <p>
          Es gilt die Handwerksordnung. Sie ist auf der Website des Bundesministeriums der Justiz unter{" "}
          <a href="https://www.gesetze-im-internet.de/hwo/" rel="noreferrer" target="_blank">gesetze-im-internet.de/hwo</a> abrufbar.
        </p>
        <p>Steuernummer: 203/211/11743</p>
      </section>

      <section>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte und Links</h2>
        <p>
          Als Diensteanbieterin sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Externe Links
          führen zu Inhalten anderer Anbieter, auf die wir keinen Einfluss haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter verantwortlich.
          Bei Bekanntwerden konkreter Rechtsverletzungen entfernen wir entsprechende Links unverzüglich.
        </p>
      </section>

      <section>
        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Eine
          Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung.
        </p>
      </section>
    </LegalPage>
  );
}

