// Common component overrides for both light and dark themes
export const componentOverrides = {
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.sidebar.background,
        color: theme.palette.sidebar.text,
        border: 'none',
        boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.06)',
        marginTop: '5px',
        marginLeft: '5px',
        marginBottom: '5px',
        borderRadius: '5px',
        //height: 'calc(100vh - 25px)', // Adjust for top/bottom margin
        height: 'calc(100vh - 10px)', // Adjust for top/bottom margin
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.topbar.background,
        color: theme.palette.topbar.text,
        margin: {
          xs: '0',         // No margin on mobile
          md: '10px 5px 0 5px', // Margin on desktop
        },
        marginTop: '5px',
        borderRadius: '5px',
        boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.06)',
        width:{
          xs: '100%',      // Full width on mobile
          md: 'calc(100% - 30px)', // Reduced width on desktop
        },
        left: {
          xs: 0,
          md: '5px',
        },
        right: {
          xs: 0,
          md: '5px',
        },
      }),
    },
  },
  // Custom class for sidebar menu items
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '12px',
        margin: '4px 8px',
        transition: 'all 0.2s',
        '&.SidebarMenuItem-active': {
          backgroundColor: theme.palette.sidebar.menuItem.backgroundActive,
          boxShadow: '0 2px 8px 0 rgba(34, 41, 47, 0.04)',
        },
        '&:hover': {
          backgroundColor: theme.palette.sidebar.menuItem.backgroundHover,
          boxShadow: '0 2px 8px 0 rgba(34, 41, 47, 0.04)',
        },
      }),
    },
  },
};
