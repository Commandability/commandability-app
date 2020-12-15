/**
 * HomeScreen component
 *
 * Manages displaying the home screen and activity indicator when signing out.
 */

import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';

import {
  selectReportData,
  selectIsConfigurationLoaded,
  selectTheme,
} from '../../redux/selectors';
import {
  signOut,
  toIncidentStack,
  toEndStack,
  resetApp,
  createGroup,
  clearPersonnel,
  addPerson,
  toggleTheme,
} from '../../redux/actions';
import { START_INCIDENT, END_INCIDENT } from '../../redux/types';
import { uploadReports, deleteAllReports } from '../../modules/report-manager';
import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
  GROUP_SEVEN,
  GROUP_EIGHT,
  GROUP_NINE,
  GROUP_TEN,
  GROUP_ELEVEN,
  GROUP_TWELVE,
  GROUP_THIRTEEN,
  GROUP_FOURTEEN,
  GROUP_FIFTEEN,
  GROUP_SIXTEEN,
  GROUP_SEVENTEEN,
  GROUP_EIGHTEEN,
  ROSTER,
} from '../../modules/location-ids.js';
import { DARK } from '../../modules/theme-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const reportData = useSelector(state => selectReportData(state));
  const isConfigurationLoaded = useSelector(state =>
    selectIsConfigurationLoaded(state)
  );

  const [loading, setLoading] = useState(false);

  const reportIsActive =
    reportData[START_INCIDENT] && !reportData[END_INCIDENT];
  const reportIsComplete = reportData[END_INCIDENT];

  useEffect(() => {
    if (reportIsActive) {
      dispatch(toIncidentStack());
    }
    if (reportIsComplete) {
      dispatch(toEndStack());
    }
  }, [reportIsActive, reportIsComplete]);

  const onStartIncidentPressed = () => {
    if (isConfigurationLoaded) {
      dispatch(toIncidentStack());
    } else {
      Alert.alert(
        'No configuration data found',
        "Load your organization's configuration data from the web portal to begin recording incidents.",
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  const onUpdateConfigurationPressed = async () => {
    const { isConnected } = await NetInfo.fetch();
    if (isConnected) {
      setLoading(true);
      try {
        const { currentUser } = auth();
        // User is signed in.
        if (currentUser) {
          const { uid } = currentUser;
          const documentSnapshot = await firestore()
            .collection('users')
            .doc(uid)
            .get();
          const { groups, personnel } = documentSnapshot.data();

          const groupIds = [
            GROUP_ONE,
            GROUP_TWO,
            GROUP_THREE,
            GROUP_FOUR,
            GROUP_FIVE,
            GROUP_SIX,
            GROUP_SEVEN,
            GROUP_EIGHT,
            GROUP_NINE,
            GROUP_TEN,
            GROUP_ELEVEN,
            GROUP_TWELVE,
            GROUP_THIRTEEN,
            GROUP_FOURTEEN,
            GROUP_FIFTEEN,
            GROUP_SIXTEEN,
            GROUP_SEVENTEEN,
            GROUP_EIGHTEEN,
          ];
          // set default group settings
          groupIds.forEach(id => {
            const { name, visibility } = groups[id];
            dispatch(createGroup(id, name, visibility));
          });
          // refresh personnel data
          dispatch(clearPersonnel());
          personnel.forEach(person => {
            dispatch(addPerson(person, ROSTER, false)); // false for non-temporary personnel
          });
        }

        Alert.alert(
          'Configuration updated',
          "The latest configuration data has been loaded from your organization's account",
          [
            {
              text: 'OK',
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
          },
        ]);
      }
      setLoading(false);
    } else {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  const onUploadReportsPressed = async () => {
    const { isConnected } = await NetInfo.fetch();
    if (isConnected) {
      setLoading(true);
      try {
        await uploadReports();
        await deleteAllReports();
        Alert.alert(
          'All reports uploaded',
          'All reports were successfully uploaded and removed from local storage',
          [
            {
              text: 'OK',
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
          },
        ]);
      }
      setLoading(false);
    } else {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  const onToggleThemePressed = () => {
    dispatch(toggleTheme());
  };

  const onSignOutPressed = async () => {
    Alert.alert(
      'Are you sure you want to sign out?',
      'All personnel and incident data will be removed, but any reports will still be available on next sign in',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: async () => {
            setLoading(true);
            dispatch(resetApp());
            try {
              await dispatch(signOut());
            } catch (error) {
              Alert.alert('Error', error, [
                {
                  text: 'OK',
                },
              ]);
            }
          },
        },
      ]
    );
    setLoading(false);
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.opacity}
        onPress={onStartIncidentPressed}
        color={colors.primary}
      >
        <Icon name="launch" style={styles.icon} />
        <Text style={styles.opacityText}>Start Incident</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.opacity}
          onPress={onUpdateConfigurationPressed}
          color={colors.primary}
        >
          <Icon name="update" style={styles.icon} />
          <Text style={styles.opacityText}>Update Configuration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opacity}
          onPress={onUploadReportsPressed}
          color={colors.primary}
        >
          <Icon name="upload" style={styles.icon} />
          <Text style={styles.opacityText}>Upload Reports</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.opacity}
          onPress={onToggleThemePressed}
          color={colors.primary}
        >
          <Icon name="theme-light-dark" style={styles.icon} />
          <Text style={styles.opacityText}>
            {theme === DARK ? 'Light' : 'Dark'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opacity}
          onPress={onSignOutPressed}
          color={colors.primary}
        >
          <Icon name="logout" style={styles.icon} />
          <Text style={styles.opacityText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={colors.primary}
          size={'large'}
        />
      )}
    </View>
  );
};

export default HomeScreen;
