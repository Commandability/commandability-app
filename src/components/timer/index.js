/**
 * Timer Component
 *
 * Handles the main incident timer
 */

import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';

import {selectTheme, selectInitialEpoch} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

const Timer = () => {
  const theme = useSelector((state) => selectTheme(state));
  const initialEpoch = useSelector((state) => selectInitialEpoch(state));
  const [time, setTime] = useState(Date.now() - initialEpoch);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() - initialEpoch);
    }, MILLISECONDS_IN_SECOND);

    return () => clearInterval(interval);
  }, [initialEpoch]);

  const hour = (
    '0' +
    Math.floor(
      time / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR),
    )
  ).slice(-2);
  const minute = (
    '0' +
    (Math.floor(time / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE)) %
      SECONDS_IN_MINUTE)
  ).slice(-2);
  const second = (
    '0' +
    (Math.floor(time / MILLISECONDS_IN_SECOND) % SECONDS_IN_MINUTE)
  ).slice(-2);

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

export default Timer;
