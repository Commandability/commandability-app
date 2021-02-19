/**
 * ErrorScreen component
 *
 * Manages recovering from js errors that are not asynchronous.
 */

import React, { useState } from 'react';
import { ActivityIndicator, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';

import { LargeButton } from '../../components';
import { resetIncident } from '../../redux/actions';
import { selectTheme, selectReportData } from '../../redux/selectors';
import {
  uploadReport,
  uploadReports,
  deleteAllReports,
} from '../../modules/report-manager';
import { START_INCIDENT } from '../../redux/types';
import themeSelector from '../../modules/themes';
import createGlobalStyleSheet from '../../modules/global-styles';

const ErrorFallbackScreen = ({ error, resetErrorBoundary }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const reportData = useSelector(state => selectReportData(state));

  const [loading, setLoading] = useState(false);

  const reportIsUnsaved = reportData[START_INCIDENT];

  const { currentUser } = auth();

  const colors = themeSelector(theme);
  const globalStyles = createGlobalStyleSheet(colors);

  const onEmergencyUploadPressed = async () => {
    const { isConnected } = await NetInfo.fetch();
    if (!isConnected) {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status.',
        [
          {
            text: 'OK',
          },
        ]
      );
      return;
    }

    setLoading(true);
    let uploadSuccess = false;
    try {
      await uploadReports();
      if (reportIsUnsaved) {
        reportData['EMERGENCY_UPLOAD'] = 'Emergency upload: report incomplete';
        await uploadReport(reportData);
        dispatch(resetIncident());
      }
      uploadSuccess = true;
      await deleteAllReports();

      Alert.alert(
        'Emergency upload completed successfully',
        'All saved and active reports have been uploaded and removed from the device.',
        [
          {
            text: 'OK',
          },
        ]
      );
    } catch (error) {
      if (uploadSuccess) {
        Alert.alert(
          'Error removing reports from device',
          'All reports were successfully uploaded, but were not successfully removed from the device. Clear app storage manually before next use.',
          [
            {
              text: 'OK',
            },
          ]
        );
      } else {
        Alert.alert('Emergency upload failed', error, [
          {
            text: 'OK',
          },
        ]);
      }
    }
    setLoading(false);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.prompt}>
        <Text style={globalStyles.promptHeader}>Something went wrong:</Text>
        <Text style={globalStyles.promptText}>{error.message}</Text>
      </View>
      <LargeButton
        text="Try again"
        onPress={resetErrorBoundary}
        icon="refresh"
      />
      {currentUser && (
        <LargeButton
          text="Emergency upload"
          onPress={onEmergencyUploadPressed}
          icon="upload"
        />
      )}
      {loading && (
        <ActivityIndicator
          style={globalStyles.activityIndicator}
          color={colors.primary}
          size={'large'}
        />
      )}
    </View>
  );
};

ErrorFallbackScreen.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};

export default ErrorFallbackScreen;
