import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, "..", "public", "images");

const C = {
  ink: "#0B0B0D",
  ink2: "#151519",
  ink3: "#232329",
  paper: "#F3EFE6",
  paper2: "#E7E1D3",
  ember: "#FF6B35",
  honey: "#FFD166",
  aqua: "#5DE2E7",
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function write(rel, svg) {
  const p = join(base, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, svg, "utf8");
  console.log("  wrote", rel);
}

function wrap(w, h, label, defs = "", body = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
<defs>${defs}</defs>
${body}
</svg>`;
}

function text(x, y, str, { fill = "#F3EFE6", size = 20, weight = 500, spacing = 5, anchor = "middle", opacity = 1 } = {}) {
  return `<text x="${x}" y="${y}" fill="${fill}" opacity="${opacity}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" text-anchor="${anchor}">${esc(str)}</text>`;
}

/* ---------- Portrait / Hero ---------- */
function portrait({ w = 800, h = 1000, label = "PORTRAIT — PLACEHOLDER", glow = C.ember } = {}) {
  const cx = w * 0.5;
  const headY = h * 0.4;
  const headR = w * 0.16;
  const defs = `
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${C.ink}"/>
  <stop offset="1" stop-color="${C.ink2}"/>
</linearGradient>
<radialGradient id="halo" cx="0.5" cy="0.42" r="0.55">
  <stop offset="0" stop-color="${glow}" stop-opacity="0.5"/>
  <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
</radialGradient>`;
  const body = `
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#halo)"/>
<g opacity="0.55">
  <ellipse cx="${cx}" cy="${headY}" rx="${w * 0.34}" ry="${w * 0.12}" fill="none" stroke="${C.aqua}" stroke-width="1.5" transform="rotate(-18 ${cx} ${headY})"/>
  <circle cx="${cx + w * 0.3}" cy="${headY - w * 0.05}" r="6" fill="${C.ember}"/>
</g>
<g fill="${C.ink3}">
  <circle cx="${cx}" cy="${headY}" r="${headR}"/>
  <path d="M ${cx - w * 0.32} ${h} L ${cx - w * 0.32} ${h * 0.78} Q ${cx - w * 0.32} ${h * 0.64} ${cx - w * 0.12} ${h * 0.62} L ${cx + w * 0.12} ${h * 0.62} Q ${cx + w * 0.32} ${h * 0.64} ${cx + w * 0.32} ${h * 0.78} L ${cx + w * 0.32} ${h} Z"/>
</g>
<circle cx="${w * 0.18}" cy="${h * 0.2}" r="2.5" fill="${C.honey}" opacity="0.7"/>
<circle cx="${w * 0.82}" cy="${h * 0.3}" r="2" fill="${C.aqua}" opacity="0.6"/>
<circle cx="${w * 0.7}" cy="${h * 0.14}" r="1.6" fill="${C.paper}" opacity="0.5"/>
${text(w / 2, h - 40, label, { fill: "rgba(243,239,230,0.55)", size: 20, spacing: 6 })}`;
  return wrap(w, h, label, defs, body);
}

/* ---------- Memory scenes ---------- */
function memoryLandscape({ w = 750, h = 1000, label }) {
  const defs = `
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${C.aqua}" stop-opacity="0.35"/>
  <stop offset="0.6" stop-color="${C.paper}"/>
  <stop offset="1" stop-color="${C.paper2}"/>
</linearGradient>`;
  const body = `
<rect width="${w}" height="${h}" fill="url(#sky)"/>
<circle cx="${w * 0.68}" cy="${h * 0.28}" r="${w * 0.12}" fill="${C.honey}" opacity="0.9"/>
<path d="M0 ${h * 0.72} Q ${w * 0.3} ${h * 0.6} ${w * 0.55} ${h * 0.72} T ${w} ${h * 0.68} L ${w} ${h} L 0 ${h} Z" fill="${C.ink3}" opacity="0.85"/>
<path d="M0 ${h * 0.82} Q ${w * 0.4} ${h * 0.72} ${w * 0.7} ${h * 0.82} T ${w} ${h * 0.8} L ${w} ${h} L 0 ${h} Z" fill="${C.ink}" opacity="0.9"/>
${text(w / 2, h - 40, label, { fill: "rgba(11,11,13,0.55)", size: 20, spacing: 6 })}`;
  return wrap(w, h, label, defs, body);
}

function memoryGear({ w = 1000, h = 667, label }) {
  const cx = w / 2;
  const cy = h / 2;
  const R = w * 0.28;
  const teeth = 12;
  const pts = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (Math.PI * 2 * i) / (teeth * 2);
    const r = i % 2 === 0 ? R : R * 0.82;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  const defs = `<radialGradient id="g" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="${C.paper}"/><stop offset="1" stop-color="${C.paper2}"/></radialGradient>`;
  const body = `
<rect width="${w}" height="${h}" fill="url(#g)"/>
<polygon points="${pts.join(" ")}" fill="${C.ink3}"/>
<circle cx="${cx}" cy="${cy}" r="${R * 0.4}" fill="${C.paper}"/>
<circle cx="${cx}" cy="${cy}" r="${R * 0.16}" fill="${C.ember}"/>
${text(w / 2, h - 36, label, { fill: "rgba(11,11,13,0.55)", size: 20, spacing: 6 })}`;
  return wrap(w, h, label, defs, body);
}


function memoryNote({ w = 800, h = 800, label }) {
  const defs = `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ink}"/><stop offset="1" stop-color="${C.ink2}"/></linearGradient>`;
  const px = w * 0.2;
  const py = h * 0.18;
  const pw = w * 0.6;
  const ph = h * 0.62;
  const lengths = [0.6, 0.45, 0.55, 0.35, 0.5, 0.4];
  let lines = "";
  for (let i = 0; i < lengths.length; i++) {
    const ly = py + ph * 0.28 + i * (ph * 0.1);
    lines += `<line x1="${px + pw * 0.14}" y1="${ly}" x2="${px + pw * (0.14 + lengths[i])}" y2="${ly}" stroke="${C.ink}" stroke-opacity="0.28" stroke-width="4" stroke-linecap="round"/>`;
  }
  const body = `
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="10" fill="${C.paper}"/>
<rect x="${px}" y="${py}" width="${pw * 0.12}" height="${ph}" fill="${C.ember}" opacity="0.85"/>
${lines}
${text(w / 2, h - 40, label, { fill: "rgba(243,239,230,0.55)", size: 20, spacing: 6 })}`;
  return wrap(w, h, label, defs, body);
}

