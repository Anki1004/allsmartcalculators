// Trim transparent margins so the logo PNG bounds hug the artwork.
// Run after strip-white-bg.js. Only use on Navbar/Footer assets — NOT on
// favicon/apple-icon/manifest icons, which need safe-area padding.
const sharp = require('sharp');

(async () => {
  for (const f of process.argv.slice(2)) {
    await sharp(f).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 }).toFile(f + '.tmp');
    require('fs').renameSync(f + '.tmp', f);
    const meta = await sharp(f).metadata();
    console.log('trimmed', f, '→', meta.width, 'x', meta.height);
  }
})();
