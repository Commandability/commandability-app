/**
 * Redux SwitchNavigator Component
 *
 * Manages re-rendering the navigation container when the navigation stack changes
 * Based on https://reactnavigation.org/docs/auth-flow except using redux instead of the Context API
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HomeScreen,
  IncidentScreen,
  EditGroupPrompt,
  EndScreen,
  ExitWithoutSavingPrompt,
  AuthScreen,
  AddPersonnelPrompt,
  SavePrompt,
  AddPersonPrompt,
} from './screens';
import {
  AUTH_STACK,
  HOME_STACK,
  INCIDENT_STACK,
  END_STACK,
} from './utils/navigation-stacks';
import {selectStack, selectTheme} from './redux/selectors';
import themeSelector from './utils/themes';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const Auth = createStackNavigator();
const Home = createStackNavigator();
const Incident = createStackNavigator();
const End = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const setStack = (stack) => {
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
          <Incident.Screen name="EditGroupPrompt" component={EditGroupPrompt} />
          <Incident.Screen
            name="AddPersonnelPrompt"
            component={AddPersonnelPrompt}
          />
          <Incident.Screen name="AddPersonPrompt" component={AddPersonPrompt} />
        </Incident.Navigator>
      );
    case END_STACK:
      return (
        <End.Navigator screenOptions={screenOptions}>
          <End.Screen name="EndScreen" component={EndScreen} />
          <End.Screen name="SavePrompt" component={SavePrompt} />
          <End.Screen
            name="ExitWithoutSavingPrompt"
            component={ExitWithoutSavingPrompt}
          />
        </End.Navigator>
      );
    case AUTH_STACK:
    default:
      return (
        <Auth.Navigator screenOptions={screenOptions}>
          <Auth.Screen name="AuthScreen" component={AuthScreen} />
        </Auth.Navigator>
      );
  }
};

const createStyleSheet = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.one,
    },
  });

const SwitchNavigator = () => {
  const theme = useSelector((state) => selectTheme(state));
  const stack = useSelector((state) => selectStack(state));

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  // https://reactnavigation.org/docs/state-persistence/
  useEffect(() => {
    const init = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const savedState = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;

        if (savedState !== undefined) {
          setInitialState(savedState);
        }
      } catch (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
          },
        ]);
      }
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      setIsReady(true);
    });
  }, []);

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  if (!isReady) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }>
        {setStack(stack)}
      </NavigationContainer>
    </View>
  );
};

export default SwitchNavigator;
