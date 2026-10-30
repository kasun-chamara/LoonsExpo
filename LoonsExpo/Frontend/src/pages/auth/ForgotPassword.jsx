import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatorForm from 'components/ValidatorForm';
import { TextValidator } from 'react-material-ui-form-validator';
import {
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  Link,
  Alert,
} from '@mui/material';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Add your API call here to request password reset
      // await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
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
      <Paper elevation={1} sx={{ maxWidth: 400, width: '100%', p: 4, borderRadius: 4, boxShadow: '0 2px 8px 0 rgba(34,41,47,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <img src="/assets/siteLogo/logo.png" alt="Logo" style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: '50%' }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>
            Forgot Password
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2} textAlign="center">
            Enter your email and we'll send you instructions to reset your password
          </Typography>
        </Box>

        {success ? (
          <Box textAlign="center">
            <Alert severity="success" sx={{ mb: 3 }}>
              Reset instructions have been sent to your email
            </Alert>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 18,
                py: 1,
              }}
            >
              Back to Login
            </Button>
          </Box>
        ) : (
          <ValidatorForm onSubmit={handleSubmit} instantValidate={false} style={{ width: '100%' }}>
            <TextValidator
              size="small"
              label="Email"
              onChange={e => setEmail(e.target.value)}
              name="email"
              value={email}
              fullWidth
              margin="normal"
              variant="outlined"
              validators={['required', 'isEmail']}
              errorMessages={['Email is required', 'Email is not valid']}
              autoFocus
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{
                style: { color: theme.palette.text.primary },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                )
              }}
            />

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 18,
                py: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Box mt={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Remember your password?{' '}
                <Link href="/login" color="primary" fontWeight={600} underline="hover">
                  Back to Login
                </Link>
              </Typography>
            </Box>
          </ValidatorForm>
        )}
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
