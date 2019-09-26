/**
 * StagingList Component
 *
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React, { Component } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import {
  getPersonnelByLocation,
  getSelectedLocation,
  getSelectedIds
} from "../../reducers";
import { clearSelectedPersonnel, setLocationById } from "../../actions";
import GroupItem from "./GroupItem";

const LOCATION = "Staging";

class StagingList extends React.PureComponent {
  constructor() {
    super();
  }

  _onPress = () => {
    const { selectedIds, clearSelectedPersonnel, setLocationById } = this.props;

    // set each selected ids new location to the current group
    selectedIds.forEach(id => setLocationById(id, LOCATION));
    clearSelectedPersonnel();
  };

  _renderItem = ({ item }) => {
    return <GroupItem groupName={LOCATION} item={item} />;
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    const { personnel, selectedLocation } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == null || selectedLocation == LOCATION
            ? true
            : false
        }
        style={{ borderWidth: 1, flex: 7 }}
      >
        <FlatList
          data={personnel}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          extraData={this.props}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    personnel: getPersonnelByLocation(state, LOCATION),
    selectedLocation: getSelectedLocation(state),
    selectedIds: getSelectedIds(state)
  };
};

export default connect(
  mapStateToProps,
  {
    clearSelectedPersonnel,
    setLocationById
  }
)(StagingList);
