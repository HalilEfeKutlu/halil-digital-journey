"use client";

import { useState } from "react";
import { BookOpen, BrainCircuit, Code2, Cpu, Gamepad2, Sparkles, Wrench } from "lucide-react";

const ICONS = {
  code: Code2,
  hardware: Cpu,
  games: Gamepad2,
  stories: BookOpen,
  tinkering: Wrench,
  balance: Sparkles,
};

const OUTER_POSITIONS = [
  { x: 50, y: 19 },
  { x: 80, y: 38 },
  { x: 72, y: 76 },
  { x: 28, y: 76 },
  { x: 20, y: 38 },
];
const CENTER_POSITION = { x: 50, y: 50 };

function NodeButton({ node, position, selected, palette, onClick, center = false }) {
  const Icon = ICONS[node.key] ?? Sparkles;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`mind-map-node group z-10 flex flex-col items-center gap-2 rounded-2xl border px-3 py-3 text-center shadow-lg backdrop-blur-md transition-colors duration-300 sm:w-auto ${center ? "mind-map-node-center sm:min-w-36" : "sm:min-w-32 md:min-w-36"} ${selected ? "mind-map-node-selected" : ""}`}
      style={{
        "--node-x": `${position.x}%`,
        "--node-y": `${position.y}%`,
        borderColor: `color-mix(in srgb, ${palette.foreground} ${selected ? "42%" : "18%"}, transparent)`,
        backgroundColor: selected ? palette.panelStrong : palette.panel,
        color: palette.panelText,
        boxShadow: selected ? `0 20px 60px ${palette.glow}` : `0 10px 28px color-mix(in srgb, ${palette.foreground} 8%, transparent)`,
      }}
      aria-pressed={selected}
    >
      <span
        className="flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
        style={{ backgroundColor: `color-mix(in srgb, ${palette.foreground} ${selected ? "18%" : "12%"}, transparent)` }}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="text-xs font-semibold sm:text-sm">{node.title}</span>
    </button>
  );
}

export function MindMap({ palette, content }) {
  const centerNode = content.nodes.find((node) => node.key === "balance") ?? content.nodes[0];
  const outerNodes = content.nodes.filter((node) => node.key !== centerNode?.key);
  const [selectedKey, setSelectedKey] = useState(centerNode?.key ?? content.nodes[0]?.key ?? "balance");
  const selected = content.nodes.find((node) => node.key === selectedKey) ?? centerNode;
  const selectedOuterIndex = outerNodes.findIndex((node) => node.key === selected?.key);

  return (
    <section id="mindmap" className="scroll-mt-28 px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-12">
          <p className="mb-2 flex items-center gap-2 font-mono text-sm font-medium uppercase tracking-[0.2em]" style={{ color: palette.muted }}>
            <BrainCircuit className="size-4" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed" style={{ color: palette.muted }}>
            {content.body}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div
            className="mind-map-canvas relative grid gap-3 overflow-hidden rounded-3xl border p-4 backdrop-blur-xl sm:min-h-[560px] sm:block sm:p-6"
            style={{
              borderColor: `color-mix(in srgb, ${palette.foreground} 16%, transparent)`,
              backgroundColor: palette.panel,
              color: palette.panelText,
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden="true">
              <div
                className="mind-map-glow absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ backgroundColor: `color-mix(in srgb, ${palette.foreground} 14%, transparent)` }}
              />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `radial-gradient(color-mix(in srgb, ${palette.foreground} 18%, transparent) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <svg className="absolute inset-0 hidden size-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                {OUTER_POSITIONS.map((position, index) => {
                  const highlighted = selectedOuterIndex === index || selected?.key === centerNode?.key;
                  return (
                    <line
                      key={`center-${index}`}
                      className="mind-map-line"
                      x1={CENTER_POSITION.x}
                      y1={CENTER_POSITION.y}
                      x2={position.x}
                      y2={position.y}
                      stroke="currentColor"
                      strokeWidth={highlighted ? "0.55" : "0.28"}
                      strokeDasharray="2 2"
                      opacity={highlighted ? "0.72" : "0.22"}
                    />
                  );
                })}
                <path
                  d="M50 19 C74 22 88 42 72 76 C56 88 32 86 20 38 C27 24 39 18 50 19Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.25"
                  opacity="0.18"
                />
              </svg>
            </div>

            <NodeButton
              node={centerNode}
              position={CENTER_POSITION}
              selected={selected?.key === centerNode?.key}
              palette={palette}
              center
              onClick={() => setSelectedKey(centerNode.key)}
            />

            {outerNodes.map((node, index) => (
              <NodeButton
                key={node.key}
                node={node}
                position={OUTER_POSITIONS[index] ?? OUTER_POSITIONS[0]}
                selected={selected?.key === node.key}
                palette={palette}
                onClick={() => setSelectedKey(node.key)}
              />
            ))}
          </div>

          <aside
            key={selected?.key}
            className="animate-fade-up flex min-h-80 flex-col justify-between rounded-3xl border p-6 backdrop-blur-xl"
            style={{
              borderColor: `color-mix(in srgb, ${palette.foreground} 16%, transparent)`,
              backgroundColor: palette.panelStrong,
              color: palette.panelText,
            }}
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: palette.panelMuted }}>
                {content.panelLabel}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{selected?.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed" style={{ color: palette.panelMuted }}>
                {selected?.body}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {selected?.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${palette.foreground} 12%, transparent)`,
                    color: palette.panelText,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
