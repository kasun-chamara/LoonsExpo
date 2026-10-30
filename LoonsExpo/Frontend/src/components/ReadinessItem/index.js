import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Expandable checklist row. `details` is `[{ label, value }]`, shown in two columns when open.
 */
const ReadinessItem = ({ title, caption, tone = 'success', details = [], defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const theme = useTheme();
  const color = tone === 'success' ? theme.palette.brand.success : '#D97706';
  return (
    <Box sx={{ borderRadius: '14px', border: `1px solid ${alpha(color, 0.4)}`, bgcolor: alpha(color, 0.07) }}>
      <Box
        component="button"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        sx={{ display: 'flex', alignItems: 'center', gap: 1.75, width: '100%', minHeight: 56, px: 2, py: 1.5, border: 0, bgcolor: 'transparent', font: 'inherit', textAlign: 'left', cursor: 'pointer', color: 'text.primary' }}
      >
        <Box component="span" sx={{ width: 26, height: 26, flex: 'none', borderRadius: '50%', bgcolor: color, color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {tone === 'success' ? '✓' : '!'}
        </Box>
        <Box component="span" sx={{ flex: 1, minWidth: 0 }}>
          <Box component="b" sx={{ display: 'block' }}>{title}</Box>
          {caption && <Box component="small" sx={{ color: 'text.secondary' }}>{caption}</Box>}
        </Box>
        <Box
          component="span"
          aria-hidden="true"
          sx={{ width: 34, height: 34, flex: 'none', borderRadius: '50%', border: `1px solid ${alpha(color, 0.4)}`, bgcolor: 'background.paper', color, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </Box>
      </Box>
      {open && details.length > 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: '12px 28px', px: 2, pt: 1.75, pb: 2, pl: { sm: 7 }, borderTop: `1px dashed ${alpha(color, 0.4)}` }}>
          {details.map(d => (
            <Box key={d.label}>
              <Box component="small" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>{d.label}</Box>
              <Box component="b" sx={{ fontSize: 14, color: 'text.primary' }}>{d.value}</Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

ReadinessItem.propTypes = {
  title: PropTypes.node.isRequired,
  caption: PropTypes.node,
  tone: PropTypes.oneOf(['success', 'warning']),
  details: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.node })),
  defaultOpen: PropTypes.bool,
};

export default ReadinessItem;
