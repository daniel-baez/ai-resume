## About

This is a toy project to learn about Next.js, Tailwind CSS, and React. It is a resume builder that allows you to write your resume in different languages using Markdown and JSON. Based on the data you provide, it will generate a website and a PDF version of your resume.

It also offers a contact a calendly link to schedule a meeting with me or a contact form to send me an email. The contact form is protected by reCAPTCHA. Each contact request is saved in the database and you can see the requests in the Firebase console.

## Technologies

- Next.js
- Tailwind CSS
- React
- Markdown
- JSON
- Firebase
- resend
- reCAPTCHA
- Calendly

## How to specify the data

The data is specified in the `src/data` folder. Each language has its own folder with the following structure:

- `profile.json`: Contains the profile data.
- `experiences`: Contains the experience data.
- `education`: Contains the education data.
- `skills`: Contains the skills data.

## How to add a new language

1. Add a new folder with the language code (e.g. `es` for Spanish).
2. Add the `profile.json` file with the profile data.
3. Add the `experiences` folder with the experience data. 
4. Add the `education` folder with the education data.
5. Add the `skills` folder with the skills data.
6. Update the `src/constants/translations.ts` file with the translations for web and PDF.
7. Update the `src/constants/i18n.ts` file with the language code and name.

## How to configure API keys

Copy the [.env.template](.env.template) file to `.env` and fill in the values.

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| **Site URL** | | |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for SEO (sitemap, robots, og tags). Falls back to `VERCEL_URL` if not set. | No |
| `VERCEL_URL` | Automatically provided by Vercel during deployment. Used as fallback for site URL. | No (auto) |
| **Google Analytics** | | |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`) | No |
| **reCAPTCHA** | | |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key (public, used in the browser) | Yes |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key (server-side validation) | Yes |
| **Resend** | | |
| `RESEND_API_KEY` | API key for [Resend](https://resend.com) email service | Yes |
| **Firebase (Client)** | | |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | No |
| **Firebase (Admin / Server-side)** | | |
| `FIREBASE_PROJECT_ID` | Firebase project ID for Admin SDK | Yes |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account client email | Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key (with `\n` for newlines) | Yes |

## How to add a new experience

Add a markdown file in the `src/{lang}/data/experiences` folder with the experience data.

This file should have the following structure:

```markdown
---
title: {{TITLE}} # Title of the experience
location: {{LOCATION}} # Location of the experience
company: {{COMPANY_NAME}} # Company name
period: {{START_DATE}} - {{END_DATE}} # Period of the experience
order: {{ORDER}} # Order of the experience in the list
pdf: {{INCLUDED_IN_PDF}} # Whether the experience is included in the PDF version (default: false)
---

{{CONTENT}} # Content of the experience
```

## Dependencies

- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## Local Development

run the development server:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## To deploy production

Simply push to the main branch and the deployment will be triggered.