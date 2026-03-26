import type { Metadata } from "next";
import HomePage from "@/components/site/home-page";

export const metadata: Metadata = {
  title: "Friseur Dresden – Haiyen Hairdesign ✂️ Striesen & Neustadt",
  description: "Euer Friseur in Dresden. Haarschnitte, Balayage. Online Termin buchen.",
};

export default function Home() {
  return <HomePage />;
}
