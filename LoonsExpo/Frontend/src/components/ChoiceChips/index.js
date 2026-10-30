import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Pill toggles. Single choice by default; pass `multiple` for a set of values.
 * `options` can be plain strings or `{ value, label }`.
 */
const ChoiceChips = ({ options, value, onChange, multiple = false, sx }) => {
  const normalised = options.map(o => (typeof o === 'object' ? o : { value: o, label: o }));
  const isOn = v => (multiple ? (value || []).includes(v) : value === v);
  const toggle = v => {
    if (!onChange) return;
    if (!multiple) return onChange(v);
    const current = value || [];
    onChange(current.includes(v) ? current.filter(x => x !== v) : [...current, v]);
  };
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, ...sx }}>
      {normalised.map(({ value: v, label }) => {
        const on = isOn(v);
        return (
          <Box
            key={v}
            component="button"
            type="button"
            aria-pressed={on}
            onClick={() => toggle(v)}
            sx={{
              minHeight: 40,
              px: 2.25,
              borderRadius: 99,
              font: 'inherit',
              fontWeight: 600,
              cursor: 'pointer',
              border: theme => `1px solid ${on ? theme.palette.brand.main : theme.palette.border.main}`,
              bgcolor: on ? 'brand.main' : 'background.paper',
              color: on ? 'brand.contrastText' : 'text.secondary',
              '&:hover': on ? undefined : { borderColor: 'brand.main', color: 'brand.dark' },
            }}
          >
            {label}
          </Box>
        );
      })}
    </Box>
  );
};

ChoiceChips.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  sx: PropTypes.object,
};

export default ChoiceChips;
