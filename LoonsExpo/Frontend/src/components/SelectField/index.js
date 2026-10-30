import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

const CHEVRON = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5' fill='none' stroke='%235B6676' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

/**
 * Native dropdown that matches FormField. `label` is optional (use `ariaLabel` when it is omitted).
 * `options` can be strings or `{ value, label }`.
 */
const SelectField = ({ label, ariaLabel, value, onChange, options, sx }) => {
  const id = useId();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, minWidth: 0, ...sx }}>
      {label && <Box component="label" htmlFor={id} sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>{label}</Box>}
      <Box
        component="select"
        id={id}
        aria-label={label ? undefined : ariaLabel}
        value={value}
        onChange={e => onChange(e.target.value)}
        sx={{
          appearance: 'none',
          width: '100%',
          minHeight: 44,
          pl: 1.75,
          pr: 5,
          font: 'inherit',
          color: 'text.primary',
          bgcolor: 'border.field',
          cursor: 'pointer',
          borderRadius: '10px',
          border: theme => `1px solid ${theme.palette.border.strong}`,
          backgroundImage: CHEVRON,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          backgroundSize: '12px 12px',
          '&:focus': { outline: 0, borderColor: 'brand.main', boxShadow: theme => `0 0 0 3px ${alpha(theme.palette.brand.main, 0.14)}` },
        }}
      >
        {options.map(o => {
          const opt = typeof o === 'object' ? o : { value: o, label: o };
          return <option key={opt.value} value={opt.value}>{opt.label}</option>;
        })}
      </Box>
    </Box>
  );
};

SelectField.propTypes = {
  label: PropTypes.node,
  ariaLabel: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

export default SelectField;
