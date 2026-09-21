import { pageMetadata } from "@/components/site/seo";
import { TeamPageContent } from "@/components/site/team-page";

export const metadata = pageMetadata(
  "Friseurteam in Dresden – unsere Stylisten",
  "Lernen Sie Hai Yen, Lisa, Anika, Lea-Sophie, Josi und Minh Anh kennen: Ihr Friseurteam bei Haiyen Hairdesign in Dresden-Striesen und Dresden-Neustadt.",
  "/team"
);

export default function TeamPage() {
  return <TeamPageContent />;
}
