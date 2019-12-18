/**
 * GroupList Component
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPersonnelByLocation,
  getSelectedLocation,
  getSelectedIds,
} from '../../reducers';
import { clearSelectedPersonnel, setLocationById } from '../../actions';
import GroupItem from './GroupItem';

class GroupList extends React.PureComponent {
  onPress = () => {
    const {
      selectedIds,
      clearSelectedPersonnel,
      setLocationById,
      location,
    } = this.props;

    // set each selected ids new location to the current group
    selectedIds.forEach(id => setLocationById(id, location));
    clearSelectedPersonnel();
  };

  renderItem = ({ item }) => {
    const { location } = this.props;
    return <GroupItem location={location} item={item} />;
  };

  keyExtractor = item => item.id;

  render() {
    const { location, personnel, selectedLocation } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        disabled={
          selectedLocation == null || selectedLocation == location
            ? true
            : false
        }
        style={styles.listContainer}
      >
        <FlatList
          data={personnel}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={this.props}
        />
      </TouchableOpacity>
    );
  }
}

// props validation
GroupList.propTypes = {
  location: PropTypes.string,
  selectedIds: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setLocationById: PropTypes.func,
  personnel: PropTypes.array,
  selectedLocation: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  return {
    personnel: getPersonnelByLocation(state, location),
    selectedLocation: getSelectedLocation(state),
    selectedIds: getSelectedIds(state),
  };
};

export default connect(mapStateToProps, {
  clearSelectedPersonnel,
  setLocationById,
})(GroupList);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    flex: 7,
  },
});
