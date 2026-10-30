import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Responsive grid of small label / value pairs. `items` is `[{ label, value }]`.
 */
const DetailGrid = ({ items, columns = 4 }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: `repeat(${columns}, minmax(0, 1fr))` }, gap: '16px 24px' }}>
    {items.map(item => (
      <Box key={item.label} sx={{ minWidth: 0 }}>
        <Box component="small" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>{item.label}</Box>
        <Box component="b" sx={{ fontSize: 14, color: 'text.primary', overflowWrap: 'anywhere' }}>{item.value}</Box>
      </Box>
    ))}
  </Box>
);

DetailGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node.isRequired, value: PropTypes.node })).isRequired,
  columns: PropTypes.number,
};

export default DetailGrid;
