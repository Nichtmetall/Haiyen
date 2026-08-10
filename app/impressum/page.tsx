import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung von Haiyen Hairdesign in Dresden.",
};

export default function ImpressumPage() {
  return (
    <LegalPage
      eyebrow="Rechtliche Hinweise"
      title="Impressum"
      intro="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) – transparent und vollständig auf einen Blick."
      updatedAt="August 2026"
      highlights={[
        {
          label: "Anbieterin",
          value: (
            <>
              Thi Hai Yen Cu
              <br />
              Haiyen Hairdesign
            </>
          ),
        },
        {
          label: "Sitz",
          value: (
            <>
              Borsbergstraße 21
              <br />
              01309 Dresden
            </>
          ),
        },
        {
          label: "Kontakt",
          value: (
            <>
              <a className="font-semibold text-[#8b6b3c] underline underline-offset-4" href="tel:+4935132322434">
                0351 323 22 434
              </a>
              <br />
              <a
                className="font-semibold text-[#8b6b3c] underline underline-offset-4"
                href="mailto:info@haiyen-hairdesign.de"
              >
                info@haiyen-hairdesign.de
              </a>
            </>
          ),
        },
      ]}
      sections={[
        {
          id: "anbieterin",
          title: "Anbieterin",
          content: (
            <div className="legal-card">
              <p>
                Thi Hai Yen Cu
                <br />
                Haiyen Hairdesign
                <br />
                Borsbergstraße 21
                <br />
                01309 Dresden
              </p>
            </div>
          ),
        },
        {
          id: "kontakt",
          title: "Kontakt",
          content: (
            <p>
              Telefon: <a href="tel:+4935132322434">0351 323 22 434</a>
              <br />
              E-Mail: <a href="mailto:info@haiyen-hairdesign.de">info@haiyen-hairdesign.de</a>
            </p>
          ),
        },
        {
          id: "berufsrecht",
          title: "Berufsrechtliche Angaben",
          content: (
            <>
              <ul>
                <li>Berufsbezeichnungen: Friseurin, Kosmetikerin</li>
                <li>Zuständige Kammer: Handwerkskammer Dresden</li>
                <li>Verliehen in: Deutschland</li>
                <li>Steuernummer: 203/211/11743</li>
              </ul>
              <p>
                Es gilt die Handwerksordnung. Sie ist auf der Website des Bundesministeriums der Justiz unter{" "}
                <a href="https://www.gesetze-im-internet.de/hwo/" rel="noreferrer" target="_blank">
                  gesetze-im-internet.de/hwo
                </a>{" "}
                abrufbar.
              </p>
            </>
          ),
        },
        {
          id: "streitbeilegung",
          title: "Verbraucherstreitbeilegung",
          content: (
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          ),
        },
        {
          id: "haftung",
          title: "Haftung für Inhalte und Links",
          content: (
            <p>
              Als Diensteanbieterin sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Externe Links führen zu Inhalten anderer Anbieter, auf die wir keinen Einfluss haben. Für
              diese fremden Inhalte ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden konkreter
              Rechtsverletzungen entfernen wir entsprechende Links unverzüglich.
            </p>
          ),
        },
        {
          id: "urheberrecht",
          title: "Urheberrecht",
          content: (
            <p>
              Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen
              Urheberrecht. Eine Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der Grenzen des Urheberrechts
              bedarf der vorherigen schriftlichen Zustimmung.
            </p>
          ),
        },
      ]}
    />
  );
}
