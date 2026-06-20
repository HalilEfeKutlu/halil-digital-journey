"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "905060258474";

export function WhatsAppButton({ palette, content }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(content.text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.label}
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:bottom-6 sm:right-6"
      style={{
        backgroundColor: palette.foreground,
        color: palette.background,
        boxShadow: `0 16px 50px color-mix(in srgb, ${palette.foreground} 24%, transparent)`,
      }}
    >
      <span className="absolute inset-0 -z-10 rounded-full opacity-40 blur-xl transition-opacity duration-300 group-hover:opacity-70" style={{ backgroundColor: palette.foreground }} />
      <MessageCircle className="size-5 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
      <span className="hidden sm:inline">{content.label}</span>
    </a>
  );
}
