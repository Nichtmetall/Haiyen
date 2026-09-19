import React from "react";
import { Scissors, Palette, Sparkles, Droplet } from "lucide-react";

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
    icon: React.createElement(Scissors, { strokeWidth: 1, className: "w-8 h-8" }),
    title: "Haarverlängerungen",
    desc: "Diskrete, natürlich wirkende Extensions für mehr Volumen.",
    image: "/images/galerie/Lisa/IMG_9435.jpg",
    price: "auf Anfrage",
    duration: "Beratung empfohlen"
  },
];

export const FAQS = [
  {
    q: "Wie buche ich meinen Termin?",
    a: "Online über unsere Website, telefonisch oder per WhatsApp. Wähle deinen Salon in Striesen oder der Neustadt und die gewünschte Leistung.",
  },
  {
    q: "Welche Leistung soll ich buchen?",
    a: "Wähle die Leistung passend zu deinem Haarwunsch. Bei deinem ersten Besuch, einer größeren Veränderung oder Unsicherheit beraten wir dich vorab telefonisch.",
  },
  {
    q: "Wie lange dauert eine Balayage?",
    a: "Plane 3–5 Stunden ein. Die genaue Dauer hängt von Haarlänge, Haardichte, Ausgangsfarbe und deinem Wunschergebnis ab.",
  },
  {
    q: "Ist eine Anzahlung erforderlich?",
    a: "Ja, bei größeren Dienstleistungen ist eine Anzahlung erforderlich. Die Höhe und Zahlungsdetails teilen wir dir bei der Terminvereinbarung mit.",
  },
  {
    q: "Gibt es Kinderhaarschnitte oder Kinderpreise?",
    a: "Wir bieten keine speziellen Kinderhaarschnitte und keine Kinderpreise an. Für jeden Haarschnitt gilt der reguläre Damen- oder Herrenpreis – unabhängig vom Alter.",
  },
  {
    q: "Wie kann ich meinen Termin ändern oder absagen?",
    a: "Bitte melde dich möglichst frühzeitig telefonisch in deinem Salon. So können wir deinen Termin gemeinsam verschieben oder absagen.",
  },
  {
    q: "Warum kann der Preis variieren?",
    a: "Haarlänge, Material und Zeitaufwand bestimmen den Preis. Den verbindlichen Preis stimmen wir vor der Behandlung mit dir ab.",
  },
  {
    q: "Was unterscheidet Strähnen von Balayage?",
    a: "Klassische Strähnen setzen Highlights nah am Ansatz. Bei Balayage entstehen weichere Übergänge und ein natürlicher Farbverlauf.",
  },
  {
    q: "Ansatzfarbe oder Komplettfarbe – was passt zu mir?",
    a: "Eine Ansatzfarbe frischt den nachgewachsenen Bereich auf. Eine Komplettfarbe bezieht auch Längen und Spitzen ein. Wir beraten dich zur passenden Variante.",
  },
  {
    q: "Kann ich in einem Termin deutlich heller werden?",
    a: "Das hängt von deiner Ausgangsfarbe und Haarstruktur ab. Für ein schonendes Ergebnis können mehrere Termine nötig sein. Wir besprechen mit dir, was möglich ist.",
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
  category: "master" | "top" | "junior";
  slug: string;
  location: string;
  skills: string[];
  quote: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Hai Yen",
    role: "Inhaberin · Masterstylist",
    img: "/images/team/hai-yen.webp",
    specialty: "Balayage-Expertin & Typberatung",
    category: "master",
    slug: "haiyen",
    location: "Striesen & Neustadt",
    skills: ["Balayage", "Typberatung", "Color Correction"],
    quote: "Ein guter Schnitt beginnt mit dem Zuhören – erst dann greife ich zur Schere.",
  },
  {
    name: "Lisa",
    role: "Masterstylist",
    img: "/images/team/lisa.webp",
    specialty: "Hochsteckfrisuren & Premium Extensions",
    category: "master",
    slug: "lisa",
    location: "Dresden Striesen",
    skills: ["Extensions", "Hochsteckfrisuren", "Braut-Styling"],
    quote: "Extensions dürfen niemals auffallen – nur das Ergebnis soll auffallen.",
  },
  {
    name: "Anika",
    role: "Masterstylist",
    img: "/images/team/anika.webp",
    specialty: "Kreative Farb- & Strähnentechniken",
    category: "master",
    slug: "anika",
    location: "Dresden Neustadt",
    skills: ["Highlights", "Creative Color", "Blondierung"],
    quote: "Farbe ist Handwerk und Gefühl zugleich – der Übergang macht den Unterschied.",
  },
  {
    name: "Josi",
    role: "Topstylist",
    img: "/images/team/josi.webp",
    specialty: "",
    category: "top",
    slug: "josi",
    location: "Dresden Striesen",
    skills: ["Cuts", "Styling", "Pflege-Rituale"],
    quote: "Der beste Look ist der, den du morgens in fünf Minuten selbst hinbekommst.",
  },
  {
    name: "Lea-Sophie",
    role: "Masterstylist",
    img: "/images/team/lea-sophie.jpeg",
    specialty: "",
    category: "master",
    slug: "lea-sophie",
    location: "Dresden",
    skills: [],
    quote: "",
  },
  {
    name: "Minh Anh",
    role: "Junior Stylist",
    img: "/images/team/minh-anh.webp",
    specialty: "",
    category: "junior",
    slug: "minh-anh",
    location: "Dresden",
    skills: [],
    quote: "",
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
  { src: "/images/galerie/Anika/381afdd4-8238-43c8-9d14-86ba273ed2c2.jpg", stylist: "anika", stylistName: "Anika", caption: "Highlights & Blowout" },
  { src: "/images/galerie/Lisa/IMG_1153.jpg", stylist: "lisa", stylistName: "Lisa", caption: "Kreative Coloration & Schnitt" },
  { src: "/images/galerie/Josi/IMG_1857.jpg", stylist: "josi", stylistName: "Josi", caption: "Highlights & Cut" },
  { src: "/images/galerie/Anika/4972abd3-b425-4c73-a79c-528c21571338.jpg", stylist: "anika", stylistName: "Anika", caption: "Soft Balayage & Cut" },
  { src: "/images/galerie/Lisa/IMG_9435.jpg", stylist: "lisa", stylistName: "Lisa", caption: "Highlights & Cut" },
  { src: "/images/galerie/Josi/IMG_3932.jpg", stylist: "josi", stylistName: "Josi", caption: "Highlights & Styling" },
  { src: "/images/galerie/Anika/IMG_0943.jpg", stylist: "anika", stylistName: "Anika", caption: "Soft Balayage & Styling" },
  { src: "/images/galerie/Lisa/IMG_1906.jpg", stylist: "lisa", stylistName: "Lisa", caption: "Soft Balayage & Styling" },
  { src: "/images/galerie/Josi/IMG_8571.jpg", stylist: "josi", stylistName: "Josi", caption: "Cut & Styling" }
];
