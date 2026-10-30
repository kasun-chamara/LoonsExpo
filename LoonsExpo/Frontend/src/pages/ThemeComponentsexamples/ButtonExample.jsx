import React from 'react';
import { Typography, Box } from '@mui/material';
import Button from 'components/Button';
import Card from 'components/Card';

const ButtonExample = () => (
  <Card>
    <Box p={2} mb={4}>
      <Typography variant="h6">Button</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Themed button component for primary actions.
      </Typography>
      <Button variant="contained" color="primary">Primary Button</Button>
      <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>Secondary Button</Button>
      <Button className='btn-success' sx={{ ml: 2 }}>Success Button</Button>
      <Button className='btn-danger' sx={{ ml: 2 }}>Danger Button</Button>
      <Button className='btn-warning' sx={{ ml: 2 }}>Warning Button</Button>
      <Button className='btn-info' sx={{ ml: 2 }}>Info Button</Button>
      <Button className='btn-dark' sx={{ ml: 2 }}>Dark Button</Button>
      <Button className='btn-link' sx={{ ml: 2 }}>Link Button</Button>
    </Box>
  </Card>
);

export default ButtonExample;
