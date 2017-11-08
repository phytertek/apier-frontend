import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reduxPromise from 'redux-promise';
import { persistStore } from 'redux-persist';
import reduxAPI from './reduxAPI';
//

// TODO: Import component reducers
import auth from '../auth';

// Combine component reducers
const combinedReducers = combineReducers({ auth, routerReducer });

export default history => {
  const routerHistory = routerMiddleware(history);
  const createStoreWithMiddleware = applyMiddleware(
    routerHistory,
    reduxPromise,
    reduxAPI
  )(createStore);
  const store = createStoreWithMiddleware(
    combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
