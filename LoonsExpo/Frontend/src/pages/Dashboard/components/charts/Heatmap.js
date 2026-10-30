import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { formatNumber } from './chartUtils';

/**
 * Grid of coloured cells, one row per gate/category and one column per hour. Darker means more.
 * `rows` is `[{ name, values }]`; a total column is added on the right.
 */
const Heatmap = ({ columns, rows, unit = 'check-ins', summary }) => {
  const max = Math.max(...rows.flatMap(r => r.values));
  const template = `64px repeat(${columns.length}, minmax(0, 1fr)) 56px`;

  return (
    <Box role="img" aria-label={summary} sx={{ display: 'grid', gridTemplateColumns: template, gap: 0.5, alignItems: 'center' }}>
      <span />
      {columns.map(c => <Box key={c} sx={{ textAlign: 'center', fontSize: 10.5, color: 'text.secondary' }}>{c}</Box>)}
      <Box sx={{ textAlign: 'right', fontSize: 10.5, color: 'text.secondary' }}>Total</Box>

      {rows.map(row => (
        <React.Fragment key={row.name}>
          <Box sx={{ fontSize: 12.5, fontWeight: 600, color: 'text.primary' }}>{row.name}</Box>
          {row.values.map((v, i) => {
            const ratio = v / max;
            return (
              <Box
                key={i}
                title={`${row.name} · ${columns[i]}:00 · ${formatNumber(v)} ${unit}`}
                sx={{
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  fontSize: 10.5,
                  fontWeight: 600,
                  bgcolor: theme => alpha(theme.palette.brand.main, 0.1 + ratio * 0.85),
                  color: ratio > 0.5 ? '#fff' : 'text.primary',
                }}
              >
                {v}
              </Box>
            );
          })}
          <Box sx={{ textAlign: 'right', fontSize: 12.5, fontWeight: 700, color: 'text.primary' }}>{formatNumber(row.values.reduce((a, b) => a + b, 0))}</Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

Heatmap.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, values: PropTypes.arrayOf(PropTypes.number).isRequired })).isRequired,
  unit: PropTypes.string,
  summary: PropTypes.string.isRequired,
};

export default Heatmap;
