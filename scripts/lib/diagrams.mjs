/** Diagrams drawn from the same numbers as the question. They never label the answer. */

export const DIAGRAM = { width: 480, height: 280 };

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function svg(body) {
  const { width, height } = DIAGRAM;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `<rect width="${width}" height="${height}" fill="#ffffff"/>`,
    body,
    "</svg>",
  ].join("");
}

const text = (x, y, label, anchor = "start") =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="14" fill="#1c1917" font-family="ui-sans-serif, system-ui, sans-serif">${escapeXml(label)}</text>`;

export function velocityTimeGraph({ u, v, t }) {
  const left = 56;
  const right = 456;
  const top = 28;
  const bottom = 228;
  const peak = Math.max(u, v, 1) * 1.25;
  const x = (seconds) => left + (seconds / t) * (right - left);
  const y = (speed) => bottom - (speed / peak) * (bottom - top);
  const x0 = x(0);
  const x1 = x(t);
  const y0 = y(u);
  const y1 = y(v);

  return svg(`
    <line x1="${left}" y1="${bottom}" x2="${right}" y2="${bottom}" stroke="#1c1917" stroke-width="1.5"/>
    <line x1="${left}" y1="${top}" x2="${left}" y2="${bottom}" stroke="#1c1917" stroke-width="1.5"/>
    <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#0f766e" stroke-width="2.5"/>
    <circle cx="${x0}" cy="${y0}" r="4" fill="#0f766e"/>
    <circle cx="${x1}" cy="${y1}" r="4" fill="#0f766e"/>
    ${text(x0 + 8, y0 - 10, `${u} m/s`)}
    ${text(x1 - 8, y1 - 10, `${v} m/s`, "end")}
    ${text(x1, bottom + 24, `${t} s`, "end")}
    ${text(left, bottom + 24, "0")}
    ${text(18, top + 4, "v")}
    ${text((left + right) / 2, 268, "time (s)", "middle")}
  `);
}

export function seriesCircuit({ v, r1, r2 }) {
  return svg(`
    <line x1="90" y1="70" x2="390" y2="70" stroke="#1c1917" stroke-width="1.5"/>
    <line x1="390" y1="70" x2="390" y2="210" stroke="#1c1917" stroke-width="1.5"/>
    <line x1="90" y1="210" x2="390" y2="210" stroke="#1c1917" stroke-width="1.5"/>
    <line x1="90" y1="96" x2="90" y2="210" stroke="#1c1917" stroke-width="1.5"/>
    <line x1="78" y1="96" x2="102" y2="96" stroke="#1c1917" stroke-width="3"/>
    <line x1="84" y1="110" x2="96" y2="110" stroke="#1c1917" stroke-width="1.5"/>
    <rect x="168" y="54" width="72" height="32" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
    <rect x="358" y="112" width="32" height="56" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
    ${text(168, 46, `R1 = ${r1} ohm`)}
    ${text(336, 188, `R2 = ${r2} ohm`, "end")}
    ${text(108, 108, `${v} V`)}
    ${text(240, 250, "series", "middle")}
  `);
}

function plotFrame() {
  return `
    <line x1="48" y1="140" x2="452" y2="140" stroke="#a8a29e" stroke-width="1"/>
    <line x1="240" y1="20" x2="240" y2="250" stroke="#a8a29e" stroke-width="1"/>
  `;
}

export function parabolaGraph({ a, b, c, x }) {
  const reach = Math.max(6, Math.abs(x));
  const xScale = 180 / reach;
  const samples = [];
  for (let sample = -reach; sample <= reach; sample += reach / 24) {
    samples.push({ x: sample, y: a * sample * sample + b * sample + c });
  }
  const peak = Math.max(...samples.map((point) => Math.abs(point.y)), 1);
  const points = samples.map(
    (point) => `${240 + point.x * xScale},${140 - (point.y / peak) * 110}`,
  );
  const mark = 240 + x * xScale;
  return svg(`
    ${plotFrame()}
    <polyline points="${points.join(" ")}" fill="none" stroke="#0f766e" stroke-width="2.5"/>
    <line x1="${mark}" y1="20" x2="${mark}" y2="250" stroke="#0f766e" stroke-dasharray="4 4" stroke-width="1.25"/>
    ${text(mark, 268, `x = ${x}`, "middle")}
    ${text(240, 16, "y", "middle")}
  `);
}

export function circleDiagram({ h, k, r }) {
  const pad = 36;
  const minX = h - r;
  const maxX = h + r;
  const minY = k - r;
  const maxY = k + r;
  const span = Math.max(maxX - minX, maxY - minY, 1);
  const scale = (DIAGRAM.width - pad * 2) / span;
  const cx = pad + (h - minX) * scale;
  const cy = pad + (maxY - k) * scale;
  return svg(`
    <circle cx="${cx}" cy="${cy}" r="${r * scale}" fill="none" stroke="#0f766e" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="3.5" fill="#1c1917"/>
    ${text(cx + 8, cy - 8, `(${h}, ${k})`)}
  `);
}

export function rayDiagram({ f, u }) {
  const left = 48;
  const right = 430;
  const axis = 150;
  const scale = (right - left - 40) / u;
  const objectX = right - u * scale;
  const focusX = right - f * scale;
  return svg(`
    <line x1="${left}" y1="${axis}" x2="${right + 8}" y2="${axis}" stroke="#1c1917" stroke-width="1.5"/>
    <path d="M ${right} 48 Q ${right - 28} ${axis} ${right} 252" fill="none" stroke="#1c1917" stroke-width="2"/>
    <line x1="${objectX}" y1="${axis}" x2="${objectX}" y2="78" stroke="#0f766e" stroke-width="2.5"/>
    <polygon points="${objectX},78 ${objectX - 5},90 ${objectX + 5},90" fill="#0f766e"/>
    <line x1="${focusX}" y1="${axis - 8}" x2="${focusX}" y2="${axis + 8}" stroke="#1c1917" stroke-width="1.5"/>
    ${text(objectX, 68, `object ${u} cm`, "middle")}
    ${text(focusX, axis + 28, `F ${f} cm`, "middle")}
    ${text(right - 8, 40, "mirror", "end")}
  `);
}
