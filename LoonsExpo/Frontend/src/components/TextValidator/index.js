/**
 * Theme-wrapped TextValidator component for consistent form input styling.
 *
 * @param {object} props - The props for TextValidator.
 * @param {string} [props.label] - The label content.
 * @param {string} [props.name] - Name attribute of the input element.
 * @param {string} [props.value] - The value of the input element (for controlled components).
 * @param {function} [props.onChange] - Callback fired when the value is changed.
 * @param {string[]} [props.validators] - Array of validation rule names to apply.
 * @param {string[]} [props.errorMessages] - Array of error messages corresponding to validators.
 * @param {boolean} [props.required] - If true, the label is displayed as required and the input element will be required.
 * @param {boolean} [props.fullWidth=true] - If true, the input will take up the full width of its container.
 * @param {string} [props.variant='outlined'] - The variant to use. One of 'outlined', 'filled', 'standard'.
 * @param {string} [props.size='small'] - The size of the text field. One of 'small', 'medium'.
 * @param {string} [props.type] - Type of the input element (e.g., 'text', 'password', 'email').
 * @param {boolean} [props.disabled] - If true, the input element will be disabled.
 * @param {boolean} [props.autoFocus] - If true, the input element will be focused during the first mount.
 * @param {string} [props.placeholder] - The short hint displayed in the input before the user enters a value.
 * @param {string} [props.helperText] - The helper text content.
 * @param {object} [props.InputLabelProps] - Props applied to the InputLabel element.
 * @param {object} [props.InputProps] - Props applied to the Input element.
 * @param {object} [props.inputProps] - Attributes applied to the input element.
 * @param {object} [props.FormHelperTextProps] - Props applied to the FormHelperText element.
 * @param {string} [props.margin] - If 'dense' or 'normal', will adjust vertical spacing of this and contained components.
 * @param {boolean} [props.multiline] - If true, a textarea element will be rendered instead of an input.
 * @param {number|string} [props.rows] - Number of rows to display when multiline option is set to true.
 * @param {number|string} [props.minRows] - Minimum number of rows to display when multiline option is set to true.
 * @param {number|string} [props.maxRows] - Maximum number of rows to display when multiline option is set to true.
 * @param {boolean} [props.select] - If true, select element will be rendered.
 * @param {object} [props.SelectProps] - Props applied to the Select element.
 * @param {React.ReactNode} [props.children] - The option elements to populate the select.
 * @param {function} [props.inputRef] - Pass a ref to the input element.
 * @param {object} [props.classes] - Override or extend the styles applied to the component.
 *
 * Any other props supported by MUI TextField or react-material-ui-form-validator are also accepted.
 */
import React from 'react';
import { TextValidator as BaseTextValidator } from 'react-material-ui-form-validator';
import { useTheme } from '@mui/material/styles';
import Label from '../Label';

const TextValidator = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const {
    fullWidth = true,
    variant = 'outlined',
    size = 'small',
    InputLabelProps,
    InputProps,
    label,
    required,
    name,
    ...rest
  } = props;

  return (
    <>
    {label && (
        <Label htmlFor={name} required={required}>{label}</Label>
      )}
    <BaseTextValidator
      ref={ref}
      name={name}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      InputLabelProps={{
        shrink: false,
        style: { color: theme.palette.text.secondary },
        ...InputLabelProps,
      }}
      InputProps={{
        style: { color: theme.palette.text.primary },
        ...InputProps,
      }}
      {...rest}
    />
    </>
  );
});

export default TextValidator;
