import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Selectable card with a title and description. A tick shows when `selected`.
 */
const OptionCard = ({ title, description, selected, onClick, sx }) => (
  <Box
    component="button"
    type="button"
    aria-pressed={!!selected}
    onClick={onClick}
    sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      p: 1.75,
      textAlign: 'left',
      font: 'inherit',
      cursor: 'pointer',
      borderRadius: '16px',
      border: theme => `2px solid ${selected ? theme.palette.brand.main : theme.palette.border.main}`,
      bgcolor: selected ? 'brand.light' : 'background.paper',
      color: 'text.primary',
      '&:hover': { borderColor: 'brand.main' },
      ...sx,
    }}
  >
    <Box component="b" sx={{ fontSize: 16 }}>{title}</Box>
    {description && <Box component="small" sx={{ color: 'text.secondary', fontSize: 13 }}>{description}</Box>}
    {selected && (
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 26,
          height: 26,
          borderRadius: '50%',
          bgcolor: 'brand.main',
          color: 'brand.contrastText',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✓
      </Box>
    )}
  </Box>
);

OptionCard.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  sx: PropTypes.object,
};

export default OptionCard;
