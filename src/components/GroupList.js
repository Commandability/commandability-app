import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { getPersonnelByLocation } from "../reducers/PersonnelReducer";
import ListItem from "./ListItem";

class GroupList extends React.PureComponent {
  _renderItem = ({ item }) => {
    return <ListItem item={item} />;
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <FlatList
        data={this.props.personnel}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocation(state, "ROSTER")
  };
};

export default connect(mapStateToProps)(GroupList);