function memoryTrophy({ w = 750, h = 1000, label }) {
  const defs = `<radialGradient id="g" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="${C.ink2}"/><stop offset="1" stop-color="${C.ink}"/></radialGradient>`;
  const cx = w / 2;
  const top = h * 0.3;
  const body = `
<rect width="${w}" height="${h}" fill="url(#g)"/>
<circle cx="${cx}" cy="${top}" r="${w * 0.22}" fill="${C.ember}" opacity="0.15"/>
<g fill="${C.honey}">
  <path d="M ${cx - w * 0.14} ${top - w * 0.1} L ${cx + w * 0.14} ${top - w * 0.1} L ${cx + w * 0.1} ${top + w * 0.12} Q ${cx} ${top + w * 0.2} ${cx - w * 0.1} ${top + w * 0.12} Z"/>
  <rect x="${cx - w * 0.02}" y="${top + w * 0.16}" width="${w * 0.04}" height="${w * 0.1}"/>
  <rect x="${cx - w * 0.09}" y="${top + w * 0.26}" width="${w * 0.18}" height="${w * 0.04}" rx="4"/>
</g>
${text(w / 2, h - 40, label, { fill: "rgba(243,239,230,0.55)", size: 20, spacing: 6 })}`;
  return wrap(w, h, label, defs, body);
}

function memoryRoad({ w = 1000, h = 667, label }) {
  const defs = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.aqua}" stop-opacity="0.3"/><stop offset="1" stop-color="${C.paper}"/></linearGradient>`;
  const hx = w / 2;
  const hy = h * 0.55;
  const body = `
<rect width="${w}" height="${h}" fill="url(#sky)"/>
<circle cx="${w * 0.5}" cy="${h * 0.42}" r="${w * 0.09}" fill="${C.honey}"/>
<path d="M ${w * 0.32} ${h} L ${hx - w * 0.02} ${hy} L ${hx + w * 0.02} ${hy} L ${w * 0.68} ${h} Z" fill="${C.ink3}"/>
<line x1="${hx}" y1="${hy}" x2="${hx}" y2="${h}" stroke="${C.paper}" stroke-width="4" stroke-dasharray="14 18"/>
${text(w / 2, h - 36, label, { fill: "rgba(11,11,13,0.55)", size: 20, spacing: 6 })}`;
  return wrap(w, h, label, defs, body);
}

