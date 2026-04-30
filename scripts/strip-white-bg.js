// One-shot helper: convert a white-background PNG to transparent.
// Pixels brighter than `threshold` (default 245) are mapped to alpha 0,
// pixels darker stay opaque. Anti-aliasing edges fade smoothly.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const THRESHOLD = 240; // RGB min above which a pixel is considered "white"
const FEATHER = 25;    // soft edge band

async function strip(inFile, outFile) {
  const img = sharp(inFile).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const minC = Math.min(r, g, b);
    let alpha = data[i + 3];
    if (minC >= THRESHOLD) {
      alpha = 0;
    } else if (minC >= THRESHOLD - FEATHER) {
      alpha = Math.round(((THRESHOLD - minC) / FEATHER) * 255);
    }
    out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = alpha;
  }
  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outFile);
  console.log('wrote', outFile);
}

(async () => {
  const targets = process.argv.slice(2);
  for (const t of targets) await strip(t, t);
})();
