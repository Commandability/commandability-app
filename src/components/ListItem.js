import React, { Component } from "react";
import { Text } from "react-native";

export default class ListItem extends Component {
  render() {
    const { item } = this.props;
    return(
      <Text>
        { item.firstName }
      </Text>
    )
  }
}