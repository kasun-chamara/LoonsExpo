import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { formatNumber, niceScale, smoothPath } from './chartUtils';

const W = 560;
const H = 230;
const PAD = { left: 44, right: 14, top: 18, bottom: 34 };

/**
 * Smooth multi-series line chart with a filled area under the first series.
 * `series` is `[{ name, color, values }]`; every series has one value per label.
 */
const LineChart = ({ labels, series, summary }) => {
  const theme = useTheme();
  const max = Math.max(...series.flatMap(s => s.values));
  const { max: top, ticks } = niceScale(max);
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = i => PAD.left + (innerW * i) / (labels.length - 1);
  const y = v => PAD.top + innerH - (v / top) * innerH;
  const muted = theme.palette.text.secondary;
  const grid = theme.palette.border.main;

  const lines = series.map(s => ({ ...s, points: s.values.map((v, i) => [x(i), y(v)]) }));
  const first = lines[0];
  const peakIndex = first.values.indexOf(Math.max(...first.values));
  const gradientId = `line-area-${first.color.replace('#', '')}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={first.color} stopOpacity=".25" />
          <stop offset="1" stopColor={first.color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map(t => (
        <g key={t}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke={grid} />
          <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" fontSize="11" fill={muted}>{formatNumber(t)}</text>
        </g>
      ))}
      {labels.map((label, i) => (
        <text key={label} x={x(i)} y={H - 10} textAnchor="middle" fontSize="10.5" fill={muted}>{label}</text>
      ))}

      {[...lines].reverse().map((s, order) => (
        <g key={s.name}>
          {order === lines.length - 1 && (
            <path d={`${smoothPath(s.points)}L${x(labels.length - 1)} ${y(0)}L${x(0)} ${y(0)}Z`} fill={`url(#${gradientId})`} />
          )}
          <path d={smoothPath(s.points)} fill="none" stroke={s.color} strokeWidth={order === lines.length - 1 ? 3 : 2} strokeLinecap="round" strokeDasharray={order === lines.length - 1 ? undefined : '5 4'} />
        </g>
      ))}

      {lines.map(s => s.points.map(([px, py], i) => (
        <circle key={`${s.name}-${i}`} cx={px} cy={py} r={s === first ? 4 : 3} fill={theme.palette.background.paper} stroke={s.color} strokeWidth="2">
          <title>{`${labels[i]} · ${s.name}: ${formatNumber(s.values[i])}`}</title>
        </circle>
      )))}

      <g>
        <text x={x(peakIndex)} y={y(first.values[peakIndex]) - 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={theme.palette.text.primary}>
          Peak {formatNumber(first.values[peakIndex])}
        </text>
        <text x={x(peakIndex)} y={y(first.values[peakIndex]) - 9} textAnchor="middle" fontSize="10" fill={muted}>at {labels[peakIndex]}</text>
      </g>
    </svg>
  );
};

LineChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  series: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  summary: PropTypes.string.isRequired,
};

export default LineChart;
