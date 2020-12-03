/**
 * Timer Component
 *
 * This component handles the Timer on the IncidentScreen
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const MS_IN_SECOND = 1000;

const Timer = ({ initialEpoch }) => {
  const theme = useSelector(state => getTheme(state));
  const [time, setTime] = useState(Date.now() - initialEpoch);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() - initialEpoch);
    }, MS_IN_SECOND);

    return () => clearInterval(interval);
  });

  const hour = ('0' + Math.floor(time / (MS_IN_SECOND * 60 * 60))).slice(-2);
  const minute = ('0' + (Math.floor(time / (MS_IN_SECOND * 60)) % 60)).slice(
    -2
  );
  const second = ('0' + (Math.floor(time / MS_IN_SECOND) % 60)).slice(-2);

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.timerContent}>{`${hour}:${minute}:${second}`}</Text>
      </View>
    </View>
  );
};

// props validation
Timer.propTypes = {
  initialEpoch: PropTypes.number,
};

export default Timer;
