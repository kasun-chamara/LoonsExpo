import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Joined buttons for picking one of a few options (for example 12-hour / 24-hour).
 * `variant="glass"` is a translucent white style for use on brand-coloured backgrounds.
 */
const SegmentedControl = ({ options, value, onChange, label, variant = 'default' }) => {
  const glass = variant === 'glass';
  return (
  <Box role="group" aria-label={label} sx={{
      display: 'inline-flex',
      flex: 'none',
      overflow: 'hidden',
      borderRadius: '10px',
      border: theme => (glass ? '1px solid rgba(255,255,255,.45)' : `1px solid ${theme.palette.border.main}`),
      bgcolor: glass ? 'rgba(255,255,255,.16)' : 'transparent',
    }}>
    {options.map(option => {
      const on = option === value;
      return (
        <Box
          key={option}
          component="button"
          type="button"
          aria-pressed={on}
          onClick={() => onChange(option)}
          sx={{ px: 2.25, py: 1.125, border: 0, font: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: glass ? (on ? 'brand.dark' : '#fff') : (on ? 'brand.dark' : 'text.secondary'), bgcolor: glass ? (on ? '#fff' : 'transparent') : (on ? 'brand.light' : 'background.paper') }}
        >
          {option}
        </Box>
      );
    })}
  </Box>
  );
};

SegmentedControl.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'glass']),
};

export default SegmentedControl;
