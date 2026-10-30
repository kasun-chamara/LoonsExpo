import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import Label from '../Label';

/**
 * CheckboxGroupField - Themed, reusable checkbox group component with validation and row/column layout.
 *
 * @param {object} props
 * @param {string} props.name - Name of the checkbox group (for form handling).
 * @param {string} [props.label] - Label for the group.
 * @param {Array<{value: string, label: string, disabled?: boolean}>} props.checkboxes - Array of checkbox options.
 * @param {string[]} props.value - Array of selected values (controlled).
 * @param {function} props.onChange - Change handler (receives event and updated array).
 * @param {boolean} [props.row] - Display checkboxes in a row.
 * @param {boolean} [props.required] - Whether at least one must be selected.
 * @param {string} [props.size] - Checkbox size ('small' | 'medium').
 * @param {string} [props.helperText] - Helper/error text.
 * @returns {JSX.Element}
 */
const CheckboxGroupField = ({
  name,
  label,
  checkboxes,
  value = [],
  onChange,
  row = false,
  required = false,
  size = 'small',
  helperText = '',
}) => {
  const [touched, setTouched] = React.useState(false);
  const hasError = required && touched && value.length === 0;

  const handleChange = (event) => {
    const { value: val, checked } = event.target;
    let newValue;
    if (checked) {
      newValue = [...value, val];
    } else {
      newValue = value.filter((v) => v !== val);
    }
    if (!touched) setTouched(true);
    if (onChange) onChange(event, newValue);
  };

  return (
    <FormControl
      component="fieldset"
      required={required}
      error={hasError}
      sx={{ width: '100%', mb: 2 }}
    >
      {label && <Label required={required}>{label}</Label>}
      <FormGroup row={row}>
        {checkboxes.map((cb) => (
          <FormControlLabel
            key={cb.value}
            control={
              <Checkbox
                name={name}
                value={cb.value}
                checked={value.includes(cb.value)}
                onChange={handleChange}
                size={size}
                disabled={cb.disabled}
              />
            }
            label={cb.label}
          />
        ))}
      </FormGroup>
      {(hasError || helperText) && (
        <FormHelperText>
          {hasError ? 'Please select at least one option.' : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

CheckboxGroupField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checkboxes: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  row: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  helperText: PropTypes.string,
};

export default CheckboxGroupField;
