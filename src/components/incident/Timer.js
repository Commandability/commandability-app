/**
 * Timer Component
 *
 * This component handles the Timer on the IncidentScreen
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { scaleFont } from '../../modules/fonts';
import colors from '../../modules/colors';

const MS_IN_SECOND = 1000;

class Timer extends Component {
  constructor(props) {
    super(props);

    const { initialEpoch } = this.props;
    this.state = {
      time: Date.now() - initialEpoch,
    };
  }

  componentWillUnmount() {
    clearInterval(this.intervalID); // clear timers to prevent memory leaks
  }

  componentDidMount() {
    const { initialEpoch } = this.props;
    this.intervalID = setInterval(
      () =>
        this.setState(() => {
          return {
            time: Date.now() - initialEpoch,
          };
        }),
      MS_IN_SECOND
    );
  }

  render() {
    const hour = (
      '0' + Math.floor(this.state.time / (MS_IN_SECOND * 60 * 60))
    ).slice(-2);
    const minute = (
      '0' +
      (Math.floor(this.state.time / (MS_IN_SECOND * 60)) % 60)
    ).slice(-2);
    const second = (
      '0' +
      (Math.floor(this.state.time / MS_IN_SECOND) % 60)
    ).slice(-2);

    return (
      <View style={styles.timerLayout}>
        <View style={styles.timer}>
          <Text
            style={styles.timerContent}
          >{`Elapsed: ${hour}:${minute}:${second}`}</Text>
        </View>
      </View>
    );
  }
}

// props validation
Timer.propTypes = {
  initialEpoch: PropTypes.number,
};

export default Timer;

const styles = StyleSheet.create({
  timerLayout: {
    flexDirection: 'column',
    flex: 1,
  },
  timer: {
    flex: 1,
    justifyContent: 'center',
  },
  timerContent: {
    fontSize: scaleFont(5),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.primary.text,
  },
});