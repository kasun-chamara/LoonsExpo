import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Row with a title/caption on the left, a value/caption on the right and a progress bar underneath.
 * `percent` is 0-100.
 */
const BarRow = ({ title, caption, value, valueCaption, percent, color, tooltip }) => (
  <Box title={tooltip} sx={{ display: 'grid', gap: 0.75 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 1.5 }}>
      <Box component="b" sx={{ fontSize: 14, color: 'text.primary' }}>
        {title}
        {caption && <Box component="small" sx={{ display: 'block', fontWeight: 400, fontSize: 12, color: 'text.secondary' }}>{caption}</Box>}
      </Box>
      <Box component="span" sx={{ textAlign: 'right', fontSize: 14, fontWeight: 700, color: 'text.primary' }}>
        {value}
        {valueCaption && <Box component="small" sx={{ display: 'block', fontWeight: 400, fontSize: 12, color: 'text.secondary' }}>{valueCaption}</Box>}
      </Box>
    </Box>
    <Box sx={{ height: 10, borderRadius: 5, overflow: 'hidden', bgcolor: theme => alpha(color || theme.palette.brand.main, 0.15) }}>
      <Box sx={{ width: `${percent}%`, height: '100%', borderRadius: 5, bgcolor: color || 'brand.main' }} />
    </Box>
  </Box>
);

BarRow.propTypes = {
  title: PropTypes.node.isRequired,
  caption: PropTypes.node,
  value: PropTypes.node,
  valueCaption: PropTypes.node,
  percent: PropTypes.number.isRequired,
  color: PropTypes.string,
  tooltip: PropTypes.string,
};

export default BarRow;
