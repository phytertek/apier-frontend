// Import react and react dom renderer
import React from 'react';
import ReactDOM from 'react-dom';

// Import redux and its dependencies
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import rootReducer from './rootReducer';

// Import router for react
import { BrowserRouter as Router } from 'react-router-dom';

// Import Material_UI themeing
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import appTheme from './appTheme';

// Import base App component
import App from './App';

// Import service worker registration function
import registerServiceWorker from './registerServiceWorker';

// Create Redux store from rootReducer with promise handling middleware
const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);
const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Create Material_UI theme
const theme = createMuiTheme(appTheme);

// Render app
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// Register service worker
registerServiceWorker();
