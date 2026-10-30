import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ringStyle = { fill: 'none', stroke: '#fff' };

/**
 * Brand-coloured summary banner with a day tracker and quick-action buttons.
 * `actions` is `[{ id, label, primary?, onClick? }]`; `primary` renders a solid white button.
 * `topRight` is an optional slot shown in the top-right corner (for example a date range switch).
 */
const HeroBanner = ({ eyebrow, title, text, days, currentDay, actions, topRight }) => (
  <Box
    component="section"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      px: { xs: 2.5, md: 4 },
      py: 3.5,
      borderRadius: '20px',
      color: 'brand.contrastText',
      background: theme => `linear-gradient(135deg, ${theme.palette.brand.main} 0%, ${theme.palette.brand.dark} 100%)`,
    }}
  >
    <svg viewBox="0 0 520 260" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '55%', pointerEvents: 'none' }}>
      <g>
        {[74, 112, 152, 196, 244].map((r, i) => <circle key={r} cx="400" cy="130" r={r} strokeOpacity={[0.28, 0.2, 0.14, 0.09, 0.06][i]} {...ringStyle} />)}
      </g>
      <circle cx="400" cy="130" r="46" fill="#FFD9A0" fillOpacity=".7" />
      <circle cx="470" cy="36" r="14" fill="#fff" fillOpacity=".2" />
      <circle cx="318" cy="216" r="9" fill="#fff" fillOpacity=".3" />
      <circle cx="486" cy="206" r="22" fill="#FFB233" fillOpacity=".45" />
    </svg>

    <Box sx={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
    <Box sx={{ flex: '1 1 340px', maxWidth: 560 }}>
      <Box component="small" sx={{ fontSize: 13, opacity: 0.9 }}>{eyebrow}</Box>
      <Box component="h2" sx={{ m: '6px 0', fontSize: { xs: 24, md: 30 }, fontWeight: 800, letterSpacing: '-.02em' }}>{title}</Box>
      <Box component="p" sx={{ m: 0, fontSize: 14.5, lineHeight: 1.55, opacity: 0.92 }}>{text}</Box>

      <Box sx={{ mt: 2.25 }}>
        <Box sx={{ display: 'flex', gap: 0.75, maxWidth: 320 }} aria-hidden="true">
          {days.map((d, i) => (
            <Box key={d} sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: i < currentDay ? '#fff' : i === currentDay ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.28)' }} />
          ))}
        </Box>
        <Box component="em" sx={{ display: 'block', mt: 0.75, fontSize: 12, fontStyle: 'normal', opacity: 0.85 }}>{days.join(' · ')}</Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mt: 2.5 }}>
        {actions.map(a => (
          <Box
            key={a.id}
            component="button"
            type="button"
            onClick={a.onClick}
            sx={{
              minHeight: 42,
              px: 2.25,
              borderRadius: '10px',
              font: 'inherit',
              fontWeight: 700,
              cursor: 'pointer',
              color: a.primary ? 'brand.dark' : 'brand.contrastText',
              bgcolor: a.primary ? '#fff' : 'rgba(255,255,255,.18)',
              border: a.primary ? 0 : '1px solid rgba(255,255,255,.4)',
              '&:hover': { bgcolor: a.primary ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.28)' },
            }}
          >
            {a.label}
          </Box>
        ))}
      </Box>
    </Box>
    {topRight && (
      <Box sx={{ flex: 'none', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.25 }}>
        {topRight}
      </Box>
    )}
    </Box>
  </Box>
);

HeroBanner.propTypes = {
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
  text: PropTypes.node,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentDay: PropTypes.number.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, label: PropTypes.node, primary: PropTypes.bool, onClick: PropTypes.func })).isRequired,
  topRight: PropTypes.node,
};

export default HeroBanner;
