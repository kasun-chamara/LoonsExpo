import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextValidator from 'components/TextValidator';
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
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import UserServices from 'services/UserServices';
import { toast } from 'react-toastify';

const CompleteRegistration = () => {
  // const [username, setUsername] = useState('');
  //const [email, setEmail] = useState('');
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({ password: null, confirmPassword: null });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async () => {
    //  e.preventDefault();
    setLoading(true);

    console.log("user id", id);
    try {

     let response = await UserServices.compliteUserRegistration(formData,id );
      if (response.success) {
        toast.success(response.message || 'Updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update. Please try again.');
      }

      if (response.success) {
        navigate('/login');
      }
    } catch (error) {
      console.log("error",error);

      toast.error('An unexpected error occurred. Please try again.');
    } finally {

    }

    // Add sign-up logic here
    setLoading(false);
    // navigate('/login');
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };




  useEffect(() => {
    // Get the query string from the URL
    const queryString = window.location.search;

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Get the email parameter
    const id = urlParams.get('id');

    // Set the email state
    if (id) {
      setId(id);
      console.log("user id", id);
    }
  }, []);
  useEffect(() => {
    // Add custom rule
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== formData.password) {
        return false;
      }
      return true;
    });

    // Cleanup when component unmounts
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [formData.password]);
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
        <ValidatorForm onSubmit={() => handleSubmit()} autoComplete="off" style={{ width: '100%' }}>

          <TextValidator
            label="Password"
            name="password"
            value={formData.password || null}
            onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
            type={showPassword ? 'text' : 'password'}

            required={true}
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
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword || null}
            onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }) }}
            type={showPassword ? 'text' : 'password'}

            required={true}
            validators={["required", "isPasswordMatch"]}
            errorMessages={[
              "Confirm Password is required",
              "Passwords do not match",
            ]}
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
            {loading ? 'Complete...' : 'Complete'}
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

export default CompleteRegistration;
