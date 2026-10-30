import React from 'react';
import MuiBox from '@mui/material/Box';

/**
 * Custom Box component with default shadow and border radius.
 * @param {object} props - The props for Box.
 * @param {boolean} [props.smallShadow] - If true, applies a smaller shadow.
 * @param {object} [props.sx] - The system style overrides for the Box.
 * @param {React.ReactNode} [props.children] - Box content.
 */
const Box = ({ smallShadow, sx = {}, ...props }) => {
  return (
    <MuiBox
      {...props}
      sx={{
        boxShadow:   '0 2px 8px 0 rgba(34,41,47,0.08)',
        borderRadius: 2 ,
        ...sx,
      }}
    />
  );
};

export default Box;
