import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import * as palette from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
// colors
const primary = '#002445'
const primaryLight = '#1c318e'
const secondary = '#2851E9'
const secondaryLight = '#2851E9'
const black = '#000000'
const white = '#FFF'
// Overrides
const successMain = '#16A77D'
const warningMain = palette.amber.A400

// breakpoints
const xl = 1920
const lg = 1280
const md = 960
const sm = 600
const xs = 0

// spacing

const theme = createTheme({
  palette: {
   
    primary: {main: primary, light: primaryLight},
    secondary: {main: secondary, light: secondaryLight},
    common: {
      black,
      white,
    },
    warning: {
      main: warningMain,
      contrastText: palette.grey[900],
    },
    success: {
      main: successMain,
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
   
  },
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  },
  
  typography: {
    fontFamily: `"Roboto","Poppins", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: primary,
    },

    h2: {
      fontSize: '1rem',
      fontWeight: 600,
      color: primary,
    },

    h3: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: primary,
    },

    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 600,
    },

    body1: {
      fontSize: '0.875rem',
    },

    body2: {
      fontSize: '0.75rem',
    },
  },
})

export default responsiveFontSizes(theme)
