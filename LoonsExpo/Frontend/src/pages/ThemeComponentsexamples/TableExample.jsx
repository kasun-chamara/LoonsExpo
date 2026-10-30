import React from 'react';
import { Typography, Box } from '@mui/material';
import MuiTable from '../../components/MuiTable';
import Card from '../../components/Card';

const tableColumns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
];
const tableData = [
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'User' },
];

const TableExample = () => (
  <Card>
    <Box p={2} mb={4}>
      <Typography variant="h6">MuiTable</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        A responsive, theme-aware table component.
      </Typography>
      <MuiTable columns={tableColumns} data={tableData} />
    </Box>
  </Card>
);

export default TableExample;
