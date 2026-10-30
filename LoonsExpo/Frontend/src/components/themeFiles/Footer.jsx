import React from 'react';
import { useTheme, useMediaQuery, Box } from '@mui/material';

const Footer = ({ sidebarWidth = 280 }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.footer.background,
        color: theme.palette.footer.text,
        marginBottom: isDesktop ? '13px' : 0,
        marginLeft: isDesktop ? `${sidebarWidth + 14}px` : 0,
        marginRight: isDesktop ? '10px' : 0,
        borderRadius: isDesktop ? '10px' : 0,
        boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.06)',
        width: isDesktop ? `calc(100% - ${sidebarWidth + 24}px)` : '100%',
        p: 1,
        textAlign: 'center',
      }}
    >
      &copy; {new Date().getFullYear()} Loons Lab. All rights reserved.
    </Box>
  );
};

export default Footer;
