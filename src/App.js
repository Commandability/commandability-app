/**
 * CommandAbility App Main
 *
 * Handle all screen and prompt navigation stacks, and create and manage the global redux store shared with all components.
 */

import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

import configureStore from './redux/configure-store';
import SwitchNavigator from './components/switch-navigator';

export const { persistor, store } = configureStore();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      initializing: true,
    };
  }

  componentDidMount() {
    this.authSubscription = auth().onAuthStateChanged(() => {
      this.authSubscription(); // stop checking for auth state changes
      if (this.state.initializing) this.setState({ initializing: false });
    });
  }

  componentWillUnmount() {
    this.authSubscription(); // stop checking for auth state changes
  }

  render() {
    if (this.state.initializing) return <View />;
    SplashScreen.hide();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SwitchNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
