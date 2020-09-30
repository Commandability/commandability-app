/**
 * PersonnelPrompt Component
 *
 * Provides functionality for moving personnel to the current incident screen.
 */

import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NewPersonnel, Roster } from '../../components';
import { NEW_PERSONNEL, STAGING } from '../../modules/location-ids';
import { setPersonLocationId, addPerson } from '../../redux/actions';
import { getPersonnelByLocationId, getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class PersonnelPrompt extends Component {
  _onAddToIncidentPressed = () => {
    const {
      personnel,
      setPersonLocationId,
      navigation: { goBack },
    } = this.props;
    personnel.forEach(person => {
      setPersonLocationId(
        person,
        // To report prev location
        { locationId: NEW_PERSONNEL, name: 'New Personnel' },
        { locationId: STAGING, name: 'Staging' }
      );
    });
    goBack();
  };

  _onAddPersonPressed = () => {
    const { navigation: { navigate } } = this.props;
    navigate('AddPersonPrompt');
  };

  render() {
    const { theme } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <NewPersonnel />
          <TouchableOpacity
            style={styles.option}
            onPress={this._onAddToIncidentPressed}
          >
            <Text style={styles.optionContent}>ADD TO INCIDENT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Roster />
          <TouchableOpacity
            style={styles.option}
            onPress={this._onAddPersonPressed}
          >
            <Text style={styles.optionContent}>ADD PERSON</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// props validation
PersonnelPrompt.propTypes = {
  navigation: PropTypes.object,
  personnel: PropTypes.array,
  setPersonLocationId: PropTypes.func,
  theme: PropTypes.string,
  addPerson: PropTypes.func,
};

const mapStateToProps = state => ({
  personnel: getPersonnelByLocationId(state, NEW_PERSONNEL),
  theme: getTheme(state),
});

const ConnectWrapper = connect(
  mapStateToProps,
  {
    setPersonLocationId,
    addPerson,
  }
)(PersonnelPrompt);

// Wrap and export
export default function NavigationWrapper(props) {
  const navigation = useNavigation();

  return <ConnectWrapper {...props} navigation={navigation} />;
}
