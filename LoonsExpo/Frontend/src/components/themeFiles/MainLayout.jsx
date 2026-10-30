import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const drawerWidth = 256;
  const collapsedWidth = 64;
  const isSidebarExpanded = !collapsed || hovered;
  const sidebarWidth = isSidebarExpanded ? drawerWidth : collapsedWidth;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex',/*   zoom: 0.9, */flexDirection: 'column',  minHeight: '100vh',backgroundColor: theme => theme.palette.background.default, }}>
      <Box sx={{ px: { xs: 1, sm: 1, md: 2 } }}>
        <Header
          onMenuClick={handleDrawerToggle}
          sidebarWidth={sidebarWidth}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Toolbar sx={{ minHeight: { xs: 64, md: 68 } }} />
      </Box>

      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          drawerWidth={drawerWidth}
          collapsedWidth={collapsedWidth}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          hovered={hovered}
          setHovered={setHovered}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: '10px',
            transition: 'margin-left 0.2s',
            marginLeft: { md: `${sidebarWidth+5}px` },
            width: { md: `calc(100% - ${sidebarWidth+5}px)` },
            maxWidth: 'calc(100vw)', // Prevent horizontal overflow with 30px margin
            backgroundColor: theme => theme.palette.background.default,
          }}
        >
          {children}
        </Box>
      </Box>

      <Footer sidebarWidth={sidebarWidth} />
    </Box>
  );
};

export default MainLayout;
