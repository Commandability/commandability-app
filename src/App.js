import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import firebase from "react-native-firebase";
import reducers from "./reducers";
import { loadPersistedState, saveState, logEvent } from "./modules/localStorage";
import GroupList from "./components/GroupList";
import * as locations from "./locations";
import testState from "./testState";

const logger = store => next => action => {
  logEvent("dispatching", action);
  return next(action);
};

const statePersister = store => next => action => {
  saveState(store.getState());
  return next(action);
};

const store = createStore(
  reducers,
  testState,
  applyMiddleware(logger, statePersister)
);

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
