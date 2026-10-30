import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { SimpleTable } from 'components';

/**
 * Collapsible "View data as table" block so a chart's numbers are available as text too.
 */
const DataDetails = ({ columns, rows, label = 'View data as table' }) => (
  <Box component="details" sx={{ mt: 2, '& summary': { cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'brand.dark', listStyle: 'none' }, '& summary::-webkit-details-marker': { display: 'none' } }}>
    <summary>{label}</summary>
    <Box sx={{ mt: 1 }}>
      <SimpleTable columns={columns} rows={rows} />
    </Box>
  </Box>
);

DataDetails.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  label: PropTypes.string,
};

export default DataDetails;
