/**
 * RadioGroupField - A reusable radio button group component with validation and theme support.
 * @param {string} name - The name of the radio group (required).
 * @param {boolean} [row=false] - Display radios in a row (horizontal) if true, column (vertical) if false.
 * @param {Array<{value: string, label: string, disabled?: boolean}>} radioButtons - Array of radio button options (required).
 * @param {string} [defaultValue] - The default selected value (for uncontrolled usage).
 * @param {string} [value] - The selected value (for controlled usage).
 * @param {function} [onChange] - Change handler (for controlled usage).
 * @param {string} [size='small'] - The size of the radio buttons.
 * @param {boolean} [required=false] - If true, selection is required and error is shown if not selected.
 * @param {string} [label] - Optional group label.
 */
import React, { useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
import Label from '../Label';

const RadioGroupField = ({
  name,
  row = false,
  radioButtons = [],
  defaultValue = '',
  value,
  onChange,
  size = 'small',
  required = false,
  label,
  ...rest
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  const currentValue = isControlled ? value : internalValue;
  const showError = required && touched && !currentValue;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange) onChange(e);
    setTouched(true);
  };

  return (
    <FormControl component="fieldset" error={showError} required={required} {...rest}>
      {label && <Label required={required}>{label}</Label>}
      <RadioGroup
        name={name}
        row={row}
        value={currentValue}
        onChange={handleChange}
      >
        {radioButtons.map((rb) => (
          <FormControlLabel
            key={rb.value}
            value={rb.value}
            control={<Radio size={size} disabled={rb.disabled} />}
            label={rb.label}
            disabled={rb.disabled}
          />
        ))}
      </RadioGroup>
      {showError && <FormHelperText>This field is required</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroupField;
