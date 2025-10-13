"use client";
import React from "react";

type Bubble = {
  size: number;
  top: string;
  left: string;
  opacity: number;
  durationSec: number;
  delaySec: number;
};

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function BubblesBackground3() {
  const [bubbles, setBubbles] = React.useState<Bubble[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = React.useState(false);

  const chooseTier = React.useCallback(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const mem = (navigator as any)?.deviceMemory ?? 8;
    const saveData = (navigator as any)?.connection?.saveData ?? false;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || saveData) return "off" as const;
    if (w < 768 || mem <= 4) return "mobile" as const;
    return "desktop" as const;
  }, []);

  React.useEffect(() => {
    const tier = chooseTier();

    // BASE — your exact desktop details
    const BASE = {
      count: 3,
      sizeMin: 700,
      sizeMax: 800,
      durationMin: 10,
      durationMax: 30,
      opacityMinPct: 39, // 0.39
      opacityMaxPct: 50, // 0.50
      blurClass: "blur-2xl",
    };

    // Adaptive params (lighter on phones, same look)
    const params =
      tier === "desktop"
        ? BASE
        : tier === "mobile"
        ? {
            ...BASE,
            count: 1, // fewer elements on phones
            sizeMin: Math.round(BASE.sizeMin * 0.7),
            sizeMax: Math.round(BASE.sizeMax * 0.7),
            durationMin: Math.max(BASE.durationMin, 12),
            durationMax: Math.min(BASE.durationMax, 28),
            blurClass: "blur-lg",
          }
        : { ...BASE, count: 0, blurClass: "blur-none" };

    // Generate only on the client (avoid hydration mismatch)
    const generated =
      params.count === 0
        ? []
        : Array.from({ length: params.count }, () => {
            const size = rand(params.sizeMin, params.sizeMax); // px
            const leftPct = rand(0, 100); // kept from your code (not used)
            const durationSec = rand(params.durationMin, params.durationMax);
            const bottomPx = rand(0, 100); // kept from your code (not used)
            const delaySec = rand(0, 1);
            const opacity = Number(
              (rand(params.opacityMinPct, params.opacityMaxPct) / 100).toFixed(2)
            );

            const vSlot = pick<"top" | "middle" | "bottom">([
              "top",
              "middle",
              "bottom",
            ]);
            const hSlot = pick<"left" | "middle" | "right">([
              "left",
              "middle",
              "right",
            ]);

            const top =
              vSlot === "top"
                ? "0px"
                : vSlot === "middle"
                ? `calc(50% - ${size / 2}px)`
                : `calc(100% - ${size}px)`;

            const left =
              hSlot === "left"
                ? "0px"
                : hSlot === "middle"
                ? `calc(50% - ${size / 2}px)`
                : `calc(100% - ${size}px)`;

            return { size, top, left, opacity, durationSec, delaySec };
          });

    setBubbles(generated);

    // Set responsive blur on the container
    const el = containerRef.current;
    if (el) el.dataset.blur = params.blurClass;

    // Pause all animations when tab is hidden
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [chooseTier]);

  return (
    <div
      ref={containerRef}
      className={`
        pointer-events-none fixed inset-0 -z-10 overflow-hidden
        [contain:layout_paint_size]
        ${paused ? "bubbles-paused" : ""}
      `}
    >
      {/* subtle gradient wash behind bubbles */}
      <div className="absolute inset-0" />

      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            // your exact gradient
            background:
              "radial-gradient(circle, rgba(242, 198, 253, 0.6) 70%, rgba(242, 198, 253, 1) 100%)",
            // transform-only animation for mobile smoothness
            animationName: "bubble-rise",
            animationDuration: `${b.durationSec}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            animationDelay: `${b.delaySec}s`,
            opacity: b.opacity,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
      ))}

      {/* Responsive blur control via data-attr */}
      <style jsx>{`
        div[data-blur='blur-2xl'] { filter: blur(40px); }
        div[data-blur='blur-lg']  { filter: blur(16px); }
        div[data-blur='blur-none']{ filter: none; }
        .bubbles-paused * { animation-play-state: paused !important; }
      `}</style>

      {/* Transform-only keyframes, respectful of Reduced Motion */}
      <style jsx global>{`
        @keyframes bubble-rise {
          0%   { transform: translate3d(0, 12px, 0) scale(1); }
          50%  { transform: translate3d(0, -18px, 0) scale(1.015); }
          100% { transform: translate3d(0, 12px, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
