/**
 * GroupList Component
 *
 * props:
 *  - groupName: the name of the group
 *
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React, { Component } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import {
  getPersonnelByLocation,
  getSelectedLocation,
  getSelectedIds,
  getVisibilityByLocation
} from "../../reducers";
import { clearSelectedPersonnel, setLocationById } from "../../actions";
import GroupItem from "./GroupItem";

class GroupList extends React.PureComponent {
  constructor() {
    super();
  }

  _onPress = () => {
    const {
      selectedIds,
      clearSelectedPersonnel,
      setLocationById,
      location
    } = this.props;

    // set each selected ids new location to the current group
    selectedIds.forEach(id => setLocationById(id, location));
    clearSelectedPersonnel();
  };

  _renderItem = ({ item }) => {
    const { location } = this.props;
    return <GroupItem location={location} item={item} />;
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    const { location, personnel, selectedLocation, visibility } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == null || selectedLocation == location || visibility
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
  const { location } = ownProps;
  return {
    personnel: getPersonnelByLocation(state, location),
    selectedLocation: getSelectedLocation(state),
    selectedIds: getSelectedIds(state),
    visibility: getVisibilityByLocation(state, location)
  };
};

export default connect(
  mapStateToProps,
  {
    clearSelectedPersonnel,
    setLocationById
  }
)(GroupList);
