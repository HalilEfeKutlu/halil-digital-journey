"use client";

const SNIPPETS = [
  { code: "const curiosity = true", top: "12%", left: "6%", delay: "0s" },
  { code: "while (learning) { grow() }", top: "26%", left: "72%", delay: "1.2s" },
  { code: "questLog.push('portfolio')", top: "43%", left: "9%", delay: "0.6s" },
  { code: "git commit -m 'gelişim'", top: "60%", left: "78%", delay: "1.8s" },
  { code: "storyGames.level++", top: "78%", left: "8%", delay: "0.9s" },
  { code: "return clean(code)", top: "88%", left: "70%", delay: "2.1s" },
];

export function BackgroundElements({ palette }) {
  const line = `color-mix(in srgb, ${palette.foreground} 7%, transparent)`;
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)",
        }}
      />

      {SNIPPETS.map((s) => (
        <span
          key={s.code}
          className="animate-float-slow absolute font-mono text-[11px] sm:text-xs"
          style={{
            top: s.top,
            left: s.left,
            color: `color-mix(in srgb, ${palette.foreground} 14%, transparent)`,
            animationDelay: s.delay,
            animationDuration: "8s",
          }}
        >
          {s.code}
        </span>
      ))}
    </div>
  );
}
