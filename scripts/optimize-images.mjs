// Erzeugt zur Build-Zeit WebP-Varianten aller Bilder unter public/images,
// weil der statische Export keinen Image-Optimizer-Server hat.
// Ausgabe: public/_img/<pfad>.<breite>.webp (siehe components/site/image-loader.ts)
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import nextConfig from "../next.config.ts";

const SOURCE = "public/images";
const TARGET = "public/_img";
const SKIP = ["gallery-viewer"];
const QUALITY = 80;

const { deviceSizes, imageSizes } = nextConfig.images;
const widths = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return SKIP.includes(entry.name) ? [] : walk(full);
    return /\.(jpe?g|png|webp)$/i.test(entry.name) ? [full] : [];
  }));
  return files.flat();
}

async function isFresh(output, sourceTime) {
  try {
    return (await fs.stat(output)).mtimeMs >= sourceTime;
  } catch {
    return false;
  }
}

let written = 0;
for (const file of await walk(SOURCE)) {
  const relative = path.relative(SOURCE, file);
  const sourceTime = (await fs.stat(file)).mtimeMs;
  await fs.mkdir(path.join(TARGET, path.dirname(relative)), { recursive: true });

  for (const width of widths) {
    const output = path.join(TARGET, `${relative}.${width}.webp`);
    if (await isFresh(output, sourceTime)) continue;
    await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(output);
    written++;
  }
}

console.log(`optimize-images: ${written} Varianten erzeugt (Breiten: ${widths.join(", ")})`);
