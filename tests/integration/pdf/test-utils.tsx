/**
 * Helper functions for PDF testing
 */

/**
 * Validates if a buffer is a valid PDF
 * Performs basic checks:
 * 1. Is it a Buffer?
 * 2. Does it have content?
 * 3. Does it start with the PDF magic number?
 * 4. Does it have a reasonable size for a resume PDF?
 */
export const isValidPDFBuffer = (buffer: Buffer): boolean => {
  if (!Buffer.isBuffer(buffer)) {
    return false;
  }
  
  // Check if buffer has content (non-zero size)
  if (buffer.length === 0) {
    return false;
  }
  
  // Check for PDF magic number (%PDF-)
  const pdfHeader = buffer.slice(0, 5).toString();
  if (pdfHeader !== '%PDF-') {
    return false;
  }

  // Check if the size is reasonable for a resume PDF (at least 1KB)
  if (buffer.length < 1000) {
    return false;
  }

  return true;
}; 