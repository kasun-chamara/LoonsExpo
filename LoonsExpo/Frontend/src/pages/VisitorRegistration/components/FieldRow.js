import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { SelectField, Toggle } from 'components';

/**
 * One question of the registration form: name, how it is asked (Required / Optional) and whether it shows.
 * `asked={null}` means the question is always required, so it cannot be changed or hidden.
 */
const FieldRow = ({ title, description, asked, show, options, onAskedChange, onShowChange }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: 'minmax(0, 1fr) 64px', md: 'minmax(0, 1fr) 150px 64px' },
      gap: 1.75,
      alignItems: 'center',
      py: 1.375,
      borderBottom: theme => `1px solid ${theme.palette.border.main}`,
    }}
  >
    <Box sx={{ minWidth: 0 }}>
      <Box component="b" sx={{ display: 'block', fontSize: 14, color: 'text.primary' }}>{title}</Box>
      <Box component="small" sx={{ fontSize: 12, color: 'text.secondary' }}>{description}</Box>
    </Box>
    {asked === null ? (
      <Box component="span" sx={{ display: { xs: 'none', md: 'inline-flex' }, alignItems: 'center', gap: 0.75, fontSize: 12.5, fontWeight: 700, color: 'text.secondary' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 11h12v9H6zM8 11V8a4 4 0 018 0v3" /></svg>
        Always required
      </Box>
    ) : (
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <SelectField ariaLabel={`${title} is`} value={asked} onChange={onAskedChange} options={options} sx={{ '& select': { minHeight: 38, fontSize: 13 } }} />
      </Box>
    )}
    <Box sx={{ justifySelf: 'end' }}>
      <Toggle checked={show} disabled={asked === null} onChange={onShowChange} label={`Show ${title}`} />
    </Box>
  </Box>
);

FieldRow.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  asked: PropTypes.string,
  show: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onAskedChange: PropTypes.func,
  onShowChange: PropTypes.func,
};

export default FieldRow;
