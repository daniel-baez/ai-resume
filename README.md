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

Follow the instructions in the [.env.template](.env.template) file.

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

## Testing

The project includes both unit tests and smoke tests. The test suite is configured with Jest and runs in different environments based on the test type:

- Unit tests (`/tests/unit`): Uses jsdom environment for testing React components and utilities
- Smoke tests (`/tests/smoke`): Uses node environment for testing PDF generation and other system-level functionality

### Running Tests

Run all tests:
```bash
npm test
```

Run unit tests only:
```bash
npm run test:unit
```

Run smoke tests only:
```bash
npm run test:smoke
```

Run tests in watch mode during development:
```bash
npm run test:watch
```

Run tests in CI mode:
```bash
npm run test:ci
```

### Test Structure

- Unit tests focus on individual components and functions
  - Located in `/tests/unit/`
  - Test React components, utilities, and business logic
  - Uses mocks for external dependencies
  
- Smoke tests verify end-to-end functionality
  - Located in `/tests/smoke/`
  - Test PDF generation for all supported languages
  - Verify file generation, size, and performance
  - Run against the actual file system

