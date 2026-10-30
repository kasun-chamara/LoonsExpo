import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SectionCard from '../SectionCard';

/**
 * Multi-step progress card: a progress bar plus one tile per step.
 * `current` is the zero-based active step; earlier steps show as done.
 * `steps` is `[{ title, caption }]`.
 */
const SetupSteps = ({ title = 'Setup steps', steps, current, onSelect, status }) => {
  const theme = useTheme();
  const GREEN = theme.palette.brand.success;
  const percent = ((current + 0.5) / steps.length) * 100;
  return (
    <SectionCard sx={{ p: '18px 22px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
        <Box component="b" sx={{ fontSize: 15, color: 'text.primary' }}>{title}</Box>
        <Box component="span" sx={{ fontSize: 13, color: 'text.secondary' }}>
          Step {current + 1} of {steps.length}{status ? ` · ${status}` : ''}
        </Box>
      </Box>
      <Box sx={{ height: 10, borderRadius: 9, overflow: 'hidden', mb: 2, bgcolor: 'brand.light' }}>
        <Box
          sx={{
            height: '100%',
            width: `${percent}%`,
            borderRadius: 9,
            background: theme => `linear-gradient(90deg, ${alpha(theme.palette.brand.main, 0.5)} 0%, ${theme.palette.brand.main} 68%, ${theme.palette.brand.dark} 100%)`,
          }}
        />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))', lg: `repeat(${steps.length}, minmax(0, 1fr))` }, gap: 1.25 }}>
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <Box
              key={step.title}
              component="button"
              type="button"
              aria-current={active ? 'step' : undefined}
              onClick={() => onSelect && onSelect(i)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.25,
                p: 1.5,
                minWidth: 0,
                textAlign: 'left',
                font: 'inherit',
                color: 'text.primary',
                cursor: 'pointer',
                borderRadius: '12px',
                border: theme => `1px solid ${active ? theme.palette.brand.main : done ? alpha(GREEN, 0.4) : theme.palette.border.main}`,
                bgcolor: theme => (active ? theme.palette.brand.light : done ? alpha(GREEN, 0.08) : theme.palette.background.paper),
              }}
            >
              <Box
                component="i"
                sx={{
                  width: 28,
                  height: 28,
                  flex: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: 13,
                  bgcolor: theme => (active ? theme.palette.brand.main : done ? GREEN : theme.palette.action.hover),
                  color: active || done ? '#fff' : 'text.secondary',
                  boxShadow: theme => (active ? `0 0 0 4px ${alpha(theme.palette.brand.main, 0.2)}` : 'none'),
                }}
              >
                {done ? '✓' : i + 1}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Box component="b" sx={{ display: 'block', fontSize: 13.5, lineHeight: 1.25, color: active ? 'brand.dark' : 'text.primary' }}>{step.title}</Box>
                <Box component="small" sx={{ display: 'block', mt: 0.25, fontSize: 12, lineHeight: 1.3, color: 'text.secondary' }}>{step.caption}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </SectionCard>
  );
};

SetupSteps.propTypes = {
  title: PropTypes.node,
  steps: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.node.isRequired, caption: PropTypes.node })).isRequired,
  current: PropTypes.number.isRequired,
  onSelect: PropTypes.func,
  status: PropTypes.node,
};

export default SetupSteps;
