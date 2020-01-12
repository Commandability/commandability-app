/**
 * StagingList Component
 *
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPersonnelByLocation,
  getSelectedLocation,
  getSelectedIds,
} from '../../reducers';
import { clearSelectedPersonnel, setLocationById } from '../../actions';
import GroupItem from './GroupItem';

import { STAGING } from '../../modules/locations';

class StagingList extends React.PureComponent {
  constructor() {
    super();
  }

  _onPress = () => {
    const { selectedIds, clearSelectedPersonnel, setLocationById } = this.props;

    // set each selected ids new location to the current group
    selectedIds.forEach(id => setLocationById(id, STAGING));
    clearSelectedPersonnel();
  };

  _renderItem = ({ item }) => {
    return <GroupItem location={STAGING} item={item} />;
  };

  _keyExtractor = item => item.id;

  render() {
    const { personnel, selectedLocation } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedLocation == '' || selectedLocation == STAGING ? true : false
        }
        style={styles.listContainer}
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
    personnel: getPersonnelByLocation(state, STAGING),
    selectedLocation: getSelectedLocation(state),
    selectedIds: getSelectedIds(state),
  };
};

export default connect(mapStateToProps, {
  clearSelectedPersonnel,
  setLocationById,
})(StagingList);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    flex: 7,
  },
});
