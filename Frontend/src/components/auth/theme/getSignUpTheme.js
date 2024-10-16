import { createTheme, alpha } from '@mui/material/styles';
import { brand, gray, green, orange, red } from './themeColors';

/**
 * Generates the theme tokens for the signup page based on the mode.
 * 
 * @param {string} mode - The current theme mode ('light' or 'dark').
 * @returns {object} - The theme configuration object.
 */
const getSignUpTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[800],
      contrastText: brand[50],
      ...(mode === 'dark' && {
        contrastText: brand[100],
        light: brand[300],
        main: brand[400],
        dark: brand[800],
      }),
    },
    warning: {
      light: orange[300],
      main: orange[400],
      dark: orange[800],
      ...(mode === 'dark' && {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      }),
    },
    error: {
      light: red[300],
      main: red[400],
      dark: red[800],
      ...(mode === 'dark' && {
        light: red[400],
        main: red[500],
        dark: red[700],
      }),
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
      ...(mode === 'dark' && {
        light: green[400],
        main: green[500],
        dark: green[700],
      }),
    },
    grey: {
      ...gray,
    },
    divider: mode === 'dark' ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
    background: {
      default: 'hsl(0, 0%, 100%)',
      paper: gray[100],
      ...(mode === 'dark' && { default: 'hsl(220, 30%, 3%)', paper: gray[900] }),
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      ...(mode === 'dark' && { primary: 'hsl(0, 0%, 100%)', secondary: gray[400] }),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(','),
    h1: {
      fontSize: 60,
      fontWeight: 600,
    },
    h2: {
      fontSize: 48,
      fontWeight: 600,
    },
    h3: {
      fontSize: 42,
    },
    h4: {
      fontSize: 36,
      fontWeight: 500,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
    },
    body1: {
      fontSize: 15,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default getSignUpTheme;
