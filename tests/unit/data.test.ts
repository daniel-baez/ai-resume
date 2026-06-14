import { test, describe } from "node:test";
import assert from "node:assert";
import { getExperienceEntries, getProfileData } from "@/lib/data";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

describe("data", () => {
  for (const langCode of Object.keys(AVAILABLE_LANGUAGES)) {
    const lang = AVAILABLE_LANGUAGES[langCode];

    test(`${langCode}: pdf experiences are a filtered subset`, () => {
      const all = getExperienceEntries(lang, false);
      const pdfOnly = getExperienceEntries(lang, true);

      assert.ok(pdfOnly.length > 0);
      assert.ok(pdfOnly.length <= all.length);
      pdfOnly.forEach((exp) => assert.strictEqual(exp.pdf, true));
    });

    test(`${langCode}: experiences are sorted by order`, () => {
      const entries = getExperienceEntries(lang, false);

      for (let i = 1; i < entries.length; i++) {
        assert.ok(entries[i - 1].order <= entries[i].order);
      }
    });
  }

  test("profile data resolves translatable fields for each language", () => {
    for (const langCode of Object.keys(AVAILABLE_LANGUAGES)) {
      const profile = getProfileData(AVAILABLE_LANGUAGES[langCode]);

      assert.ok(profile.info.name.length > 0);
      assert.ok(profile.info.title.length > 0);
      assert.ok(Object.keys(profile.skills).length > 0);
    }
  });
});
