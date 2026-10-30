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
    // Brand accent from the organiser console design (additive; primary/secondary are unchanged)
    brand: {
      main: '#F4320B',
      dark: '#C42608',
      light: '#FFEEE9',
      tint: '#FFE9E3',
      contrastText: '#ffffff',
      success: '#12A150',
      hover: 'rgba(244, 50, 11, 0.08)',
      border: 'rgba(244, 50, 11, 0.4)',
      borderHover: 'rgba(244, 50, 11, 0.35)',
      ring: 'rgba(244, 50, 11, 0.14)',
    },
    // Neutral border colours shared by the header, sidebar and cards
    border: {
      main: '#E6E9F0',
      // Stronger outline and fill for text fields so they stand out from the card
      strong: '#C5CCD8',
      field: '#ffffff',
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
    // Brand accent from the organiser console design (additive; primary/secondary are unchanged)
    brand: {
      main: '#F4320B',
      dark: '#FF7A59',
      light: 'rgba(244, 50, 11, 0.2)',
      tint: 'rgba(244, 50, 11, 0.18)',
      contrastText: '#ffffff',
      success: '#12A150',
      hover: 'rgba(244, 50, 11, 0.12)',
      border: 'rgba(244, 50, 11, 0.5)',
      borderHover: 'rgba(244, 50, 11, 0.45)',
      ring: 'rgba(244, 50, 11, 0.22)',
    },
    // Neutral border colours shared by the header, sidebar and cards
    border: {
      main: '#3a3a3a',
      strong: '#6B7280',
      field: 'rgba(255, 255, 255, 0.06)',
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
