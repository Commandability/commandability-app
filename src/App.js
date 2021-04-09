/**
 * CommandAbility App Main
 *
 * Handle all screen and prompt navigation stacks, and create and manage the global redux store shared with all components.
 */

import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import auth from '@react-native-firebase/auth';

import configureStore from './redux/configure-store';
import SwitchNavigator from './switch-navigator';

const { persistor, store } = configureStore();

const App = () => {
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const authSubscription = auth().onAuthStateChanged(() => {
      authSubscription(); // stop checking for auth state changes
      if (initializing) setInitializing(false);
    });
    return () => authSubscription();
  }, [initializing]);

  if (initializing) return <View />;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SwitchNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
