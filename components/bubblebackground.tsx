"use client";
import React from "react";

type Bubble = {
  size: number;
  leftPct: number;
  bottomPx: number;
  opacity: number;
  durationSec: number;
  delaySec: number;
};

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function BubblesBackground() {
  const [bubbles, setBubbles] = React.useState<Bubble[]>([]);

  React.useEffect(() => {
    // Generate only on the client to avoid hydration mismatch
    const count = 5;
    const generated = Array.from({ length: count }, () => {
      const size = rand(800, 900); // px
      const leftPct = rand(0, 100); // %
      const durationSec = rand(15, 30);
      const delaySec = rand(0, 10);
      const opacity = Number((rand(35, 80) / 100).toFixed(2)); // 0.35–0.80
      return {
        size,
        leftPct,
        bottomPx: 100,
        opacity,
        durationSec,
        delaySec,
      };
    });
    setBubbles(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* subtle gradient wash behind bubbles */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/40 to-sky-200/40 dark:via-slate-800/30 dark:to-slate-900/30 blur-2xl" />

      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            width: b.size,                // px (number => px)
            height: b.size,               // px
            left: `${b.leftPct}%`,
            bottom: b.bottomPx,           // px
            background:
              "radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(253,224,71,0) 70%)",
            // Longhand animation props — avoids the warning
            animationName: "bubble-rise",
            animationDuration: `${b.durationSec}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            animationDelay: `${b.delaySec}s`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}
