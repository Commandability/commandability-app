import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import reducers from '../reducers';
import testState from "./testState";
import { logEvent } from "../modules/logger";

const logger = store => next => action => {
  logEvent("dispatching", action);
  return next(action);
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: hardSet
};

const persistedReducer = persistReducer(persistConfig, reducers);

// development store
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   persistedReducer,
//   testState,
//   composeEnhancers(applyMiddleware(logger))
// );
// const persistor = persistStore(store);

export default () => {
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(persistedReducer, testState, composeEnhancers(applyMiddleware(logger)));
  let persistor = persistStore(store);
  return { store, persistor }
}
