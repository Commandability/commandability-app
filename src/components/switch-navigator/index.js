/**
 * ReduxSwitchNavigator Component
 *
 * Manages re-rendering the navigation container when the navigation stack changes.
 */

import React from 'react';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    AuthScreen,
    HomeScreen,
    // IncidentScreen,
    // GroupPrompt,
    // EndScreen,
    // ExitIncidentPrompt,
  } from '../../screens';
import PropTypes from 'prop-types';

import { getAuthStatus } from '../../redux/selectors';

const Auth = createStackNavigator();
const Home = createStackNavigator();

class SwitchNavigator extends React.Component {
  
  render() {
    const { authStatus } = this.props;
    return (
      <NavigationContainer>
        {authStatus ? (
          <Home.Navigator>
            <Home.Screen name="HomeScreen" component={HomeScreen} />
          </Home.Navigator>
        ) :
        (
          <Auth.Navigator>
            <Auth.Screen name="AuthScreen" component={AuthScreen} />
          </Auth.Navigator>
        )
      }
      </NavigationContainer>
    );
  }
}

// props validation
SwitchNavigator.propTypes = {
  authStatus: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    authStatus: getAuthStatus(state),
  };
};

export default connect(
  mapStateToProps,
  null
)(SwitchNavigator);
