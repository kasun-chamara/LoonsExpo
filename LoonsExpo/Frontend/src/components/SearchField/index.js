import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Pill-shaped search input with a leading magnifier.
 */
const SearchField = ({ value, onChange, placeholder = 'Search', sx }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.25,
      minHeight: 44,
      px: 2.25,
      width: 380,
      maxWidth: '100%',
      borderRadius: 99,
      border: theme => `1px solid ${theme.palette.border.strong}`,
      bgcolor: 'border.field',
      color: 'text.secondary',
      '&:focus-within': {
        borderColor: 'brand.main',
        boxShadow: theme => `0 0 0 3px ${alpha(theme.palette.brand.main, 0.14)}`,
      },
      ...sx,
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
    <Box
      component="input"
      type="search"
      aria-label={placeholder}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{ flex: 1, minWidth: 0, border: 0, outline: 0, bgcolor: 'transparent', font: 'inherit', color: 'text.primary', '&::placeholder': { color: 'text.secondary', opacity: 0.8 } }}
    />
  </Box>
);

SearchField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  sx: PropTypes.object,
};

export default SearchField;
