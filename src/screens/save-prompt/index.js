/**
 * SavePrompt component
 *
 * Manages displaying save and exit report options after an incident.
 */

import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Platform,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

import ErrorFallback from '../error-fallback';
import { resetIncident, toHomeStack } from '../../redux/actions';
import { selectTheme } from '../../redux/selectors';
import { DEVICE_REPORT_LIMIT, getNumberOfReports, uploadReport, saveReport } from '../../modules/report-manager';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const SavePrompt = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { reportData } = route.params;
  const theme = useSelector(state => selectTheme(state));

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
    const { navigate } = navigation;
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
        ]
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
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: async () => {
            setLoading(true);
            try {
              await saveReport(reportData);
              setLoading(false);
              // reset personnel locations and group settings, remove all temporary personnel from state
              dispatch(resetIncident());
              dispatch(toHomeStack());
            } catch (error) {
              Alert.alert('Error', error, [
                {
                  text: 'OK',
                },
              ]);
            }
          }
        },
      ]
    );
  };

  const onSaveToCloudPressed = async () => {
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
    try {
      await uploadReport(reportData);
      setLoading(false);
      // reset personnel locations and group settings, remove all temporary personnel from state
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

  const onCancelPressed = () => {
    const { goBack } = navigation;
    goBack();
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  const onReset = async () => {
    setLoading(false);
    const result = await getNumberOfReports();
    setNumberOfReports(result);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={onReset}
      resetKeys={[loading, numberOfReports]}
    >
      <View style={styles.container}>
        {Platform.OS === 'android' && (
          <TouchableOpacity onPress={onCancelPressed} style={styles.backOpacity}>
            <Icon name="chevron-left" style={styles.backIcon} />
          </TouchableOpacity>
        )}
        <View>
          <TouchableOpacity style={styles.opacity} onPress={onExitPressed}>
            <Icon name="cancel" style={styles.icon} />
            <Text style={styles.opacityText}>Exit without saving</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={onSaveToDevicePressed}
          >
            <Icon name="content-save" style={styles.icon} />
            <Text style={styles.opacityText}>Save to device and exit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opacity, styles.opacityHighlight]}
            onPress={onSaveToCloudPressed}
          >
            <Icon name="upload" style={styles.icon} />
            <Text style={styles.opacityText}>Save to cloud and exit</Text>
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
    </ErrorBoundary>
  );
};

SavePrompt.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default SavePrompt;
