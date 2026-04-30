// Generate a white-on-transparent variant of a logo PNG, preserving alpha.
// Every non-transparent pixel is mapped to white (#ffffff) at original alpha.
// Use for dark-mode display where the original dark-text logo would disappear.
const fs = require('fs');
const sharp = require('sharp');

(async () => {
  const [src, dst] = process.argv.slice(2);
  const { data, info } = await sharp(src).ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    out[i] = 255; out[i + 1] = 255; out[i + 2] = 255; out[i + 3] = a;
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png().toFile(dst);
  console.log('wrote', dst, info.width + 'x' + info.height);
})();
