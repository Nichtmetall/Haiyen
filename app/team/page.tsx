import type { Metadata } from "next";
import { TeamPageContent } from "@/components/site/team-page";

export const metadata: Metadata = {
  title: "Unser Team – Stylisten bei Haiyen Hairdesign",
  description: "Lerne unser talentiertes Team aus Friseuren in Dresden kennen.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}
