import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import firebase from "react-native-firebase";
import reducers from "./reducers";
import { logEvent } from "./modules/logger";
import GroupList from "./components/GroupList";
import * as locations from "./locations";
import testState from "./testState";

const logger = store => next => action => {
  logEvent("dispatching", action);
  return next(action);
};

// development store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  testState,
  composeEnhancers(applyMiddleware(logger))
);

// production store
// const store = createStore(
//   reducers,
//   testState,
//   applyMiddleware(logger)
// );

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());
    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <Provider store={store}>
        <View>
          <GroupList groupName={locations.ROSTER} />
          <GroupList groupName={locations.GROUP_ONE} />
        </View>
      </Provider>
    );
  }
}
