import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Row of round colour choices with a ring on the selected one.
 */
const ColorSwatches = ({ colors, value, onChange }) => (
  <Box sx={{ display: 'flex', gap: 1.5 }}>
    {colors.map(color => {
      const on = color === value;
      return (
        <Box
          key={color}
          component="button"
          type="button"
          aria-label={`Colour ${color}`}
          aria-pressed={on}
          onClick={() => onChange(color)}
          sx={{
            width: 30,
            height: 30,
            p: 0,
            border: 0,
            borderRadius: '50%',
            cursor: 'pointer',
            bgcolor: color,
            boxShadow: theme => (on ? `0 0 0 3px ${theme.palette.background.paper}, 0 0 0 5px ${color}` : 'none'),
          }}
        />
      );
    })}
  </Box>
);

ColorSwatches.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ColorSwatches;
