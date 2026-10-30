import React from 'react';
import { Typography, Box, Button, Grid } from '@mui/material';
import Card from '../../components/Card';
import { toast } from 'react-toastify';

const ToastExample = () => {
  const showSuccessToast = () => {
    toast.success('This is a success message!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const showErrorToast = () => {
    toast.error('This is an error message!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const showWarningToast = () => {
    toast.warning('This is a warning message!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const showInfoToast = () => {
    toast.info('This is an info message!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const showCustomToast = () => {
    toast('This is a custom toast message!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <Card>
      <Box p={2} mb={4}>
        <Typography variant="h6">Toast Notifications</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Different types of toast notifications using react-toastify.
        </Typography>

        <div className='flex flex-wrap gap-2'>
          <div>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={showSuccessToast}
            >
              Success Toast
            </Button>
          </div>

           <div item>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={showErrorToast}
            >
              Error Toast
            </Button>
          </div>

          <div item>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={showWarningToast}
            >
              Warning Toast
            </Button>
          </div>

          <div item>
            <Button
              variant="contained"
              color="info"
              fullWidth
              onClick={showInfoToast}
            >
              Info Toast
            </Button>
          </div>

          <div item>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={showCustomToast}
            >
              Custom Toast
            </Button>
          </div>
        </div>

        <Box mt={3}>
          <Typography variant="body2" color="text.secondary">
            Click any button above to see the corresponding toast notification appear in the top-right corner.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ToastExample;
