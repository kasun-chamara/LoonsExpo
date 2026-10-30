import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

const normalise = t => (typeof t === 'object' ? t : { value: t, label: t });

/**
 * Tab strip, controlled via `value` / `onChange`. `tabs` can be strings or `{ value, label, icon? }`
 * (`icon` is a 24x24 stroke path). Left/Right arrow keys move between tabs and the strip scrolls
 * sideways on small screens.
 *
 * `fullWidth` makes every tab share the strip's width equally.
 *
 * `variant="underline"` (default) draws a line under the active tab; `variant="pills"` puts the tabs in a
 * rounded track with a filled brand-coloured active tab.
 */
const TabBar = ({ tabs, value, onChange, variant = 'underline', fullWidth = false }) => {
  const items = tabs.map(normalise);
  const pills = variant === 'pills';

  const onKeyDown = (e, index) => {
    if (!onChange || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    e.preventDefault();
    const next = items[(index + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length];
    onChange(next.value);
    const buttons = e.currentTarget.parentElement.querySelectorAll('[role="tab"]');
    const target = buttons[items.indexOf(next)];
    if (target) target.focus();
  };

  return (
    <Box
      role="tablist"
      sx={{
        display: 'flex',
        gap: pills ? 0.5 : 0.75,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        ...(pills
          ? { alignSelf: 'flex-start', maxWidth: '100%', p: 0.5, borderRadius: 99, bgcolor: 'action.hover', border: theme => `1px solid ${theme.palette.border.main}` }
          : { borderBottom: theme => `1px solid ${theme.palette.border.main}` }),
      }}
    >
      {items.map((tab, index) => {
        const on = tab.value === value;
        return (
          <Box
            key={tab.value}
            component="button"
            type="button"
            role="tab"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange && onChange(tab.value)}
            onKeyDown={e => onKeyDown(e, index)}
            sx={{
              flex: fullWidth ? 1 : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              whiteSpace: 'nowrap',
              font: 'inherit',
              fontWeight: on ? 600 : 500,
              cursor: 'pointer',
              color: on ? (pills ? 'brand.contrastText' : 'brand.dark') : 'text.secondary',
              transition: 'background-color .15s, color .15s',
              '&:focus-visible': { outline: theme => `2px solid ${theme.palette.brand.main}`, outlineOffset: 2 },
              ...(pills
                ? {
                  px: 2,
                  py: 1.125,
                  border: 0,
                  borderRadius: 99,
                  bgcolor: on ? 'brand.main' : 'transparent',
                  boxShadow: on ? theme => `0 2px 8px ${alpha(theme.palette.brand.main, 0.35)}` : 'none',
                  '&:hover': on ? undefined : { bgcolor: 'brand.hover', color: 'brand.dark' },
                }
                : {
                  px: 1.75,
                  py: 1.375,
                  mb: '-1px',
                  border: 0,
                  bgcolor: 'transparent',
                  borderBottom: theme => `2px solid ${on ? theme.palette.brand.main : 'transparent'}`,
                  '&:hover': on ? undefined : { color: 'brand.dark' },
                }),
            }}
          >
            {tab.icon && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={tab.icon} />
              </svg>
            )}
            {tab.label}
          </Box>
        );
      })}
    </Box>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['underline', 'pills']),
  fullWidth: PropTypes.bool,
};

export default TabBar;
