/**
 * GroupList Component
 * 
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getGroupByLocation,
  getPersonnelByLocation,
  getSelectedLocation,
  getSelectedPersonnelGroups,
} from '../../reducers';
import { clearSelectedPersonnel, setPersonLocation } from '../../actions';
import GroupItem from './GroupItem';
import { STAGING } from '../../modules/locations';

class GroupList extends React.PureComponent {
  onPress = () => {
    const {
      selectedPersonnelGroups,
      clearSelectedPersonnel,
      setPersonLocation,
      group,
    } = this.props;

    // set each selected ids new location to the current group
    selectedPersonnelGroups.forEach(personGroup => {
      const { person, group: prevGroup } = personGroup;
      setPersonLocation(
        person,
        prevGroup || { location: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
        group
      );
    });
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
          selectedLocation == '' || selectedLocation == location
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
  group: PropTypes.object,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocation: PropTypes.func,
  personnel: PropTypes.array,
  selectedLocation: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  return {
    group: getGroupByLocation(state, location),
    personnel: getPersonnelByLocation(state, location),
    selectedLocation: getSelectedLocation(state),
    selectedPersonnelGroups: getSelectedPersonnelGroups(state),
  };
};

export default connect(mapStateToProps, {
  clearSelectedPersonnel,
  setPersonLocation,
})(GroupList);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    flex: 7,
  },
});
