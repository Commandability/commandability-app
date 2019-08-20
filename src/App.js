import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import firebase from "react-native-firebase";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from './store/configureStore';
import GroupList from "./components/GroupList";
import * as locations from "./locations";

const { persistor, store } = configureStore();

console.log(persistor);

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
        <PersistGate loading={null} persistor={persistor}>
          <View>
            <GroupList groupName={locations.ROSTER} />
            <GroupList groupName={locations.GROUP_ONE} />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
