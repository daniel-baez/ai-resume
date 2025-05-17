import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const LANGS = ['en', 'es', 'fr', 'de']; // À ajuster selon AVAILABLE_LANGUAGES
const PORT = 3333; // Port spécial pour éviter les conflits
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'pdfs');

// Création du répertoire pdfs s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generatePDF(lang: string) {
  const url = `${NEXT_PUBLIC_URL}/resume/${lang}`;
  const outPath = path.join(OUTPUT_DIR, `resume-${lang}.pdf`);
  // Utilise l'API fetch native de Node.js (Node 18+)
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erreur lors de la génération du PDF pour ${lang}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  if (fs.statSync(outPath).size < 1000) throw new Error(`PDF ${outPath} trop petit, échec probable.`);
  console.log(`PDF généré: ${outPath}`);
}

async function buildApp() {
  console.log('Building Next.js application...');
  return new Promise<void>((resolve, reject) => {
    const build = spawn('npm', ['run', 'build:original'], {
      stdio: 'inherit'
    });
    build.on('close', (code) => {
      if (code === 0) {
        console.log('Build réussi.');
        resolve();
      } else {
        reject(new Error(`Le build a échoué avec le code ${code}`));
      }
    });
    build.on('error', (err) => {
      reject(new Error(`Erreur lors du build: ${err.message}`));
    });
  });
}

function startServer() {
  return new Promise<{ server: ReturnType<typeof spawn>, pid: number }>((resolve, reject) => {
    console.log(`Démarrage du serveur Next.js sur le port ${PORT}...`);
    const server = spawn('npm', ['run', 'start', '--', '-p', PORT.toString()], {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: true
    });
    let output = '';
    let isReady = false;
    server.stdout?.on('data', (data) => {
      const chunk = data.toString();
      output += chunk;
      process.stdout.write(chunk);
      if (chunk.includes('Ready') || chunk.includes('ready')) {
        isReady = true;
        console.log(`Serveur démarré avec succès sur le port ${PORT}`);
        resolve({ server, pid: server.pid as number });
      }
    });
    server.stderr?.on('data', (data) => {
      process.stderr.write(data.toString());
    });
    setTimeout(() => {
      if (!isReady) {
        server.kill();
        reject(new Error(`Le serveur n'a pas démarré après 30 secondes. Dernier output: ${output}`));
      }
    }, 30000);
    server.on('error', (err) => {
      reject(new Error(`Erreur au démarrage du serveur: ${err.message}`));
    });
  });
}

function stopServer(pid: number) {
  console.log(`Arrêt du serveur (PID: ${pid})...`);
  try {
    process.kill(pid);
    console.log('Serveur arrêté avec succès.');
  } catch (e) {
    console.error(`Erreur lors de l'arrêt du serveur:`, e);
  }
}

(async () => {
  let serverProcess;
  try {
    await buildApp();
    serverProcess = await startServer();
    await new Promise(resolve => setTimeout(resolve, 2000));
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
    if (serverProcess?.pid) {
      stopServer(serverProcess.pid);
    }
  }
})();













































































































