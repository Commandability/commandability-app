/**
 * RosterList Component
 *
 * props:
 *  - none
 *
 * Manages displaying personnel in the roster.
 */

import React, { Component } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SearchBar
} from "react-native";
import { connect } from "react-redux";

import { getPersonnel } from "../reducers";
import { setLocationById } from "../actions";
import RosterItem from "./RosterItem";

class RosterList extends React.PureComponent {
  _renderItem = ({ item }) => {
    return <RosterItem item={item} />;
  };

  _renderHeader = () => {
    return <Text>Roster</Text>
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    const { personnel } = this.props;
    return (
      <FlatList
        data={personnel}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        extraData={this.props}
        ListHeaderComponent={this._renderHeader}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    personnel: getPersonnel(state)
  };
};

export default connect(mapStateToProps)(RosterList);
