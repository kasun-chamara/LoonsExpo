import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Grid of stall boxes. Each stall is `{ label, type }`; `types` maps a type to `{ code, color }`
 * and draws the small coloured code badge in the corner of the box.
 */
const StallGrid = ({ stalls, types, columns = 6 }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 1.25, p: 2, borderRadius: '12px', bgcolor: 'action.hover' }}>
    {stalls.map(stall => {
      const type = types[stall.type] || {};
      return (
        <Box
          key={stall.label}
          sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 52, borderRadius: '8px', fontWeight: 700, fontSize: 13, color: 'text.primary', bgcolor: 'background.paper', border: theme => `1px solid ${theme.palette.border.main}` }}
        >
          {stall.label}
          <Box component="i" sx={{ position: 'absolute', top: 5, right: 5, px: '6px', py: '1px', borderRadius: '5px', fontStyle: 'normal', fontSize: 10, fontWeight: 700, lineHeight: 1.5, color: '#fff', bgcolor: type.color }}>
            {type.code}
          </Box>
        </Box>
      );
    })}
  </Box>
);

StallGrid.propTypes = {
  stalls: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired, type: PropTypes.string })).isRequired,
  types: PropTypes.objectOf(PropTypes.shape({ code: PropTypes.string, color: PropTypes.string })).isRequired,
  columns: PropTypes.number,
};

export default StallGrid;
