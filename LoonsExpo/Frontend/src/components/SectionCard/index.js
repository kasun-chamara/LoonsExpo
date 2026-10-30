import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Typography } from '@mui/material';

/**
 * White bordered card with a heading row (title on the left, optional action on the right).
 * `action` is `{ label, onClick?, href? }` or any node.
 */
const SectionCard = ({ title, subtitle, action, children, sx, ...rest }) => (
  <Box
    {...rest}
    sx={{
      bgcolor: 'background.paper',
      border: theme => `1px solid ${theme.palette.border.main}`,
      borderRadius: '16px',
      p: '22px',
      minWidth: 0,
      boxShadow: '0 1px 2px rgba(27,36,48,.05), 0 6px 20px rgba(27,36,48,.05)',
      ...sx,
    }}
  >
    {(title || action) && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, mb: subtitle ? 0.5 : 2 }}>
        <Typography component="h3" sx={{ fontSize: 16, fontWeight: 650, letterSpacing: '-.01em', color: 'text.primary' }}>
          {title}
        </Typography>
        {action && (React.isValidElement(action) ? action : (
          <Link
            component={action.href ? 'a' : 'button'}
            type={action.href ? undefined : 'button'}
            href={action.href}
            onClick={action.onClick}
            underline="hover"
            sx={{ fontSize: 13, fontWeight: 600, color: theme => theme.palette.brand.dark, border: 0, bgcolor: 'transparent', cursor: 'pointer', p: 0 }}
          >
            {action.label}
          </Link>
        ))}
      </Box>
    )}
    {subtitle && <Typography sx={{ mb: 2.25, fontSize: 13, color: 'text.secondary' }}>{subtitle}</Typography>}
    {children}
  </Box>
);

SectionCard.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  action: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({ label: PropTypes.node, onClick: PropTypes.func, href: PropTypes.string }),
  ]),
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default SectionCard;
