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

import { getTheme } from '../../redux/selectors';
import { toEndStack, toggleTheme } from '../../redux/actions';
import Timer from '../timer';
import { DARK, LIGHT } from '../../modules/theme-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class InfoBar extends Component {
  constructor(props) {
    super(props);
    const { theme } = this.props;
    this.state = { theme };
  }

  _onEndPressed = () => {
    const { toEndStack } = this.props;
    toEndStack();
  };

  _onToggleThemePressed = () => {
    this.setState(prevState =>
      prevState.theme === DARK ? { theme: LIGHT } : { theme: DARK }
    );
    const { toggleTheme } = this.props;
    toggleTheme();
  };

  render() {
    const { initialEpoch } = this.props;

    const colors = themeSelector(this.state.theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <Timer initialEpoch={initialEpoch} />
        <TouchableOpacity
          style={styles.option}
          onPress={this._onToggleThemePressed}
        >
          <Text style={styles.optionContent}> THEME </Text>
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
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  {
    toEndStack,
    toggleTheme,
  }
)(InfoBar);
