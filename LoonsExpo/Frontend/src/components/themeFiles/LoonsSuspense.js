import React, { Suspense } from 'react'
import { Box, CircularProgress } from '@mui/material'

const LoadingSpinner = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
        }}
    >
        <CircularProgress />
    </Box>
)

const LoonsSuspense = ({ children }) => {
    return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
}

export default LoonsSuspense
