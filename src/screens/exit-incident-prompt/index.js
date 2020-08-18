/**
 * EndScreen component
 *
 * Manages exiting the incident without saving.
 */

import React, { Component } from 'react';
import { Alert, TouchableOpacity, View, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';

import { resetIncident } from '../../redux/actions';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ExitIncidentPrompt extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  _exit = () => {
    const {
      currentUser: { email },
    } = auth();
    if (this.state.email === email) {
      const { resetIncident } = this.props;
      resetIncident(); // reset personnel locations and group settings, remove all un-logged personnel from state
      this.props.navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Error', 'Incorrect organization email.', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  _onCancelPressed = () => {
    const {
      navigation: { goBack },
    } = this.props;
    goBack();
  };

  render() {
    const {
      currentUser: { email },
    } = auth();

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.content}>
          <View style={styles.backBar}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this._onCancelPressed}>
              <Icon name="chevron-left" style={styles.backButton} />
            </TouchableOpacity>
          </View>
          <View style={ styles.promptContainer}>
            <View style={styles.prompt}>
              <Text style={styles.promptText}>
                {`Are you absolutely sure you want to exit without saving?`}
              </Text>
              <Text style={styles.promptText}>
                Please type <Text style={styles.email}>{email}</Text> to confirm.
              </Text>
            </View>
            <Text style={styles.label}>Organization email *</Text>
            <TextInput
              style={styles.emailInput}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TouchableOpacity style={styles.opacity} onPress={this._exit}>
              <Text style={styles.opacityText}>Exit Without Saving</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

ExitIncidentPrompt.propTypes = {
  navigation: PropTypes.object,
  resetIncident: PropTypes.func,
};

export default withNavigation(
  connect(
    null,
    {
      resetIncident,
    }
  )(ExitIncidentPrompt)
);
