import React, { useRef, useState } from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Custom Button component that prevents double clicking, shows a loader, and supports disabled state.
 * @param {object} props
 * @param {boolean} [props.process] - If true, shows a CircularProgress and disables the button.
 * @param {boolean} [props.disabled] - If true, disables the button.
 * @param {function} [props.onClick] - Click handler.
 * @param {React.ReactNode} [props.children] - Button content.
 * @param {object} [props.rest] - Other props passed to MUI Button.
 */
const Button = React.forwardRef(function Button({ process = false, color = 'primary', variant = 'contained', disabled = false, onClick, children, ...rest }, ref) {
  const [locked, setLocked] = useState(false);
  const timeoutRef = useRef();

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Prevent double click by disabling when process is true or locked
  const isDisabled = disabled || process || locked;

  const handleClick = (e) => {
    if (!isDisabled && onClick) {
      setLocked(true);
      try {
        const result = onClick(e);
        // If the handler returns a Promise, unlock after it resolves
        if (result && typeof result.then === 'function') {
          result.finally(() => setLocked(false));
        } else {
          // Otherwise, unlock after 500ms
          timeoutRef.current = setTimeout(() => setLocked(false), 1000);
        }
      } catch (err) {
        setLocked(false);
        throw err;
      }
    }
  };

  return (
    <MuiButton
      disableElevation
      ref={ref}
      disabled={isDisabled}
      onClick={handleClick}
      color={color}
      variant={variant}

      {...rest}
      startIcon={process ? <CircularProgress size={20} color="inherit" /> : rest.startIcon}
    >
      {children}
    </MuiButton>
  );
});

export default Button;
