import React from 'react';
import { Typography, Box } from '@mui/material';
import Card from '../../components/Card';

const CardExample = () => (
  <Card>
    <Box p={2} mb={4}>
      <Typography variant="h6">Card</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Themed card component for grouping content.
      </Typography>
      <Card>
        <Box p={2}>
          <Typography>This is a themed Card component.</Typography>
        </Box>
      </Card>
    </Box>
  </Card>
);

export default CardExample;
