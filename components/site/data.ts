import React from "react";
import { Scissors, Palette, Sparkles, Droplet, Heart } from "lucide-react";

export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  image: string;
  price: string;
  duration?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: React.createElement(Scissors, { strokeWidth: 1, className: "w-8 h-8" }),
    title: "Haarschnitte & Styling",
    desc: "Präzise Schnitte – abgestimmt auf Haarstruktur, Typ und Alltag.",
    image: "/images/galerie/Lisa/IMG_1153.jpg",
    price: "ab 66 €",
    duration: "ca. 60 Min."
  },
  {
    icon: React.createElement(Palette, { strokeWidth: 1, className: "w-8 h-8" }),
    title: "Colorationen & Balayage",
    desc: "Sanfte Verläufe und kräftige Farben für strahlende Ergebnisse.",
    image: "/images/galerie/Anika/381afdd4-8238-43c8-9d14-86ba273ed2c2.jpg",
    price: "ab 305 €",
    duration: "inkl. Cut & Styling"
  },
  {
    icon: React.createElement(Sparkles, { strokeWidth: 1, className: "w-8 h-8" }),
    title: "Hochzeits- & Festfrisuren",
    desc: "Elegantes Styling und Hochsteckfrisuren für den großen Tag.",
    image: "/images/galerie/Josi/IMG_1857.jpg",
    price: "auf Anfrage",
    duration: "individuelle Beratung"
  },
  {
    icon: React.createElement(Droplet, { strokeWidth: 1, className: "w-8 h-8" }),
    title: "Haarpflege & Treatments",
    desc: "Tiefenpflege und Haarkuren für gesundes, glänzendes Haar.",
    image: "/images/galerie/Josi/IMG_3932.jpg",
    price: "ab 15 €",
    duration: "je nach Treatment"
  },
  {
    icon: React.createElement(Heart, { strokeWidth: 1, className: "w-8 h-8" }),
    title: "Nagelpflege",
    desc: "Maniküre und Nageldesign – gepflegt von Kopf bis Fuß.",
    image: "/images/galerie/Lisa/IMG_1906.jpg",
    price: "auf Anfrage",
    duration: "nach Aufwand"
  },
  {
    icon: React.createElement(Scissors, { strokeWidth: 1, className: "w-8 h-8" }),
    title: "Haarverlängerungen",
    desc: "Diskrete, natürlich wirkende Extensions für mehr Volumen.",
    image: "/images/galerie/Lisa/IMG_9435.jpg",
    price: "ab 350 €",
    duration: "Beratung empfohlen"
  },
];

export const FAQS = [
  {
    q: "Wie buche ich einen Termin?",
    a: "Ganz entspannt online über unsere Website, per Telefon oder WhatsApp – an beiden Standorten in Dresden.",
  },
  {
    q: "Muss ich eine Anzahlung leisten?",
    a: "Nein, die Online-Buchung ist für dich völlig kostenlos und unverbindlich.",
  },
  {
    q: "Wie lange dauert eine Balayage-Behandlung?",
    a: "Je nach Haarlänge und gewünschtem Ergebnis nehmen wir uns ca. 2–3 Stunden Zeit für dich.",
  },
  {
    q: "Bietet ihr auch Haarschnitte für Kinder an?",
    a: "Ja, wir heißen auch die Kleinsten in beiden Salons herzlich willkommen.",
  },
];

export const REVIEWS = [
  {
    text: "Bin total begeistert von meinem neuem Kurzhaarschnitt und werde auf alle Fälle diesen immer wieder hier auffrischen lassen.",
    author: "Marcel",
    loc: "Dresden Striesen",
  },
  {
    text: "Gute Beratung, nett und freundlich alle. Komme gerne wieder.",
    author: "Kati S.",
    loc: "Dresden Neustadt",
  },
  {
    text: "Seit Jahren komme ich mit einem Lächeln und wunderschönem Haar aus dem Salon – sympathisches Team und wohltuendes Ambiente!",
    author: "Madelyn",
    loc: "Dresden",
  },
  {
    text: "Spontan angerufen und noch am selben Tag einen Termin bekommen – freundlich, zuvorkommend und absolut empfehlenswert.",
    author: "Andreas P.",
    loc: "Dresden",
  }
];

export interface TeamMember {
  name: string;
  role: string;
  img: string;
  specialty: string;
  category: "master" | "top";
  slug: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Hai Yen",
    role: "Inhaberin und Masterstylistin",
    img: "/images/galerie/Haiyen/team.JPG",
    specialty: "Balayage-Expertin & Typberatung",
    category: "master",
    slug: "haiyen"
  },
  {
    name: "Lisa Goßmann",
    role: "Masterstylistin",
    img: "/images/galerie/Lisa/team.JPG",
    specialty: "Hochsteckfrisuren & Premium Extensions",
    category: "master",
    slug: "lisa"
  },
  {
    name: "Anika Weidlich",
    role: "Topstylistin",
    img: "/images/galerie/Anika/team.JPG",
    specialty: "Kreative Farb- & Strähnentechniken",
    category: "top",
    slug: "anika"
  },
  {
    name: "Josi",
    role: "Stylistin",
    img: "/images/galerie/Josi/team.JPG",
    specialty: "Moderne Haarschnitte & Styling-Trends",
    category: "top",
    slug: "josi"
  }
];

export const LOGOS = [
  { src: "/images/logos/Great_Lengths_Logo.webp", alt: "Great Lengths" },
  { src: "/images/logos/L'Oréal_logo.svg.png", alt: "L'Oréal Professionnel" },
  { src: "/images/logos/Olaplex_Logo.png", alt: "Olaplex" },
  { src: "/images/logos/Redken_logo.svg.png", alt: "Redken" },
  { src: "/images/logos/ghd-logo1.webp", alt: "ghd" }
];

export interface GalleryItem {
  src: string;
  stylist: string;
  stylistName: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/images/galerie/Anika/381afdd4-8238-43c8-9d14-86ba273ed2c2.jpg", stylist: "anika", stylistName: "Anika Weidlich", caption: "Kreative Coloration & Highlights" },
  { src: "/images/galerie/Lisa/IMG_1153.jpg", stylist: "lisa", stylistName: "Lisa Goßmann", caption: "Premium Extensions & Schnitt" },
  { src: "/images/galerie/Josi/IMG_1857.jpg", stylist: "josi", stylistName: "Josi", caption: "Glamour-Wellen & Hochstecken" },
  { src: "/images/galerie/Anika/4972abd3-b425-4c73-a79c-528c21571338.jpg", stylist: "anika", stylistName: "Anika Weidlich", caption: "Sanftes Balayage & Styling" },
  { src: "/images/galerie/Lisa/IMG_9435.jpg", stylist: "lisa", stylistName: "Lisa Goßmann", caption: "Haarverlängerung & Volumen" },
  { src: "/images/galerie/Josi/IMG_3932.jpg", stylist: "josi", stylistName: "Josi", caption: "Präzisions-Haarschnitt" },
  { src: "/images/galerie/Anika/IMG_0943.jpg", stylist: "anika", stylistName: "Anika Weidlich", caption: "Frischer Look & Styling" },
  { src: "/images/galerie/Lisa/IMG_1906.jpg", stylist: "lisa", stylistName: "Lisa Goßmann", caption: "Flechtfrisur & Styling" },
  { src: "/images/galerie/Josi/IMG_8571.jpg", stylist: "josi", stylistName: "Josi", caption: "Volumenföhnen & Pflege" }
];
