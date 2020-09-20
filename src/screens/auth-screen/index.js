/**
 * AuthScreen component
 *
 * Manages displaying the login page.
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';

import { getTheme } from '../../redux/selectors';
import { signIn } from '../../redux/actions';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class AuthScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: 'commandabilityapp@gmail.com', // empty string
      password: 'dev-password', // empty string
    };
  }

  _signIn = async () => {
    const { signIn } = this.props;
    const { isConnected } = await NetInfo.fetch();
    if (isConnected) {
      this.setState({ loading: true });
      const { email, password } = this.state;
      try {
        await signIn(email, password);
      } catch (error) {
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
        this.setState(prevState => ({
          loading: false,
          email: prevState.email,
          password: '',
        }));
      }
    } else {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status. ',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  render() {
    const { theme } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.content}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._signIn}
            disabled={this.state.email && this.state.password ? false : true}
          >
            <Icon name="login" style={styles.icon} />
            <Text style={styles.iconText}>Sign in</Text>
          </TouchableOpacity>
          {this.state.loading && (
            <ActivityIndicator
              style={styles.activityIndicator}
              color={colors.primary}
              size={'large'}
            />
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

// props validation
AuthScreen.propTypes = {
  signIn: PropTypes.func,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  {
    signIn,
  }
)(AuthScreen);
