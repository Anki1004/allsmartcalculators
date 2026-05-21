// One-shot fixer for CP1252-mojibake characters that crept into the calculator
// source files via copy-paste through a Windows-1252 round-trip. Reads each
// file as UTF-8, replaces the known mojibake substrings with their intended
// Unicode characters, and writes back as UTF-8 (no BOM).
//
// Safe to run multiple times — replacements are idempotent.
//
//   node scripts/fix-mojibake.mjs

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const calcDir = join(__dirname, '..', 'src', 'lib', 'calculators');

// Mojibake key built from explicit \u escapes so the source file itself stays
// unambiguous (no visually-identical-but-different strings). Each pattern is the
// CP1252 round-trip of the original UTF-8 byte sequence.
//
// Replacement order matters: longer / more specific patterns first.
const RAW_MAP = [
  ['â€”', '—'], // em dash — bytes E2 80 94
  ['â€“', '–'], // en dash – bytes E2 80 93
  ['â€™', '’'], // right single quote ' bytes E2 80 99
  ['â€˜', '‘'], // left single quote ' bytes E2 80 98
  ['â€œ', '“'], // left double quote " bytes E2 80 9C
  ['â€¦', '…'], // ellipsis … bytes E2 80 A6
  ['â‚', '₁'], // subscript ₁ bytes E2 82 81
  ['â‚‚', '₂'], // subscript ₂ bytes E2 82 82
  ['â‚€', '₀'], // subscript ₀ bytes E2 82 80
  ['â‚¬', '€'], // EUR € bytes E2 82 AC
  ['â‚¹', '₹'], // INR ₹ bytes E2 82 B9
  ['â‚©', '₩'], // KRW ₩ bytes E2 82 A9
  ['â‚±', '₱'], // PHP ₱ bytes E2 82 B1
  ['â‚¨', '₨'], // PKR ₨ bytes E2 82 A8
  ['â‚¦', '₦'], // NGN ₦ bytes E2 82 A6
  ['â‚º', '₺'], // TRY ₺ bytes E2 82 BA
  ['à¸¿', '฿'], // THB ฿ bytes E0 B8 BF
  ['à§³', '৳'], // BDT ৳ bytes E0 A7 B3
  ['Â£', '£'],       // £ bytes C2 A3
  ['Â¥', '¥'],       // ¥ bytes C2 A5
  ['Â·', '·'],       // · bytes C2 B7
];

const files = (await readdir(calcDir)).filter((f) => f.endsWith('.ts'));

let totalChanges = 0;
for (const name of files) {
  const path = join(calcDir, name);
  const original = await readFile(path, 'utf8');
  let fixed = original;
  let fileChanges = 0;
  for (const [bad, good] of RAW_MAP) {
    const parts = fixed.split(bad);
    if (parts.length > 1) {
      fileChanges += parts.length - 1;
      fixed = parts.join(good);
    }
  }
  if (fixed !== original) {
    await writeFile(path, fixed, 'utf8');
    console.log(`fixed ${name} — ${fileChanges} replacements`);
    totalChanges += fileChanges;
  } else {
    console.log(`no change ${name}`);
  }
}
console.log(`\nDone. Total replacements: ${totalChanges}`);
