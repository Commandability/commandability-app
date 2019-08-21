/**
 * ListItem Component
 *
 * props:
 *  - groupName: the parent groupName
 *  - item: the current person
 *
 * Manages displaying a person in a group and sets a person as selected in redux and in local state on press.
 */

import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { getSelectedLocation } from "../reducers";
import { toggleSelectedById } from "../actions";

class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }

  _onPress = () => {
    this.setState(prevState => ({
      selected: !prevState.selected
    }));

    const { item, groupName, toggleSelectedById } = this.props;
    toggleSelectedById(item.id, groupName);
  };

  render() {
    const { item, groupName, selectedLocation } = this.props;
    return (
      // disable all items in a list that is not selected, so that its parent list can be selected
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == groupName || selectedLocation == null
            ? false
            : true
        }
      >
        <View>
          <Text
            style={this.state.selected ? { color: "red" } : { color: "black" }}
          >
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
    selectedLocation: getSelectedLocation(state)
  };
};

export default connect(
  mapStateToProps,
  { toggleSelectedById }
)(ListItem);
