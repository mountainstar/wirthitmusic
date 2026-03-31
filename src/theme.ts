import { createTheme, alpha } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e53935",
      light: "#ff6f60",
      dark: "#ab000d",
    },
    secondary: {
      main: "#ffab00",
      light: "#ffdd4b",
      dark: "#c67c00",
    },
    background: {
      default: "#0a0a0a",
      paper: "#141414",
    },
  },
  typography: {
    fontFamily: '"Bebas Neue", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Bebas Neue", "Roboto", sans-serif',
      fontWeight: 400,
      letterSpacing: "0.02em",
    },
    h2: {
      fontFamily: '"Bebas Neue", "Roboto", sans-serif',
      fontWeight: 400,
      letterSpacing: "0.05em",
    },
    h3: {
      fontFamily: '"Bebas Neue", "Roboto", sans-serif',
      fontWeight: 400,
      letterSpacing: "0.04em",
    },
    h4: {
      fontFamily: '"Bebas Neue", "Roboto", sans-serif',
      fontWeight: 400,
      letterSpacing: "0.03em",
    },
    h5: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontWeight: 600,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#0a0a0a", 0.85),
          backdropFilter: "blur(12px)",
        },
      },
    },
  },
});

export default theme;
