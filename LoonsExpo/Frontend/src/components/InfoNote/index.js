import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

// accent colour, text colour on the light theme, text colour on the dark theme
const TONES = {
  amber: ['#D97706', '#7a4c00', '#F7C873'],
  green: ['#12A150', '#1d5b34', '#7FDCA3'],
  blue: ['#2F6FED', '#1F4FBF', '#9DB8FF'],
};

const DEFAULT_ICON = 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 8v5M12 16v.5';

/**
 * Small inline note with an icon, tinted by tone and readable on both the light and the dark theme.
 * `icon` is the stroke path of a 24x24 icon.
 */
const InfoNote = ({ tone = 'amber', icon = DEFAULT_ICON, children, sx }) => {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const [accent, lightText, darkText] = TONES[tone];
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
        p: 1.75,
        borderRadius: '14px',
        fontSize: 13,
        lineHeight: 1.45,
        color: dark ? darkText : lightText,
        bgcolor: alpha(accent, dark ? 0.18 : 0.14),
        border: `1px solid ${alpha(accent, dark ? 0.4 : 0.25)}`,
        ...sx,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none', marginTop: 1 }}>
        <path d={icon} />
      </svg>
      <span>{children}</span>
    </Box>
  );
};

InfoNote.propTypes = {
  tone: PropTypes.oneOf(['amber', 'green', 'blue']),
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default InfoNote;
