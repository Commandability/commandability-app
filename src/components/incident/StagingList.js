/**
 * StagingList Component
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPersonnelByLocationId,
  getSelectedLocationId,
  getSelectedPersonnelGroups,
} from '../../reducers';
import { clearSelectedPersonnel, setPersonLocationId } from '../../actions';
import ListItem from './ListItem';
import { STAGING, ROSTER } from '../../modules/locationIds';

class StagingList extends React.PureComponent {
  constructor() {
    super();
  }

  _onPress = () => {
    const {
      selectedPersonnelGroups,
      clearSelectedPersonnel,
      setPersonLocationId,
    } = this.props;

    // set each selected id's new locationId to the current group
    selectedPersonnelGroups.forEach(personGroup => {
      const { person, group: prevGroup } = personGroup;

      setPersonLocationId(
        person,
        prevGroup || { locationId: ROSTER, name: 'Roster' }, // Set prev group to roster if no prev group in redux
        { locationId: STAGING, name: 'Staging' }
      );
    });
    clearSelectedPersonnel();
  };

  _renderItem = ({ item }) => {
    return <ListItem locationId={STAGING} item={item} />;
  };

  _keyExtractor = item => item.id;

  render() {
    const { personnel, selectedGroup } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        disabled={
          selectedGroup === '' || selectedGroup === STAGING
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
  locationId: PropTypes.string,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  personnel: PropTypes.array,
  selectedGroup: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    personnel: getPersonnelByLocationId(state, STAGING),
    selectedGroup: getSelectedLocationId(state),
    selectedPersonnelGroups: getSelectedPersonnelGroups(state),
  };
};

export default connect(mapStateToProps, {
  clearSelectedPersonnel,
  setPersonLocationId,
})(StagingList);

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    flex: 7,
  },
});
