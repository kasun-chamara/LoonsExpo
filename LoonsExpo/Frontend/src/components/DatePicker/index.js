import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Label from '../Label';

/**
 * DatePicker - Themed, reusable date picker component with validation.
 *
 * @param {object} props
 * @param {string} props.name - Name of the field (for form handling).
 * @param {string} [props.label] - Label for the field.
 * @param {Date|null} props.value - Selected date value.
 * @param {function} props.onChange - Change handler (date) => void.
 * @param {boolean} [props.required] - Required field.
 * @param {boolean} [props.error] - Error state for manual validation.
 * @param {string} [props.helperText] - Helper text for manual validation.
 * @param {string} [props.format] - Date format (default: 'MM/dd/yyyy').
 * @param {boolean} [props.disabled] - Disable the picker.
 * @param {object} [props.sx] - MUI sx prop for custom styles.
 * @returns {JSX.Element}
 */
const DatePicker = ({
  name,
  label,
  value,
  onChange,
  required = false,
  error = false,
  helperText = '',
  format = 'MM/dd/yyyy',
  disabled = false,
  sx = {},
  ...rest
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {label && <Label htmlFor={name} required={required}>{label}</Label>}
      <MuiDatePicker
        value={value}
        onChange={onChange}
        format={format}
        disabled={disabled}
        slotProps={{
          textField: {
            name,
            required,
            error,
            helperText,
            fullWidth: true,
            size: 'small',
            variant: 'outlined',
            sx,
            ...rest,
          },
        }}
      />
    </LocalizationProvider>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

export default DatePicker;
