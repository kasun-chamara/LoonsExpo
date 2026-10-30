import { createTheme } from '@mui/material/styles';
import { componentOverrides } from './componentOverrides';

const typography = {
  fontFamily: '"Roboto", sans-serif',
  h1_fontFamily: '"Roboto", sans-serif',
  label_fontFamily: '"Roboto", sans-serif',
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#ebeff5',
      paper: '#ffffff',
    },
    text: {
      primary: '#646464',
      secondary: '#757575',
    },
    sidebar: {
      logoTextColor: 'rgb(7, 7, 7)',
      logoSloganColor: '#b3b3b3',
      background: '#ffffff',
      text: '#212121',
      textSecondary: '#757575',
      divider: '#e0e0e0',
      hover: '#f5f5f5',
      active: '#e3f2fd',
      menuItem: {
        background: 'transparent',
        text: '#757575',
        textActive: '#212121',
        icon: '#757575',
        iconActive: '#1976d2',
        backgroundActive: '#e3f2fd',
        backgroundHover: '#f5f5f5',
      },
    },
    topbar: {
      background: '#ffffff',
      text: '#757575',
      textSecondary: '#e3f2fd',
      divider: '#1565c0',
      hover: '#1565c0',
    },
    footer: {
      background: '#ffffff',
      text: '#212121',
    },
  },
  typography,
  components: componentOverrides,
});
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    sidebar: {
      logoTextColor: 'rgb(255, 255, 255)',
      logoSloganColor: '#b3b3b3',
      background: '#1e1e1e',
      text: '#1976d2',
      textSecondary: '#757575',
      divider: '#e0e0e0',
      hover: '#f5f5f5',
      active: '#e3f2fd',
      menuItem: {
        background: 'transparent',
        text: '#c2c0c0',
        textActive: '#1976d2',
        icon: '#c2c0c0',
        iconActive: '#1976d2',
        backgroundActive: '#1976d242',
        backgroundHover: '#1976d21a',
      },
    },
    topbar: {
      background: '#1e1e1e',
      text: '#ffffff',
      textSecondary: '#b3b3b3',
      divider: '#424242',
      hover: '#2d2d2d',
    },
    footer: {
      background: '#1e1e1e',
      text: '#ffffff',
    },
  },
  typography,
  components: componentOverrides,
});
