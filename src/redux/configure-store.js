/**
 * configureStore module
 *
 * Handle all redux middleware and generate redux store with redux-persist.
 */

import { createStore, applyMiddleware } from 'redux';
import { compose } from 'redux'; // For development
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import persistedReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // For development

export default () => {
  let store = createStore(
    persistedReducers,
    // applyMiddleware(thunk), // For production
    composeEnhancers(applyMiddleware(thunk)), // For development 
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
