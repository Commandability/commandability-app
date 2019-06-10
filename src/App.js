import React from "react";
import { View } from 'react-native';
import { Provider } from "react-redux";
import { createStore } from "redux";
import firebase from "react-native-firebase";
import reducers from "./reducers";
import GroupList from "./components/GroupList";

import { Header } from './components/common';

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
    // calls all reducers on app initialization and generates store from base values
    const store = createStore(reducers);

    return (
      // enables communication between react and redux
      <Provider store={store}>
        {/* <Router /> */}
        <View>
          <GroupList />
        </View>
      </Provider>
    );
  }
}