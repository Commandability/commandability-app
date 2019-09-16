/**
 * configureStore module
 *
 * Handle all redux middleware and generate redux store with redux-persist.
 */

import { createStore } from "redux";
import { persistStore } from "redux-persist";

import persistedReducers from "../reducers";
import testState from "./testState";

export default () => {
  let store = createStore(
    persistedReducers,
    testState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
