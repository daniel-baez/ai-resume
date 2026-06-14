import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "fs";
import path from "path";
import {
  getCertificateDocuments,
  getExperienceLetterDocuments,
  getResumeDocuments,
  getAllPreviewDocuments,
  resolveDocumentText,
} from "@/lib/document-sources";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

describe("document-sources", () => {
  test("certificates have unique slugs and expected count", () => {
    const certs = getCertificateDocuments();
    const slugs = certs.map((c) => c.slug);

    assert.strictEqual(certs.length, 6);
    assert.strictEqual(new Set(slugs).size, slugs.length);
  });

  test("certificate paths are consistent", () => {
    for (const cert of getCertificateDocuments()) {
      assert.strictEqual(cert.category, "certificate");
      assert.match(cert.sharePath, /^\/certificates\//);
      assert.strictEqual(cert.pdf, `${cert.sharePath}.pdf`);
      assert.strictEqual(
        cert.previewRelativePath,
        `certificates/og/${cert.slug}.jpg`
      );
    }
  });

  test("french certificate infers DELF issuer", () => {
    const frenchC1 = getCertificateDocuments().find((c) => c.slug === "french-c1");
    assert.ok(frenchC1);
    assert.strictEqual(frenchC1.subtitle, "DELF");
  });

  test("experience letters have expected slugs", () => {
    const letters = getExperienceLetterDocuments();
    const slugs = letters.map((l) => l.slug).sort();

    assert.strictEqual(letters.length, 3);
    assert.deepStrictEqual(slugs, [
      "adexus",
      "clear2pay",
      "santiago-stock-exchange",
    ]);
  });

  test("experience letter paths are consistent", () => {
    for (const letter of getExperienceLetterDocuments()) {
      assert.strictEqual(letter.category, "experience-letter");
      assert.match(letter.sharePath, /^\/experience-letters\//);
      assert.strictEqual(letter.pdf, `/experience_letters/${letter.slug}.pdf`);
    }
  });

  test("resume documents match available languages", () => {
    const resumes = getResumeDocuments();
    const langCodes = Object.keys(AVAILABLE_LANGUAGES).sort();

    assert.strictEqual(resumes.length, langCodes.length);
    assert.deepStrictEqual(
      resumes.map((r) => r.slug).sort(),
      langCodes
    );

    for (const resume of resumes) {
      assert.strictEqual(resume.category, "resume");
      assert.strictEqual(resume.pdf, `/pdfs/resume-${resume.slug}.pdf`);
      assert.strictEqual(resume.sharePath, `/resume/${resume.slug}`);
    }
  });

  test("getAllPreviewDocuments aggregates all document types", () => {
    const all = getAllPreviewDocuments();
    assert.strictEqual(all.length, 12);
    assert.strictEqual(new Set(all.map((d) => d.slug)).size, all.length);
  });

  test("resolveDocumentText falls back to en", () => {
    assert.strictEqual(
      resolveDocumentText({ en: "Hello", fr: "Bonjour" }, "xx"),
      "Hello"
    );
    assert.strictEqual(
      resolveDocumentText({ en: "Hello", fr: "Bonjour" }, "fr"),
      "Bonjour"
    );
  });

  test("resume titles exist for each available language", () => {
    for (const resume of getResumeDocuments()) {
      for (const lang of Object.keys(AVAILABLE_LANGUAGES)) {
        assert.ok(
          resume.title[lang],
          `resume ${resume.slug} missing title for ${lang}`
        );
      }
    }
  });

  test("committed certificate PDFs exist on disk", () => {
    const publicDir = path.join(process.cwd(), "public");
    const committedPdfs = [
      "certificates/crossfit-level1-trainer.pdf",
      "certificates/french-c1.pdf",
    ];

    for (const relativePath of committedPdfs) {
      assert.ok(
        fs.existsSync(path.join(publicDir, relativePath)),
        `missing committed PDF: ${relativePath}`
      );
    }
  });
});
