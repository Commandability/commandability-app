/**
 * Base App Component
 * 
 * Authors: Noah Hughes, David Lee Morrow
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
import Tester from "./components/Tester";
import * as locations from "./modules/locations";
import RosterList from "./components/RosterList";

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

  // ******TODO: groupName must be a variable. Should this variable be the same as group id? 
  // There is no reason to have two, as long as one is always defined. ALSO how will visibility be handled? 
  // Thats something that should be in the state of the group. The name will be in a config file. how about we generate the id using uuid? oh wow thats good. 
  // use getItemLayout
  // next up is doing the logging. 
  // group situation with redux? need to add and remove. add button is plus, and remove is cog wheel. 


  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View>
            <RosterList/>
            <GroupList groupName={locations.STAGING} />
            <GroupList groupName={locations.GROUP_ONE} />
            <Tester/>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
