import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

/**
 * Page title with the multi-colour accent bar, an optional subtitle and an actions slot.
 */
const PageHeader = ({ title, subtitle, actions }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
    <Box>
      <Typography component="h1" sx={{ fontSize: 28, fontWeight: 700, letterSpacing: '-.025em', lineHeight: 1.2, color: 'text.primary' }}>
        {title}
      </Typography>
      <Box
        sx={{
          width: 84,
          height: 5,
          borderRadius: 5,
          mt: 1.25,
          background: 'linear-gradient(90deg,#F4320B 0 20%,#2F6FED 20% 40%,#12A150 40% 60%,#F59E0B 60% 80%,#7C4DFF 80%)',
        }}
      />
      {subtitle && <Typography sx={{ mt: 1, fontSize: 14, color: 'text.secondary' }}>{subtitle}</Typography>}
    </Box>
    {actions && <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center', flexWrap: 'wrap' }}>{actions}</Box>}
  </Box>
);

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
};

export default PageHeader;
