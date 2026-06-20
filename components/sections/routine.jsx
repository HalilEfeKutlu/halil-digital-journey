"use client";
import { useState } from "react";
import { HeartPulse, Cog, Sparkles, ChevronDown } from "lucide-react";

const ICONS = {
  heart: HeartPulse,
  cog: Cog,
  sparkles: Sparkles,
};

function TimelineCard({ item, palette, detailOpen, detailClose }) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[item.key] ?? HeartPulse;
  return (
    <li
      className="group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
      style={{
        borderColor: `color-mix(in srgb, ${palette.foreground} 16%, transparent)`,
        backgroundColor: palette.panel,
                  color: palette.panelText,
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 ${item.spin ? "group-hover:rotate-180" : "group-hover:scale-110"}`}
          style={{ backgroundColor: `color-mix(in srgb, ${palette.foreground} 12%, transparent)` }}
        >
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm font-semibold tabular-nums" style={{ color: palette.panelMuted ?? palette.muted }}>
              {item.time}
            </span>
            <h3 className="text-lg font-semibold sm:text-xl">{item.title}</h3>
          </div>
          <p className="mt-2 text-pretty leading-relaxed" style={{ color: palette.panelMuted ?? palette.muted }}>
            {item.body}
          </p>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:scale-105"
            style={{
              borderColor: `color-mix(in srgb, ${palette.foreground} 22%, transparent)`,
              color: palette.muted,
            }}
          >
            {open ? detailClose : detailOpen}
            <ChevronDown className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          <div
            className="grid transition-all duration-300 ease-out"
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              opacity: open ? 1 : 0,
            }}
          >
            <ul className="mt-4 space-y-2 overflow-hidden">
              {item.details.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: palette.foreground }} aria-hidden="true" />
                  <span style={{ color: palette.panelMuted ?? palette.muted }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Routine({ palette, content }) {
  return (
    <section id="routine" className="scroll-mt-28 px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-14">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em]" style={{ color: palette.panelMuted ?? palette.muted }}>
            {content.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
        </header>

        <ol className="relative space-y-6">
          {content.items.map((item) => (
            <TimelineCard
              key={`${item.time}-${item.title}`}
              item={item}
              palette={palette}
              detailOpen={content.detailOpen}
              detailClose={content.detailClose}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
