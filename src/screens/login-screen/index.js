/**
 * LoginScreen component
 *
 * Manages displaying the login page.
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  TextInput,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';

import colors from '../../modules/colors';
import styles from './styles';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: 'commandabilityapp@gmail.com', // empty string
      password: 'dev-password', // empty string
    };
  }

  _signIn = async () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const { navigate } = this.props.navigation;
      navigate('AppStack');
    } catch (error) {
      // handle network connection errors
      const { isConnected } = await NetInfo.fetch();
      if (isConnected) {
        let message = '';
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'The email address you entered is invalid. ';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            message =
              'The username and password you entered do not match our records. ';
            break;
          default:
            message = 'Unknown error. ';
        }

        Alert.alert('Error', message, [
          {
            text: 'OK',
          },
        ]);
      } else {
        Alert.alert(
          'Failed to connect to the network. ',
          'Please check your network connection status. ',
          [
            {
              text: 'OK',
            },
          ]
        );
      }

      this.setState(prevState => ({
        loading: false,
        email: prevState.email,
        password: '',
      }));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor={colors.text.light}
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor={colors.text.light}
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          onPress={this._signIn}
          title="Sign in"
          color={colors.primary.light}
          disabled={this.state.email && this.state.password ? false : true}
        />
        {this.state.loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={colors.primary.light}
            size={'large'}
          />
        )}
      </View>
    );
  }
}

// props validation
LoginScreen.propTypes = {
  navigation: PropTypes.object,
  navigate: PropTypes.func,
};
