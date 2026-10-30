import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Vertical list of upcoming events with a coloured dot. `items` is `[{ title, caption, color }]`.
 */
const Timeline = ({ items }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {items.map(item => (
      <Box key={item.title} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <Box component="i" sx={{ width: 10, height: 10, mt: '6px', flex: 'none', borderRadius: '50%', bgcolor: item.color || 'brand.main' }} />
        <Box>
          <Box component="b" sx={{ display: 'block', fontSize: 14, color: 'text.primary' }}>{item.title}</Box>
          {item.caption && <Box component="small" sx={{ fontSize: 13, color: 'text.secondary' }}>{item.caption}</Box>}
        </Box>
      </Box>
    ))}
  </Box>
);

Timeline.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.node.isRequired, caption: PropTypes.node, color: PropTypes.string })).isRequired,
};

export default Timeline;
