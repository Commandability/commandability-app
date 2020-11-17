/**
 * PersonnelOptions Component
 *
 * This component handles the personnel options bellow the staging list, including:
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
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
import { Staging } from "../../components";
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

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this._onAddPersonnelPressed}
        >
          <Text style={styles.buttonContent}>ADD PERSONNEL</Text>
          <Icon name="arrow-right" style={styles.buttonContent} />
        </TouchableOpacity>

        <Staging />

        <TouchableOpacity
          disabled={selectedLocationId != STAGING}
          style={styles.option}
          onPress={this._onRemovePressed}
        >
          <Text style={ styles.optionContent }>
            REMOVE PERSONNEL
          </Text>
          <Icon name="account-multiple-remove" 
          style={styles.icon} />
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
};

const mapStateToProps = state => ({
  selectedLocationId: getSelectedLocationId(state),
  selectedPersonnel: getSelectedPersonnel(state),
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
