/**
 * GroupList Component
 *
 * props:
 *  - groupId: the name of the group
 *
 * Manages displaying personnel in a group by groupId, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import { getPersonnelByLocation, getSelectedIds } from "../reducers";
import { clearSelectedPersonnel, setLocationById } from "../actions";
import ListItem from "./ListItem";

class GroupList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      name: 'Group Name'
    }; // can name be the same using the other syntax???
  }

  _onPress = () => {
    const {
      selectedIds,
      clearSelectedPersonnel,
      setLocationById,
      groupId
    } = this.props;

    // set each selected ids new location to the current group
    selectedIds.forEach(id => setLocationById(id, groupId));
    clearSelectedPersonnel();
  };

  _renderItem = ({ item }) => {
    const { groupId } = this.props;
    return <ListItem groupId={groupId} item={item} />;
  };

  _keyExtractor = (item, index) => item.id;

  _renderHeader = () => {
    return <Text>{this.state.name}</Text>;
  };

  render() {
    const { personnel } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress} style={{ borderWidth: 1 }}>
        <FlatList
          data={personnel}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          extraData={this.props}
          ListHeaderComponent={this._renderHeader}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { groupId } = ownProps;
  return {
    personnel: getPersonnelByLocation(state, groupId),
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
