"use client";
import React from "react";

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function BubblesBackground() {
  // make ~16 bubbles with varied size/speed/position
  const bubbles = Array.from({ length: 5 }).map((_, i) => {
    const size = rand(800, 900);                       // px
    const left = rand(0, 100);                        // %
    const delay = rand(1000, 8000);                      // ms
    const duration = rand(12000, 24000);              // ms
    const opacity = (rand(0, 80) / 100).toFixed(2);  // 0.35–0.80

    return (
        <span
        key={i}
        className="absolute rounded-full blur-[120px]"
        style={{
            width: size,
            height: size,
            left: `${left}%`,
            bottom: 100,
            background: "radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(253,224,71,0) 70%)",
            animation: `bubble-rise ${rand(15, 30)}s infinite ease-in-out`,
            animationDelay: `${rand(0, 10)}s`,
            opacity: Number(opacity),
        }}
        />

    );
  });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* subtle gradient wash behind bubbles */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/40 to-sky-200/40 dark:via-slate-800/30 dark:to-slate-900/30 blur-2xl" />
      {bubbles}
    </div>
  );
}
