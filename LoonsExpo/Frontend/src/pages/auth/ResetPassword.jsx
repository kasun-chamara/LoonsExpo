import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ValidatorForm from 'components/ValidatorForm';
import { TextValidator } from 'react-material-ui-form-validator';
import {
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useParams(); // Get the reset token from URL

  React.useEffect(() => {
    // Add custom validator for password match
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return value === password;
    });

    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    };
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Add your API call here to reset password
      // await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            Reset Password
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2} textAlign="center">
            Enter your new password
          </Typography>
        </Box>

        {success ? (
          <Box textAlign="center">
            <Alert severity="success" sx={{ mb: 3 }}>
              Your password has been successfully reset
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
              label="New Password"
              onChange={e => setPassword(e.target.value)}
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              fullWidth
              margin="normal"
              variant="outlined"
              validators={['required']}
              errorMessages={['Password is required']}
              autoFocus
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{
                style: { color: theme.palette.text.primary },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextValidator
              size="small"
              label="Confirm Password"
              onChange={e => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              fullWidth
              margin="normal"
              variant="outlined"
              validators={['required', 'isPasswordMatch']}
              errorMessages={['Confirm Password is required', 'Passwords do not match']}
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{
                style: { color: theme.palette.text.primary },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </ValidatorForm>
        )}
      </Paper>
    </Box>
  );
};

export default ResetPassword;
