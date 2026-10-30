import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const CHEVRON = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5' fill='none' stroke='%235B6676' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

/**
 * Native select styled as a filter dropdown. The first option (value "") is the `label`, e.g. "All sectors".
 * `options` can be strings or `{ value, label }`.
 */
const FilterSelect = ({ label, value, onChange, options, sx }) => (
  <Box
    component="select"
    aria-label={label}
    value={value}
    onChange={e => onChange(e.target.value)}
    sx={{
      appearance: 'none',
      minHeight: 44,
      pl: 1.75,
      pr: 5,
      font: 'inherit',
      fontWeight: 500,
      color: 'text.primary',
      bgcolor: 'border.field',
      cursor: 'pointer',
      borderRadius: '10px',
      border: theme => `1px solid ${theme.palette.border.strong}`,
      backgroundImage: CHEVRON,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 16px center',
      backgroundSize: '12px 12px',
      '&:hover, &:focus': { borderColor: 'brand.main', outline: 0 },
      ...sx,
    }}
  >
    <option value="">{label}</option>
    {options.map(o => {
      const opt = typeof o === 'object' ? o : { value: o, label: o };
      return <option key={opt.value} value={opt.value}>{opt.label}</option>;
    })}
  </Box>
);

FilterSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

export default FilterSelect;
