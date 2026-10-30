import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const TONES = { blue: '#2F6FED', green: '#12A150', purple: '#7C4DFF', amber: '#D97706', red: '#E5391A' };

/**
 * Vertical activity timeline. `items` is `[{ id, tone, icon, title, detail, time }]`, `icon` a 24x24 stroke path.
 */
const ActivityFeed = ({ items }) => {
  const theme = useTheme();
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {items.map((item, i) => {
        const color = TONES[item.tone] || theme.palette.brand.main;
        return (
          <Box key={item.id} component="li" sx={{ position: 'relative', display: 'flex', gap: 1.75, pb: i === items.length - 1 ? 0 : 2.25 }}>
            {i < items.length - 1 && (
              <Box aria-hidden="true" sx={{ position: 'absolute', left: 15, top: 32, bottom: 2, width: 2, bgcolor: theme.palette.border.main }} />
            )}
            <Box sx={{ width: 32, height: 32, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color, bgcolor: alpha(color, 0.14) }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={item.icon} />
              </svg>
            </Box>
            <Box>
              <Box component="b" sx={{ display: 'block', fontSize: 13.5, color: 'text.primary' }}>{item.title}</Box>
              <Box component="small" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>{item.detail}</Box>
              <Box component="small" sx={{ fontSize: 12, color: 'text.secondary', opacity: 0.8 }}>{item.time}</Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

ActivityFeed.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    tone: PropTypes.string,
    icon: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
    detail: PropTypes.node,
    time: PropTypes.node,
  })).isRequired,
};

export default ActivityFeed;
