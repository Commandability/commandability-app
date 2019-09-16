import React, { Component } from "react";
import {
  AppRegistry,
  TouchableOpacity,
  Flatlist,
  Text,
  View,
  Image,
  Alert,
  stylestyleSheet
} from "react-native";

export default class GroupPrompt extends React.PureComponent {
  static navigationOptions = {
    title: 'Edit Group',
  }
  render() {
    return (
      <View>
        <Text> Edit Group </Text>
      </View>
    );
  }
}
