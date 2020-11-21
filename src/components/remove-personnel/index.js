/**
 * RemovePersonnel Component
 *
 * This component handles removing personnel from the staging list
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {
  getTheme,
  getSelectedLocationId,
  getSelectedPersonnel,
} from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';
import { STAGING, ROSTER } from '../../modules/location-ids';
import {
  clearSelectedPersonnel,
  setPersonLocationId,
  removePerson,
} from '../../redux/actions';

class RemovePersonnel extends Component {
  _onRemovePressed = () => {
    const {
      clearSelectedPersonnel,
      setPersonLocationId,
      selectedPersonnel,
      removePerson,
    } = this.props;
    Alert.alert(
      'Remove selected personnel from incident?',
      'All selected personnel will be returned to the roster list and marked as off-scene in the report. ',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            selectedPersonnel.forEach(person => {
              const { temporary } = person;

              // set each selected id's new locationId to ROSTER
              temporary
                ? removePerson(person)
                : setPersonLocationId(
                    person,
                    // To report prev location
                    { locationId: STAGING, name: 'Staging' }, // Set prev group to staging if no prev group in redux
                    { locationId: ROSTER, name: 'Roster' }
                  );
              clearSelectedPersonnel();
            });
          },
        },
      ]
    );
  };

  render() {
    const { theme, selectedLocationId } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    const renderOverlay = selectedLocationId == STAGING;

    return (
      <View style={styles.container}>
        {renderOverlay && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={this._onRemovePressed}
          />
        )}
        <View style={styles.remove}>
          <Text style={styles.header}>REMOVE PERSONNEL</Text>
          <Icon name="account-multiple-remove" style={styles.icon} />
        </View>
      </View>
    );
  }
}

// props validation
RemovePersonnel.propTypes = {
  theme: PropTypes.string,
  selectedLocationId: PropTypes.string,
  selectedPersonnel: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  removePerson: PropTypes.func,
};

const mapStateToProps = state => ({
  selectedLocationId: getSelectedLocationId(state),
  selectedPersonnel: getSelectedPersonnel(state),
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  {
    clearSelectedPersonnel,
    removePerson,
    setPersonLocationId,
  }
)(RemovePersonnel);
