"use client";
import { useEffect, useState } from "react";
import { ArrowDown, Code2, Cpu, Dumbbell, Gamepad2 } from "lucide-react";

const ICONS = {
  code: Code2,
  hardware: Cpu,
  games: Gamepad2,
  balance: Dumbbell,
};

export function Hero({ palette, content }) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i += 1;
      setTyped(content.typed.slice(0, i));
      if (i >= content.typed.length) clearInterval(id);
    }, 140);
    return () => clearInterval(id);
  }, [content.typed]);

  const cardStyle = {
    borderColor: `color-mix(in srgb, ${palette.foreground} 16%, transparent)`,
    backgroundColor: palette.panel,
                  color: palette.panelText,
  };
  const chipBg = `color-mix(in srgb, ${palette.foreground} 12%, transparent)`;

  return (
    <section id="home" className="flex min-h-screen scroll-mt-28 flex-col justify-center px-6 py-28 sm:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <div
          className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-medium tracking-wide"
          style={{
            borderColor: `color-mix(in srgb, ${palette.foreground} 25%, transparent)`,
            color: palette.muted,
          }}
        >
          <Code2 className="size-3.5" aria-hidden="true" />
          {content.eyebrow}
        </div>

        <h1 className="text-pretty text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          {content.greeting}{" "}
          <span className="relative inline-block">
            {typed}
            <span
              className="animate-blink ml-0.5 inline-block w-[3px] -translate-y-1 align-middle"
              style={{ height: "0.85em", backgroundColor: palette.foreground }}
              aria-hidden="true"
            />
          </span>
          .
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl text-balance text-lg leading-relaxed sm:text-xl"
          style={{ color: palette.muted, animationDelay: "0.2s" }}
        >
          {content.body}
        </p>

        <div className="animate-fade-up mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: "0.35s" }}>
          {content.cards.map(({ key, title, body }, index) => {
            const Icon = ICONS[key] ?? Code2;
            return (
              <article
                key={title}
                className="group flex min-h-48 flex-col justify-between rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ ...cardStyle, animationDelay: `${0.08 * index}s` }}
              >
                <div
                  className="flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: chipBg }}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="mt-6">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: palette.panelMuted ?? palette.muted }}>
                    {body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className="animate-fade-up mt-12 flex items-center gap-3 text-sm font-medium"
          style={{ color: palette.muted, animationDelay: "0.5s" }}
        >
          <ArrowDown className="animate-float-slow size-4" aria-hidden="true" />
          {content.scroll}
        </div>
      </div>
    </section>
  );
}
