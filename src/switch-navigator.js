/**
 * ReduxSwitchNavigator Component
 *
 * Manages re-rendering the navigation container when the navigation stack changes.
 * Based on https://reactnavigation.org/docs/auth-flow except using redux instead of the Context API.
 */

import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import {
  HomeScreen,
  IncidentScreen,
  GroupPrompt,
  EndScreen,
  ExitIncidentPrompt,
  AuthScreen,
  PersonnelPrompt,
} from './screens';
import {
  AUTH_STACK,
  HOME_STACK,
  INCIDENT_STACK,
  END_STACK,
} from './modules/stack-ids';
import { getStack } from './redux/selectors';

const Auth = createStackNavigator();
const Home = createStackNavigator();
const Incident = createStackNavigator();
const End = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

class SwitchNavigator extends React.Component {
  setStack(stack) {
    switch (stack) {
      case HOME_STACK:
        return (
          <Home.Navigator screenOptions={screenOptions}>
            <Home.Screen name="HomeScreen" component={HomeScreen} />
          </Home.Navigator>
        );
      case INCIDENT_STACK:
        return (
          <Incident.Navigator screenOptions={screenOptions}>
            <Incident.Screen name="IncidentScreen" component={IncidentScreen} />
            <Incident.Screen name="GroupPrompt" component={GroupPrompt} />
            <Incident.Screen
              name="PersonnelPrompt"
              component={PersonnelPrompt}
            />
          </Incident.Navigator>
        );
      case END_STACK:
        return (
          <End.Navigator screenOptions={screenOptions}>
            <End.Screen name="EndScreen" component={EndScreen} />
            <End.Screen
              name="ExitIncidentPrompt"
              component={ExitIncidentPrompt}
            />
          </End.Navigator>
        );
      case AUTH_STACK:
      default:
        return (
          <Auth.Navigator screenOptions={screenOptions}>
            <Auth.Screen
              name="AuthScreen"
              component={AuthScreen}
              options={{ animationTypeForReplace: 'pop' }}
            />
          </Auth.Navigator>
        );
    }
  }

  render() {
    const { stack } = this.props;
    return <NavigationContainer>{this.setStack(stack)}</NavigationContainer>;
  }
}

// props validation
SwitchNavigator.propTypes = {
  stack: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    stack: getStack(state),
  };
};

export default connect(
  mapStateToProps,
  null
)(SwitchNavigator);
