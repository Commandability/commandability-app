import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default class Loading extends React.Component {
  componentDidMount() {
    this.authSubscription = auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "AppStack" : "AuthStack");
    });
  }
  
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <View>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
