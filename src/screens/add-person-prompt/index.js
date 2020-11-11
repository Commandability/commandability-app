/**
 * AddPersonPrompt Component
 *
 * Provides functionality for adding temporary personnel to the incident.
 */

import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { addPerson } from '../../redux/actions';
import { getTheme } from '../../redux/selectors';
import { NEW_PERSONNEL } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class AddPersonPrompt extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      badge: '',
      organization: '',
    };
  }

  _onAddPersonPressed = () => {
    const { addPerson, navigation: { navigate } } = this.props;
    const person = {
      badge: this.state.badge,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      organization: this.state.organization,
    };
    this.setState({ firstName: '', lastName: '', badge: '', organization: '' });

    addPerson(person, NEW_PERSONNEL);

    navigate('PersonnelPrompt');
  };

  _onCancelPressed = () => {
    const {
      navigation: { goBack },
    } = this.props;
    goBack();
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
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>First Name*</Text>
            <TextInput
              style={styles.input}
              maxLength={36}
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />
            <Text style={styles.label}>Last Name*</Text>
            <TextInput
              style={styles.input}
              maxLength={36}
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />
            <Text style={styles.label}>Badge Number</Text>
            <TextInput
              style={styles.input}
              keyboardType={'numeric'}
              maxLength={10}
              value={this.state.badge}
              onChangeText={badge => this.setState({ badge })}
            />
            <Text style={styles.label}>Organization</Text>
            <TextInput
              style={styles.input}
              maxLength={36}
              value={this.state.organization}
              onChangeText={organization => this.setState({ organization })}
            />
            <TouchableOpacity
              style={styles.opacity}
              onPress={this._onAddPersonPressed}
              disabled={this.state.firstName === '' || this.state.lastName === ''}
            >
              <Icon name="account-plus" style={styles.icon} />
              <Text style={styles.opacityText}> Add Person </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
    </View>
    );
  }
}

// props validation
AddPersonPrompt.propTypes = {
  navigation: PropTypes.object,
  theme: PropTypes.string,
  addPerson: PropTypes.func,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

const ConnectWrapper = connect(
  mapStateToProps,
  {
    addPerson,
  }
)(AddPersonPrompt);

// Wrap and export
export default function NavigationWrapper(props) {
  const navigation = useNavigation();

  return <ConnectWrapper {...props} navigation={navigation} />;
}
