import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { getPersonnelByLocation, getSelectedIds } from "../reducers";
import {
  clearSelectedPersonnel,
  setLocationById
} from "../actions";
import ListItem from "./ListItem";

class GroupList extends React.PureComponent {
  _onPress = () => {
    const {
      selectedIds,
      clearSelectedPersonnel,
      setLocationById,
      groupName
    } = this.props;
    selectedIds.map(id => setLocationById(id, groupName));
    clearSelectedPersonnel();
  };

  _renderItem = ({ item }) => {
    return <ListItem {...this.props} item={item} />;
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    const { personnel } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress} style={{ borderWidth: 1}}>
        <FlatList
          data={personnel}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
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
