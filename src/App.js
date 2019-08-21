/**
 * Base App Component
 * 
 * Authors: Noah Hughes, David Morrow
 * Published: 2019
 * 
 * The CommandAbility App is a card-based incident management and accountability application built in React Native. 
 * It assists fire fighters in keeping track of personnel at an incident scenes, and generates automated reports of the movements of emergency personnel. 
 */

import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import firebase from "react-native-firebase";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./modules/configureStore";
import GroupList from "./components/GroupList";
import * as locations from "./modules/locations";

const { persistor, store } = configureStore();
// persistor.purge(); // development: clear persisted state

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
