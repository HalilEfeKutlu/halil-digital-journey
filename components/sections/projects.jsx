"use client";

import { ArrowUpRight, Calculator, LibraryBig, LayoutDashboard, Wrench } from "lucide-react";

const TECH_INFO = {
  "Next.js": "React tabanlı modern web framework'ü",
  React: "Arayüzleri bileşen mantığıyla kuran JavaScript kütüphanesi",
  Tailwind: "Hızlı ve düzenli arayüz stilleri için utility-first CSS",
  JavaScript: "Web tarafının temel programlama dili",
  UI: "Kullanıcının gördüğü ve etkileşime geçtiği arayüz katmanı",
  LocalStorage: "Tarayıcı içinde küçük verileri saklama alanı",
  "Veri Modeli": "Bilginin nasıl tutulacağını belirleyen yapı",
  "Data Model": "The structure that defines how information is stored",
  Donanım: "Fiziksel devre ve elektronik bileşenler",
  Hardware: "Physical circuits and electronic components",
  Dokümantasyon: "Yapılan işi anlaşılır şekilde kayıt altına alma",
  Documentation: "Recording work in a clear and reusable way",
  Arşiv: "Bilgileri düzenli ve tekrar bulunabilir tutma alanı",
  Archive: "A place to keep information organized and findable",
  Form: "Kullanıcıdan düzenli bilgi alan arayüz parçası",
  Hesaplama: "Girilen verilerden anlamlı sonuç üretme mantığı",
  Calculation: "Logic that turns entered data into useful results",
};

const ICONS = {
  layout: LayoutDashboard,
  library: LibraryBig,
  wrench: Wrench,
  calculator: Calculator,
};

function Tag({ tag, palette }) {
  const info = TECH_INFO[tag];
  return (
    <li className="group/tag relative">
      <span
        className="inline-flex cursor-default rounded-full px-2.5 py-1 text-xs font-medium"
        style={{
          backgroundColor: `color-mix(in srgb, ${palette.foreground} 10%, transparent)`,
          color: palette.panelMuted ?? palette.muted,
        }}
        tabIndex={0}
      >
        {tag}
      </span>
      {info && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 rounded-lg px-3 py-2 text-center text-xs leading-snug opacity-0 shadow-lg transition-opacity duration-200 group-hover/tag:opacity-100 group-focus-within/tag:opacity-100"
          style={{
            backgroundColor: palette.foreground,
            color: palette.background,
          }}
        >
          {info}
        </span>
      )}
    </li>
  );
}

export function Projects({ palette, content }) {
  return (
    <section id="projects" className="scroll-mt-28 px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-14">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em]" style={{ color: palette.muted }}>
            {content.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed" style={{ color: palette.muted }}>
            {content.body}
          </p>
          <p className="mt-2 max-w-2xl text-sm" style={{ color: palette.muted }}>
            {content.tooltipIntro}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {content.items.map((p) => {
            const Icon = ICONS[p.key] ?? LayoutDashboard;
            return (
              <article
                key={p.title}
                className="group relative flex min-h-64 flex-col rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  borderColor: `color-mix(in srgb, ${palette.foreground} 16%, transparent)`,
                  backgroundColor: palette.panel,
                  color: palette.panelText,
                }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
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
                        color: palette.panelMuted,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <ArrowUpRight className="size-5 opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden="true" />
                </div>

                <h3 className="text-pretty text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed" style={{ color: palette.panelMuted }}>
                  {p.body}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <Tag key={tag} tag={tag} palette={palette} />
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
