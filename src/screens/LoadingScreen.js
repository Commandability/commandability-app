/**
 * LoadingScreen component
 *
 * Manages splashscreen visibility.
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import PropTypes from 'prop-types';

export default class LoadingScreen extends Component {
  componentDidMount() {
    const { navigate } = this.props.navigation;
    this.authSubscription = auth().onAuthStateChanged(user => {
      navigate(user ? 'AppStack' : 'AuthStack');
    });
  }

  componentWillUnmount() {
    this.authSubscription(); // stop checking for auth state changes
    SplashScreen.hide();
  }

  render() {
    return <View />;
  }
}

// props validation
LoadingScreen.propTypes = {
  navigation: PropTypes.object,
  navigate: PropTypes.func,
};
