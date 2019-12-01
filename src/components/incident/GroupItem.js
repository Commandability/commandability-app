/**
 * GroupItem Component
 *
 * props:
 *  - groupName: the parent groupName
 *  - item: the current person
 *
 * Manages displaying a person in a group and sets a person as selected in redux and in local state on press.
 */

import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { getSelectedLocation } from "../../reducers";
import { toggleSelectedById } from "../../actions";
import { scaleFont } from "../../modules/fonts";

class GroupItem extends Component {
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

    const { item, location, toggleSelectedById } = this.props;
    toggleSelectedById(item.id, location);
  };

  render() {
    const { item, location, selectedLocation } = this.props;
    return (
      // disable item if a list other than the parent list is selected,
      // so items can be moved to the items parent list
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == location || selectedLocation == null
            ? false
            : true
        }
      >
        <View>
          <Text
            style={this.state.selected ? { color: "red" } : { color: "black" }} // previously itemContent
          >
            {item.badge + " - " + item.firstName + " " + item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedLocation: getSelectedLocation(state)
  };
};

export default connect(
  mapStateToProps,
  { toggleSelectedById }
)(GroupItem);

var styles = StyleSheet.create({
  itemContent: {
    fontSize: scaleFont(6),
    paddingLeft: 2
  }
});
