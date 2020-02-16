/**
 * HomeScreen component
 * 
 * Manages displaying the home screen and activity indicator when signing out.
 */

import React, { Component } from 'react';
import { ActivityIndicator, Button, View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import PropTypes from 'prop-types';

import { generateCurrentReport } from '../modules/reportManager';
import colors from '../modules/colors';
import {store} from '../App';
import { getCurrentReportData } from '../reducers';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = { currentUser: null, loading: false };
  }

  componentDidMount() {
    const { currentUser } = auth();
    this.setState({ currentUser, loading: false });
    if (generateCurrentReport()) {
      this.props.navigation.navigate('IncidentStack');
    }
  }

  _signOut = () => {
    this.setState(prevState => ({
      currentUser: prevState.currentUser,
      loading: true,
    }));
    auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('AuthStack');
      })
      .catch(err => console.log(err.message));
  };

  render() {
    // TODO: Add welcome
    // { currentUser } = this.state;
    // const { email } = currentUser || {}; // destructuring throws a type error with null objects
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('IncidentScreen')}
          color={colors.primary.light}
          title={'Start Incident'}
        ></Button>
        <Button
          onPress={this._signOut}
          title="Sign out"
          color={colors.primary.light}
        />
        {this.state.loading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            color={colors.secondary.dark}
            size={'large'}
          />
        )}
      </View>
    );
  }
}

// props validation
HomeScreen.propTypes = {
  navigation: PropTypes.object,
  navigate: PropTypes.func,
  reportData: PropTypes.object,
  email: PropTypes.string,
};

const styles = StyleSheet.create({
  activityIndicator: {
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
});
