/**
 * RosterItem Component
 *
 * props:
 *  - item: the current person
 *
 * Manages displaying a person in a the roster and sets a persons location in redux to staging when selected.
 */

import React, { Component } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { connect } from "react-redux";

import { getSelectedLocation } from "../../reducers";
import { setLocationById } from "../../actions";
import { STAGING } from "../../modules/locations";
import GroupItem from "./GroupItem";

class RosterItem extends Component {
  constructor() {
    super();
  }

  _onPress = () => {
    const { item, setLocationById } = this.props;
    setLocationById(item.id, STAGING);
  };

  render() {
    const { item, groupName, selectedLocation } = this.props;
    return (
      // disable item if a list other than the parent list is selected,
      // so items can be moved to the items parent list
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == groupName || selectedLocation == null
            ? false
            : true
        }
      >
        <View>
          <Text>
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
  { setLocationById }
)(RosterItem);
