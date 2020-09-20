/**
 * InfoBar Component
 *
 *
 * This component handles the info bar under the staging area,
 * includes the timer, brightness and end incident
 */

import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { personnelInGroups, getTheme } from '../../redux/selectors';
import { toEndStack, toggleTheme } from '../../redux/actions';
import Timer from '../timer';
import { DARK } from '../../modules/theme-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class InfoBar extends Component {
  _onEndPressed = () => {
    const { personnelInGroups } = this.props;

    if (personnelInGroups) {
      Alert.alert(
        'Personnel are still active',
        'Please move all personnel to staging before ending the incident.',
        [
          {
            text: 'OK',
          },
        ]
      );
    } else {
      Alert.alert('Are you sure you want to end the incident?', '', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK',
          onPress: () => {
            const { toEndStack } = this.props;
            toEndStack();
          },
        },
      ]);
    }
  };

  _onToggleThemePressed = () => {
    const { toggleTheme } = this.props;
    toggleTheme();
  };

  render() {
    const { initialEpoch, theme } = this.props;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <Timer initialEpoch={initialEpoch} />
        <TouchableOpacity
          style={styles.option}
          onPress={this._onToggleThemePressed}
        >
          <Text style={styles.optionContent}>
            {theme === DARK ? 'LIGHT' : 'DARK'}
          </Text>
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
  toggleTheme: PropTypes.func,
  theme: PropTypes.string,
  personnelInGroups: PropTypes.bool,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
  personnelInGroups: personnelInGroups(state),
});

export default connect(
  mapStateToProps,
  {
    toEndStack,
    toggleTheme,
  }
)(InfoBar);
