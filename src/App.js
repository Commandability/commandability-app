/**
 * CommandAbility App Main
 *
 * Handle all screen and prompt navigation stacks, and create and manage the global redux store shared with all components.
 */

import React from 'react';
import { Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import configureStore from './modules/configure-store';
import {
  LoadingScreen,
  LoginScreen,
  HomeScreen,
  IncidentScreen,
  GroupPrompt,
  EndScreen,
  ExitIncidentPrompt,
} from './screens';
import colors from './modules/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const { persistor, store } = configureStore();

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.secondary.dark,
    height: SCREEN_HEIGHT / 10,
  },
};

const AppStack = createStackNavigator(
  { HomeScreen },
  { defaultNavigationOptions }
);
const AuthStack = createStackNavigator(
  { LoginScreen },
  { defaultNavigationOptions }
);
const IncidentStack = createStackNavigator(
  { IncidentScreen, GroupPrompt },
  { defaultNavigationOptions }
);
const EndStack = createStackNavigator(
  { EndScreen, ExitIncidentPrompt },
  { defaultNavigationOptions }
);

const AppNavigator = createSwitchNavigator(
  {
    LoadingScreen,
    AuthStack,
    AppStack,
    IncidentStack,
    EndStack,
  },
  {
    defaultNavigationOptions,
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
