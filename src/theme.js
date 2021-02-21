import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#558855',
      light: '#eee'
    },
    secondary: {
      main: '#666',
    },
    text: {
      main: '#333',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  spacing: 4,
  props: {
    MuiPaper: {
      square: true,
    },
    MuiAppBar: {
      position: "fixed",
    },
    MuiDrawer: {
      anchor: "left",
      variant: "permanent",
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        textTransform: "capitalize",
      },
      text: {
        fontSize: 18,
      }
    },
    MuiIconButton: {
      root: {
        float: "right"
      }
    },
    MuiAppBar: {
      root: {
        zIndex: 1201,
        height: 50,
      },
    }

  }
});

export default theme;