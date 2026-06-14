import { test, describe, afterEach } from "node:test";
import assert from "node:assert";
import { getSiteUrl } from "@/lib/site-url";

const ENV_KEYS = ["NEXT_PUBLIC_SITE_URL", "VERCEL_URL"] as const;
const savedEnv: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>> =
  {};

function saveEnv() {
  for (const key of ENV_KEYS) {
    savedEnv[key] = process.env[key];
  }
}

function restoreEnv() {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = savedEnv[key];
    }
  }
}

describe("site-url", () => {
  afterEach(() => {
    restoreEnv();
  });

  test("NEXT_PUBLIC_SITE_URL takes precedence and strips trailing slash", () => {
    saveEnv();
    process.env.NEXT_PUBLIC_SITE_URL = "https://danielbaez.cl/";
    delete process.env.VERCEL_URL;

    assert.strictEqual(getSiteUrl(), "https://danielbaez.cl");
  });

  test("VERCEL_URL is used when NEXT_PUBLIC_SITE_URL is unset", () => {
    saveEnv();
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.VERCEL_URL = "ai-resume.vercel.app";

    assert.strictEqual(getSiteUrl(), "https://ai-resume.vercel.app");
  });

  test("falls back to localhost", () => {
    saveEnv();
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_URL;

    assert.strictEqual(getSiteUrl(), "http://localhost:3000");
  });
});
