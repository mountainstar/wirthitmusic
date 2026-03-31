/**
 * One-off script: make dark background of logo transparent.
 * Usage: node scripts/make-logo-transparent.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public", "logo.png");
const outputPath = join(root, "public", "logo.png");

// Dark pixels (background) below this luminance threshold become transparent
const DARK_THRESHOLD = 55;

const image = sharp(inputPath);
const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  if (luminance < DARK_THRESHOLD) {
    data[i + 3] = 0; // set alpha to 0
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log("Done: public/logo.png now has transparent background.");
