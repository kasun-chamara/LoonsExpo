import React, { useState, useEffect, useRef } from 'react';
import { Drawer, useTheme, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navigationItems } from '../../navigation/navigations';
import { APP_CONTENT } from 'mockDb';
import './Sidebar.css';


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

const Sidebar = ({ open, onClose, drawerWidth = 256, collapsedWidth = 64, collapsed, setCollapsed, hovered, setHovered }) => {
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

  const renderIcon = (item) => (
    <svg className="lx-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d={item.iconPath} />
    </svg>
  );

  const renderItems = () => {
    let lastSection = null;
    return navigationItems.map((item) => {
      if (item.roles && !hasAnyRole(item.roles)) return null;
      const heading = item.section && item.section !== lastSection ? <h6 className="lx-h">{item.section}</h6> : null;
      if (item.section) lastSection = item.section;

      if (item.submenu) {
        const children = item.submenu.filter(sub => !sub.roles || hasAnyRole(sub.roles));
        if (!children.length) return null;
        const isExpanded = !!expandedItems[item.title];
        const hasActiveChild = children.some(sub => isActive(sub.path));
        return (
          <React.Fragment key={item.title}>
            {heading}
            <button
              type="button"
              className={`lx-sum${hasActiveChild ? ' on' : ''}`}
              aria-expanded={isExpanded}
              title={item.title}
              onClick={() => handleItemClick(item)}
            >
              <span className="lx-l">{renderIcon(item)}<span className="lx-txt">{item.title}</span></span>
              <svg className={`lx-cv${isExpanded ? ' open' : ''}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {isExpanded && isSidebarExpanded && (
              <div className="lx-sub">
                {children.map(sub => (
                  <button
                    type="button"
                    key={sub.title}
                    className={`lx-link${isActive(sub.path) ? ' on' : ''}`}
                    onClick={() => handleItemClick(sub)}
                  >
                    <span className="lx-l">{sub.title}</span>
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={item.title}>
          {heading}
          <button
            type="button"
            className={`lx-link${isActive(item.path) ? ' on' : ''}`}
            title={item.title}
            onClick={() => handleItemClick(item)}
          >
            <span className="lx-l">{renderIcon(item)}<span className="lx-txt">{item.title}</span></span>
          </button>
        </React.Fragment>
      );
    });
  };

  // Colours come from the active MUI theme so the sidebar follows light/dark and any palette change
  const sb = theme.palette.sidebar;
  const navVars = {
    '--lx-bg': sb.background,
    '--lx-line': theme.palette.border.main,
    '--lx-text': sb.menuItem.text,
    '--lx-muted': sb.logoSloganColor,
    '--lx-logo': sb.logoTextColor,
    '--lx-hover': theme.palette.brand.hover,
    '--lx-active-bg': theme.palette.brand.light,
    '--lx-active-text': theme.palette.brand.dark,
    '--lx-pri': theme.palette.brand.main,
    '--lx-pri-dark': theme.palette.brand.dark,
    '--lx-pri-text': theme.palette.brand.contrastText,
    '--lx-tint': theme.palette.brand.tint,
  };

  const drawerContent = (
    <nav
      style={navVars}
      className={`lx-sb${isSidebarExpanded ? '' : ' is-mini'}`}
      aria-label="Main"
      onMouseEnter={!isMobile && collapsed ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile && collapsed ? handleMouseLeave : undefined}
    >
      <div className="lx-logo">
        <span className="lx-mk" />
        <span className="lx-logo-t">{APP_CONTENT.brand.name}<small>{APP_CONTENT.brand.caption}</small></span>
      </div>
      <div className="lx-scroll">{renderItems()}</div>
      <div className="lx-ev">
        <b>{APP_CONTENT.event.name}</b>
        <button type="button" className="lx-scan" onClick={() => navigate(APP_CONTENT.event.scanPath)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16" /></svg>
          {APP_CONTENT.event.scanLabel}
        </button>
      </div>
    </nav>
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 0 },
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
          border: 0,
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
