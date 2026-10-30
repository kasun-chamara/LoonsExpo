import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Thin progress bar. `value` is 0-100; `color` defaults to the brand colour.
 */
const ProgressBar = ({ value, color, width = 120, label }) => (
  <Box
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label={label}
    sx={{ width, height: 8, flex: 'none', borderRadius: '5px', overflow: 'hidden', bgcolor: theme => alpha(color || theme.palette.brand.main, 0.15) }}
  >
    <Box sx={{ width: `${value}%`, height: '100%', borderRadius: '5px', bgcolor: color || 'brand.main' }} />
  </Box>
);

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
};

export default ProgressBar;
