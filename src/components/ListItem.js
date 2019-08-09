import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { changeSelected } from "../actions";

class ListItem extends Component {
  _onPress = () => {
    const { item } = this.props;
    this.props.changeSelected(item);
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text>{item.firstName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(
  null,
  { changeSelected }
)(ListItem);
