import { pageMetadata } from "@/components/site/seo";
import { ContactPageContent } from "@/components/site/contact-page";

export const metadata = pageMetadata(
  "Kontakt – Friseur in Dresden",
  "So erreichen Sie Haiyen Hairdesign: Telefon, E-Mail, WhatsApp, Öffnungszeiten und Anfahrt zu unseren Salons in Dresden-Striesen und Dresden-Neustadt.",
  "/kontakt"
);

export default function KontaktPage() {
  return <ContactPageContent />;
}
