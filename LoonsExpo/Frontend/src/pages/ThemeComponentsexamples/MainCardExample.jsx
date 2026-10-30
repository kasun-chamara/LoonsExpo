import React from 'react';
import { Typography, Box } from '@mui/material';
import MainCard from '../../components/MainCard';
import Card from '../../components/Card';

const MainCardExample = () => (
  <Card>
    <Box p={2} mb={4}>
      <Typography variant="h6">MainCard</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        MainCard is used for primary content sections.
      </Typography>
      <MainCard>
        <Box p={2}>
          <Typography>This is a MainCard component.</Typography>
        </Box>
      </MainCard>
    </Box>
  </Card>
);

export default MainCardExample;
