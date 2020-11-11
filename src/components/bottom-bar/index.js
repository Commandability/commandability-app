/**
 * BottomBar Component
 *
 *
 * This component handles the info bar under the staging area,
 * includes the timer, brightness and end incident
 */

import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { personnelInGroups, getTheme } from '../../redux/selectors';
import { toEndStack, toggleTheme } from '../../redux/actions';
import Timer from '../timer';
import { DARK } from '../../modules/theme-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class BottomBar extends Component {
  _onToggleThemePressed = () => {
    const { toggleTheme } = this.props;
    toggleTheme();
  };

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
          onPress: () => {},
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

  render() {
    const { initialEpoch, theme } = this.props;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <View style={styles.timer}>
          <Timer initialEpoch={initialEpoch} />
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.option}
            onPress={this._onToggleThemePressed}
          >
            <Text style={styles.optionContent}>
              {theme === DARK ? 'LIGHT THEME' : 'DARK THEME'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={this._onEndPressed}>
            <Text style={styles.optionContent}> END </Text>
            <Icon name="arrow-right" style={styles.optionContent} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// props validation
BottomBar.propTypes = {
  navigation: PropTypes.object,
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

const ConnectWrapper = connect(
  mapStateToProps,
  {
    toEndStack,
    toggleTheme,
  }
)(BottomBar);

// Wrap and export
export default function NavigationWrapper(props) {
  const navigation = useNavigation();

  return <ConnectWrapper {...props} navigation={navigation} />;
}
