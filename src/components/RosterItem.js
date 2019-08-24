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

import { setLocationById } from "../actions";
import { STAGING } from "../modules/locations";

class ListItem extends Component {
  constructor() {
    super();
  }

  _onPress = () => {
    const { item, setLocationById } = this.props;
    if (item.location == null) {
      setLocationById(item.id, STAGING);
    } else {
      // alert user the current person is already activeS
    }
  };

  render() {
    const { item, groupId, selectedLocation } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress}>
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
  { setLocationById }
)(ListItem);
