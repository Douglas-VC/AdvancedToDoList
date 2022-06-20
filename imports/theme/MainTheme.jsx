import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const MainTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundImage: "linear-gradient(to right, #000000 0%, #434343  51%, #000000  100%)",
          textAlign: "center",
          transition: "0.9s",
          backgroundSize: "200% auto",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 0 20px #eee",
          borderRadius: "15px",
          display: "block",
          '&:hover': {
            backgroundPosition: " right center",
            textDecoration: "none"
          }
        },
        containedSecondary: {
          backgroundColor: "black",
          color: "white",
          '&:hover': {
            backgroundColor: grey[800],
          }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(to right, #000000 0%, #434343  51%, #000000  100%)",
          backgroundSize: "200% auto",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 0 20px #eee",
          borderRadius: "15px",
          display: "block"
        }
      },
    },
  }
});