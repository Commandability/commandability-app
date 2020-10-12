/**
 * PersonnelOptions Component
 *
 * This component handles the personnel options bellow the staging list, including:
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

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
import { getSelectedIds } from '../../redux/selected/reducer';

class PersonnelOptions extends Component {
  _onAddPersonnelPressed = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('PersonnelPrompt');
  };

  _onRemovePressed = () => {
    const {
      clearSelectedPersonnel,
      setPersonLocationId,
      selectedPersonnel,
      removePerson,
      selected,
    } = this.props;
    console.log(selected);
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
    const { theme, selected } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        
          <TouchableOpacity
            style={styles.option}
            onPress={this._onAddPersonnelPressed}
          >
            <Text style={styles.optionContent}>Add Personnel</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.option}
            onPress={this._onRemovePressed}
          >
            <Text style={styles.optionContent}>Remove Personnel</Text>
          </TouchableOpacity>
        
      </View>
    );
  }
}

// props validation
PersonnelOptions.propTypes = {
  navigation: PropTypes.object,
  theme: PropTypes.string,
  selectedLocationId: PropTypes.string,
  locationId: PropTypes.string,
  selectedPersonnel: PropTypes.array,
  clearSelectedPersonnel: PropTypes.func,
  setPersonLocationId: PropTypes.func,
  removePerson: PropTypes.func,
  selected: PropTypes.array,
};

const mapStateToProps = state => ({
  selectedLocationId: getSelectedLocationId(state),
  selectedPersonnel: getSelectedPersonnel(state),
  selected: getSelectedIds(state),
  theme: getTheme(state),
});

const ConnectWrapper = connect(
  mapStateToProps,
  {
    getSelectedIds,
    clearSelectedPersonnel,
    removePerson,
    setPersonLocationId,
  }
)(PersonnelOptions);

// Wrap and export
export default function NavigationWrapper(props) {
  const navigation = useNavigation();

  return <ConnectWrapper {...props} navigation={navigation} />;
}
