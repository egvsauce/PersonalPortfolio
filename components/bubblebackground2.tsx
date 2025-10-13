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

export default function BubblesBackground2() {
  const [bubbles, setBubbles] = React.useState<Bubble[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = React.useState(false);

  // Decide quality tier
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

    // BASE (your exact details)
    const BASE = {
      count: 3,
      sizeMin: 600,
      sizeMax: 800,
      durationMin: 10,
      durationMax: 30,
      opacityMinPct: 50, // 0.50
      opacityMaxPct: 85, // 0.85
      blurClass: "blur-2xl",
    };

    // Adaptive params (keeps your look; just lighter on phones)
    const params =
      tier === "desktop"
        ? BASE
        : tier === "mobile"
        ? {
            ...BASE,
            count: 1,                // fewer elements
            sizeMin: Math.round(BASE.sizeMin * 0.7), // smaller radii
            sizeMax: Math.round(BASE.sizeMax * 0.7),
            durationMin: Math.max(BASE.durationMin, 12), // gentle pace
            durationMax: Math.min(BASE.durationMax, 28),
            blurClass: "blur-lg",    // lighter blur for iOS perf
          }
        : {
            ...BASE,
            count: 0,                // honor reduced motion / data saver
            blurClass: "blur-none",
          };

    // Generate bubbles (client-side only)
    const generated =
      params.count === 0
        ? []
        : Array.from({ length: params.count }, () => {
            const size = rand(params.sizeMin, params.sizeMax); // px
            const durationSec = rand(params.durationMin, params.durationMax);
            const delaySec = rand(0, 1);
            // Keep your opacity range (0.50–0.85)
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

    // Pause/resume all animations when tab visibility changes
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
      {/* subtle gradient wash behind bubbles (kept) */}
      <div className="absolute inset-0" />

      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,                 // px
            height: b.size,                // px
            left: b.left,
            top: b.top,
            // *** Your exact color/gradient kept here ***
            background:
              "radial-gradient(circle, rgba(253, 179, 157, 0.5) 70%, rgba(253, 179, 157, 1) 100%)",
            // Smooth & cheap animations (transform/opacity only)
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
        /* Proper pause for all descendants when tab hidden */
        .bubbles-paused * { animation-play-state: paused !important; }
      `}</style>

      {/* Transform-only keyframes, respectful of Reduced Motion */}
      <style jsx global>{`
        @keyframes bubble-rise {
          0%   { transform: translate3d(0, 12px, 0) scale(1);    }
          50%  { transform: translate3d(0, -18px, 0) scale(1.015); }
          100% { transform: translate3d(0, 12px, 0) scale(1);    }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
