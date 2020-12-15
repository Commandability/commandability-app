/**
 * IncidentScreen component
 *
 * Manages displaying the incident screen.
 */

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { GroupArea, PersonnelArea, BottomBar } from '../../components';
import {
  selectReportData,
  selectInitialEpoch,
  selectTheme,
} from '../../redux/selectors';
import { startIncident, endIncident } from '../../redux/actions';
import { START_INCIDENT, END_INCIDENT } from '../../redux/types';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const IncidentScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));
  const activeInitialEpoch = useSelector(state => selectInitialEpoch(state));
  const reportData = useSelector(state => selectReportData(state));

  const [initialEpoch] = useState(Date.now());

  const reportIsActive =
    reportData[START_INCIDENT] && !reportData[END_INCIDENT];

  useEffect(() => {
    // prevent start incident from wiping report when IncidentScreen is re-mounted after a crash
    if (!reportIsActive) {
      dispatch(startIncident(initialEpoch));
    }
  }, []);

  const onEndIncidentPressed = () => {
    dispatch(endIncident());
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <View style={styles.mainArea}>
        <View style={styles.sideBar}>
          <PersonnelArea />
        </View>
        <View style={styles.groupArea}>
          <GroupArea
            initialEpoch={reportIsActive ? activeInitialEpoch : initialEpoch}
          />
        </View>
      </View>
      <BottomBar
        endHandler={onEndIncidentPressed}
        initialEpoch={reportIsActive ? activeInitialEpoch : initialEpoch}
      />
    </View>
  );
};

export default IncidentScreen;
