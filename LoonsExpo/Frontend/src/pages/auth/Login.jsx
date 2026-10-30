import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import ValidatorForm from 'components/ValidatorForm';
import { TextValidator } from 'react-material-ui-form-validator';
import {
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useTheme } from '@mui/material/styles';
import './Login.css';
import { alpha } from '@mui/material/styles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(login(username, password));
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
      <Paper elevation={1} sx={{ maxWidth: 400, width: '100%', p: 4, borderRadius: 4, boxShadow:   '0 2px 8px 0 rgba(34,41,47,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Box sx={{ width: 64, height: 64,  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <img src="/assets/siteLogo/logo.png" alt="Logo" style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: '50%' }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>Welcome Back</Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>Please sign in to your account</Typography>
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
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <FormControlLabel
              control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} color="primary" />}
              label={<Typography fontSize={14}>Remember me</Typography>}
            />
            <Link href="/forgot-password" underline="hover" color="primary" fontSize={14} fontWeight={500} sx={{ cursor: 'pointer' }}>
              Forgot password?
            </Link>
          </Box>
          {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="small"
            sx={{
              mt: 1.5,
              borderRadius: 2,
             // fontWeight: 700,
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
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </ValidatorForm>
        <Box mt={3} textAlign="center" width="100%">
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" color="primary" fontWeight={600} underline="hover">Sign up</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
