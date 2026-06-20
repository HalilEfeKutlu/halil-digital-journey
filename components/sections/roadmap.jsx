"use client";
import { Zap, Rocket, Trophy, BookOpen, Cpu, CircleDot, Gamepad2 } from "lucide-react";

const ICONS = {
  zap: Zap,
  rocket: Rocket,
  trophy: Trophy,
  book: BookOpen,
  cpu: Cpu,
  gamepad: Gamepad2,
};

export function Roadmap({ palette, content }) {
  return (
    <section id="roadmap" className="scroll-mt-28 px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-12">
          <p className="mb-2 flex items-center gap-2 font-mono text-sm font-medium uppercase tracking-[0.2em]" style={{ color: palette.panelMuted ?? palette.muted }}>
            <Zap className="size-4" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed" style={{ color: palette.panelMuted ?? palette.muted }}>
            {content.body}
          </p>
        </header>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.quests.map(({ span, status, key, title, body }) => {
            const locked = status === "kilitli";
            const Icon = ICONS[key] ?? Zap;
            return (
              <li
                key={title}
                className="group relative flex gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  borderColor: `color-mix(in srgb, ${palette.foreground} ${locked ? "12%" : "20%"}, transparent)`,
                  backgroundColor: palette.panel,
                  color: palette.panelText,
                  opacity: locked ? 0.82 : 1,
                }}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `color-mix(in srgb, ${palette.foreground} 12%, transparent)` }}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[11px]"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${palette.foreground} 10%, transparent)`,
                        color: palette.muted,
                      }}
                    >
                      {span}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px]" style={{ color: palette.panelMuted ?? palette.muted }}>
                      <CircleDot className="size-3" aria-hidden="true" />
                      {locked ? content.locked : content.active}
                    </span>
                  </div>
                  <h3 className="text-pretty font-semibold">{title}</h3>
                  <p className="mt-1 text-pretty text-sm leading-relaxed" style={{ color: palette.panelMuted ?? palette.muted }}>
                    {body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
