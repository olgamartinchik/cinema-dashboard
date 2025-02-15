import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#808080',
    },
    secondary: {
      main: '#A9A9A9',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '24px',
      marginTop: '20px',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
      marginBottom: '20px',
      marginTop: '20px',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#757575',
      letterSpacing: '0.5px',
      marginBottom: '16px',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});
