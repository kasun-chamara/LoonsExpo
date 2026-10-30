import React from 'react';
import PropTypes from 'prop-types';
import MuiAutocomplete from '@mui/material/Autocomplete';
import Label from '../Label';
import TextValidator from '../TextValidator';
import Popper from '@mui/material/Popper';

/**
 * Custom Popper to match Autocomplete popup width to input width
 */
function CustomPopper(props) {
  const { anchorEl, style, ...other } = props;
  let width;
  if (anchorEl) {
    // Try to get the actual input element if anchorEl is a wrapper
    const input = anchorEl.querySelector ? anchorEl.querySelector('input') : null;
    width = (input || anchorEl).getBoundingClientRect().width+40;
  }
  return <Popper {...other} anchorEl={anchorEl} style={{ ...style, width }} placement="bottom-start" />;
}

/**
 * AutocompleteField - Themed, reusable autocomplete component with validation, using TextValidator as input.
 *
 * @param {object} props
 * @param {string} props.name - Name of the field (for form handling).
 * @param {string} [props.label] - Label for the field.
 * @param {any} props.value - Value (controlled, can be string, object, or array for multiple).
 * @param {function} props.onChange - Change handler (event, value) => void.
 * @param {Array} props.options - Options for Autocomplete.
 * @param {function} [props.getOptionLabel] - Function to get label from option.
 * @param {function} [props.isOptionEqualToValue] - Function to compare options.
 * @param {boolean} [props.multiple] - Multiple selection.
 * @param {boolean} [props.freeSolo] - Allow free text.
 * @param {boolean} [props.fullWidth] - Full width input.
 * @param {string} [props.variant] - Input variant.
 * @param {string} [props.size] - Input size.
 * @param {boolean} [props.required] - Required field.
 * @param {Array} [props.validators] - Validation rules.
 * @param {Array} [props.errorMessages] - Validation error messages.
 * @param {object} [props.TextFieldProps] - Additional props for TextValidator.
 * @param {object} [props.AutocompleteProps] - Additional props for Autocomplete.
 * @returns {JSX.Element}
 */
const Autocomplete = ({
  name,
  label,
  value,
  onChange,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  multiple = false,
  freeSolo = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'small',
  required = false,
  error = false,
  helperText = '',
  validators = [],
  errorMessages = [],
  TextFieldProps = {},
  AutocompleteProps = {},
  onInputChange, // <-- add this prop
  textInputOnChange,
  ...rest
}) => {
  return (
    <>
      {label && <Label htmlFor={name} required={required}>{label}</Label>}
      <MuiAutocomplete

        name={name}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        multiple={multiple}
        freeSolo={freeSolo}
        value={value}
        onChange={(event, newValue) => {
          if (onChange) onChange(event, newValue);
        }}
        onInputChange={onInputChange} // <-- pass it to MuiAutocomplete
        renderInput={(params) => (
          <TextValidator
            {...params}
            name={name}
            required={required}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            error={error}
            helperText={helperText}
            InputLabelProps={{
              shrink: false,
            }}
            value={value}
            onChange={textInputOnChange}
            validators={validators}
            errorMessages={errorMessages}
            {...TextFieldProps}
          />
        )}
        PopperComponent={CustomPopper}
        {...AutocompleteProps}
        {...rest}
      />
    </>
  );
};

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  multiple: PropTypes.bool,
  freeSolo: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  TextFieldProps: PropTypes.object,
  AutocompleteProps: PropTypes.object,
};

export default Autocomplete;
