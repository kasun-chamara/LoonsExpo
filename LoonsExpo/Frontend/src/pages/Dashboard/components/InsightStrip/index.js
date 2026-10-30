import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Row of small highlights under a chart. `items` is `[{ label, value, note, good? }]`.
 */
const InsightStrip = ({ items }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: `repeat(${items.length}, minmax(0, 1fr))` }, gap: 1.5, mt: 2 }}>
    {items.map(item => (
      <Box key={item.label} sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'action.hover' }}>
        <Box component="small" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>{item.label}</Box>
        <Box component="b" sx={{ display: 'block', fontSize: 16, color: 'text.primary' }}>{item.value}</Box>
        <Box component="em" sx={{ fontSize: 12, fontStyle: 'normal', fontWeight: item.good ? 600 : 400, color: item.good ? 'brand.success' : 'text.secondary' }}>{item.note}</Box>
      </Box>
    ))}
  </Box>
);

InsightStrip.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.node, note: PropTypes.node, good: PropTypes.bool })).isRequired,
};

export default InsightStrip;
