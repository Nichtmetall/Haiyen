export interface SalonImage {
  src: string;
  alt: string;
  position: string;
  isStock: boolean;
  photographer: string;
  provider: string;
  source: string;
}

// Replace src/alt/position with the salon's own photos and set isStock to false.
// Stock photos illustrate the mood; they do not depict the Haiyen locations.
export const SALON_IMAGES: Record<"hero" | "detail" | "striesen" | "neustadt", SalonImage> = {
  hero: {
    src: "/images/salon/salon-hero.webp",
    alt: "Salon-Inspiration: grüne Stylingstühle, goldene Spiegel und warme Holzdetails",
    position: "50% 65%",
    isStock: true,
    photographer: "Harsh Vardhan",
    provider: "Pexels",
    source: "https://www.pexels.com/photo/elegant-modern-hair-salon-interior-design-31323301/",
  },
  detail: {
    src: "/images/salon/salon-interior.webp",
    alt: "Salon-Inspiration: Stylingplätze mit runden Spiegeln und warmen Wandleuchten",
    position: "50% 60%",
    isStock: true,
    photographer: "Giorgio Trovato",
    provider: "Unsplash",
    source: "https://unsplash.com/photos/a-hair-salon-with-chairs-and-a-mirror-u-jq0g_ZdZE",
  },
  striesen: {
    src: "/images/salon/salon-light.webp",
    alt: "Salon-Inspiration: helle Stylingplätze mit großen beleuchteten Spiegeln",
    position: "50% 53%",
    isStock: true,
    photographer: "Max Vakhtbovych",
    provider: "Pexels",
    source: "https://www.pexels.com/photo/photo-of-the-interior-of-a-salon-7750108/",
  },
  neustadt: {
    src: "/images/salon/salon-interior.webp",
    alt: "Salon-Inspiration: ruhiger Blick entlang der Spiegel und Friseurstühle",
    position: "50% 75%",
    isStock: true,
    photographer: "Giorgio Trovato",
    provider: "Unsplash",
    source: "https://unsplash.com/photos/a-hair-salon-with-chairs-and-a-mirror-u-jq0g_ZdZE",
  },
};
