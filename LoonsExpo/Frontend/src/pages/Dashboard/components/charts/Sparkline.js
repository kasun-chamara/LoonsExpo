import React from 'react';
import PropTypes from 'prop-types';
import { smoothPath } from './chartUtils';

const W = 200;
const H = 40;

/**
 * Tiny trend line with a soft fill, for KPI cards. Decorative, so hidden from screen readers.
 */
const Sparkline = ({ values, color }) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((v, i) => [(W * i) / (values.length - 1), H - 4 - ((v - min) / span) * (H - 10)]);
  const line = smoothPath(points);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height: 40, display: 'block', marginTop: 12 }}>
      <path d={`${line}L${W} ${H}L0 ${H}Z`} fill={color} fillOpacity=".12" />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

Sparkline.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
};

export default Sparkline;
