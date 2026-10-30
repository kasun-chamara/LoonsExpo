import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Plain headline-number card: tinted icon, label, value, a change badge and an optional trend (`trend` node).
 * `tone` styles the badge: 'up' green with an arrow, 'warn' amber, 'neutral' grey.
 */
const TONES = { up: '#12A150', warn: '#D97706', neutral: '#8A94A6' };

const KpiCard = ({ label, value, delta, note, tone = 'up', icon, color, trend }) => {
  const badge = TONES[tone];

  return (
    <Box sx={{ p: 2.25, borderRadius: '16px', bgcolor: 'background.paper', border: theme => `1px solid ${theme.palette.border.main}` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, fontSize: 13, fontWeight: 600, color: 'text.secondary' }}>
        <Box sx={{ width: 34, height: 34, flex: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color, bgcolor: alpha(color, 0.14) }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>
        </Box>
        {label}
      </Box>

      <Box component="b" sx={{ display: 'block', mt: 1.5, fontSize: 28, letterSpacing: '-.02em', lineHeight: 1.1, color: 'text.primary' }}>{value}</Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1, fontSize: 12.5, color: 'text.secondary' }}>
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.25, borderRadius: 99, fontWeight: 700, color: badge, bgcolor: alpha(badge, 0.14) }}>
          {tone === 'up' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
          )}
          {delta}
        </Box>
        {note}
      </Box>

      {trend}
    </Box>
  );
};

KpiCard.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  delta: PropTypes.node,
  note: PropTypes.node,
  tone: PropTypes.oneOf(['up', 'warn', 'neutral']),
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  trend: PropTypes.node,
};

export default KpiCard;
