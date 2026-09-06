/**
 * Builds a Resend `replyTo` value so a reply goes to the form submitter,
 * not the verified From mailbox (`contact@baezdaniel.cl`).
 *
 * Resend accepts `email@example.com` or `Name <email@example.com>`.
 * The display name is quoted (RFC 5322 quoted-string) so commas and other
 * specials are not parsed as address-list separators. Newlines and angle
 * brackets are stripped so they cannot inject a second mailbox.
 */
export function formatReplyTo(name: string, email: string): string {
  const mailbox = email.trim();
  const displayName = name
    .replace(/[\r\n<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!displayName) {
    return mailbox;
  }

  const quoted = `"${displayName.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  return `${quoted} <${mailbox}>`;
}
