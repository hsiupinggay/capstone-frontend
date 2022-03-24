/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import { createTheme } from '@mui/material/styles';

/*
 * ========================================================
 * ========================================================
 *
 *                 Material UI themes
 *
 * ========================================================
 * ========================================================
 */
const mainTheme = createTheme(
  {
    palette: {
      type: 'light',
      primary: {
        main: '#22577A',
      },
      secondary: {
        main: '#38A3A5',
      },
      error: {
        main: '#f45636',
      },
      disabled: {
        main: '#bcbcbc',
      },
      dusty: {
        main: '#BE9FB0',
        dark: '#581845',
      },
    },
    typography: {
      fontFamily: 'Quicksand',
      h1: {
        fontFamily: 'Quicksand',
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.167,
        letterSpacing: '0em',
      },
      h2: {
        fontFamily: 'Quicksand',
        fontSize: '2rem',
        letterSpacing: '0.00857em',
        fontWeight: 700,
      },
      h3: {
        fontFamily: 'Quicksand',
        fontSize: '1.5rem',
        lineHeight: 1.334,
        fontWeight: 600,
      },
      button: {
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        lineHeight: 1.75,
        fontWeight: 500,
      },
      h4: {
        fontFamily: 'Quicksand',
        fontSize: '1rem',
        lineHeight: 1.334,
        fontWeight: 500,
      },
    },
    breakpoints: {
      values: {
        xxs: 0,
        xs: 400,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1500,
      },
    },
  },
);

export default mainTheme;
