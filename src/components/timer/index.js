/**
 * Timer Component
 *
 * This component handles the Timer on the IncidentScreen
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const MS_IN_SECOND = 1000;

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      time: 0,
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

    const { theme } = this.props;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <View style={styles.timer}>
          <Text
            style={styles.timerContent}
          >{`${hour}:${minute}:${second}`}</Text>
        </View>
      </View>
    );
  }
}

// props validation
Timer.propTypes = {
  initialEpoch: PropTypes.number,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  null
)(Timer);
