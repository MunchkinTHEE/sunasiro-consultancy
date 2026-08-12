# SUNASIRO CONSULTANCY — Website

Modern single-page website for **SUNASIRO CONSULTANCY**, a medical fitness & Occupational Safety & Health (OSH / HSE) consultancy based in Mombasa CBD, Kenya.

## Features

- Clean, conversion-focused design (white / luminous blue / red)
- Sticky header + mobile menu
- Hero, services overview, expandable accordion for all 8 service areas
- About, Industries, Resources, Contact form
- Floating WhatsApp button (`0788 780 850`)
- **Resend API ready** – form posts to `/api/contact` and emails `Sunasiro@gmail.com`
- Fire extinguisher training image included in About section

## Contact details

- **Phone / WhatsApp:** 0788 780 850
- **Email:** Sunasiro@gmail.com
- **Location:** Mombasa CBD, Mombasa County

---

## Deploy to Vercel (recommended – ~5 minutes)

### 1. Import the project
- Go to [vercel.com](https://vercel.com) → Add New Project
- Upload / import the `sunasiro-website` folder (or connect a GitHub repo containing it)

### 2. Add the Resend API key (keep it private)
1. In the Vercel project → **Settings → Environment Variables**
2. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** your Resend key (starts with `re_...`)
   - Apply to: Production, Preview & Development
3. Save

### 3. Deploy
Click **Deploy**. Vercel installs the `resend` package from `package.json` automatically.

### 4. Test
Open the live site, submit the contact form.  
You should receive the email at **Sunasiro@gmail.com**.

> While using Resend’s free onboarding domain the “from” address is limited. For production, verify your own domain in Resend and change the `from` field inside `api/contact.js`.

---

## Local development

```bash
cd sunasiro-website
npm install
npx vercel dev     # serves both the static site and /api/contact
```

## Project structure

```
sunasiro-website/
├── index.html          # Full website
├── api/
│   └── contact.js      # Serverless function (Resend)
├── package.json
└── README.md
```

## Security

Never share or commit the Resend API key.  
It must live only in the hosting environment variables.

---

Built for SUNASIRO CONSULTANCY — 2026.
