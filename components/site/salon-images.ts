export interface SalonImage {
  src: string;
  alt: string;
  position: string;
}

// Own photographs supplied in September 2026. Location assignment is not confirmed.
export const SALON_IMAGES = {
  hero: {
    src: "/images/salon/friseursalon-dresden-interieur.webp",
    alt: "Blick durch den Haiyen Hairdesign Friseursalon in Dresden mit schwarzen Stylingstühlen und warm beleuchteten Spiegeln",
    position: "50% 50%",
  },
  detail: {
    src: "/images/salon/barberplatz-dresden.webp",
    alt: "Barberplatz bei Haiyen Hairdesign in Dresden mit rundem Friseurstuhl und Holzspiegel",
    position: "50% 48%",
  },
  styling: {
    src: "/images/salon/stylingplaetze-dresden.webp",
    alt: "Stylingplätze mit hohen Spiegeln, schwarzen Friseurstühlen und goldfarbenen Wänden bei Haiyen Hairdesign",
    position: "50% 50%",
  },
  care: {
    src: "/images/salon/haarwaesche-pflege-dresden.webp",
    alt: "Waschbereich im Haiyen Hairdesign Salon mit gepolsterten Liegen, weißen Waschbecken und warmem Licht",
    position: "50% 50%",
  },
} satisfies Record<string, SalonImage>;

export const TEAM_IMAGE = {
  src: "/images/team/haiyen-hairdesign-team-dresden.webp",
  alt: "Das sechsköpfige Team von Haiyen Hairdesign in Dresden gemeinsam vor der Salonwand",
};
