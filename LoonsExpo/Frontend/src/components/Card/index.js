import React from 'react';
import MuiCard from '@mui/material/Card';

/**
 * Custom Card component with default shadow and border radius.
 * @param {object} props - The props for Card.
 * @param {object} [props.sx] - The system style overrides for the Card.
 * @param {React.ReactNode} [props.children] - Card content.
 */
const Card = ({ sx = {}, ...props }) => {
  return (
    <MuiCard
      {...props}
      sx={{
        boxShadow: '0 2px 8px 0 rgba(34,41,47,0.08)',
        borderRadius: 2,
        ...sx,
      }}
    />
  );
};

export default Card;
