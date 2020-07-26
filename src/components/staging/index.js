/**
 * Group Component
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StagingList from '../staging-list';
import {
  getPersonnelByLocationId,
  getSelectedLocationId,
  personIsSelected,
  getSelectedPersonnelGroups,
} from '../../redux/selectors';
import {
  setVisibility,
  selectPerson,
  deselectPerson,
  clearSelectedPersonnel,
  setPersonLocationId,
} from '../../redux/actions';
import { STAGING, ROSTER } from '../../modules/location-ids';
import styles from './styles';

class Group extends Component {
  _onSelectAllPressed = () => {
    const {
      personnel,
      allPersonnelSelected,
      selectPerson,
      deselectPerson,
    } = this.props;
    personnel.forEach(item => {
      allPersonnelSelected
        ? deselectPerson(item, STAGING)
        : selectPerson(item, STAGING);
    });
  };

  _onStagingPressed = () => {
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
        // To report prev location
        prevGroup || { locationId: ROSTER, name: 'Roster' }, // Set prev group to staging if no prev group in redux
        { locationId: STAGING, name: 'Staging' }
      );
    });
    clearSelectedPersonnel();
  };

  render() {
    const { selectedLocationId } = this.props;

    const renderOverlay =
      selectedLocationId && selectedLocationId !== STAGING ? true : false;

    return (
      <View style={styles.container}>
        {renderOverlay && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={this._onStagingPressed}
          />
        )}
        <TouchableOpacity
          onPress={this._onSelectAllPressed}
          style={styles.header}
        >
          <Text style={styles.headerContent}> Staging </Text>
        </TouchableOpacity>
        <StagingList />
      </View>
    );
  }
}

// props validation
Group.propTypes = {
  personnel: PropTypes.array,
  selectedLocationId: PropTypes.string,
  selectPerson: PropTypes.func,
  deselectPerson: PropTypes.func,
  locationId: PropTypes.string,
  allPersonnelSelected: PropTypes.bool,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
};

const mapStateToProps = state => {
  const personnel = getPersonnelByLocationId(state, STAGING);

  return {
    personnel,
    selectedLocationId: getSelectedLocationId(state),
    allPersonnelSelected: personnel.every(person =>
      personIsSelected(state, person)
    ),
    selectedPersonnelGroups: getSelectedPersonnelGroups(state),
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    {
      setVisibility,
      selectPerson,
      deselectPerson,
      clearSelectedPersonnel,
      setPersonLocationId,
    }
  )(Group)
);
