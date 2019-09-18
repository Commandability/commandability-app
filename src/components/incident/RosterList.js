/**
 * RosterList Component
 *
 * props:
 *  - none
 *
 * Manages displaying personnel in the roster.
 */

import React from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import {
  getPersonnelByLocation,
  getSelectedLocation,
  getSelectedIds
} from "../../reducers";
import { clearSelectedPersonnel, setLocationById } from "../../actions";
import RosterItem from "./RosterItem";
import { ROSTER } from "../../modules/locations";

class RosterList extends React.PureComponent {
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

    Alert.alert(
      "Remove selected personnel from incident?",
      "All selected personnel will be returned to the roster list and marked as off-scene in the report. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed")
        },
        {
          text: "OK",
          onPress: () => {
            // set each selected ids new location to the current group
            selectedIds.forEach(id => setLocationById(id, ROSTER));
            clearSelectedPersonnel();
          }
        }
      ]
    );
  };

  _renderItem = ({ item }) => {
    return <RosterItem item={item} />;
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    const { personnel, selectedLocation } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={{ flex: 7, borderWidth: 1 }}
        disabled={
          selectedLocation == null || selectedLocation == ROSTER ? true : false
        }
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

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocation(state, ROSTER),
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
)(RosterList);
