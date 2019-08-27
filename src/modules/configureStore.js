/**
 * configureStore module
 * 
 * Handle all redux middleware and generate redux store with redux-persist. 
 */

import AsyncStorage from "@react-native-community/async-storage";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";

import persistedReducers from "../reducers";
import testState from "./testState";
import { logEvent } from "./logger";

const logger = store => next => action => {
  logEvent("dispatching", action);
  return next(action);
};

export default () => {
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // development: react native redux debugger
  let store = createStore(
    persistedReducers,
    testState,
    composeEnhancers(applyMiddleware(logger))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
