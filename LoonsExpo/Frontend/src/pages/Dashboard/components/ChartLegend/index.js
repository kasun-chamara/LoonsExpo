import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Colour key for a chart. `items` is `[{ label, color }]`; `square` draws squares instead of dots.
 */
const ChartLegend = ({ items, square = false }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1.5, fontSize: 12.5, color: 'text.secondary' }}>
    {items.map(item => (
      <Box key={item.label} component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
        <Box component="i" sx={{ width: 10, height: 10, borderRadius: square ? '3px' : '50%', bgcolor: item.color }} />
        {item.label}
      </Box>
    ))}
  </Box>
);

ChartLegend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, color: PropTypes.string })).isRequired,
  square: PropTypes.bool,
};

export default ChartLegend;
