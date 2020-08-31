/**
 * EndScreen component
 *
 * Manages exiting the incident without saving.
 */

import React, { Component } from 'react';
import { Alert, TouchableOpacity, View, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';

import { resetIncident, toHomeStack } from '../../redux/actions';
import styles from './styles';

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
      const { resetIncident, toHomeStack } = this.props;
      resetIncident(); // reset personnel locations and group settings, remove all un-logged personnel from state
      toHomeStack();
    } else {
      Alert.alert('Error', 'Incorrect organization email.', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  render() {
    const {
      currentUser: { email },
    } = auth();

    return (
      <View style={styles.container}>
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
    );
  }
}

ExitIncidentPrompt.propTypes = {
  resetIncident: PropTypes.func,
  toHomeStack: PropTypes.func,
};

export default connect(
  null,
  {
    resetIncident,
    toHomeStack,
  }
)(ExitIncidentPrompt);
