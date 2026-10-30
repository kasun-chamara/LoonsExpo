import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Labelled input with helper text and an optional character counter.
 * Pass `multiline` for a textarea, or `children` to render a custom control inside the bordered box.
 */
const FormField = ({
  label,
  required,
  helper,
  counter,
  value,
  onChange,
  placeholder,
  name,
  type = 'text',
  multiline,
  rows = 5,
  children,
  sx,
}) => {
  const id = useId();
  const control = {
    flex: 1,
    minWidth: 0,
    border: 0,
    outline: 0,
    bgcolor: 'transparent',
    font: 'inherit',
    fontWeight: 500,
    color: 'text.primary',
    '&::placeholder': { color: 'text.secondary', opacity: 0.85, fontWeight: 400 },
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, minWidth: 0, ...sx }}>
      {label && (
        <Box component="label" htmlFor={id} sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>
          {label}
          {required && <Box component="i" sx={{ color: 'brand.main', fontStyle: 'normal', ml: 0.5 }}>*</Box>}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: multiline ? 'flex-start' : 'center',
          minHeight: 44,
          px: 1.75,
          py: multiline ? 1.5 : 0,
          borderRadius: '10px',
          border: theme => `1px solid ${theme.palette.border.strong}`,
          bgcolor: 'border.field',
          '&:focus-within': {
            borderColor: 'brand.main',
            boxShadow: theme => `0 0 0 3px ${alpha(theme.palette.brand.main, 0.14)}`,
          },
        }}
      >
        {children || (multiline ? (
          <Box component="textarea" id={id} name={name} rows={rows} value={value} onChange={onChange} placeholder={placeholder} sx={{ ...control, resize: 'vertical', lineHeight: 1.55 }} />
        ) : (
          <Box component="input" id={id} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} sx={control} />
        ))}
      </Box>
      {(helper || counter) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, fontSize: 12, color: 'text.secondary' }}>
          <span>{helper}</span>
          <span>{counter}</span>
        </Box>
      )}
    </Box>
  );
};

FormField.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool,
  helper: PropTypes.node,
  counter: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default FormField;
