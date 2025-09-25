import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtExpMs } from "@/lib/jwt.ts";

type AnyDict = Record<string, any>;

type Options<T extends AnyDict> = {
    storageKey: string;                 // напр. "dashboard:search"
    jwt: string | null | undefined;     // текущий JWT (из AuthContext)
    parse: (qs: URLSearchParams) => T;  // URL -> объект
    stringify: (v: T) => string;        // объект -> querystring (без "?")
    isDefault: (v: T) => boolean;       // дефолтное состояние?
};

type Stored<T> = { value: T; expMs: number };

export function usePersistedSearch<T extends AnyDict>(opts: Options<T>) {
    const { storageKey, jwt, parse, stringify, isDefault } = opts;
    const expMs = jwtExpMs(jwt ?? null);

    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState<T>(() => parse(new URLSearchParams(location.search)));
    const mounted = useRef(false);

    // на маунте: если в URL дефолт — поднимем из localStorage (если токен жив)
    useEffect(() => {
        const fromUrl = parse(new URLSearchParams(location.search));
        if (!isDefault(fromUrl)) {
            setState(fromUrl);
            return;
        }
        try {
            const raw = localStorage.getItem(storageKey);
            if (!raw) return;
            const { value, expMs: savedExp }: Stored<T> = JSON.parse(raw);
            if (savedExp && Date.now() < savedExp) {
                setState(value);
                const qs = stringify(value);
                navigate({ pathname: location.pathname, search: qs ? `?${qs}` : "" }, { replace: true });
            } else {
                localStorage.removeItem(storageKey);
            }
        } catch {
            // ignore
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // при изменении state: синхроним URL и localStorage
    useEffect(() => {
        if (!mounted.current) { mounted.current = true; return; }

        const qs = stringify(state);
        navigate({ pathname: location.pathname, search: qs ? `?${qs}` : "" }, { replace: true });

        if (expMs && Date.now() < expMs) {
            if (!isDefault(state)) {
                const payload: Stored<T> = { value: state, expMs };
                localStorage.setItem(storageKey, JSON.stringify(payload));
            } else {
                localStorage.removeItem(storageKey);
            }
        } else {
            localStorage.removeItem(storageKey);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const clear = () => {
        localStorage.removeItem(storageKey);
    };

    return useMemo(() => ({ value: state, setValue: setState, clear }), [state]);
}
