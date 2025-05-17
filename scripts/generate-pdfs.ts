const fs = require('fs');
const path = require('path');
const http = require('http');
const { IncomingMessage, ServerResponse } = require('http');
const { NextServer } = require('next/dist/server/next');

const LANGS = ['en', 'es', 'fr', 'de'];
const PORT = 3333;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'pdfs');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generatePDF(lang: string) {
  const url = `http://localhost:${PORT}/resume/${lang}`;
  const outPath = path.join(OUTPUT_DIR, `resume-${lang}.pdf`);
  const res = await globalThis.fetch(url);
  if (!res.ok) throw new Error(`Erreur lors de la génération du PDF pour ${lang}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  if (fs.statSync(outPath).size < 1000) throw new Error(`PDF ${outPath} trop petit, échec probable.`);
  console.log(`PDF généré: ${outPath}`);
}

(async () => {
  // Démarre Next.js programmatique
  const next = require('next');
  const app = next({ dev: false, dir: process.cwd() });
  await app.prepare();
  const handle = app.getRequestHandler();
  const server = http.createServer((req: InstanceType<typeof IncomingMessage>, res: InstanceType<typeof ServerResponse>) => handle(req, res));
  await new Promise<void>(resolve => server.listen(PORT, resolve));
  console.log(`Next.js lancé sur http://localhost:${PORT}`);

  try {
    for (const lang of LANGS) {
      try {
        await generatePDF(lang);
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













































































































