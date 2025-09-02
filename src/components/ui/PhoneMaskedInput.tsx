import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { onlyDigits } from "@/utils/phone";

const BASE = "+7 ";

function digitsToMasked(d: string): string {
    // d: 0..10 digits after country digit '7'
    if (d.length === 0) return BASE;
    if (d.length <= 3) return BASE + d;
    if (d.length <= 6) return BASE + d.slice(0,3) + " " + d.slice(3);
    if (d.length <= 8) return BASE + d.slice(0,3) + " " + d.slice(3,6) + d.slice(6);
    return BASE + d.slice(0,3) + " " + d.slice(3,6) + d.slice(6,8) + d.slice(8,10);
}

function normalizeDigits(raw: string): string {
    let di = onlyDigits(raw);
    if (!di) return "";
    if (di.startsWith("8")) di = "7" + di.slice(1);
    // if (di.length === 10) di = "7" + di;
    if (!di.startsWith("7")) di = "7" + di;
    if (di.length > 11) di = di.slice(0, 11);
    return di.slice(1); // national part (0..10 digits)
}

export interface PhoneMaskedInputProps extends React.ComponentPropsWithoutRef<"input"> {
    value: string;
    onValueChange: (masked: string) => void;
}

export const PhoneMaskedInput: React.FC<PhoneMaskedInputProps> = ({ value, onValueChange, ...rest }) => {
    const ref = useRef<HTMLInputElement>(null);
    const current = value || ""; // masked string from parent
    const d = normalizeDigits(current);
    const masked = digitsToMasked(d);

    useEffect(() => {
        if (!ref.current) return;
        const pos = masked.length;
        try { ref.current.setSelectionRange(pos, pos); } catch {}
    }, [masked]);

    return (
        <Input
            ref={ref}
            value={masked}
            onFocus={(e) => {
                if (!current) {
                    onValueChange(BASE);
                    // caret moves to end by effect
                }
            }}
            onBlur={(e) => {
                // if only base shown without digits — clear the field for neatness
                const text = e.currentTarget.value;
                if (text === BASE) onValueChange("");
            }}
            onChange={(e) => {
                const nextDigits = normalizeDigits(e.target.value || "");
                onValueChange(digitsToMasked(nextDigits));
            }}
            onPaste={(e) => {
                e.preventDefault();
                const text = (e.clipboardData || (window as any).clipboardData).getData("text");
                const nextDigits = normalizeDigits(text || "");
                onValueChange(digitsToMasked(nextDigits));
            }}
            inputMode="tel"
            placeholder="+7 ___ _______"
            maxLength={18}
            {...rest}
        />
    );
};

export default PhoneMaskedInput;