import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { formatNumber, niceScale } from './chartUtils';

const W = 560;
const H = 230;
const PAD = { left: 44, right: 14, top: 14, bottom: 34 };

/**
 * Grouped bar chart. `categories` is `[{ label, short, ...valuesBySeriesKey }]` and
 * `series` is `[{ key, label, color }]`.
 */
const BarChart = ({ categories, series, summary }) => {
  const theme = useTheme();
  const max = Math.max(...categories.flatMap(c => series.map(s => c[s.key])));
  const { max: top, ticks } = niceScale(max, 3);
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const band = innerW / categories.length;
  const barW = Math.min(18, (band - 14) / series.length);
  const y = v => PAD.top + innerH - (v / top) * innerH;
  const muted = theme.palette.text.secondary;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {ticks.map(t => (
        <g key={t}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke={theme.palette.border.main} />
          <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" fontSize="11" fill={muted}>{t >= 1000 ? `${t / 1000}K` : t}</text>
        </g>
      ))}
      {categories.map((c, i) => {
        const groupW = barW * series.length + 3 * (series.length - 1);
        const start = PAD.left + band * i + (band - groupW) / 2;
        const total = series.reduce((sum, s) => sum + c[s.key], 0);
        return (
          <g key={c.label}>
            {series.map((s, k) => (
              <rect key={s.key} x={start + k * (barW + 3)} y={y(c[s.key])} width={barW} height={Math.max(0, y(0) - y(c[s.key]))} rx="4" fill={s.color}>
                <title>{`${c.label} · ${s.label}: ${formatNumber(c[s.key])} (total ${formatNumber(total)})`}</title>
              </rect>
            ))}
            <text x={PAD.left + band * i + band / 2} y={H - 10} textAnchor="middle" fontSize="10.5" fill={muted}>{c.short}</text>
          </g>
        );
      })}
    </svg>
  );
};

BarChart.propTypes = {
  categories: PropTypes.array.isRequired,
  series: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string.isRequired, label: PropTypes.string, color: PropTypes.string.isRequired })).isRequired,
  summary: PropTypes.string.isRequired,
};

export default BarChart;
