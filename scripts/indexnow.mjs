#!/usr/bin/env node
/**
 * Submit URLs to Bing (and Yandex, Naver, Seznam) via IndexNow.
 *
 * Google does not participate in IndexNow and ignores these submissions
 * entirely — for Google, use Search Console's URL Inspection tool or wait for
 * the sitemap to be recrawled. Bing, however, picks IndexNow submissions up in
 * minutes rather than the days a sitemap recrawl takes, which is why this
 * exists at all.
 *
 * Usage:
 *   node scripts/indexnow.mjs                          # submits sitemap URLs
 *   node scripts/indexnow.mjs scripts/new-urls.txt     # submits a file of URLs
 *   node scripts/indexnow.mjs --dry-run                # print, submit nothing
 *
 * The key file MUST already be live at
 * https://allsmartcalculators.com/<key>.txt before submitting. IndexNow fetches
 * it to prove you control the domain; if it 404s you get a 403 back and the
 * submission is discarded. Deploy first, then run this.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const HOST = 'allsmartcalculators.com';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// Every participating engine shares one submission, so this covers Bing,
// Yandex, Seznam and Naver in a single call.
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const fileArg = args.find((a) => !a.startsWith('--'));

/** The key is whatever <hex>.txt sits in public/ — no config to drift. */
function findKey() {
  const candidates = fs
    .readdirSync(PUBLIC_DIR)
    .filter((f) => /^[0-9a-f]{8,128}\.txt$/i.test(f));
  if (candidates.length === 0) {
    throw new Error(
      'No IndexNow key file found in public/. Create one with:\n' +
        '  node -e "const k=require(\'crypto\').randomBytes(16).toString(\'hex\');' +
        'require(\'fs\').writeFileSync(`public/${k}.txt`,k);console.log(k)"',
    );
  }
  if (candidates.length > 1) {
    throw new Error(
      `Several key files in public/ (${candidates.join(', ')}). ` +
        'Keep exactly one so the key and keyLocation cannot disagree.',
    );
  }
  const file = candidates[0];
  const key = file.replace(/\.txt$/i, '');
  const contents = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf8').trim();
  if (contents !== key) {
    throw new Error(
      `public/${file} must contain exactly "${key}" and nothing else — ` +
        `it currently contains "${contents}".`,
    );
  }
  return key;
}

async function urlsFromSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function urlsFromFile(file) {
  return fs
    .readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
}

async function main() {
  const key = findKey();
  const keyLocation = `${SITE}/${key}.txt`;

  // Fail early and loudly rather than getting a bare 403 from the API.
  const keyCheck = await fetch(keyLocation);
  if (!keyCheck.ok) {
    console.error(`✗ Key file is not live yet: ${keyLocation} returned HTTP ${keyCheck.status}`);
    console.error('  Deploy first — IndexNow fetches this file to verify you own the domain.');
    process.exit(1);
  }
  const served = (await keyCheck.text()).trim();
  if (served !== key) {
    console.error(`✗ ${keyLocation} serves "${served}" but the key is "${key}".`);
    process.exit(1);
  }
  console.log(`✓ Key file verified at ${keyLocation}`);

  const urlList = fileArg ? urlsFromFile(fileArg) : await urlsFromSitemap();
  const foreign = urlList.filter((u) => !u.startsWith(SITE));
  if (foreign.length) {
    console.error(`✗ ${foreign.length} URL(s) are not on ${HOST}, e.g. ${foreign[0]}`);
    process.exit(1);
  }

  console.log(`\n${urlList.length} URL(s) to submit:`);
  urlList.forEach((u) => console.log(`  ${u}`));

  if (dryRun) {
    console.log('\n--dry-run: nothing submitted.');
    return;
  }

  // IndexNow caps a single submission at 10,000 URLs.
  const BATCH = 10000;
  for (let i = 0; i < urlList.length; i += BATCH) {
    const batch = urlList.slice(i, i + BATCH);
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key, keyLocation, urlList: batch }),
    });

    // 200 = accepted, 202 = accepted, key validation pending. Both are fine.
    const explain = {
      200: 'accepted',
      202: 'accepted — key validation pending',
      400: 'bad request (malformed URL in the list)',
      403: 'key not valid for this host',
      422: 'URLs do not belong to the host, or the key does not match the schema',
      429: 'rate limited — too many submissions',
    }[res.status] ?? 'unexpected response';

    console.log(`\nHTTP ${res.status} — ${explain}`);
    if (res.status >= 400) {
      console.error(await res.text().catch(() => ''));
      process.exit(1);
    }
  }

  console.log('\nSubmitted. Bing usually reflects this in Webmaster Tools within a few hours.');
  console.log('Google ignores IndexNow — for Google use Search Console URL Inspection.');
}

main().catch((e) => {
  console.error(`✗ ${e.message}`);
  process.exit(1);
});
