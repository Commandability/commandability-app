import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default class Loading extends React.Component {
  constructor(props){
    super(props);
    const { user } = auth();
    this.props.navigation.navigate(user ? "AppStack" : "AuthStack");
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
