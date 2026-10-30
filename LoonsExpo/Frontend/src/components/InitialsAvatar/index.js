import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const COLORS = ['#F4320B', '#2F6FED', '#D97706', '#7C4DFF', '#0E9594', '#E83E8C'];

const colorFor = (text = '') => {
  const sum = [...text].reduce((total, ch) => total + ch.charCodeAt(0), 0);
  return COLORS[sum % COLORS.length];
};

/**
 * Round avatar showing initials on a soft tint. Colour follows the initials unless `color` is given.
 */
const InitialsAvatar = ({ initials, size = 44, color, solid = false, sx }) => {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const accent = color || colorFor(initials);
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        width: size,
        height: size,
        flex: 'none',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: Math.round(size * 0.3),
        lineHeight: 1,
        bgcolor: solid ? accent : alpha(accent, dark ? 0.22 : 0.14),
        color: solid ? '#fff' : accent,
        ...sx,
      }}
    >
      {initials}
    </Box>
  );
};

InitialsAvatar.propTypes = {
  initials: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  solid: PropTypes.bool,
  sx: PropTypes.object,
};

export default InitialsAvatar;
