/**
 * ErrorScreen component
 *
 * Manages recovering from js errors that are not asynchronous.
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';

import { resetIncident } from '../../redux/actions';
import { selectTheme, selectReportData } from '../../redux/selectors';
import {
  uploadReport,
  uploadReports,
  deleteAllReports,
} from '../../modules/report-manager';
import { START_INCIDENT } from '../../redux/types';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const ErrorFallbackScreen = ({ error, resetErrorBoundary }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const reportData = useSelector(state => selectReportData(state));

  const [loading, setLoading] = useState(false);

  const reportIsUnsaved = reportData[START_INCIDENT];

  const { currentUser } = auth();

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

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
    <View style={styles.container}>
      <View style={styles.prompt}>
        <Text style={styles.promptHeader}>Something went wrong:</Text>
        <Text style={styles.promptText}>{error.message}</Text>
      </View>
      <TouchableOpacity style={styles.opacity} onPress={resetErrorBoundary}>
        <Icon name="refresh" style={styles.icon} />
        <Text style={styles.opacityText}>Try again</Text>
      </TouchableOpacity>
      {currentUser && (
        <TouchableOpacity
          style={styles.opacity}
          onPress={onEmergencyUploadPressed}
        >
          <Icon name="upload" style={styles.icon} />
          <Text style={styles.opacityText}>Emergency upload</Text>
        </TouchableOpacity>
      )}
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

ErrorFallbackScreen.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};

export default ErrorFallbackScreen;
