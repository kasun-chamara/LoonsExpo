import React from 'react';
import { GlobalStyles, useTheme } from '@mui/material';

function generateShadows(theme) {
  const classList = {};
  theme.shadows.forEach((shadow, ind) => {
    classList[`.elevation-z${ind}`] = {
      boxShadow: `${shadow} !important`,
    };
  });
  return classList;
}

const ShadowGlobalStyles = () => {
  const theme = useTheme();
  return <GlobalStyles styles={generateShadows(theme)} />;
};

export default ShadowGlobalStyles;
