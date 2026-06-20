"use client";
import { ArrowUp, Code2, Briefcase, Mail, Moon } from "lucide-react";

const LINKS = [
  { label: "GitHub", href: "https://github.com/HalilEfeKutlu", icon: Code2 },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/halil-efe-kutlu-2b3b803b1/", icon: Briefcase },
];

export function ContactFooter({ palette, content }) {
  return (
    <footer id="contact" className="relative flex min-h-screen scroll-mt-28 flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
      <Moon
        className="animate-float-slow pointer-events-none absolute right-8 top-16 size-20 opacity-30 sm:right-20 sm:size-28"
        style={{
          opacity: palette.isNight ? 0.5 : 0.1,
          transition: "opacity 1s ease",
          color: "#f4f0d8",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em]" style={{ color: palette.muted }}>
          {content.eyebrow}
        </p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{content.title}</h2>
        <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed" style={{ color: palette.muted }}>
          {content.body}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:halilefekutlu01@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-50 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: palette?.foreground || "#000000",
              color: palette?.background || "#ffffff",
            }}
          >
            <Mail className="size-4" aria-hidden="true" />
            {content.email}
          </a>

          <div className="flex items-center gap-3">
            {LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: `color-mix(in srgb, ${palette.foreground} 25%, transparent)` }}
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-16 text-xs" style={{ color: palette.muted }}>
          © {new Date().getFullYear()} {content.copyright}
        </p>

        <a
          href="#home"
          className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          style={{
            borderColor: `color-mix(in srgb, ${palette.foreground} 22%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${palette.foreground} 8%, transparent)`,
            color: palette.foreground,
          }}
        >
          <ArrowUp className="size-4" aria-hidden="true" />
          {content.backToTop}
        </a>
      </div>
    </footer>
  );
}
