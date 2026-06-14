"use client";

import { useEffect, useRef, useState } from "react";

type LinkOverlay = {
  id: string;
  url: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type PdfPageData = {
  pageNumber: number;
  width: number;
  height: number;
  links: LinkOverlay[];
};

type PdfCanvasViewerProps = {
  pdfUrl: string;
  zoom: number;
  title: string;
};

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
  return pdfjs;
}

async function extractLinks(
  page: {
    getAnnotations: () => Promise<
      Array<{
        id: string;
        subtype?: string;
        url?: string;
        unsafeUrl?: string;
        rect: number[];
      }>
    >;
  },
  viewport: { convertToViewportRectangle: (rect: number[]) => number[] }
): Promise<LinkOverlay[]> {
  const annotations = await page.getAnnotations();
  const links: LinkOverlay[] = [];

  for (const annotation of annotations) {
    if (annotation.subtype !== "Link") continue;

    const url = annotation.url || annotation.unsafeUrl;
    if (!url) continue;

    const [x1, y1, x2, y2] = viewport.convertToViewportRectangle(
      annotation.rect
    );
    const left = Math.min(x1, x2);
    const top = Math.min(y1, y2);

    links.push({
      id: String(annotation.id),
      url,
      left,
      top,
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
  }

  return links;
}

export function PdfCanvasViewer({ pdfUrl, zoom, title }: PdfCanvasViewerProps) {
  const [pages, setPages] = useState<PdfPageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRefs = useRef<Map<number, HTMLCanvasElement>>(new Map());

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      setLoading(true);
      setError(null);
      setPages([]);

      try {
        const pdfjs = await loadPdfJs();
        const pdf = await pdfjs.getDocument(pdfUrl).promise;
        const pageData: PdfPageData[] = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 1 });

          pageData.push({
            pageNumber,
            width: viewport.width,
            height: viewport.height,
            links: await extractLinks(page, viewport),
          });
        }

        if (!cancelled) {
          setPages(pageData);
          setLoading(false);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load PDF"
          );
          setLoading(false);
        }
      }
    }

    void loadPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (pages.length === 0) return;

    let cancelled = false;

    async function renderPages() {
      const pdfjs = await loadPdfJs();
      const pdf = await pdfjs.getDocument(pdfUrl).promise;

      for (const pageInfo of pages) {
        if (cancelled) return;

        const canvas = canvasRefs.current.get(pageInfo.pageNumber);
        if (!canvas) continue;

        const page = await pdf.getPage(pageInfo.pageNumber);
        const viewport = page.getViewport({ scale: zoom });
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
      }
    }

    void renderPages();

    return () => {
      cancelled = true;
    };
  }, [pages, pdfUrl, zoom]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-white/60">
        Loading document…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-sm text-white/70">
        <p>Could not render the PDF preview.</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-300 underline"
        >
          Open the PDF directly
        </a>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-5xl flex-col gap-4">
      {pages.map((page) => (
        <div
          key={page.pageNumber}
          className="relative overflow-hidden rounded-sm bg-white shadow-2xl"
          style={{
            width: page.width * zoom,
            height: page.height * zoom,
          }}
        >
          <canvas
            ref={(node) => {
              if (node) {
                canvasRefs.current.set(page.pageNumber, node);
              } else {
                canvasRefs.current.delete(page.pageNumber);
              }
            }}
            aria-label={`${title} — page ${page.pageNumber}`}
            className="block"
          />
          <div className="pointer-events-none absolute inset-0">
            {page.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto absolute block"
                style={{
                  left: link.left * zoom,
                  top: link.top * zoom,
                  width: link.width * zoom,
                  height: link.height * zoom,
                }}
                aria-label="Open link"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
