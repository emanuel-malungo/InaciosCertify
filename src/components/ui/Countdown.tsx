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
    { label: "DIAS", value: time.dias },
    { label: "HORAS", value: time.horas },
    { label: "MIN", value: time.minutos },
    { label: "SEG", value: time.segundos },
  ];

  return (
    <div className="flex items-end gap-2.5 sm:gap-3.5">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-end gap-2.5 sm:gap-3.5">
          <div className="flex flex-col items-center">
            <span
              className="font-black text-primary tabular-nums leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              }}
            >
              {String(value).padStart(2, "0")}
            </span>
            <span
              className="text-[10px] uppercase font-semibold tracking-[0.18em] text-text-muted mt-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className="text-gold font-black mb-4 sm:mb-5 leading-none text-base sm:text-xl select-none"
              style={{
                fontFamily: "var(--font-montserrat)",
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
