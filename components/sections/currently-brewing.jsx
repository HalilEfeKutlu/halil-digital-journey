"use client";
import { BookOpen, Clapperboard, Flame, Gamepad2, Target, Wrench } from "lucide-react";

const ICONS = {
  flame: Flame,
  target: Target,
  gamepad: Gamepad2,
  book: BookOpen,
  film: Clapperboard,
  wrench: Wrench,
};

export function CurrentlyBrewing({ palette, content }) {
  return (
    <section id="current" className="scroll-mt-28 px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-12">
          <p className="mb-2 flex items-center gap-2 font-mono text-sm font-medium" style={{ color: palette.panelMuted ?? palette.muted }}>
            <span className="inline-block size-2 animate-pulse rounded-full" style={{ backgroundColor: palette.foreground }} aria-hidden="true" />
            {content.status}
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.cards.map(({ tag, key, title, body }, index) => {
            const Icon = ICONS[key] ?? Flame;
            return (
              <article
                key={`${tag}-${title}`}
                className="group flex min-h-56 flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  borderColor: `color-mix(in srgb, ${palette.foreground} 16%, transparent)`,
                  backgroundColor: palette.panel,
                  color: palette.panelText,
                  animationDelay: `${index * 0.06}s`,
                }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `color-mix(in srgb, ${palette.foreground} 12%, transparent)` }}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 font-mono text-xs"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${palette.foreground} 10%, transparent)`,
                      color: palette.muted,
                    }}
                  >
                    {tag}
                  </span>
                </div>
                <h3 className="text-pretty text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed" style={{ color: palette.panelMuted ?? palette.muted }}>
                  {body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
