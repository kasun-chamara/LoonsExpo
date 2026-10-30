// Small helpers shared by the SVG chart components.

export const formatNumber = n => Number(n).toLocaleString('en-US');

// Round a maximum up to a "nice" axis top and return evenly spaced ticks starting at 0.
export const niceScale = (max, steps = 3) => {
  const raw = max / steps;
  const magnitude = 10 ** Math.floor(Math.log10(raw || 1));
  const step = [1, 2, 2.5, 5, 10].map(m => m * magnitude).find(s => s >= raw) || magnitude * 10;
  return { max: step * steps, ticks: Array.from({ length: steps + 1 }, (_, i) => i * step) };
};

// Smooth SVG path through points using Catmull-Rom converted to cubic Beziers.
export const smoothPath = points =>
  points.reduce((d, p, i, pts) => {
    if (i === 0) return `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    const p0 = pts[i - 2] || pts[i - 1];
    const p1 = pts[i - 1];
    const p3 = pts[i + 1] || p;
    const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6];
    const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
    return `${d}C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  }, '');
