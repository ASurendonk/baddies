import { createTheme, type Theme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#FFA6E6',
      main: '#FFC6EF',
      dark: '#FFA6E6',
    },
    secondary: {
      main: '#9abaff',
      dark: '#7FA6EE'
    },
    error: {
      main: '#FB0E0E',
    },
    success: {
      main: '#1EA008',
    },
    background: {
      default: '#FFF5FD',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#00000066',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: '"Chivo", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Zilla Slab", "Helvetica", "Arial", sans-serif',
      fontSize: '32px',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Zilla Slab", "Helvetica", "Arial", sans-serif',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '28px',
    },
    body1: {
      fontSize: '18px',
      lineHeight: '23px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '16px',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        contained: {
          fontFamily: '"Zilla Slab", "Helvetica", "Arial", sans-serif',
          fontWeight: 700,
          fontSize: 20,
          lineHeight: "normal",
          padding: '8px 16px',
          border: "1.5px solid black !important",
          boxShadow: '2px 2px black',
          '&:hover': {
            backgroundColor: (theme: Theme) => theme.palette.primary.dark,
            boxShadow: '2px 2px black',
          },
          '&.MuiButton-containedSecondary:hover': {
            backgroundColor: (theme: Theme) => theme.palette.primary.dark,
            boxShadow: '2px 2px black',
          },
          '&:active': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {
          padding: '4px 8px',
        },
        sizeLarge: {
          padding: '12px 24px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'black',
          textDecorationColor: 'black',
          fontFamily: '"Zilla Slab", "Helvetica", "Arial", sans-serif',
          fontSize: '24px',
          fontWeight: 700,
          lineHeight: "28px",
          '&:hover': {
            color: '#199D0F',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: 6,
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0F5257',
    },
    secondary: {
      main: '#0B3142',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    divider: '#333333',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
});

export { lightTheme, darkTheme };
