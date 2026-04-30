// Generate a dark-mode variant of a logo PNG that keeps brand-color
// (teal/cyan) pixels intact and only lightens the dark-navy/blue pixels
// to white so the wordmark stays legible on dark backgrounds.
//
// Heuristic: classify each non-transparent pixel by HSL hue.
//   - hue > 200° (blue/navy)        → map to white
//   - hue ≤ 200° (teal/cyan/green)  → keep original color
//   - grayscale (max == min)        → treat as navy/text → white
// Blend a small feather band around the threshold to avoid hard edges.
const fs = require('fs');
const sharp = require('sharp');

const HUE_CUTOFF = 200;   // degrees
const FEATHER = 15;       // hue feather band (degrees) for soft edges
const DARK_CUTOFF = 50;   // pixels darker than this average → also navy

function rgbToHue(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === min) return -1;
  const d = max - min;
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  if (h < 0) h += 360;
  return h;
}

(async () => {
  const [src, dst] = process.argv.slice(2);
  const { data, info } = await sharp(src).ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    const hue = rgbToHue(r, g, b);
    const avg = (r + g + b) / 3;

    let t;
    if (hue < 0 || avg < DARK_CUTOFF) {
      t = 1;
    } else if (hue >= HUE_CUTOFF) {
      t = 1;
    } else if (hue >= HUE_CUTOFF - FEATHER) {
      t = (hue - (HUE_CUTOFF - FEATHER)) / FEATHER;
    } else {
      t = 0;
    }

    out[i]     = Math.round(r + (255 - r) * t);
    out[i + 1] = Math.round(g + (255 - g) * t);
    out[i + 2] = Math.round(b + (255 - b) * t);
    out[i + 3] = a;
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png().toFile(dst);
  console.log('wrote', dst, info.width + 'x' + info.height);
})();
