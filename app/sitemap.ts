import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/site/seo";
import { SALON_IMAGES, TEAM_IMAGE } from "@/components/site/salon-images";
import { GALLERY_ITEMS, TEAM } from "@/components/site/data";

const absolute = (path: string) => new URL(path, SITE_URL).href;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absolute("/"),
      images: [...Object.values(SALON_IMAGES).map(photo => photo.src), TEAM_IMAGE.src].map(absolute),
    },
    { url: absolute("/team"), images: [TEAM_IMAGE.src, ...TEAM.map(member => member.img)].map(absolute) },
    { url: absolute("/galerie"), images: GALLERY_ITEMS.map(item => absolute(item.src)) },
    { url: absolute("/booking") },
    { url: absolute("/impressum") },
    { url: absolute("/datenschutz") },
  ];
}
