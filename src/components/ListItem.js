import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { changeSelection } from "../actions";

class ListItem extends Component {
  _onPress = () => {
    const { item } = this.props;
    const { id } = item;
    this.props.changeSelection(id);
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
  { changeSelection }
)(ListItem);
