/**
 * RosterList Component
 * 
 * props: 
 *  - none
 * 
 * Manages displaying personnel in the roster. 
 */

import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import { getPersonnel } from "../reducers";
import { setLocationById } from "../actions";
import RosterItem from "./RosterItem";

class RosterList extends React.PureComponent {
  _renderItem = ({ item }) => {
    return <RosterItem item={item} />;
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    const { personnel } = this.props;
    return (
      <FlatList
        data={personnel}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    personnel: getPersonnel(state)
  };
};

export default connect(
  mapStateToProps
)(RosterList);
