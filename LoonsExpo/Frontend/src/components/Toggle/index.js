import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * On/off switch. Controlled with `checked` / `onChange(nextChecked)`.
 */
const Toggle = ({ checked, onChange, label, disabled = false }) => (
  <Box
    component="button"
    type="button"
    role="switch"
    aria-checked={!!checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange && onChange(!checked)}
    sx={{
      position: 'relative',
      flex: 'none',
      width: 42,
      height: 24,
      p: 0,
      border: 0,
      borderRadius: 99,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      bgcolor: checked ? 'brand.success' : 'action.disabled',
      transition: 'background-color .15s',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 3,
        left: checked ? 21 : 3,
        width: 18,
        height: 18,
        borderRadius: '50%',
        bgcolor: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,.2)',
        transition: 'left .15s',
      },
    }}
  />
);

Toggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Toggle;
