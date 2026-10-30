import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Label - Themed, reusable label component for form inputs.
 *
 * @param {object} props
 * @param {string} [props.htmlFor] - The id of the input this label is for.
 * @param {boolean} [props.required] - If true, show a red asterisk.
 * @param {React.ReactNode} props.children - The label text/content.
 * @param {string} [props.color] - Label color (default: theme text.secondary).
 * @param {object} [props.sx] - MUI sx prop for custom styles.
 * @returns {JSX.Element}
 */
const Label = ({ htmlFor, required = false, children, color, sx, ...rest }) => {
  const theme = useTheme();
  return (
    <FormLabel
      htmlFor={htmlFor}
      sx={{
        color: color || theme.palette.text.secondary,
        fontWeight: 500,
        fontFamily:theme.typography?.label_fontFamily,
        fontSize: 15,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        ...sx,
      }}
      {...rest}
    >
      {children}
      {required && (
        <span style={{ color: theme.palette.error.main, marginLeft: 2 }}>*</span>
      )}
    </FormLabel>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default Label;
