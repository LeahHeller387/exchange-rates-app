import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Tahoma, sans-serif",
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "right",
          direction: "rtl",
        },
      },
    },
  },
});

export default theme;