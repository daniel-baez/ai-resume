import { test, describe } from "node:test";
import assert from "node:assert";
import {
  getDownloadDateSuffix,
  buildResumeDownloadFilename,
  buildCertificateDownloadFilename,
  buildExperienceLetterDownloadFilename,
} from "@/lib/download-filename";

const fixedDate = new Date(2026, 5, 13);

describe("download-filename", () => {
  test("getDownloadDateSuffix formats date with month name and padded day", () => {
    assert.strictEqual(getDownloadDateSuffix(fixedDate), "2026_june_13");
  });

  test("getDownloadDateSuffix pads single-digit day", () => {
    assert.strictEqual(
      getDownloadDateSuffix(new Date(2026, 0, 5)),
      "2026_january_05"
    );
  });

  test("buildResumeDownloadFilename", () => {
    assert.strictEqual(
      buildResumeDownloadFilename("en", fixedDate),
      "daniel_baez-resume-en_2026_june_13.pdf"
    );
  });

  test("buildCertificateDownloadFilename", () => {
    assert.strictEqual(
      buildCertificateDownloadFilename("french-c1", fixedDate),
      "daniel_baez-certificate-french-c1_2026_june_13.pdf"
    );
  });

  test("buildExperienceLetterDownloadFilename", () => {
    assert.strictEqual(
      buildExperienceLetterDownloadFilename("adexus", fixedDate),
      "daniel_baez-experience-letter-adexus_2026_june_13.pdf"
    );
  });
});
