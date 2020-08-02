/**
 * InfoBar Component
 *
 * 
 * This component handles the Infobar under the staging area, 
 * includes the timer, brightness and end incident
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Timer from '../timer';

class InfoBar extends Component {
  _onEndPressed = () => {
    this.props.endHandler();
  };

  _onToggleThemePressed = () => {
    //this.props.toggleTheme();
  };

  render() {
    return (
      <View style={styles.container}>
        <Timer />
        <TouchableOpacity
          style={styles.option}
          onPress={this._onToggleThemePressed}
        >
          <Text style={styles.optionContent}>{' '}DARK/LIGHT{' '}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={this._onEndPressed}
        >
          <Text style={styles.optionContent}>{' '}END INCIDENT{' '}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// props validation
InfoBar.propTypes = {
  endHandler: PropTypes.func,
};

export default InfoBar;
