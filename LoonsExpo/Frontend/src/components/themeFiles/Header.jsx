import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  ButtonBase,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  NotificationsNoneRounded,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { APP_CONTENT, NOTIFICATIONS } from 'mockDb';
import NotificationsDrawer from '../NotificationsDrawer';

const Header = ({ onMenuClick, sidebarWidth = 256, setCollapsed }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isNarrow = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(state => state.theme);
  const user = useSelector(state => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState(NOTIFICATIONS);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };
  const markRead = id => setNotifications(list => list.map(n => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setNotifications(list => list.map(n => ({ ...n, read: true })));

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // Clear all localStorage variables
    localStorage.clear();
    handleMenuClose();
    navigate('/login');
  };

  const surface = theme.palette.background.paper;
  const muted = theme.palette.text.secondary;
  const brand = theme.palette.brand;

  // Round 44px icon button used for menu, theme, notifications and logout
  const roundBtn = {
    width: 44,
    height: 44,
    borderRadius: '12px',
    border: `1px solid ${brand.border}`,
    bgcolor: surface,
    color: brand.main,
    '&:hover': { bgcolor: brand.light, borderColor: brand.main, color: brand.dark },
  };

  const displayName = user?.name || user?.username || APP_CONTENT.header.fallbackUserName;
  const initials = displayName
    .split(' ')
    .map(part => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: { md: `${sidebarWidth + 15}px` },
        width: { md: `calc(100% - ${sidebarWidth + 25}px)` },
        transition: 'margin-left 0.3s, width 0.3s',
        top: 0,
        left: 0,
        zIndex: (t) => t.zIndex.drawer - 1,
        // Thin, faint brand-coloured line along the bottom edge, no shadow
        borderBottom: `1px solid ${alpha(brand.main, 0.3)}`,
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 68 }, gap: 1.5 }}>
        <IconButton
          aria-label="open drawer"
          onClick={() => {
            if (isMobile) {
              onMenuClick();
            } else {
              setCollapsed((prev) => !prev);
            }
          }}
          sx={roundBtn}
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <IconButton onClick={toggleTheme} aria-label="toggle theme" sx={roundBtn}>
            {isDarkMode ? <Brightness7 fontSize="small" /> : <Brightness4 fontSize="small" />}
          </IconButton>

          <IconButton aria-label={`Notifications, ${unreadCount} unread`} onClick={() => setNotificationsOpen(true)} sx={{ ...roundBtn, position: 'relative' }}>
            <NotificationsNoneRounded fontSize="small" />
            {unreadCount > 0 && (
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 2,
                  minWidth: 18,
                  height: 18,
                  px: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 99,
                  fontSize: 10.5,
                  fontWeight: 800,
                  color: 'brand.contrastText',
                  bgcolor: 'brand.main',
                  border: `2px solid ${surface}`,
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Box>
            )}
          </IconButton>

          <ButtonBase
            onClick={handleAvatarClick}
            aria-label="Account menu"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              p: '4px 16px 4px 4px',
              borderRadius: '12px',
              border: `1px solid ${brand.border}`,
              bgcolor: surface,
              textAlign: 'left',
              ...(isNarrow && { pr: '4px' }),
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '9px',
                bgcolor: brand.main,
                color: brand.contrastText,
                fontWeight: 700,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              {initials || 'U'}
            </Box>
            {!isNarrow && (
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.25, color: theme.palette.text.primary }}>
                  {displayName}
                </Typography>
                <Typography sx={{ fontSize: 11, lineHeight: 1.2, color: muted }}>{APP_CONTENT.header.userRole}</Typography>
              </Box>
            )}
          </ButtonBase>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <NotificationsDrawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        items={notifications}
        onRead={markRead}
        onReadAll={markAllRead}
      />
    </AppBar>
  );
};

export default Header;