/* ---------- Certificate ---------- */
function certificate({ w = 900, h = 600, index, accent = C.ember }) {
  const m = 40;
  const defs = `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.paper}"/><stop offset="1" stop-color="${C.paper2}"/></linearGradient>`;
  const body = `
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}" fill="none" stroke="${C.ink}" stroke-opacity="0.25" stroke-width="2"/>
<rect x="${m + 10}" y="${m + 10}" width="${w - 2 * m - 20}" height="${h - 2 * m - 20}" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="1"/>
<rect x="${w * 0.3}" y="${h * 0.28}" width="${w * 0.4}" height="10" rx="5" fill="${C.ink}" opacity="0.55"/>
<rect x="${w * 0.38}" y="${h * 0.4}" width="${w * 0.24}" height="7" rx="3.5" fill="${C.ink}" opacity="0.3"/>
<rect x="${w * 0.34}" y="${h * 0.47}" width="${w * 0.32}" height="7" rx="3.5" fill="${C.ink}" opacity="0.22"/>
<circle cx="${w * 0.72}" cy="${h * 0.68}" r="${w * 0.055}" fill="${accent}"/>
<circle cx="${w * 0.72}" cy="${h * 0.68}" r="${w * 0.055}" fill="none" stroke="${C.ink}" stroke-opacity="0.2" stroke-width="2"/>
<path d="M ${w * 0.72 - w * 0.03} ${h * 0.72} L ${w * 0.72 - w * 0.045} ${h * 0.82} L ${w * 0.72} ${h * 0.78} L ${w * 0.72 + w * 0.045} ${h * 0.82} L ${w * 0.72 + w * 0.03} ${h * 0.72} Z" fill="${accent}" opacity="0.85"/>
<line x1="${w * 0.2}" y1="${h * 0.78}" x2="${w * 0.42}" y2="${h * 0.78}" stroke="${C.ink}" stroke-opacity="0.3" stroke-width="2"/>
${text(w / 2, h - 24, `CERTIFICATE ${String(index).padStart(2, "0")} — PLACEHOLDER`, { fill: "rgba(11,11,13,0.5)", size: 18, spacing: 5 })}`;
  return wrap(w, h, `Certificate ${index} placeholder`, defs, body);
}

/* ---------- Generate ---------- */
console.log("Generating placeholder media into public/images/ ...");

write("hero/hero-placeholder.svg", portrait({ w: 900, h: 1125, label: "HERO — PLACEHOLDER", glow: C.ember }));
write("photos/portrait-placeholder.svg", portrait({ w: 800, h: 1000, label: "PORTRAIT — PLACEHOLDER", glow: C.aqua }));

write("photos/memory-01-placeholder.svg", memoryLandscape({ w: 750, h: 1000, label: "MEMORY 01 — PLACEHOLDER" }));
write("photos/memory-02-placeholder.svg", memoryGear({ w: 1000, h: 667, label: "MEMORY 02 — PLACEHOLDER" }));
write("photos/memory-03-placeholder.svg", memoryNote({ w: 800, h: 800, label: "MEMORY 03 — PLACEHOLDER" }));
write("photos/memory-04-placeholder.svg", memoryTrophy({ w: 750, h: 1000, label: "MEMORY 04 — PLACEHOLDER" }));
write("photos/memory-05-placeholder.svg", memoryRoad({ w: 1000, h: 667, label: "MEMORY 05 — PLACEHOLDER" }));

const accents = [C.ember, C.honey, C.aqua];
for (let i = 1; i <= 10; i++) {
  write(
    `certificates/certificate-${String(i).padStart(2, "0")}-placeholder.svg`,
    certificate({ w: 900, h: 600, index: i, accent: accents[(i - 1) % 3] })
  );
}

console.log("Done. Placeholders written to public/images/");
