import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Light data table. `columns` is `[{ key, label, render?(row) }]`; cells default to `row[key]`.
 */
const SimpleTable = ({ columns, rows, getRowKey }) => (
  <Box sx={{ overflowX: 'auto' }}>
    <Box
      component="table"
      sx={{
        width: '100%',
        borderCollapse: 'collapse',
        '& th': {
          textAlign: 'left',
          fontSize: 11,
          letterSpacing: '.05em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          fontWeight: 600,
          px: 1.5,
          py: 1,
          borderBottom: theme => `1px solid ${theme.palette.border.main}`,
        },
        '& td': { px: 1.5, py: 1.75, borderBottom: theme => `1px solid ${theme.palette.border.main}`, verticalAlign: 'middle', color: 'text.primary' },
        '& tr:last-of-type td': { borderBottom: 0 },
        '& tbody tr:hover td': { bgcolor: 'brand.hover' },
      }}
    >
      <thead>
        <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={getRowKey ? getRowKey(row) : i}>
            {columns.map(c => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </Box>
  </Box>
);

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string.isRequired, label: PropTypes.node, render: PropTypes.func })).isRequired,
  rows: PropTypes.array.isRequired,
  getRowKey: PropTypes.func,
};

export default SimpleTable;
