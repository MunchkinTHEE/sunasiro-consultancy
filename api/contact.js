// Vercel Serverless Function – Resend integration
// Sends consultation requests to Sunasiro@gmail.com
//
// Setup:
// 1. Deploy this project to Vercel
// 2. In Vercel Dashboard → Project → Settings → Environment Variables
//    add: RESEND_API_KEY = your_key_here
// 3. (Optional) Verify a custom domain in Resend and update the "from" address below

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS for browser form submissions
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const serviceLabel = service || 'General Enquiry';

    const { data, error } = await resend.emails.send({
      from: 'SUNASIRO Website <onboarding@resend.dev>', // Change to your verified domain later e.g. noreply@yourdomain.com
      to: ['Sunasiro@gmail.com'],
      reply_to: email,
      subject: `Consultation Request — ${serviceLabel}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
          <div style="background: linear-gradient(135deg, #0077b6, #00b4d8); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Consultation Request</h1>
            <p style="color: #e0f7fa; margin: 8px 0 0;">SUNASIRO CONSULTANCY website</p>
          </div>
          <div style="background: #f8fafc; padding: 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="margin: 0 0 16px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 0 0 16px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="margin: 0 0 16px;"><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
            <p style="margin: 0 0 16px;"><strong>Service Interest:</strong> ${escapeHtml(serviceLabel)}</p>
            <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(message)}</div>
            <p style="margin: 24px 0 0; font-size: 13px; color: #64748b;">
              Reply directly to this email to respond to the client.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again or call 0788 780 850.' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Server error. Please try again later or call 0788 780 850.' });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
