import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

const TONES = { warning: '#D97706', success: '#12A150', danger: '#E5391A' };

/**
 * Highlighted message with a square icon badge, a bold title and a line of detail.
 */
const NoticeBanner = ({ tone = 'warning', icon, title, children }) => {
  const color = TONES[tone];
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 2, borderRadius: '14px', border: `1.5px solid ${alpha(color, 0.5)}`, bgcolor: alpha(color, 0.1) }}>
      <Box component="span" sx={{ width: 52, height: 52, flex: 'none', borderRadius: '15px', bgcolor: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 10px ${alpha(color, 0.3)}` }}>
        {icon || (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4h6v3H9zM6 5h3M15 5h3v16H6V5M9 13l2 2 4-4" /></svg>
        )}
      </Box>
      <Box>
        <Box component="b" sx={{ display: 'block', fontSize: 16, color: 'text.primary' }}>{title}</Box>
        {children && <Box component="small" sx={{ fontSize: 13, color: 'text.secondary' }}>{children}</Box>}
      </Box>
    </Box>
  );
};

NoticeBanner.propTypes = {
  tone: PropTypes.oneOf(['warning', 'success', 'danger']),
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default NoticeBanner;
