export function jwtExpMs(jwt?: string | null): number {
    try {
        if (!jwt) return 0;
        const [, payloadB64] = jwt.split(".");
        if (!payloadB64) return 0;
        const payload = JSON.parse(atob(payloadB64));
        return typeof payload?.exp === "number" ? payload.exp * 1000 : 0;
    } catch {
        return 0;
    }
}
