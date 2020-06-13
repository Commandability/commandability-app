/**
 * EndScreen component
 *
 * Manages exiting the incident without saving.
 */

import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';

import { resetIncident } from '../actions';
import colors from '../modules/colors';

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

  render() {
    const {
      currentUser: { email },
    } = auth();

    return (
      <View style={styles.container}>
        <Text>{`Are you absolutely sure you want to exit without saving?`}</Text>
        <Text>{`Please type ${email} to confirm.`}</Text>
        <TextInput
          style={styles.emailInput}
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Button
          onPress={this._exit}
          title="Exit without saving"
          color={colors.primary.light}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
  emailInput: {
    height: 40,
    color: colors.text.primaryLight,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
});
