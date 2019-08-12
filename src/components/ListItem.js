import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { toggleSelectedById } from "../actions";

class ListItem extends Component {
  _onPress = () => {
    const { item, groupName, toggleSelectedById } = this.props;
    toggleSelectedById(item.id, groupName);
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress} disabled={false}>
        <View>
          <Text>
            {item.badge + " - " + item.firstName + " " + item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(
  null,
  { toggleSelectedById }
)(ListItem);
