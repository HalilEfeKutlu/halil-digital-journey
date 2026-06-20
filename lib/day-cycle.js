// Color stops for the "A Day in My Life" scroll journey.
// Background colors are kept the same; the readable surfaces are now stable
// so cards do not suddenly flip to black while scrolling.
export const DAY_STOPS = [
  {
    at: 0,
    label: "Sabah",
    bg: [205, 232, 255],
  },
  {
    at: 0.34,
    label: "Öğle",
    bg: [255, 243, 214],
  },
  {
    at: 0.64,
    label: "Akşam",
    bg: [196, 92, 58],
  },
  {
    at: 0.88,
    label: "Gece",
    bg: [10, 20, 40],
  },
  {
    at: 1,
    label: "Gece",
    bg: [10, 20, 40],
  },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function lerpColor(a, b, t) {
  const eased = smoothstep(t);
  return [
    Math.round(lerp(a[0], b[0], eased)),
    Math.round(lerp(a[1], b[1], eased)),
    Math.round(lerp(a[2], b[2], eased)),
  ];
}

function mixColor(a, b, t) {
  const x = Math.min(1, Math.max(0, t));
  return [
    Math.round(lerp(a[0], b[0], x)),
    Math.round(lerp(a[1], b[1], x)),
    Math.round(lerp(a[2], b[2], x)),
  ];
}

function rgb([r, g, b]) {
  return `rgb(${r}, ${g}, ${b})`;
}

function rgba([r, g, b], alpha) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function paletteForProgress(progress) {
  const p = Math.min(1, Math.max(0, progress));
  let lower = DAY_STOPS[0];
  let upper = DAY_STOPS[DAY_STOPS.length - 1];

  for (let i = 0; i < DAY_STOPS.length - 1; i++) {
    if (p >= DAY_STOPS[i].at && p <= DAY_STOPS[i + 1].at) {
      lower = DAY_STOPS[i];
      upper = DAY_STOPS[i + 1];
      break;
    }
  }

  const span = upper.at - lower.at || 1;
  const t = Math.min(1, Math.max(0, (p - lower.at) / span));
  const bg = lerpColor(lower.bg, upper.bg, t);
  const phase = t < 0.5 ? lower.label : upper.label;

  const darkInk = [12, 23, 39];
  const lightInk = [248, 250, 252];
  const darkMuted = [43, 61, 87];
  const lightMuted = [226, 232, 240];
  const nightText = smoothstep((p - 0.70) / 0.14);

  // Page text follows the day/night background. Panels stay light and glassy
  // on purpose; this prevents sudden black card flips in the projects/roadmap area.
  const foreground = mixColor(darkInk, lightInk, nightText);
  const muted = mixColor(darkMuted, lightMuted, nightText);
  const panel = [255, 255, 255];
  const panelText = darkInk;
  const panelMuted = [47, 65, 91];
  const panelOpacity = 0.82 + smoothstep((p - 0.70) / 0.22) * 0.06;

  return {
    background: rgb(bg),
    foreground: rgb(foreground),
    muted: rgb(muted),
    panel: rgba(panel, panelOpacity),
    panelStrong: rgba(panel, Math.min(0.94, panelOpacity + 0.06)),
    panelText: rgb(panelText),
    panelMuted: rgb(panelMuted),
    glow: rgba(mixColor(darkInk, lightInk, nightText), 0.16),
    phase,
    isNight: p > 0.78,
  };
}
