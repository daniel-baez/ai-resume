import { test, describe } from "node:test";
import assert from "node:assert";
import {
  getLanguageAlternates,
  getOgLocale,
  getOgLocaleAlternates,
} from "@/lib/seo";

describe("seo", () => {
  test("getOgLocale maps language codes to Open Graph locales", () => {
    assert.strictEqual(getOgLocale("en"), "en_US");
    assert.strictEqual(getOgLocale("es"), "es_ES");
    assert.strictEqual(getOgLocale("fr"), "fr_FR");
    assert.strictEqual(getOgLocale("de"), "en_US");
  });

  test("getOgLocaleAlternates excludes the current locale", () => {
    assert.deepStrictEqual(getOgLocaleAlternates("en"), ["es_ES", "fr_FR"]);
    assert.deepStrictEqual(getOgLocaleAlternates("fr"), ["en_US", "es_ES"]);
  });

  test("getLanguageAlternates includes x-default and all supported languages", () => {
    assert.deepStrictEqual(getLanguageAlternates("https://danielbaez.cl"), {
      "x-default": "https://danielbaez.cl/en",
      en: "https://danielbaez.cl/en",
      es: "https://danielbaez.cl/es",
      fr: "https://danielbaez.cl/fr",
    });
  });
});
