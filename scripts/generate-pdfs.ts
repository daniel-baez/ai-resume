const fs = require('fs');
const path = require('path');
const http = require('http');
const supertest = require('supertest');
const { NextServer } = require('next/dist/server/next');

const LANGS = ['en', 'es', 'fr', 'de'];
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'pdfs');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generatePDF(request: any, lang: string) {
  const res = await request.get(`/resume/${lang}`).buffer();
  if (res.status !== 200) throw new Error(`Erreur lors de la génération du PDF pour ${lang}`);
  const outPath = path.join(OUTPUT_DIR, `resume-${lang}.pdf`);
  fs.writeFileSync(outPath, res.body);
  if (fs.statSync(outPath).size < 1000) throw new Error(`PDF ${outPath} trop petit, échec probable.`);
  console.log(`PDF généré: ${outPath}`);
}

(async () => {
  // Build Next.js programmatically before starting the server
  console.log('Running Next.js build...');
  await require('next/dist/build').default(process.cwd(), null, false, false, false);

  // Démarre Next.js programmatique
  const next = require('next');
  const app = next({ dev: false, dir: process.cwd() });
  await app.prepare();
  const handle = app.getRequestHandler();
  const server = http.createServer((req: InstanceType<typeof http.IncomingMessage>, res: InstanceType<typeof http.ServerResponse>) => handle(req, res));
  const request = supertest(server);
  console.log('Next.js prêt (in-memory)');

  try {
    for (const lang of LANGS) {
      try {
        await generatePDF(request, lang);
      } catch (e) {
        console.error(e);
      }
    }
    console.log('Tous les PDFs ont été générés.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    server.close();
    await app.close?.();
    console.log('Serveur Next.js arrêté.');
  }
})();













































































































