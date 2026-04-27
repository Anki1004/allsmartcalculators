import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CATEGORY_LABELS: Record<string, string> = {
  bug: 'Bug Report',
  suggest: 'Calculator Suggestion',
  feedback: 'General Feedback',
  legal: 'Legal / Privacy',
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, category } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const categoryLabel = CATEGORY_LABELS[category] ?? 'General';
    const from = process.env.RESEND_FROM ?? 'AllSmartCalculator <onboarding@resend.dev>';
    const to = process.env.CONTACT_TO_EMAIL ?? 'hello@allsmartcalculator.com';

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[AllSmartCalculator · ${categoryLabel}] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
          <div style="background:#080c25;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="color:#bd9dff;margin:0;font-size:20px">AllSmartCalculator — New Message</h1>
            <p style="color:#a6a9c9;margin:4px 0 0;font-size:13px">${categoryLabel}</p>
          </div>
          <div style="background:#0c112d;padding:32px;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr>
                <td style="padding:8px 0;color:#a6a9c9;font-size:13px;width:100px">From</td>
                <td style="padding:8px 0;color:#e2e3ff;font-size:13px">${name} &lt;${email}&gt;</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#a6a9c9;font-size:13px">Subject</td>
                <td style="padding:8px 0;color:#e2e3ff;font-size:13px">${subject}</td>
              </tr>
            </table>
            <div style="background:#121735;border-radius:8px;padding:20px">
              <p style="color:#a6a9c9;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">Message</p>
              <p style="color:#e2e3ff;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
            </div>
            <p style="color:#424662;font-size:11px;margin:24px 0 0">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] email send failed:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
