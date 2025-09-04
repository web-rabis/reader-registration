// Barcode.tsx
import React, { useEffect, useRef, useState } from "react";
// В обычном SPA можно импортировать напрямую:
// @ts-ignore
import bwipjs from "bwip-js"; // имеет методы toCanvas / toBuffer

type Props = {
    text: string;                 // данные штрих-кода
    bcid?: string;                // тип (ean13, code128, etc.)
    scale?: number;               // толщина узкой полосы (px)
    height?: number;              // высота штрихов (в мм, для bwip-js это условные единицы)
    includetext?: boolean;        // подпись под кодом
    textxalign?: "center"|"left"|"right";
    options?: Record<string, any>; // любые доп. опции bwip-js
    // Печать/верстка:
    mmWidth?: number;             // ширина ярлыка в мм (для печати)
    mmHeight?: number;            // высота ярлыка в мм (для печати)
    className?: string;
};

export default function Barcode({
                                    text,
                                    bcid = "ean13",
                                    scale = 3,
                                    height = 20,
                                    includetext = true,
                                    textxalign = "center",
                                    options = {},
                                    mmWidth = 48,
                                    mmHeight = 22,
                                    className,
                                }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        if (!canvasRef.current || !text) return;
        setErr("");
        try {
            // Генерация
            bwipjs.toCanvas(canvasRef.current, {
                bcid, text, scale, height, includetext, textxalign,
                // Важные дефолты для читаемости:
                backgroundcolor: "FFFFFF",  // белый фон
                paddingwidth: 10,           // quiet zone слева/справа (модули)
                paddingheight: 4,           // поля сверху/снизу
                ...options,
            });
        } catch (e: any) {
            setErr(e?.message || String(e));
        }
    }, [text, bcid, scale, height, includetext, textxalign, options]);

    // Сохранение PNG
    const downloadPng = () => {
        const c = canvasRef.current;
        if (!c) return;
        const a = document.createElement("a");
        a.href = c.toDataURL("image/png");
        a.download = `${bcid}-${text}.png`;
        a.click();
    };

    // Стили в мм → удобно для печати «фактический размер»
    const style: React.CSSProperties = {
        width: `${mmWidth}mm`,
        height: `${mmHeight}mm`,
        // четкие края при печати/скейле
        imageRendering: "pixelated",
    };

    return (
        <div className={className}>
            <canvas ref={canvasRef} style={style} hidden={true}/>
            {canvasRef?.current && <img src={canvasRef.current.toDataURL("image/png")} style={{
                width:"120px",
                height:"60px",
                marginLeft:"-6px",
                maxWidth:"120px",
            }}/>}
            {err && <div style={{ color: "crimson", marginTop: 6 }}>{err}</div>}

        </div>
    );
}
