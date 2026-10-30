import React from 'react';
import { GlobalStyles } from '@mui/material';

const animationClasses = {
 '.fade-in': {
            animation: 'fade-in 1s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
        },
        '@keyframes fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        '@keyframes spin': {
            '0%': { transform: 'rotate(0)' },
            '100%': { transform: 'rotate(360deg)' },
        },
        '.spin': { animation: 'spin 3s infinite linear' },

        '.hover_zoom:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s',
            cursor: 'pointer',
        },
};

const AnimationGlobalStyles = () => (
  <GlobalStyles styles={animationClasses} />
);

export default AnimationGlobalStyles;
