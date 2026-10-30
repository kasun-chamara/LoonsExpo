import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { formatNumber } from './chartUtils';

const SIZE = 212;
const RADIUS = 68;
const STROKE = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// Round caps stick out by half the stroke on each end, so the gap has to be wider than the stroke to leave a visible space.
const VISIBLE_GAP = 10;
const GAP = STROKE + VISIBLE_GAP;

/**
 * Donut chart with a centre label. `parts` is `[{ label, value, color }]`.
 */
const DonutChart = ({ parts, total, caption, summary, size = 196 }) => {
  const theme = useTheme();
  const sum = parts.reduce((s, p) => s + p.value, 0);
  let offset = 0;

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={summary} style={{ width: size, height: size, flex: 'none' }}>
      <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke={theme.palette.action.hover} strokeWidth={STROKE} />
      {parts.map(p => {
        const length = (p.value / sum) * CIRCUMFERENCE;
        const dash = Math.max(length - GAP, 1);
        const circle = (
          <circle
            key={p.label}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={p.color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
            strokeDashoffset={-(offset + GAP / 2)}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          >
            <title>{`${p.label}: ${formatNumber(p.value)} (${Math.round((p.value / sum) * 100)}%)`}</title>
          </circle>
        );
        offset += length;
        return circle;
      })}
      <text x={SIZE / 2} y={SIZE / 2 + 2} textAnchor="middle" fontSize="26" fontWeight="800" fill={theme.palette.text.primary}>{total}</text>
      <text x={SIZE / 2} y={SIZE / 2 + 20} textAnchor="middle" fontSize="12" fill={theme.palette.text.secondary}>{caption}</text>
    </svg>
  );
};

DonutChart.propTypes = {
  parts: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.number, color: PropTypes.string })).isRequired,
  total: PropTypes.node.isRequired,
  caption: PropTypes.node,
  summary: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default DonutChart;
