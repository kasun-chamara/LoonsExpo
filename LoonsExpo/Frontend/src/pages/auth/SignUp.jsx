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
  IconButton,
  Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add sign-up logic here
    setLoading(false);
    navigate('/login');
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
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>Create Account</Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>Please fill in the details to sign up</Typography>
        </Box>
        <ValidatorForm onSubmit={handleSubmit} instantValidate={false} autoComplete="off" style={{ width: '100%' }}>
          <TextValidator
            size="small"
            label="Username"
            onChange={e => setUsername(e.target.value)}
            name="username"
            value={username}
            fullWidth
            margin="normal"
            variant="outlined"
            validators={["required"]}
            errorMessages={["Username is required"]}
            autoFocus
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            InputProps={{
              style: { color: theme.palette.text.primary },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              )
            }}
          />
          <TextValidator
            size="small"
            label="Email"
            onChange={e => setEmail(e.target.value)}
            name="email"
            value={email}
            fullWidth
            margin="normal"
            variant="outlined"
            validators={["required", "isEmail"]}
            errorMessages={["Email is required", "Email is not valid"]}
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
          <TextValidator
            size="small"
            label="Password"
            onChange={e => setPassword(e.target.value)}
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            fullWidth
            margin="normal"
            variant="outlined"
            validators={["required"]}
            errorMessages={["Password is required"]}
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
            validators={["required", "isPasswordMatch"]}
            errorMessages={["Confirm Password is required", "Passwords do not match"]}
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="small"
            sx={{
              mt: 1.5,
              borderRadius: 2,
              //fontWeight: 700,
              //fontSize: 18,
              py: 1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </ValidatorForm>
        <Box mt={3} textAlign="center" width="100%">
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            Already have an account?{' '}
            <Link href="/login" color="primary" fontWeight={600} underline="hover">Sign in</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
