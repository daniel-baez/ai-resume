import { test, describe } from "node:test";
import assert from "node:assert";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { getTranslations, TranslationKeys } from "@/constants/translations";

const DOCUMENT_VIEWER_KEYS = [
  "download",
  "open",
  "openInNewTab",
  "home",
  "backToHome",
  "zoomIn",
  "zoomOut",
  "loadingDocument",
  "pdfRenderError",
  "openPdfDirectly",
  "openLink",
  "page",
] as const satisfies ReadonlyArray<keyof TranslationKeys["documentViewer"]>;

function assertNonEmptyStrings(
  values: Record<string, string>,
  label: string
) {
  for (const [key, value] of Object.entries(values)) {
    assert.ok(value.trim().length > 0, `${label}.${key} should be non-empty`);
  }
}

describe("translations", () => {
  for (const langCode of Object.keys(AVAILABLE_LANGUAGES)) {
    const lang = AVAILABLE_LANGUAGES[langCode];

    test(`${langCode}: documentViewer exposes all required keys`, () => {
      const t = getTranslations(lang);
      const keys = Object.keys(t.documentViewer).sort();

      assert.deepStrictEqual(keys, [...DOCUMENT_VIEWER_KEYS].sort());
      assertNonEmptyStrings(t.documentViewer, `${langCode}.documentViewer`);
    });
  }

  test("documentViewer home label is localized and not portfolio", () => {
    assert.strictEqual(getTranslations(AVAILABLE_LANGUAGES.en).documentViewer.home, "Home");
    assert.strictEqual(getTranslations(AVAILABLE_LANGUAGES.es).documentViewer.home, "Inicio");
    assert.strictEqual(getTranslations(AVAILABLE_LANGUAGES.fr).documentViewer.home, "Accueil");

    for (const langCode of Object.keys(AVAILABLE_LANGUAGES)) {
      const home = getTranslations(AVAILABLE_LANGUAGES[langCode]).documentViewer.home;
      assert.notStrictEqual(
        home.toLowerCase(),
        "portfolio",
        `${langCode} home label should not be portfolio`
      );
    }
  });

  test("documentViewer backToHome references home, not portfolio", () => {
    for (const langCode of Object.keys(AVAILABLE_LANGUAGES)) {
      const backToHome =
        getTranslations(AVAILABLE_LANGUAGES[langCode]).documentViewer.backToHome;

      assert.notStrictEqual(
        backToHome.toLowerCase(),
        "back to portfolio",
        `${langCode} backToHome should not mention portfolio`
      );
      assert.ok(
        !backToHome.toLowerCase().includes("portfolio"),
        `${langCode} backToHome should not mention portfolio`
      );
    }
  });
});
