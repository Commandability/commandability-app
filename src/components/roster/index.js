/**
 * Roster Component
 *
 * Manages displaying the roster and search bar.
 */

import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import colors from '../../modules/colors';
import RosterList from '../roster-list';
import {
  getPersonnelByLocationId,
  getSelectedLocationId,
  getSelectedPersonnelGroups,
} from '../../redux/selectors';
import {
  clearSelectedPersonnel,
  setPersonLocationId,
} from '../../redux/actions';
import { STAGING, ROSTER } from '../../modules/location-ids';
import styles from './styles';

class Roster extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  _onRosterPressed = () => {
    const {
      selectedPersonnelGroups,
      clearSelectedPersonnel,
      setPersonLocationId,
    } = this.props;

    Alert.alert(
      'Remove selected personnel from incident?',
      'All selected personnel will be returned to the roster list and marked as off-scene in the report. ',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK',
          onPress: () => {
            // set each selected id's new locationId to the current group
            selectedPersonnelGroups.forEach(personGroup => {
              const { person, group: prevGroup } = personGroup;
              return setPersonLocationId(
                person,
                // To report prev location
                prevGroup || { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
                { locationId: ROSTER, name: 'Roster' }
              );
            });
            clearSelectedPersonnel();
          },
        },
      ]
    );
  };

  render() {
    const { selectedLocationId } = this.props;

    const renderOverlay =
      selectedLocationId && selectedLocationId !== ROSTER ? true : false;

    return (
      <View style={styles.container}>
        {renderOverlay && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={this._onRosterPressed}
          />
        )}
        <View style={styles.header}>
          <Text style={styles.headerContent}> Roster </Text>
        </View>
        <TextInput
          style={styles.queryInput}
          autoCapitalize="none"
          placeholder="Search"
          placeholderTextColor={colors.text.light}
          onChangeText={query => this.setState({ query })}
          value={this.state.query}
        />
        <RosterList query={this.state.query} />
      </View>
    );
  }
}

// props validation
Roster.propTypes = {
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

export default connect(
  mapStateToProps,
  {
    clearSelectedPersonnel,
    setPersonLocationId,
  }
)(Roster);
