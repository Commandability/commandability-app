/**
 * configureStore module
 *
 * Handle all redux middleware and generate redux store with redux-persist.
 */

import { createStore } from 'redux';
import { persistStore } from 'redux-persist';

import persistedReducers from '../redux/reducers';

export default () => {
  let store = createStore(
    persistedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
