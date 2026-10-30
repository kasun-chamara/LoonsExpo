import React from 'react';
import { Typography } from '@mui/material';
import { Box } from 'components';

const Dashboard = () => {
    const timeData = [
        { label: 'Today', value: 0 },
        { label: 'This Week', value: 0 },
        { label: 'This Month', value: 4 },
        { label: 'This Year', value: 22 },
    ];

    const containerStyle = {
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',


    };



    return (
        <Box className="p-4" style={containerStyle}>
            <Typography variant='h6'>Incidents</Typography>
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>Counter April 2023</div>

        </Box>
    );
};

export default Dashboard;
