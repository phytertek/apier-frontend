// Import react and react dom renderer
import React from 'react';
import ReactDOM from 'react-dom';

// Import router for react
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

// Import Material_UI themeing
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './theme';
import 'typeface-roboto';

// Import base App component
import App from './App';

// Import service worker registration function
import registerServiceWorker from './registerServiceWorker';

// Import redux and its dependencies
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import createStore from './redux';
const history = createHistory();
const { store, persistor } = createStore(history);

// Render app
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// Register service worker
registerServiceWorker();
