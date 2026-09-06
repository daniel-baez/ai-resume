import { test, describe } from "node:test";
import assert from "node:assert";
import { formatReplyTo } from "@/lib/email-reply-to";

describe("formatReplyTo", () => {
  test("wraps a quoted display name around the mailbox", () => {
    assert.strictEqual(
      formatReplyTo("Ada Lovelace", "ada@example.com"),
      '"Ada Lovelace" <ada@example.com>'
    );
  });

  test("returns the mailbox alone when the name is blank", () => {
    assert.strictEqual(formatReplyTo("   ", "ada@example.com"), "ada@example.com");
  });

  test("quotes names that contain RFC address-list delimiters", () => {
    assert.strictEqual(
      formatReplyTo("Doe, John", "john@example.com"),
      '"Doe, John" <john@example.com>'
    );
  });

  test("strips header-breaking characters from the display name", () => {
    assert.strictEqual(
      formatReplyTo('Ada <evil@x.com>\nBcc: spam@x.com', "ada@example.com"),
      '"Ada evil@x.com Bcc: spam@x.com" <ada@example.com>'
    );
  });

  test("escapes quotes and backslashes inside the display name", () => {
    assert.strictEqual(
      formatReplyTo('Ada "A.L." Lovelace\\', "ada@example.com"),
      '"Ada \\"A.L.\\" Lovelace\\\\" <ada@example.com>'
    );
  });

  test("collapses whitespace in the display name", () => {
    assert.strictEqual(
      formatReplyTo("  Ada   Lovelace  ", " ada@example.com "),
      '"Ada Lovelace" <ada@example.com>'
    );
  });
});
