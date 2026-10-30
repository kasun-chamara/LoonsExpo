import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import InitialsAvatar from '../InitialsAvatar';

/**
 * Preview of a printed visitor/exhibitor badge. The QR block is decorative.
 */
const BadgeCard = ({ event, brand = 'LoonsExpo', role = 'EXHIBITOR', initials, name, company, stall, code }) => (
  <Box sx={{ width: 240, mx: 'auto', overflow: 'hidden', borderRadius: '18px', border: theme => `1px solid ${theme.palette.border.main}`, bgcolor: 'background.paper', boxShadow: '0 10px 28px rgba(27,36,48,.12)' }}>
    <Box sx={{ px: 2, py: 2, textAlign: 'center', color: 'brand.contrastText', bgcolor: 'brand.main' }}>
      <Box component="b" sx={{ display: 'block', fontSize: 16 }}>{brand}</Box>
      <Box component="small" sx={{ fontSize: 11, opacity: 0.9 }}>{event}</Box>
      <Box sx={{ mt: 1 }}>
        <Box component="span" sx={{ px: 1.5, py: 0.25, borderRadius: 99, fontSize: 10, fontWeight: 700, letterSpacing: '.1em', bgcolor: 'rgba(255,255,255,.22)' }}>
          {role}
        </Box>
      </Box>
    </Box>
    <Box sx={{ px: 2, py: 2.25, textAlign: 'center', color: 'text.primary' }}>
      <InitialsAvatar initials={initials} size={56} sx={{ mx: 'auto', mb: 1 }} />
      <Box component="h4" sx={{ m: 0, fontSize: 16 }}>{name}</Box>
      <Box component="p" sx={{ m: 0, fontSize: 12, color: 'text.secondary' }}>{company}</Box>
      <Box component="p" sx={{ m: 0, fontSize: 12, color: 'text.secondary' }}>{stall}</Box>
      <Box sx={{ width: 84, height: 84, mx: 'auto', my: 1.5, borderRadius: '8px', border: theme => `4px solid ${theme.palette.text.primary}`, background: theme => `conic-gradient(from 90deg at 3px 3px, transparent 90deg, ${theme.palette.text.primary} 0) 0 0 / 9px 9px` }} />
      <Box sx={{ fontSize: 11, color: 'text.secondary' }}>{code}</Box>
    </Box>
  </Box>
);

BadgeCard.propTypes = {
  event: PropTypes.node,
  brand: PropTypes.node,
  role: PropTypes.node,
  initials: PropTypes.string.isRequired,
  name: PropTypes.node.isRequired,
  company: PropTypes.node,
  stall: PropTypes.node,
  code: PropTypes.node,
};

export default BadgeCard;
