"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcTimeLeft(): TimeLeft {
  // 8 de Setembro de 2026 — 00:00:00 (Evento Oficial)
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

interface CountdownProps {
  variant?: "dark" | "light";
}

export default function Countdown({ variant = "dark" }: CountdownProps) {
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

  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-start">
          <span
            className={`font-heading font-black tabular-nums leading-none tracking-tight text-2xl sm:text-3xl lg:text-4xl ${
              isDark ? "text-primary" : "text-white"
            }`}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span
            className={`font-sans text-xs font-bold uppercase tracking-wider mt-1 ${
              isDark ? "text-text-muted" : "text-white/70"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
