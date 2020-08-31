/**
 * InfoBar Component
 *
 *
 * This component handles the Infobar under the staging area,
 * includes the timer, brightness and end incident
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toEndStack } from '../../redux/actions';
import styles from './styles';
import Timer from '../timer';

class InfoBar extends Component {
  _onEndPressed = () => {
    const { toEndStack } = this.props;
    toEndStack();
  };

  _onToggleThemePressed = () => {
    //this.props.toggleTheme();
  };

  render() {
    const { initialEpoch } = this.props;
    return (
      <View style={styles.container}>
        <Timer initialEpoch={initialEpoch} />
        <TouchableOpacity
          style={styles.option}
          onPress={this._onToggleThemePressed}
        >
          <Text style={styles.optionContent}> LIGHT </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={this._onEndPressed}>
          <Text style={styles.optionContent}> END </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// props validation
InfoBar.propTypes = {
  endHandler: PropTypes.func,
  initialEpoch: PropTypes.number,
  toEndStack: PropTypes.func,
};

export default connect(
  null,
  {
    toEndStack,
  }
)(InfoBar);
