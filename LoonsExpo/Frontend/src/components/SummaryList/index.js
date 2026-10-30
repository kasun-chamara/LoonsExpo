import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Stacked label / value pairs. `items` is `[{ label, value }]`.
 */
const SummaryList = ({ items }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    {items.map(item => (
      <Box
        key={item.label}
        sx={{ py: 1.25, borderBottom: theme => `1px solid ${theme.palette.border.main}`, '&:last-of-type': { borderBottom: 0 } }}
      >
        <Box component="small" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>{item.label}</Box>
        <Box component="b" sx={{ fontSize: 14, color: 'text.primary' }}>{item.value}</Box>
      </Box>
    ))}
  </Box>
);

SummaryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node.isRequired, value: PropTypes.node })).isRequired,
};

export default SummaryList;
