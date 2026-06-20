"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, Terminal, ToggleLeft, ToggleRight, X } from "lucide-react";

const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, " ");
const DEFAULT_ALIASES = {
  skills: "skills --list",
  "skill --list": "skills --list",
  projects: "ls projects",
  "ls project": "ls projects",
  about: "cat about.txt",
  "cat about": "cat about.txt",
  mail: "contact",
  whatsapp: "contact",
  "hire me": "sudo hire-me",
  hireme: "sudo hire-me",
};

export function GeekMode({ palette, content }) {
  const [on, setOn] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const scrollBoxRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);

  const responses = useMemo(() => content.commands.responses ?? {}, [content.commands.responses]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setInput("");

    if (!on) {
      setHistory([]);
      return;
    }

    setHistory([]);
    document.documentElement.classList.add("geek-glitch-soft");

    content.bootLines.slice(0, 4).forEach((line, index) => {
      const timer = setTimeout(() => {
        setHistory((prev) => [...prev, { type: "system", text: line }]);
      }, 120 * (index + 1));
      timers.current.push(timer);
    });

    const focusTimer = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 560);
    const cleanTimer = setTimeout(() => document.documentElement.classList.remove("geek-glitch-soft"), 900);
    timers.current.push(focusTimer, cleanTimer);

    return () => {
      timers.current.forEach(clearTimeout);
      document.documentElement.classList.remove("geek-glitch-soft");
    };
  }, [on, content.bootLines]);

  useEffect(() => {
    const box = scrollBoxRef.current;
    if (!box) return;
    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOn(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const runCommand = (rawCommand) => {
    const written = rawCommand.trim();
    const normalized = normalize(written);
    if (!normalized) return;

    if (normalized === "clear") {
      setHistory([]);
      setInput("");
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
      return;
    }

    const command = DEFAULT_ALIASES[normalized] ?? normalized;
    const response = responses[command] ?? content.commands.unknown;

    setHistory((prev) => [
      ...prev,
      { type: "command", text: `$ ${written}` },
      { type: response === content.commands.unknown ? "error" : "response", text: response },
    ]);
    setInput("");
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section id="geek" className="scroll-mt-28 px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <div
          className="geek-card relative overflow-hidden rounded-3xl border p-6 shadow-2xl sm:p-10"
          style={{
            borderColor: `color-mix(in srgb, ${palette.foreground} 24%, transparent)`,
            backgroundColor: palette.panel,
            color: palette.panelText,
            boxShadow: `0 24px 80px ${palette.glow}`,
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
            <div
              className="absolute -right-20 -top-20 size-56 rounded-full blur-3xl"
              style={{ backgroundColor: `color-mix(in srgb, ${palette.foreground} 24%, transparent)` }}
            />
            <div
              className="absolute -bottom-24 left-12 size-48 rounded-full blur-3xl"
              style={{ backgroundColor: `color-mix(in srgb, ${palette.foreground} 18%, transparent)` }}
            />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-sm font-medium uppercase tracking-[0.2em]" style={{ color: palette.panelMuted }}>
                <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{content.title}</h2>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed" style={{ color: palette.panelMuted }}>
                {content.body}
              </p>

              <button
                type="button"
                onClick={() => setOn((v) => !v)}
                aria-expanded={on}
                aria-controls="geek-terminal-panel"
                className="mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-3 font-mono text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                style={{
                  borderColor: `color-mix(in srgb, ${palette.foreground} 30%, transparent)`,
                  backgroundColor: on ? palette.foreground : `color-mix(in srgb, ${palette.foreground} 10%, transparent)`,
                  color: on ? palette.background : palette.panelText,
                }}
              >
                {on ? <ToggleRight className="size-5" aria-hidden="true" /> : <ToggleLeft className="size-5" aria-hidden="true" />}
                {on ? content.buttonOn : content.buttonOff}
              </button>
            </div>

            <div
              className="rounded-2xl border p-4 font-mono text-xs leading-relaxed"
              style={{
                borderColor: `color-mix(in srgb, ${palette.foreground} 18%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${palette.background} 36%, white)`,
                color: palette.panelMuted,
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Terminal className="size-4" aria-hidden="true" />
                <span>{content.terminalTitle}</span>
              </div>
              {content.commands.list.slice(0, 5).map((cmd) => (
                <p key={cmd} className="py-0.5">
                  <span style={{ color: palette.panelText }}>$</span> {cmd}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          id="geek-terminal-panel"
          className="grid transition-all duration-500 ease-out"
          style={{
            gridTemplateRows: on ? "1fr" : "0fr",
            opacity: on ? 1 : 0,
          }}
        >
          <div className="overflow-hidden">
            <div
              className="mt-5 overflow-hidden rounded-2xl border shadow-2xl"
              style={{
                borderColor: "rgba(80, 240, 160, 0.35)",
                backgroundColor: "#05080f",
              }}
              role="region"
              aria-label={content.terminalLabel}
            >
              <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: "rgba(80, 240, 160, 0.25)" }}>
                <div className="flex items-center gap-2">
                  <Terminal className="size-4" style={{ color: "#4ade80" }} aria-hidden="true" />
                  <span className="font-mono text-xs" style={{ color: "#4ade80" }}>
                    {content.terminalTitle}
                  </span>
                </div>
                <button type="button" onClick={() => setOn(false)} aria-label={content.close} className="rounded p-1 transition-colors hover:bg-white/10">
                  <X className="size-4" style={{ color: "#7dd3a8" }} aria-hidden="true" />
                </button>
              </div>

              <div ref={scrollBoxRef} className="max-h-[360px] min-h-[260px] overflow-y-auto p-4 font-mono text-sm leading-relaxed overscroll-contain">
                {history.map((line, i) => (
                  <p
                    key={`${line.text}-${i}`}
                    className="whitespace-pre-wrap py-0.5"
                    style={{
                      color: line.type === "command" ? "#fef08a" : line.type === "system" ? "#9fefc4" : line.type === "error" ? "#fca5a5" : "#d9f99d",
                    }}
                  >
                    {line.text}
                  </p>
                ))}
                <form
                  className="mt-2 flex items-center gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    runCommand(input);
                  }}
                >
                  <span style={{ color: "#4ade80" }}>$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent font-mono outline-none"
                    style={{ color: "#ecfccb" }}
                    placeholder={content.commands.placeholder}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
