import { pageMetadata } from "@/components/site/seo";
import { GaleriePageContent } from "@/components/site/galerie-page";

export const metadata = pageMetadata(
  "Balayage, Haarschnitte & Extensions in Dresden",
  "Entdecken Sie Haarschnitte, Colorationen, Balayage und Extensions unseres Dresdner Friseurteams. Echte Arbeiten aus den Haiyen Hairdesign Salons.",
  "/galerie"
);

export default function GaleriePage() {
  return <GaleriePageContent />;
}
