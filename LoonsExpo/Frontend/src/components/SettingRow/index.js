import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * A title + description on the left and a control (toggle, button, tag) on the right.
 */
const SettingRow = ({ title, description, children, sx }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, ...sx }}>
    <Box sx={{ minWidth: 0 }}>
      <Box component="b" sx={{ display: 'block', fontWeight: 600, color: 'text.primary' }}>{title}</Box>
      {description && <Box component="small" sx={{ fontSize: 13, color: 'text.secondary' }}>{description}</Box>}
    </Box>
    {children}
  </Box>
);

SettingRow.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default SettingRow;
