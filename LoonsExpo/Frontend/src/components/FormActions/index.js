import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const base = {
  minHeight: 44,
  px: 2,
  borderRadius: '10px',
  font: 'inherit',
  fontWeight: 600,
  cursor: 'pointer',
};

/** Outlined button used for secondary actions across the setup screens. */
export const OutlineButton = ({ children, sx, ...props }) => (
  <Box
    component="button"
    type="button"
    {...props}
    sx={{
      ...base,
      color: 'text.primary',
      bgcolor: 'background.paper',
      border: theme => `1px solid ${theme.palette.border.main}`,
      '&:hover': { borderColor: 'brand.main', color: 'brand.dark', bgcolor: 'brand.hover' },
      ...sx,
    }}
  >
    {children}
  </Box>
);

/** Solid brand-coloured button for the main action. */
export const PrimaryButton = ({ children, sx, ...props }) => (
  <Box
    component="button"
    type="button"
    {...props}
    sx={{
      ...base,
      color: 'brand.contrastText',
      bgcolor: 'brand.main',
      border: theme => `1px solid ${theme.palette.brand.main}`,
      boxShadow: '0 2px 6px rgba(244,50,11,.28)',
      '&:hover': { bgcolor: 'brand.dark' },
      ...sx,
    }}
  >
    {children}
  </Box>
);

/**
 * Footer row with Back on the left and Save draft / Continue on the right.
 * Leave `onBack` out on the first step; swap `continueLabel` for e.g. "Publish exhibition" on the last.
 */
const FormActions = ({ onBack, onSave, onContinue, backLabel = 'Back', saveLabel = 'Save draft', continueLabel = 'Continue' }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
    {onBack ? <OutlineButton onClick={onBack}>{backLabel}</OutlineButton> : <span />}
    <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
      {onSave && <OutlineButton onClick={onSave}>{saveLabel}</OutlineButton>}
      {onContinue && <PrimaryButton onClick={onContinue}>{continueLabel}</PrimaryButton>}
    </Box>
  </Box>
);

FormActions.propTypes = {
  onBack: PropTypes.func,
  onSave: PropTypes.func,
  onContinue: PropTypes.func,
  backLabel: PropTypes.node,
  saveLabel: PropTypes.node,
  continueLabel: PropTypes.node,
};

export default FormActions;
