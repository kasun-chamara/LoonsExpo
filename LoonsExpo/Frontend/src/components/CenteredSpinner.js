import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const CenteredSpinner = () => (
  <Box
    sx={{
      minHeight: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'transparent',
    }}
  >
    <CircularProgress size={48} thickness={4} />
  </Box>
);

export default CenteredSpinner;
