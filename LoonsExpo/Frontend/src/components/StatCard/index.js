import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Small KPI tile: a tinted icon square, a big value and a label.
 * `icon` is the stroke path of a 24x24 icon; `color` tints the square; `note` is an optional line under the label.
 */
const StatCard = ({ icon, color, value, label, note }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, p: 2.25, borderRadius: '16px', bgcolor: 'background.paper', border: theme => `1px solid ${theme.palette.border.main}` }}>
    <Box sx={{ width: 44, height: 44, flex: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color, bgcolor: alpha(color, 0.14) }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={icon} />
      </svg>
    </Box>
    <Box>
      <Box component="b" sx={{ display: 'block', fontSize: 24, lineHeight: 1.1, letterSpacing: '-.02em', color: 'text.primary' }}>{value}</Box>
      <Box component="small" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{label}</Box>
      {note && <Box component="small" sx={{ display: 'block', fontSize: 11.5, color: 'text.secondary', opacity: 0.85 }}>{note}</Box>}
    </Box>
  </Box>
);

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  note: PropTypes.node,
};

export default StatCard;
