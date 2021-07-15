/**
 * SavePrompt component
 */

import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, StatusBar, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import {ErrorBoundary} from 'react-error-boundary';
import PropTypes from 'prop-types';

import {BackButton, LargeButton} from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import {resetIncident, toHomeStack} from '../../redux/actions';
import {selectTheme} from '../../redux/selectors';
import {
  DEVICE_REPORT_LIMIT,
  getNumberOfReports,
  uploadReport,
  saveReport,
} from '../../utils/report-manager';
import {DARK} from '../../utils/themes';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';

const SavePrompt = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {reportData} = route.params;
  const theme = useSelector((state) => selectTheme(state));

  const [loading, setLoading] = useState(false);
  const [numberOfReports, setNumberOfReports] = useState(0);

  useEffect(() => {
    const getNumberOfReportsEffect = async () => {
      const result = await getNumberOfReports();
      setNumberOfReports(result);
    };
    getNumberOfReportsEffect();
  }, []);

  const onExitPressed = () => {
    const {navigate} = navigation;
    navigate('ExitWithoutSavingPrompt');
  };

  const onSaveToDevicePressed = async () => {
    if (numberOfReports === DEVICE_REPORT_LIMIT) {
      Alert.alert(
        'You have saved the maximum number of reports on device',
        'Please save to cloud or exit without saving.',
        [
          {
            text: 'OK',
          },
        ],
      );
      return;
    }

    Alert.alert(
      `${DEVICE_REPORT_LIMIT - numberOfReports} saves remaining`,
      `Are you sure? Only ${DEVICE_REPORT_LIMIT} reports can be saved to the device.`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            setLoading(true);
            try {
              await saveReport(reportData);
              setLoading(false);
              // Reset personnel locations and group settings, remove all temporary personnel from state
              dispatch(resetIncident());
              dispatch(toHomeStack());
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
  };

  const onSaveToCloudPressed = async () => {
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
      const {currentUser} = auth();
      const {uid} = currentUser;
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(uid)
        .get();
      const {
        account: {subscriptionExpiration},
      } = documentSnapshot.data();
      const subscriptionExpirationDate = subscriptionExpiration?.toDate();

      if (
        !subscriptionExpirationDate ||
        Date.now() > subscriptionExpirationDate
      ) {
        Alert.alert(
          'Report upload disabled',
          'Please sign in to the Commandability web portal to check your account status.',
          [
            {
              text: 'OK',
            },
          ],
        );
      } else {
        await uploadReport(reportData);
        Alert.alert(
          'Upload completed successfully',
          'The report has been uploaded and removed from the device.',
          [
            {
              text: 'OK',
            },
          ],
        );
      }
      setLoading(false);
      // Reset personnel locations and group settings, remove all temporary personnel from state
      dispatch(resetIncident());
      dispatch(toHomeStack());
    } catch (error) {
      Alert.alert('Error', error, [
        {
          text: 'OK',
        },
      ]);
    }
  };

  const colors = themeSelector(theme);
  const globalStyles = createGlobalStyleSheet(colors);

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
        barStyle={theme === DARK ? 'light-content' : 'dark-content'}/>
      <View style={globalStyles.formContainer}>
        <BackButton />
        <View style={globalStyles.margin} />
        <View style={globalStyles.content}>
          <LargeButton
            text="Exit without saving"
            onPress={onExitPressed}
            icon="cancel"
            type="outlined"
          />
          <LargeButton
            text="Save to device and exit"
            onPress={onSaveToDevicePressed}
            icon="content-save"
            type="outlined"
          />
          <LargeButton
            text="Save to cloud and exit"
            onPress={onSaveToCloudPressed}
            icon="upload"
            type="contained"
          />
          {loading ? (
            <ActivityIndicator
              style={globalStyles.activityIndicator}
              color={colors.primary}
              size={'large'}
            />
          ) : null}
        </View>
        <View style={globalStyles.margin} />
      </View>
    </ErrorBoundary>
  );
};

SavePrompt.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default SavePrompt;
