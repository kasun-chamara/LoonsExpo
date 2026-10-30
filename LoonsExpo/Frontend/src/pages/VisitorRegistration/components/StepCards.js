import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Compact horizontal stepper: numbered circle, title and one line of text per stage, with a chevron between stages.
 * Each stage is a button; `onPreview(n)` opens that stage's preview page.
 * `steps` is `[{ n, color, title, text }]`.
 */
const StepCards = ({ steps, onPreview }) => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'stretch' }, gap: { xs: 1, md: 0 } }}>
    {steps.map((step, i) => (
      <React.Fragment key={step.n}>
        {i > 0 && (
          <Box aria-hidden="true" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', px: 0.5, color: 'text.secondary', opacity: 0.6 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </Box>
        )}
        <Box
          component="button"
          type="button"
          onClick={() => onPreview(step.n)}
          title="Preview this page"
          sx={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            textAlign: 'left',
            font: 'inherit',
            color: 'text.primary',
            cursor: 'pointer',
            borderRadius: '14px',
            border: theme => `1px solid ${theme.palette.border.main}`,
            bgcolor: 'background.paper',
            '&:hover': { borderColor: step.color, bgcolor: 'action.hover' },
          }}
        >
          <Box component="span" sx={{ flex: 'none', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 15, fontWeight: 800, color: '#fff', bgcolor: step.color }}>
            {step.n}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Box component="b" sx={{ display: 'block', fontSize: 14.5 }}>{step.title}</Box>
            <Box component="small" sx={{ display: 'block', fontSize: 12.5, lineHeight: 1.35, color: 'text.secondary' }}>{step.text}</Box>
          </Box>
        </Box>
      </React.Fragment>
    ))}
  </Box>
);

StepCards.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({ n: PropTypes.number, color: PropTypes.string, title: PropTypes.node, text: PropTypes.node })).isRequired,
  onPreview: PropTypes.func.isRequired,
};

export default StepCards;
