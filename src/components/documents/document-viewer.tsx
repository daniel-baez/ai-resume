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

type DocumentViewerProps = {
  title: string;
  subtitle: string;
  pdfUrl: string;
  pdfFilename: string;
  previewImageUrl: string;
  homeHref?: string;
};

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;

export function DocumentViewer({
  title,
  subtitle,
  pdfUrl,
  pdfFilename,
  previewImageUrl,
  homeHref = "/en",
}: DocumentViewerProps) {
  const [zoom, setZoom] = useState(1);

  const zoomOut = useCallback(() => {
    setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP));
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP));
  }, []);

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
          <a
            href={pdfUrl}
            download={pdfFilename}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
            title="Download"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Open</span>
          </a>
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
            title="Back to portfolio"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>
        </div>
      </header>

      <div className="relative flex flex-1 justify-center overflow-auto bg-[#1e1e1e] p-4 sm:p-8">
        <div
          className="w-full max-w-5xl origin-top transition-transform duration-150"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="overflow-hidden rounded-sm bg-white shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImageUrl}
              alt={title}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <footer className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-[#3c3c3c] px-4 py-2 text-sm shadow-lg">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 disabled:opacity-40"
            aria-label="Zoom out"
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
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
