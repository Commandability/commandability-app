/**
 * SaveReportPrompt component
 *
 * Manages displaying save and exit report options after an incident.
 */

import React, { useState } from 'react';
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
import PropTypes from 'prop-types';

import { resetIncident, toHomeStack } from '../../redux/actions';
import { selectTheme } from '../../redux/selectors';
import { uploadReport, saveReport } from '../../modules/report-manager';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const SaveReportPrompt = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { reportData } = route.params;
  const theme = useSelector(state => selectTheme(state));

  const [loading, setLoading] = useState(false);

  const onExitPressed = () => {
    const { navigate } = navigation;
    navigate('ExitIncidentPrompt');
  };

  const onSaveToDevicePressed = async () => {
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
  };

  const onSaveToCloudPressed = async () => {
    const { isConnected } = await NetInfo.fetch();
    if (!isConnected) {
      Alert.alert(
        'Failed to connect to the network',
        'Please check your network connection status',
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

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && (
        <View style={styles.backBar}>
          <TouchableOpacity onPress={onCancelPressed}>
            <Icon name="chevron-left" style={styles.backButton} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.promptContainer}>
        <TouchableOpacity style={styles.opacity} onPress={onExitPressed}>
          <Icon name="cancel" style={styles.icon} />
          <Text style={styles.opacityText}>Exit without saving</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opacity}
          onPress={onSaveToDevicePressed}
        >
          <Icon name="upload" style={styles.icon} />
          <Text style={styles.opacityText}>Save to device</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.opacity, styles.opacityHighlight]}
          onPress={onSaveToCloudPressed}
        >
          <Icon name="content-save" style={styles.icon} />
          <Text style={styles.opacityText}>Save to cloud</Text>
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

SaveReportPrompt.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default SaveReportPrompt;
