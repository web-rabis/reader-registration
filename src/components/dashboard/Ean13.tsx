
import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import Barcode from "./barcode";

function eanChecksum12(digits12: string): number {
    // EAN-13: (10 - ((sum_odd*1 + sum_even*3) % 10)) % 10
    const nums = digits12.split("").map(Number);
    const sum =
        nums.reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 1 : 3), 0);
    return (10 - (sum % 10)) % 10;
}

export function Ean13({ data12 }: { data12: string }) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;
        // if (!/^\d{12}$/.test(data12)) {
        //     console.error("EAN-13 requires 12 digits (payload)!");
        //     return;
        // }
        // const chk = eanChecksum12(data12);
        // const code13 = data12 + chk;

        JsBarcode(svgRef.current, data12, {
            format: "ean13",
            displayValue: false,     // подпись цифр под штрихкодом
            width: 1,               // толщина одной полосы (px)
            height: 30,             // высота полос (px)
            marginLeft: 5,
            margin: 0 ,
            font: "monospace",
            fontSize: 16,
            textMargin: -5,
        });
    }, [data12]);

    return <svg ref={svgRef} role="img" aria-label="EAN-13" className={""}/>

    // return <Barcode
    //     bcid="ean13"
    //     text={data12.substring(0,12)}   // 12 цифр — bwip-js посчитает checksum
    //     scale={1}             // толщина узкой полосы
    //     height={20}           // высота штрихов
    //     includetext
    //     textxalign="center"
    //     mmWidth={40}
    //     mmHeight={20}
    //     // можно подкрутить поля/контраст/шрифты:
    //     options={{
    //         textfont: "Helvetica",       // если нужен явный шрифт
    //         textsize: 12,
    //         // guardwhitespace: true,       // сохранять quiet zone
    //     }}
    // />
}
