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

  React.useEffect(() => {
    // Generate only on the client to avoid hydration mismatch
    const count = 3;
    const generated = Array.from({ length: count }, () => {
      const size = rand(800,900); // px
      const leftPct = rand(0, 100); // %
      const durationSec = rand(15, 30);
      const bottomPx = rand(0,100);
      const delaySec = rand(0, 10);
      const opacity = Number((rand(39, 50) / 100).toFixed(2)); // 0.35–0.80
      const vSlot = pick<"top" | "middle" | "bottom">(["top", "middle", "bottom"]);
      const hSlot = pick<"left" | "middle" | "right">(["left", "middle", "right"]);

      // vertical position
      const top =
        vSlot === "top"
          ? "0px"
          : vSlot === "middle"
          ? `calc(50% - ${size / 2}px)`
          : `calc(100% - ${size}px)`; // bottom

      // horizontal position
      const left =
        hSlot === "left"
          ? "0px"
          : hSlot === "middle"
          ? `calc(50% - ${size / 2}px)`
          : `calc(100% - ${size}px)`; // right
      return {
        size,
        top,
        left,
        opacity,
        durationSec,
        delaySec,
      };
    });
    setBubbles(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden blur-2xl">
      {/* subtle gradient wash behind bubbles */}
      <div className="absolute inset-0" />

      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,                // px (number => px)
            height: b.size,               // px
            left: b.left,
            top: b.top,           // px
            background:
            "radial-gradient(circle, rgba(242, 198, 253, 0.6) 70%, rgba(242, 198, 253,1) 100%)",

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
