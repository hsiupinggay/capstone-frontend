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
        main: '#3254a8',
      },
      secondary: {
        main: '#718da8',
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
      h1: {
        fontFamily: 'Quicksand',
        fontWeight: 500,
        fontSize: '2rem',
        lineHeight: 1.167,
        letterSpacing: '0em',
      },
      h2: {
        fontFamily: 'Quicksand',
        fontSize: '1.5rem',
        letterSpacing: '0.00857em',
        fontWeight: 500,
      },
      h3: {
        fontFamily: 'Quicksand',
        fontSize: '1.2rem',
        lineHeight: 1.334,
        fontWeight: 500,
      },
      button: {
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        lineHeight: 1.75,
        fontWeight: 500,
      },
      h5: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '0.01em',
      },
    },
  },
);

export default mainTheme;
