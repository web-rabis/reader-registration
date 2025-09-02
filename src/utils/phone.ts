export const onlyDigits = (s: string) => s.replace(/\D/g, "");

/** Format as +7 (XXX) XXX-XX-XX while typing */
export function formatKzPhone(raw: string): string {
  const digits = onlyDigits(raw);
  if (!digits) return "";
  let d = digits;
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d.length === 10) d = "7" + d;
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p1 = d.slice(1, 4);
  const p2 = d.slice(4, 7);
  const p3 = d.slice(7, 9);
  const p4 = d.slice(9, 11);
  let res = "+7";
  if (p1) res += " (" + p1;
  if (p1.length === 3) res += ")";
  if (p2) res += " " + p2;
  if (p3) res += "-" + p3;
  if (p4) res += "-" + p4;
  return res;
}

/** Normalize to +7XXXXXXXXXX for backend */
export function normalizeKzPhone(raw: string): string {
  const digits = onlyDigits(raw);
  if (!digits) return "";
  let d = digits;
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d.length === 10) d = "7" + d;
  if (!d.startsWith("7") || d.length < 11) return raw;
  return "+7" + d.slice(1, 11);
}

export function isValidKzPhoneE164(raw: string): boolean {
  return /^\+7\d{10}$/.test(normalizeKzPhone(raw));
}
