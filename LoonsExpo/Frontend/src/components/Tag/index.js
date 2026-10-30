import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { alpha, darken, lighten } from '@mui/material/styles';

// Accent colour per tone. The badge is a soft tint of the accent with the accent as text,
// darkened a little on the light theme so it stays readable.
const ACCENTS = {
  green: '#12A150',
  amber: '#F5A524',
  blue: '#5B8DEF',
  purple: '#9C7BFF',
  teal: '#2BC3C0',
  pink: '#F06AA6',
  red: '#F26B5C',
  neutral: '#8A94A6',
};

/**
 * Small rounded status label with a leading dot.
 * @param {'brand'|'green'|'amber'|'blue'|'purple'|'teal'|'pink'|'red'|'neutral'} [tone='brand']
 */
const Tag = ({ tone = 'brand', children, sx }) => {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const accent = tone === 'green'
    ? theme.palette.brand.success
    : ACCENTS[tone] || theme.palette.brand.main;
  const color = dark ? lighten(accent, 0.1) : darken(accent, 0.3);
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minHeight: 30,
        px: '14px',
        // pulls the text up ~1px: capital letters sit lower than the line box centre
        pb: '2px',
        boxSizing: 'border-box',
        lineHeight: 1,
        verticalAlign: 'middle',
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        bgcolor: alpha(accent, dark ? 0.18 : 0.14),
        color,
        '&:before': { content: '""', width: 7, height: 7, borderRadius: '50%', bgcolor: 'currentColor' },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

Tag.propTypes = {
  tone: PropTypes.oneOf(['brand', ...Object.keys(ACCENTS)]),
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default Tag;
