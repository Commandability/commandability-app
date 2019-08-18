import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { getSelectedById, getSelectedLocation } from "../reducers";
import { toggleSelectedById } from "../actions";

class ListItem extends Component {
  _onPress = () => {
    const { item, groupName, toggleSelectedById } = this.props;
    toggleSelectedById(item.id, groupName);
  };

  render() {
    const { item, groupName, selected, selectedLocation } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == groupName || selectedLocation == null
            ? false
            : true
        }
      >
        <View>
          <Text style={selected ? { color: "red" } : { color: "black" }}>
            {item.badge + " - " + item.firstName + " " + item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { item } = ownProps;
  const { id } = item;
  return {
    selectedLocation: getSelectedLocation(state),
    selected: getSelectedById(state, id)
  };
};

export default connect(
  mapStateToProps,
  { toggleSelectedById }
)(ListItem);
