"use client";

import dynamic from "next/dynamic";

// The renderer never runs on the server, and it stays out of the initial bundle
// so the headline paints before the scene loads.
const HeroScene = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false },
);

export function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-90">
      <HeroScene />
    </div>
  );
}
