import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Label from '../Label';

/**
 * TimePicker - Themed, reusable time picker component with validation.
 *
 * @param {object} props
 * @param {string} props.name - Name of the field (for form handling).
 * @param {string} [props.label] - Label for the field.
 * @param {Date|null} props.value - Selected time value.
 * @param {function} props.onChange - Change handler (time) => void.
 * @param {boolean} [props.required] - Required field.
 * @param {boolean} [props.error] - Manual error state.
 * @param {string} [props.helperText] - Manual helper text.
 * @param {string} [props.format] - Time format (default: 'HH:mm').
 * @param {boolean} [props.disabled] - Disable the picker.
 * @param {object} [props.sx] - MUI sx prop for custom styles.
 * @returns {JSX.Element}
 */
const TimePicker = ({
  name,
  label,
  value,
  onChange,
  required = false,
  error = false,
  helperText = '',
  format = 'HH:mm',
  disabled = false,
  sx = {},
  ...rest
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {label && <Label htmlFor={name} required={required}>{label}</Label>}
      <MuiTimePicker
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

TimePicker.propTypes = {
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

export default TimePicker;
