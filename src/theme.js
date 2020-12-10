import { red } from '@material-ui/core/colors';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ffea00',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
