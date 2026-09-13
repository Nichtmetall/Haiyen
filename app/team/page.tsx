import { pageMetadata } from "@/components/site/seo";
import { TeamPageContent } from "@/components/site/team-page";

export const metadata = pageMetadata(
  "Friseurteam in Dresden – unsere Stylisten",
  "Lerne Hai Yen, Lisa, Anika, Josi, Lea-Sophie und Minh Anh kennen: dein Friseurteam bei Haiyen Hairdesign in Dresden-Striesen und Dresden-Neustadt.",
  "/team"
);

export default function TeamPage() {
  return <TeamPageContent />;
}
