"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  Download,
  ExternalLink,
  FileText,
  Home,
  Minus,
  Plus,
} from "lucide-react";

import { PdfCanvasViewer } from "@/components/documents/pdf-canvas-viewer";
import { AVAILABLE_LANGUAGES, Language } from "@/constants/i18n";
import { getTranslations } from "@/constants/translations";

type DocumentViewerProps = {
  title: string;
  subtitle: string;
  pdfUrl: string;
  pdfFilename: string;
  homeHref?: string;
  currentLang?: Language;
};

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;

export function DocumentViewer({
  title,
  subtitle,
  pdfUrl,
  pdfFilename,
  homeHref = "/en",
  currentLang = AVAILABLE_LANGUAGES.en,
}: DocumentViewerProps) {
  const t = getTranslations(currentLang);
  const labels = t.documentViewer;
  const [zoom, setZoom] = useState(1);

  const zoomOut = useCallback(() => {
    setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP));
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP));
  }, []);

  const downloadPdf = useCallback(async () => {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`Failed to download ${pdfUrl}`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = pdfFilename;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  }, [pdfUrl, pdfFilename]);

  return (
    <div className="flex h-screen flex-col bg-[#1e1e1e] text-white">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#2d2d2d] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <FileText className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
          <div className="min-w-0">
            <h1 className="truncate text-sm font-medium">{title}</h1>
            <p className="truncate text-xs text-white/60">{subtitle}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => {
              void downloadPdf();
            }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
            title={labels.download}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{labels.download}</span>
          </button>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
            title={labels.openInNewTab}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">{labels.open}</span>
          </a>
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
            title={labels.backToHome}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">{labels.home}</span>
          </Link>
        </div>
      </header>

      <div className="relative flex flex-1 justify-center overflow-auto bg-[#1e1e1e] p-4 sm:p-8">
        <div className="w-full max-w-5xl">
          <PdfCanvasViewer
            pdfUrl={pdfUrl}
            zoom={zoom}
            title={title}
            labels={labels}
          />
        </div>
      </div>

      <footer className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-[#3c3c3c] px-4 py-2 text-sm shadow-lg">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 disabled:opacity-40"
            aria-label={labels.zoomOut}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[3.5rem] text-center text-white/80">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 disabled:opacity-40"
            aria-label={labels.zoomIn}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
