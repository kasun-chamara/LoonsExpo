import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const button = (on, disabled) => ({
  minWidth: 36,
  height: 36,
  px: 1.5,
  font: 'inherit',
  fontSize: 13,
  fontWeight: 600,
  borderRadius: '8px',
  cursor: disabled ? 'default' : 'pointer',
  opacity: disabled ? 0.5 : 1,
  color: on ? 'brand.contrastText' : 'text.primary',
  bgcolor: on ? 'brand.main' : 'background.paper',
  border: theme => `1px solid ${on ? theme.palette.brand.main : theme.palette.border.main}`,
});

/**
 * Prev / page numbers / Next with a "Showing x to y of z" summary.
 */
const Pager = ({ page, pageCount, pageSize, total, onChange }) => {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
      <Box component="small" sx={{ color: 'text.secondary' }}>Showing {from} to {to} of {total} entries</Box>
      <Box sx={{ display: 'flex', gap: 0.75 }}>
        <Box component="button" type="button" disabled={page === 1} onClick={() => onChange(page - 1)} sx={button(false, page === 1)}>Prev</Box>
        {pages.map(p => (
          <Box key={p} component="button" type="button" aria-current={p === page ? 'page' : undefined} onClick={() => onChange(p)} sx={button(p === page, false)}>{p}</Box>
        ))}
        <Box component="button" type="button" disabled={page === pageCount} onClick={() => onChange(page + 1)} sx={button(false, page === pageCount)}>Next</Box>
      </Box>
    </Box>
  );
};

Pager.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pager;
