// Diagnoses the Resend account/domain mismatch that causes 403 "Domain not verified".
// Run from calcverse/: `node scripts/check-resend.mjs`
// Reads RESEND_API_KEY + RESEND_FROM from .env.local.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');

let env = {};
try {
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
} catch {
  console.error('Could not read .env.local at', envPath);
  process.exit(1);
}

const KEY = env.RESEND_API_KEY;
const FROM = env.RESEND_FROM;

if (!KEY) {
  console.error('RESEND_API_KEY not set in .env.local');
  process.exit(1);
}

console.log('Checking Resend account for key:', KEY.slice(0, 8) + '…' + KEY.slice(-4));
console.log('Configured RESEND_FROM:', JSON.stringify(FROM));
console.log('---');

// Try listing domains (works only with "Full access" keys).
const domRes = await fetch('https://api.resend.com/domains', {
  headers: { Authorization: `Bearer ${KEY}` },
});

if (domRes.ok) {
  const { data } = await domRes.json();
  console.log('Domains visible to this API key:');
  if (!data || data.length === 0) {
    console.log('  (none)');
  } else {
    for (const d of data) {
      const status = d.status === 'verified' ? 'VERIFIED' : d.status.toUpperCase();
      console.log(`  - ${d.name}  [${status}]  region=${d.region}`);
    }
  }
  console.log('---');
} else {
  console.log('Cannot list domains (key is restricted to sending). Doing a test send instead…');
  console.log('---');
}

// Test send — surfaces the exact same error the production contact form hits.
const testRes = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: FROM,
    to: ['delivered@resend.dev'],
    subject: 'check-resend.mjs diagnostic',
    text: 'Diagnostic test send. Safe to ignore.',
  }),
});

const testBody = await testRes.text();
console.log(`Test send → ${testRes.status}`);
console.log(testBody);
console.log('---');

if (testRes.status === 200 || testRes.status === 201) {
  console.log('✓ Send succeeded. RESEND_API_KEY + RESEND_FROM in .env.local are correct.');
  console.log('  If production still 403s, Vercel env vars must differ from local. Re-check them.');
} else if (testRes.status === 403 && testBody.includes('not verified')) {
  console.log('✗ Domain not verified in THIS API key\'s account.');
  console.log('  Action: in Resend, switch accounts/workspaces (top-left) until you find');
  console.log('  the one where Domains shows allsmartcalculators.com as verified.');
  console.log('  Then API Keys → Create API Key (Full access) → copy → paste into Vercel');
  console.log('  RESEND_API_KEY → redeploy.');
} else if (testRes.status === 401) {
  console.log('✗ API key is invalid or revoked. Generate a new one in Resend.');
} else {
  console.log('✗ Unexpected error. Read the response body above.');
}
