/**
 * configureStore module
 *
 * Handle all redux middleware and generate redux store with redux-persist.
 */

import {createStore, applyMiddleware} from 'redux';
import {compose} from 'redux'; // Development only
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';

import persistedReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Development only

export default () => {
  let store = createStore(
    persistedReducers,
    // applyMiddleware(thunk), // Production
    composeEnhancers(applyMiddleware(thunk)), // Development only
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
