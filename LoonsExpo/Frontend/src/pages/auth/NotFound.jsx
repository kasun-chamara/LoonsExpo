import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      minHeight="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: `
          linear-gradient(200deg, ${alpha(theme.palette.primary.main, 0)} -10%, #ffffff 100%),
          url('/assets/loginPage/login_page_background.jpg')
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '15px',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 500,
          p: 4,
          borderRadius: 4,
          //boxShadow: '0 2px 8px 0 rgba(34,41,47,0.08)',
         // backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h1" fontWeight={700} color="primary" mb={2}>
          404
        </Typography>
        <Typography variant="h5" fontWeight={500} color="text.primary" mb={2}>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: 2,
            //fontWeight: 700,
           // fontSize: 18,
            py: 1,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={handleGoHome}
        >
          Go to Homepage
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
