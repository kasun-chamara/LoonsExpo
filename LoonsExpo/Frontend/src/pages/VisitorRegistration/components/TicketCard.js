import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import qrPath from 'pages/auth/loginQrPath';

/**
 * Brand-coloured visitor ticket with a QR code. `compact` shrinks it for use inside a settings card.
 * `fields` is `[{ label, value }]`, shown in two columns.
 */
const TicketCard = ({ kind, name, role, fields, code, compact = false }) => (
  <Box
    sx={{
      position: 'relative',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: `minmax(0, 1fr) ${compact ? 150 : 190}px` },
      gap: 3,
      alignItems: 'center',
      p: compact ? 3.25 : 3.75,
      borderRadius: '24px',
      color: '#fff',
      background: theme => `linear-gradient(135deg, #4A1208 0%, ${theme.palette.brand.dark} 40%, ${theme.palette.brand.main} 75%, #FF8F47 100%)`,
      boxShadow: '0 18px 40px rgba(244,50,11,.25)',
      '&:before': { content: '""', position: 'absolute', right: -80, top: -100, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,.08)' },
      '& > *': { position: 'relative' },
    }}
  >
    <Box>
      <Box component="em" sx={{ display: 'inline-block', px: 1.375, py: 0.625, borderRadius: '12px', fontSize: 11, fontStyle: 'normal', fontWeight: 800, letterSpacing: '.12em', bgcolor: 'rgba(255,255,255,.18)' }}>{kind}</Box>
      <Box component="h2" sx={{ m: '14px 0 4px', fontSize: compact ? 21 : 26, letterSpacing: '-.02em' }}>{name}</Box>
      <Box sx={{ fontSize: 14, opacity: 0.9 }}>{role}</Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px 20px', mt: 2.75, pt: 2.5, borderTop: '1px solid rgba(255,255,255,.25)' }}>
        {fields.map(f => (
          <Box key={f.label}>
            <Box component="small" sx={{ display: 'block', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.75 }}>{f.label}</Box>
            <Box component="b" sx={{ display: 'block', mt: 0.375, fontSize: 14.5 }}>{f.value}</Box>
          </Box>
        ))}
      </Box>
    </Box>
    <Box sx={{ p: compact ? 1.25 : 1.75, borderRadius: '18px', bgcolor: '#fff', color: '#1B2430', textAlign: 'center' }}>
      <svg viewBox="0 0 29 29" shapeRendering="crispEdges" role="img" aria-label="Ticket QR code" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <path d={qrPath} fill="#1B2430" />
      </svg>
      <Box component="small" sx={{ display: 'block', mt: 1, fontSize: 11.5, fontWeight: 700, letterSpacing: '.04em', color: '#6B7686' }}>{code}</Box>
    </Box>
  </Box>
);

TicketCard.propTypes = {
  kind: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  role: PropTypes.node,
  fields: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.node })).isRequired,
  code: PropTypes.node,
  compact: PropTypes.bool,
};

export default TicketCard;
