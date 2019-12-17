/**
 * StagingList Component
 *
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPersonnelByLocation,
  getSelectedLocation,
  getSelectedIds,
} from '../../reducers';
import { clearSelectedPersonnel, setLocationById } from '../../actions';
import GroupItem from './GroupItem';

const LOCATION = 'Staging';

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
    return <GroupItem location={LOCATION} item={item} />;
  };

  _keyExtractor = item => item.id;

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

StagingList.propTypes = {
  location: PropTypes.string,
  selectedIds: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setLocationById: PropTypes.func,
  personnel: PropTypes.array,
  selectedLocation: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocation(state, LOCATION),
    selectedLocation: getSelectedLocation(state),
    selectedIds: getSelectedIds(state),
  };
};

export default connect(mapStateToProps, {
  clearSelectedPersonnel,
  setLocationById,
})(StagingList);
