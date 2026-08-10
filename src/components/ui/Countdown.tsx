"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
}

function calcTimeLeft(): TimeLeft {
    // 8 de Setembro de 2026 — 00:00:00
    const target = new Date("2026-09-08T00:00:00").getTime();
    const diff = target - Date.now();

    if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };

    return {
        dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diff / (1000 * 60)) % 60),
        segundos: Math.floor((diff / 1000) % 60),
    };
}

export default function Countdown() {
    const [time, setTime] = useState<TimeLeft>(calcTimeLeft());

    useEffect(() => {
        const id = setInterval(() => setTime(calcTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    const units = [
        { label: "Dias", value: time.dias },
        { label: "Horas", value: time.horas },
        { label: "Min", value: time.minutos },
        { label: "Seg", value: time.segundos },
    ];

    return (
        <div className="flex items-end gap-3">
            {units.map(({ label, value }, i) => (
                <div key={label} className="flex items-end gap-3">
                    <div className="flex flex-col items-center">
                        <span
                            className="font-black text-primary tabular-nums leading-none"
                            style={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                            }}
                        >
                            {String(value).padStart(2, "0")}
                        </span>
                        <span
                            className="text-[10px] uppercase tracking-widest text-text-muted mt-1"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            {label}
                        </span>
                    </div>
                    {i < units.length - 1 && (
                        <span
                            className="text-gold font-black mb-5 leading-none"
                            style={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "1.4rem",
                            }}
                        >
                            :
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
