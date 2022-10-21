/**
 * HomeScreen component
 */

import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import {ErrorBoundary} from 'react-error-boundary';
import Icon from 'react-native-vector-icons/Feather';

import ErrorFallbackScreen from '../error-fallback-screen';
import {
  selectReportData,
  selectGroupsAreConfigured,
  selectTheme,
} from '../../redux/selectors';
import {
  startIncident,
  signOut,
  toIncidentStack,
  toEndStack,
  resetApp,
  configureGroups,
  updateConfiguration,
  toggleTheme,
} from '../../redux/actions';
import {START_INCIDENT, END_INCIDENT} from '../../redux/types';
import {
  getNumberOfReports,
  uploadReports,
  deleteAllReports,
} from '../../utils/report-manager';
import {DARK} from '../../utils/themes';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';
import createStyleSheet from './styles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));
  const reportData = useSelector((state) => selectReportData(state));
  const groupsAreConfigured = useSelector((state) =>
    selectGroupsAreConfigured(state),
  );

  const [loading, setLoading] = useState(false);
  const [numberOfReports, setNumberOfReports] = useState(0);

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
  }, [dispatch, reportIsActive, reportIsComplete]);

  useEffect(() => {
    const getNumberOfReportsEffect = async () => {
      const result = await getNumberOfReports();
      setNumberOfReports(result);
    };
    getNumberOfReportsEffect();
  }, []);

  const onStartIncidentPressed = () => {
    Alert.alert('Are you sure you want to start a new incident?', '', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          if (!groupsAreConfigured) {
            dispatch(configureGroups());
          }

          dispatch(startIncident(Date.now()));
          dispatch(toIncidentStack());
        },
      },
    ]);
  };

  const onUpdateConfigurationPressed = async () => {
    const {isConnected} = await NetInfo.fetch();
    if (!isConnected) {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status.',
        [
          {
            text: 'OK',
          },
        ],
      );
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateConfiguration());

      Alert.alert(
        'Account configuration updated',
        "The latest configuration data has been loaded from your organization's account.",
        [
          {
            text: 'OK',
          },
        ],
      );
    } catch (error) {
      Alert.alert('Error', error, [
        {
          text: 'OK',
        },
      ]);
    }
    setLoading(false);
  };

  const onUploadReportsPressed = async () => {
    const {isConnected} = await NetInfo.fetch();
    if (!isConnected) {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status.',
        [
          {
            text: 'OK',
          },
        ],
      );
      return;
    }

    if (!numberOfReports) {
      Alert.alert(
        'No reports on device',
        'There were no reports on the device to upload.',
        [
          {
            text: 'OK',
          },
        ],
      );
      return;
    }

    setLoading(true);
    let uploadSuccess = false;
    try {
      const {currentUser} = auth();
      const {uid} = currentUser;
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(uid)
        .get();
      const {
        account: {expirationTimestamp},
      } = documentSnapshot.data();
      const expirationDate = expirationTimestamp?.toDate();

      if (!expirationDate || Date.now() > expirationDate) {
        Alert.alert(
          'Report upload disabled',
          'Please check your account status for additional information.',
          [
            {
              text: 'OK',
            },
          ],
        );
        setLoading(false);
        return;
      } else {
        await uploadReports();
        uploadSuccess = true;
        await deleteAllReports();

        Alert.alert(
          'Report upload completed successfully',
          'All reports have been uploaded and removed from the device.',
          [
            {
              text: 'OK',
            },
          ],
        );
      }
    } catch (error) {
      if (uploadSuccess) {
        Alert.alert(
          'Error removing reports from device',
          'All reports were successfully uploaded, but were not successfully removed from the device.',
          [
            {
              text: 'OK',
            },
          ],
        );
      } else {
        Alert.alert('Upload failed', error, [
          {
            text: 'OK',
          },
        ]);
      }
    }
    setLoading(false);
    setNumberOfReports(0);
  };

  const onToggleThemePressed = () => {
    dispatch(toggleTheme());
  };

  const onSignOutPressed = async () => {
    if (numberOfReports) {
      Alert.alert(
        'Reports on device',
        'Please upload all reports before signing out.',
        [
          {
            text: 'OK',
          },
        ],
      );
    } else {
      Alert.alert(
        'Are you sure you want to sign out?',
        'All account configuration and report data will be removed from the device.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: async () => {
              setLoading(true);
              try {
                await dispatch(signOut());
                dispatch(resetApp());
              } catch (error) {
                Alert.alert('Error', error, [
                  {
                    text: 'OK',
                  },
                ]);
              }
            },
          },
        ],
      );
      setLoading(false);
    }
  };

  const colors = themeSelector(theme);
  const globalStyles = createGlobalStyleSheet(colors);
  const styles = createStyleSheet(colors);

  const onReset = async () => {
    setLoading(false);
    const result = await getNumberOfReports();
    setNumberOfReports(result);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[loading, numberOfReports]}>
      <StatusBar
        barStyle={theme === DARK ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View style={styles.container}>
        <View style={styles.opacityGrid}>
          <TouchableOpacity
            style={[styles.opacity]}
            onPress={onStartIncidentPressed}>
            <Icon
              name="alert-triangle"
              style={[styles.opacityText, styles.opacityIcon]}
            />
            <Text style={[styles.opacityText]}>Start incident</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.opacity}
              onPress={onUpdateConfigurationPressed}>
              <Icon
                name="rotate-cw"
                style={[styles.opacityText, styles.opacityIcon]}
              />
              <Text style={styles.opacityText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.opacity,
                numberOfReports && styles.outlinedOpacity,
              ]}
              onPress={onUploadReportsPressed}>
              <Icon
                name="upload"
                style={[styles.opacityText, styles.opacityIcon]}
              />
              <Text style={styles.opacityText}>Upload</Text>
              <View
                style={[
                  styles.reportsNumberContainer,
                  numberOfReports
                    ? styles.reportsOnDeviceContainer
                    : styles.noReportsOnDeviceContainer,
                ]}>
                <Text
                  style={[
                    styles.reportsNumber,
                    numberOfReports
                      ? styles.reportsOnDevice
                      : styles.noReportsOnDevice,
                  ]}>{`${numberOfReports}`}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.opacity}
              onPress={onToggleThemePressed}>
              <Icon
                name={theme === DARK ? 'sun' : 'moon'}
                style={[styles.opacityText, styles.opacityIcon]}
              />
              <Text style={[styles.opacityText]}>{`${
                theme === DARK ? 'Light' : 'Dark'
              } theme`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opacity} onPress={onSignOutPressed}>
              <Icon
                name="log-out"
                style={[styles.opacityText, styles.opacityIcon]}
              />
              <Text style={styles.opacityText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator
            style={globalStyles.activityIndicator}
            color={colors.primary}
            size={'large'}
          />
        ) : null}
      </View>
    </ErrorBoundary>
  );
};

export default HomeScreen;
