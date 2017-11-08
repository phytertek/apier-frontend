import { createMuiTheme } from 'material-ui/styles';
import cyan from 'material-ui/colors/cyan';
import purple from 'material-ui/colors/purple';
import deepPurple from 'material-ui/colors/deepPurple';
const theme = {
  palette: {
    primary: cyan,
    secondary: deepPurple,
    error: purple,
    type: 'dark' // Switch between dark and light modes
  }
};

export default createMuiTheme(theme);
