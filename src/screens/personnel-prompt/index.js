/**
 * PersonnelPrompt Component
 *
 * Provides functionality for moving personnel to the current incident screen.
 */

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { NewPersonnel, Roster } from '../../components';
import { NEW_PERSONNEL, STAGING } from '../../modules/location-ids';
import { setPersonLocationId, addPerson } from '../../redux/actions';
import { getPersonnelByLocationId, getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class PersonnelPrompt extends Component {
  _onCancelPressed = () => {
    const {
      navigation: { goBack },
    } = this.props;
    goBack();
  };

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
        {Platform.OS === 'android' && (
            <View style={styles.backBar}>
              <TouchableOpacity onPress={this._onCancelPressed}>
                <Icon name="chevron-left" style={styles.backButton} />
              </TouchableOpacity>
            </View>
          )}
        <View style={styles.promptContainer}>
          <View style={styles.leftCol}>
            <View style={styles.newPersonnel}>
              <NewPersonnel />
              <TouchableOpacity
                style={styles.option}
                onPress={this._onAddToIncidentPressed}
              >
                <Text style={styles.optionContent}>ADD TO INCIDENT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rightCol}>
            <View style={styles.roster}>
              <Roster />
              <TouchableOpacity
                style={styles.option}
                onPress={this._onAddPersonPressed}
              >
                <Text style={styles.optionContent}>ADD PERSON</Text>
                <Icon name="arrow-right" style={styles.optionContent} />
              </TouchableOpacity>
            </View>
          </View>
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
