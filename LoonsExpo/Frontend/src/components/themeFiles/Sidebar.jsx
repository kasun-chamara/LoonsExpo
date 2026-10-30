import React, { useState, useEffect, useRef } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navigationItems } from '../../navigation/navigations';


// Icon mapping for better performance and reliability
/* const iconMap = {
  Person: require('@mui/icons-material/Person').default,
};
 */
// Dynamic icon import function
/* const getIconComponent = (iconName) => {
  return iconMap[iconName] || iconMap.Person;
}; */

const findParentMenus = (items, path, parents = []) => {
  for (const item of items) {
    if (item.path === path) return parents;
    if (item.submenu) {
      const found = findParentMenus(item.submenu, path, [...parents, item.title]);
      if (found) return found;
    }
  }
  return null;
};

const Sidebar = ({ open, onClose, drawerWidth = 240, collapsedWidth = 64, collapsed, setCollapsed, hovered, setHovered }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [expandedItems, setExpandedItems] = useState({});
  const isSidebarExpanded = isMobile ? true : (!collapsed || hovered);
  const hoverTimeout = useRef();

  // Auto-expand parent menus based on current route
  useEffect(() => {
    const parents = findParentMenus(navigationItems, location.pathname);
    if (parents) {
      setExpandedItems((prev) => {
        const newExpanded = { ...prev };
        parents.forEach((title) => {
          newExpanded[title] = true;
        });
        return newExpanded;
      });
    }
  }, [location.pathname]);




  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(true);
  };
  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHovered(false);
    }, 150);
  };

  const handleItemClick = (item) => {
    if (item.submenu) {
      setExpandedItems(prev => ({
        ...prev,
        [item.title]: !prev[item.title]
      }));
    } else if (item.path) {
      navigate(item.path);
      if (isMobile) {
        onClose();
      }
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const hasAnyRole = (roles) => {
    if (!user || !user.roles) return false;
    const userRoles = user.roles.map(r => r.toLowerCase());
    return roles.some(role => userRoles.includes(role.toLowerCase()));
  };

  const renderMenuItem = (item, level = 0) => {
    if(!item.roles && item.submenu){
      item.roles=[...new Set(item.submenu.flatMap(item => item.roles))]
    }
    if (item.roles && !hasAnyRole(item.roles)) return null;
    const iconProp = item.icon;
    let iconElement;
    if (React.isValidElement(iconProp)) {
      iconElement = iconProp;
    } else {
      //const IconComponent = getIconComponent(iconProp);
      //iconElement = <IconComponent />;
    }
    const isExpanded = expandedItems[item.title];
    const isItemActive = item.path ? isActive(item.path) : false;
    return (
      <Box key={item.title}>
        <ListItem style={{ width: 'auto' }} disablePadding sx={{
          borderRadius: 2,
          mb: 0.5,
          mx: 1,
        }}>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            className={isItemActive ? 'SidebarMenuItem-active' : ''}
            sx={{
              pl: isSidebarExpanded ? (level * 2 + 3) : 2,
              py: 0.7,
              borderRadius: 2,
              backgroundColor: isItemActive ? theme.palette.sidebar.menuItem.backgroundActive : theme.palette.sidebar.menuItem.background,
              color: isItemActive ? theme.palette.sidebar.menuItem.textActive : theme.palette.sidebar.menuItem.text,
              fontWeight: isItemActive ? 600 : 400,
              '&:hover': {
                backgroundColor: isItemActive ? theme.palette.sidebar.menuItem.backgroundActive : theme.palette.sidebar.menuItem.backgroundHover,
              },
              transition: 'background 0.2s',
              justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
            }}
          >
            <ListItemIcon sx={{
              color: isItemActive ? theme.palette.sidebar.menuItem.iconActive : theme.palette.sidebar.menuItem.icon,
              minWidth: 0,
              mr: isSidebarExpanded ? 2 : 0,
              justifyContent: 'center',
              borderRadius: '8px',
              //background: isItemActive ? 'linear-gradient(135deg, #f5f6fa 0%, #e9ecef 100%)' : 'none',
              boxShadow: isItemActive ? '0 2px 8px 0 rgba(34, 41, 47, 0.04)' : 'none',
              p: isItemActive ? 0.5 : 0,
            }}>
              {iconElement}
            </ListItemIcon>
            <Box
              sx={{
                overflow: 'hidden',
                transition: 'opacity 0.3s, width 0.3s',
                opacity: isSidebarExpanded ? 1 : 0,
                width: isSidebarExpanded ? 'auto' : 0,
                pointerEvents: isSidebarExpanded ? 'auto' : 'none',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: isItemActive ? 700 : 500,
                  fontSize: 16,
                }}
              />
              {item.submenu && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
            </Box>
          </ListItemButton>
        </ListItem>
        {item.submenu && isSidebarExpanded && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.submenu.map((subItem) => renderMenuItem(subItem, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  // App info card at the top
  const appInfoCard = isSidebarExpanded ? (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 2,
        px: 1,
        py: 0.6,
        mx: 1,
        my: 1.2,
        boxShadow: 0,
        transition: 'opacity 0.3s',
        opacity: 1,
        pointerEvents: 'auto',
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.grey[100],
          borderRadius: 2,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src="/assets/siteLogo/logo.png"
          alt="Site Logo"
          style={{ width: 32, height: 32, objectFit: 'contain' }}
        />
      </Box>
      <Box
        sx={{
          transition: 'opacity 0.3s, width 0.3s',
          opacity: 1,
          width: 'auto',
          overflow: 'hidden',
          pointerEvents: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <Box sx={{ fontWeight: 700, fontSize: 16, color: theme.palette.sidebar.logoTextColor }}>
          CODEX
        </Box>
        <Box sx={{ fontSize: 13, color: theme.palette.sidebar.logoSloganColor }}>
          Document management
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 64,
        my: 1.2,
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.grey[100],
          borderRadius: 2,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src="/assets/siteLogo/logo.png"
          alt="Site Logo"
          style={{ width: 32, height: 32, objectFit: 'contain' }}
        />
      </Box>
    </Box>
  );



  const drawerContent = (
    <Box
      sx={{
        //width: isSidebarExpanded ? drawerWidth : collapsedWidth,
        bgcolor: theme.palette.sidebar.background,
        height: '100vh',
        pt: 0,
        transition: 'width 0.3s',
        overflowX: 'hidden',
        zoom: 0.9,
      }}
      onMouseEnter={!isMobile && collapsed ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile && collapsed ? handleMouseLeave : undefined}
    >
      {appInfoCard}
      <div className='px-4 w-full'>
        <Divider />
      </div>

      {/*  {!isMobile && toggleButton} */}
      <List sx={{ mt: 1 }}>
        {navigationItems.map((item) => renderMenuItem(item))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: isSidebarExpanded ? drawerWidth : collapsedWidth,
          transition: 'width 0.2s',
          overflowX: 'hidden',
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
