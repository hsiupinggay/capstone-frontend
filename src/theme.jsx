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
        main: '#1F18C0',
      },
      secondary: {
        main: '#456e3f',
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
        fontWeight: 400,
        fontSize: '3rem',
        lineHeight: 1.167,
        letterSpacing: '0em',
      },
      h2: {
        fontSize: '2.125rem',
        letterSpacing: '0.00857em',
        fontWeight: 400,
      },
      h3: {
        fontSize: '1.5rem',
        lineHeight: 1.334,
        fontWeight: 400,
      },
      // body1: {
      //   fontSize: 14,
      //   fontWeight: 400,
      // },
      // body2: {
      //   fontSize: 12,
      //   textTransform: 'uppercase',
      //   fontWeight: 400,
      // },
      button: {
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        lineHeight: 1.75,
        fontWeight: 500,
      },
      h4: {
        fontSize: 44,
        textTransform: 'uppercase',
        letterSpacing: '0.02857em',
        lineHeight: 1,
        fontWeight: 500,
        textAlign: 'end',
      },

    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 300,
        md: 600,
        lg: 900,
        xl: 1536,
      },
    },
  },
);

export default mainTheme;
