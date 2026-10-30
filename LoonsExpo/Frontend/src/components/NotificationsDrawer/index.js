import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { CloseRounded } from '@mui/icons-material';
import TabBar from '../TabBar';

// Every notification uses the same bell icon.
const BELL = 'M6 17V11a6 6 0 0112 0v6l1.5 2h-15zM10 21h4';

const CountBadge = ({ count, active }) => (
  <Box component="span" sx={{ minWidth: 20, height: 20, px: 0.75, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 99, fontSize: 11, fontWeight: 800, color: active ? 'brand.contrastText' : 'text.secondary', bgcolor: active ? 'brand.main' : 'action.hover' }}>
    {count}
  </Box>
);

/**
 * Right-hand notifications panel with two tabs, New (unread) and Read.
 * `items` is `[{ id, title, detail, time, read }]`. Clicking a new item reports `onRead(id)`;
 * "Mark all as read" reports `onReadAll()`.
 */
const NotificationsDrawer = ({ open, onClose, items, onRead, onReadAll }) => {
  const [tab, setTab] = useState('New');

  const unread = items.filter(i => !i.read);
  const read = items.filter(i => i.read);
  const list = tab === 'New' ? unread : read;
  const visible = list;

  const tabs = [
    { value: 'New', label: <>New <CountBadge count={unread.length} active={tab === 'New'} /></> },
    { value: 'Read', label: <>Read <CountBadge count={read.length} active={tab === 'Read'} /></> },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 440 },
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          // The theme styles every Drawer like the sidebar (blue text in dark mode, small margins), so reset that here.
          color: 'text.primary',
          m: 0,
          borderRadius: 0,
          '&:focus, & :focus': { outline: 'none' },
          '& button:focus-visible, & [role="tab"]:focus-visible': { outline: theme => `2px solid ${theme.palette.brand.main}`, outlineOffset: -2 },
          '& button': { WebkitTapHighlightColor: 'transparent' },
        },
      }}>
      <Box sx={{ flex: 'none', px: 3, pt: 2.75 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography component="h2" sx={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.2 }}>Notifications</Typography>
            <Typography sx={{ mt: 0.25, fontSize: 13, color: theme => (theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.secondary) }}>
              {unread.length > 0 ? `You have ${unread.length} new ${unread.length === 1 ? 'notification' : 'notifications'}` : 'You are all caught up'}
            </Typography>
          </Box>
          <IconButton
            aria-label="Close notifications"
            onClick={onClose}
            sx={{
              width: 40,
              height: 40,
              color: 'text.secondary',
              bgcolor: 'background.paper',
              border: theme => `1px solid ${theme.palette.border.main}`,
              '&:hover': { color: 'brand.dark', bgcolor: 'brand.light', borderColor: 'brand.borderHover' },
            }}
          >
            <CloseRounded fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2, mx: -3, px: 3 }}>
          <TabBar fullWidth tabs={tabs} value={tab} onChange={setTab} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {visible.length === 0 && (
          <Box sx={{ py: 10, px: 3, textAlign: 'center', color: 'text.secondary' }}>
            <Box sx={{ mx: 'auto', mb: 2, width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'brand.light', color: 'brand.main' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={BELL} /></svg>
            </Box>
            <Box sx={{ fontSize: 15, fontWeight: 700, color: 'text.primary', mb: 0.5 }}>{tab === 'New' ? "You're all caught up" : 'Nothing read yet'}</Box>
            <Box sx={{ fontSize: 13 }}>{tab === 'New' ? 'New notifications will show up here.' : 'Notifications you open will be listed here.'}</Box>
          </Box>
        )}

        {visible.map(n => (
            <Box
              key={n.id}
              component="button"
              type="button"
              onClick={() => !n.read && onRead(n.id)}
              sx={{
                position: 'relative',
                display: 'flex',
                gap: 1.75,
                width: '100%',
                px: 3,
                py: 2,
                textAlign: 'left',
                font: 'inherit',
                color: 'text.primary',
                cursor: n.read ? 'default' : 'pointer',
                border: 0,
                borderBottom: theme => `1px solid ${theme.palette.border.main}`,
                bgcolor: n.read ? 'transparent' : theme => alpha(theme.palette.brand.main, 0.05),
                '&:before': n.read ? undefined : { content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, bgcolor: 'brand.main' },
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Box sx={{ flex: 'none', width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'brand.main', bgcolor: 'brand.tint' }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={BELL} /></svg>
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 1.5 }}>
                  <Box component="b" sx={{ fontSize: 14, fontWeight: n.read ? 600 : 700 }}>{n.title}</Box>
                  <Box component="small" sx={{ flex: 'none', fontSize: 11.5, color: 'text.secondary', whiteSpace: 'nowrap' }}>{n.time}</Box>
                </Box>
                <Box component="span" sx={{ display: 'block', mt: 0.5, fontSize: 13, lineHeight: 1.45, color: 'text.secondary' }}>{n.detail}</Box>
              </Box>
            </Box>
        ))}
      </Box>

      <Box sx={{ flex: 'none', display: 'flex', gap: 1.5, px: 3, py: 2, borderTop: theme => `1px solid ${theme.palette.border.main}` }}>
        <Box
          component="button"
          type="button"
          disabled={unread.length === 0}
          onClick={onReadAll}
          sx={{ flex: 1, minHeight: 44, font: 'inherit', fontWeight: 700, cursor: 'pointer', borderRadius: '10px', color: 'brand.contrastText', bgcolor: 'brand.main', border: 0, '&:hover': { bgcolor: 'brand.dark' }, '&:disabled': { opacity: 0.45, cursor: 'default', bgcolor: 'brand.main' } }}
        >
          Mark all as read
        </Box>
      </Box>
    </Drawer>
  );
};

NotificationsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
    detail: PropTypes.node,
    time: PropTypes.node,
    read: PropTypes.bool,
  })).isRequired,
  onRead: PropTypes.func.isRequired,
  onReadAll: PropTypes.func.isRequired,
};

export default NotificationsDrawer;
