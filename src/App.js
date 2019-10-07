import React from "react";
import { ActivityIndicator, Text, View, Dimensions } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import firebase from "@react-native-firebase/app";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import configureStore from "./modules/configureStore";
import { Loading, Login, Home, Incident } from "./screens";
import COLORS from "./modules/colors";

const { persistor, store } = configureStore();
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AppStack = createStackNavigator({ Home });
const AuthStack = createStackNavigator({ Login });
const IncidentSwitch = createSwitchNavigator({ Incident });

const AppNavigator = createSwitchNavigator(
  {
    Loading,
    AuthStack,
    AppStack,
    IncidentSwitch
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.secondary.dark,
        height: SCREEN_HEIGHT / 12
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
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
