"use client";
import { Sun, Sunrise, Sunset, Moon } from "lucide-react";

const ICONS = {
  Sabah: Sunrise,
  Öğle: Sun,
  Akşam: Sunset,
  Gece: Moon,
};

export function PhaseIndicator({ palette, label }) {
  const Icon = ICONS[palette.phase] ?? Sun;
  return (
    <div className="fixed right-4 top-20 z-40 hidden sm:block sm:right-6 sm:top-24">
      <div
        className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md"
        style={{
          borderColor: `color-mix(in srgb, ${palette.foreground} 20%, transparent)`,
          backgroundColor: `color-mix(in srgb, ${palette.background} 55%, transparent)`,
        }}
      >
        <Icon className="size-4" aria-hidden="true" />
        <span className="tracking-wide">{label ?? palette.phase}</span>
      </div>
    </div>
  );
}
