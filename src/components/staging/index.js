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
  getSelectedPersonnelGroups,
} from '../../redux/selectors';
import {
  setVisibility,
  clearSelectedPersonnel,
  setPersonLocationId,
} from '../../redux/actions';
import { STAGING, ROSTER } from '../../modules/location-ids';
import styles from './styles';

class Group extends Component {
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
        <View
          style={styles.header}
        >
          <Text style={styles.headerContent}> Staging </Text>
        </View>
        <StagingList />
      </View>
    );
  }
}

// props validation
Group.propTypes = {
  personnel: PropTypes.array,
  selectedLocationId: PropTypes.string,
  locationId: PropTypes.string,
  selectedPersonnelGroups: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
};

const mapStateToProps = state => {
  const personnel = getPersonnelByLocationId(state, STAGING);

  return {
    personnel,
    selectedLocationId: getSelectedLocationId(state),
    selectedPersonnelGroups: getSelectedPersonnelGroups(state),
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    {
      setVisibility,
      clearSelectedPersonnel,
      setPersonLocationId,
    }
  )(Group)
);
