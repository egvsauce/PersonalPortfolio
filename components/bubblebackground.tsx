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

export default function BubblesBackground() {
  const [bubbles, setBubbles] = React.useState<Bubble[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Choose a quality tier for mobile/low-power devices
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

    // PARAM PRESETS (feel free to tweak numbers)
    const params =
      tier === "desktop"
        ? {
            count: 2,
            sizeMin: 700,
            sizeMax: 900,
            durationMin: 20,
            durationMax: 40,
            blurClass: "blur-2xl", // heavier blur ok on desktop
            baseOpacityMin: 0.2,
            baseOpacityMax: 0.4,
          }
        : tier === "mobile"
        ? {
            count: 1, // fewer nodes = less layout/paint
            sizeMin: 420,
            sizeMax: 560, // smaller radii for phones
            durationMin: 22, // slightly slower, feels calm at 30–45 fps cadence
            durationMax: 36,
            blurClass: "blur-lg", // lighter blur for iOS perf
            baseOpacityMin: 0.18,
            baseOpacityMax: 0.32,
          }
        : {
            // "off" tier – honor reduced motion / data saver
            count: 0,
            sizeMin: 0,
            sizeMax: 0,
            durationMin: 0,
            durationMax: 0,
            blurClass: "blur-none",
            baseOpacityMin: 0,
            baseOpacityMax: 0,
          };

    // Generate (client-only) to avoid hydration mismatch
    const generated =
      params.count === 0
        ? []
        : Array.from({ length: params.count }, () => {
            const size = rand(params.sizeMin, params.sizeMax); // px
            const durationSec = rand(params.durationMin, params.durationMax);
            const delaySec = rand(0, 1);
            const opacity = Number(
              (
                rand(
                  Math.round(params.baseOpacityMin * 100),
                  Math.round(params.baseOpacityMax * 100)
                ) / 100
              ).toFixed(2)
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

    // Attach blur class responsively
    const el = containerRef.current;
    if (el) {
      el.dataset.blur = params.blurClass;
    }

    // Pause/resume all animations when tab is hidden/visible
    const onVis = () => {
      if (!el) return;
      el.style.animationPlayState = document.hidden ? "paused" : "running";
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [chooseTier]);

  return (
    <div
      ref={containerRef}
      className={`
        pointer-events-none fixed inset-0 -z-10 overflow-hidden
        [contain:layout_paint_size]  /* isolates paint/layout */
      `}
      style={{
        // content-visibility is safe here but we keep the layer fixed,
        // so the main benefit is from contain + transform-only animations
      }}
    >
      {/* Subtle gradient wash behind bubbles (kept) */}
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
            // keep your warm glow; solid center is cheaper than heavy blur + filters
            background:
              "radial-gradient(circle, rgba(251,191,36,0.35) 60%, rgba(253,224,71,0) 70%)",
            // GPU-friendly: transform/opacity only
            animationName: "bubble-rise",
            animationDuration: `${b.durationSec}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            animationDelay: `${b.delaySec}s`,
            opacity: b.opacity,
            willChange: "transform, opacity",
            transform: "translateZ(0)", // promote to its own layer
          }}
        />
      ))}

      {/* Responsive blur control (tailwind via data attr) */}
      <style jsx>{`
        div[data-blur='blur-2xl'] {
          filter: blur(40px);
        }
        div[data-blur='blur-lg'] {
          filter: blur(16px);
        }
        div[data-blur='blur-none'] {
          filter: none;
        }
      `}</style>

      {/* Transform-only keyframes for smooth mobile perf */}
      <style jsx global>{`
        @keyframes bubble-rise {
          0% {
            transform: translate3d(0, 12px, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -18px, 0) scale(1.015);
          }
          100% {
            transform: translate3d(0, 12px, 0) scale(1);
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
