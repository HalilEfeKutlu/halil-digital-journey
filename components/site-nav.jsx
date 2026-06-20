"use client";

import { Languages, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { id: "current", key: "current" },
  { id: "routine", key: "routine" },
  { id: "mindmap", key: "mindMap" },
  { id: "projects", key: "projects" },
  { id: "roadmap", key: "roadmap" },
  { id: "geek", key: "geek" },
  { id: "contact", key: "contact" },
];

export function SiteNav({ palette, labels, lang, onLanguageToggle, activeSection = "home" }) {
  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 sm:top-5 sm:w-[calc(100%-3rem)]">
      <nav
        className="flex items-center justify-between gap-3 rounded-full border px-3 py-2 shadow-lg backdrop-blur-xl sm:px-4"
        style={{
          borderColor: `color-mix(in srgb, ${palette.foreground} 20%, transparent)`,
          backgroundColor: `color-mix(in srgb, ${palette.background} 78%, transparent)`,
          boxShadow: `0 18px 60px color-mix(in srgb, ${palette.foreground} 10%, transparent)`,
        }}
        aria-label="Site navigation"
      >
        <a
          href="#home"
          className="group relative flex shrink-0 items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold sm:px-3"
          aria-current={activeSection === "home" ? "page" : undefined}
        >
          <span
            className="flex size-7 items-center justify-center rounded-full"
            style={{
              backgroundColor: `color-mix(in srgb, ${palette.foreground} 12%, transparent)`,
            }}
            aria-hidden="true"
          >
            H
          </span>
          <span className="hidden sm:inline">Halil</span>
          <span
            className="absolute inset-x-3 -bottom-0.5 h-[2px] origin-center rounded-full transition-transform duration-300"
            style={{
              backgroundColor: palette.foreground,
              transform: activeSection === "home" ? "scaleX(1)" : "scaleX(0)",
            }}
            aria-hidden="true"
          />
        </a>

        <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-full px-1">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active ? "page" : undefined}
                className="group relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 sm:text-sm"
                style={{
                  color: active ? palette.foreground : palette.muted,
                  backgroundColor: active ? `color-mix(in srgb, ${palette.foreground} 8%, transparent)` : "transparent",
                }}
              >
                {item.id === "geek" && (
                  <Sparkles className="mr-1 inline size-3.5 animate-pulse" aria-hidden="true" />
                )}
                {labels[item.key]}
                <span
                  className="absolute inset-x-3 -bottom-0.5 h-[2px] origin-center rounded-full transition-transform duration-300 group-hover:scale-x-100"
                  style={{
                    backgroundColor: palette.foreground,
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                  }}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onLanguageToggle}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-transform duration-300 hover:scale-105"
          style={{
            borderColor: `color-mix(in srgb, ${palette.foreground} 22%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${palette.foreground} 8%, transparent)`,
          }}
          aria-label={lang === "tr" ? "Switch language to English" : "Dili Türkçeye çevir"}
        >
          <Languages className="size-3.5" aria-hidden="true" />
          {labels.language}
        </button>
      </nav>
    </header>
  );
}
