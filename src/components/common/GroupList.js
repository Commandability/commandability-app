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

import { getPersonnelByLocation, getSelectedIds } from "../../reducers";
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
      groupName
    } = this.props;

    // set each selected ids new location to the current group
    selectedIds.forEach(id => setLocationById(id, groupName));
    clearSelectedPersonnel();
  };

  _renderItem = ({ item }) => {
    const { groupName } = this.props;
    return <GroupItem groupName={groupName} item={item} />;
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    const { personnel } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
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
  const { groupName } = ownProps;
  return {
    personnel: getPersonnelByLocation(state, groupName),
    selectedIds: getSelectedIds(state)
  };
};

export default connect(
  mapStateToProps,
  {
    clearSelectedPersonnel,
    setLocationById
  }
)(GroupList);
