/**
 * Helper functions for PDF testing
 */

export function isValidPDFBuffer(buffer: Buffer): boolean {
  if (!Buffer.isBuffer(buffer)) {
    return false;
  }

  if (buffer.length === 0) {
    return false;
  }

  const pdfHeader = buffer.slice(0, 5).toString();
  if (pdfHeader !== "%PDF-") {
    return false;
  }

  if (buffer.length < 1000) {
    return false;
  }

  return true;
}
