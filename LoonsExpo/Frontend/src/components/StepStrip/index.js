import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Compact strip of numbered steps. Steps before `current` are marked done, `current` is highlighted.
 * `steps` is an array of labels; `current` is zero-based.
 */
const StepStrip = ({ steps, current }) => {
  const theme = useTheme();
  const green = theme.palette.brand.success;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <Box
            key={label}
            aria-current={active ? 'step' : undefined}
            sx={{
              flex: 1,
              minWidth: 130,
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1.5,
              py: 1.25,
              borderRadius: '12px',
              fontSize: 13,
              fontWeight: 600,
              color: active ? 'brand.dark' : done ? green : 'text.secondary',
              bgcolor: active ? 'brand.light' : 'background.paper',
              border: `1px solid ${active ? theme.palette.brand.main : done ? alpha(green, 0.4) : theme.palette.border.main}`,
            }}
          >
            <Box
              component="i"
              sx={{
                width: 26,
                height: 26,
                flex: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontStyle: 'normal',
                fontSize: 12,
                bgcolor: active ? 'brand.main' : done ? green : 'action.hover',
                color: active || done ? '#fff' : 'text.secondary',
              }}
            >
              {done ? '✓' : i + 1}
            </Box>
            {label}
          </Box>
        );
      })}
    </Box>
  );
};

StepStrip.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.node).isRequired,
  current: PropTypes.number.isRequired,
};

export default StepStrip;
