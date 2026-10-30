import React from 'react';
import { Typography, Box } from '@mui/material';
import Button from '../../components/Button';
import ConfirmDialog from '../../components/ConfirmDialog';
import Card from '../../components/Card';

const ConfirmDialogExample = () => {
  const handleOpenDialog = () => {
    ConfirmDialog({
      type: 'success',
      title: 'Confirm Action',
      description: 'Are you sure you want to perform this action?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Confirmed!'),
          className: 'primary',
        },
        {
          label: 'No',
          onClick: () => {},
          className: 'outline',
        },
      ],
    });
  };

  return (
    <Card>
      <Box p={2} mb={4}>
        <Typography variant="h6">ConfirmDialog</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Use <code>ConfirmDialog</code> to show confirmation modals. Click the button below to see a sample dialog.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Show Confirm Dialog
        </Button>
      </Box>
    </Card>
  );
};

export default ConfirmDialogExample;
