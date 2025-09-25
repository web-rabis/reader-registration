export const onlyDigits = (s: string) => s.replace(/\D/g, "");

/** Форматирование: +7 (XXX) XXX-XX-XX при вводе */
export function formatKzPhone(raw: string): string {
    const digits = onlyDigits(raw);
    if (!digits) return "";

    let d = digits;
    if (d.startsWith("8")) d = "7" + d.slice(1);      // 8 → 7
    d = d.replace(/^7+/, "7");                        // схлопнуть множественные 7
    if (d.length === 10) d = "7" + d;                  // добавить страновую 7 для NSN=10
    d = d.slice(0, 11);                               // максимум 11

    const p1 = d.slice(1, 4);
    const p2 = d.slice(4, 7);
    const p3 = d.slice(7, 9);
    const p4 = d.slice(9, 11);

    let res = "+7";
    if (p1) res += ` (${p1}`;
    if (p2) res += `) ${p2}`;
    if (p3) res += `-${p3}`;
    if (p4) res += `-${p4}`;
    return res;
}

/** Нормализация в E.164: +7XXXXXXXXXX */
export function normalizeKzPhone(raw: string): string {
    const digits = onlyDigits(raw);
    if (!digits) return "";

    let d = digits;
    if (d.startsWith("8")) d = "7" + d.slice(1);
    d = d.replace(/^7+/, "7");
    if (d.length === 10) d = "7" + d;
    d = d.slice(0, 11);

    if (!d.startsWith("7") || d.length < 11) return "";
    return "+7" + d.slice(1);
}

export function isValidKzPhoneE164(raw: string): boolean {
    return /^\+7\d{10}$/.test(normalizeKzPhone(raw));
}
