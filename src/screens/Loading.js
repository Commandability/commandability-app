import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import SplashScreen from 'react-native-splash-screen';

import COLORS from "../modules/colors";

export default class Loading extends React.Component {
  componentDidMount() {
    this.authSubscription = auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "AppStack" : "AuthStack");
    });
  }
  
  componentWillUnmount() {
    this.authSubscription(); // stop checking for auth state changes
    SplashScreen.hide();
  }

  render() {
    return (
      <View/>
    );
  }
}
