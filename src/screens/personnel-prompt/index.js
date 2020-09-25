/**
 * PersonnelPrompt Component
 *
 * Provides functionality for moving personnel to the current incident screen.
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Roster, NewPersonnel } from '../../components';
import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class PersonnelPrompt extends Component {
  render() {
    const { theme } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Roster />
        </View>
        <View style={styles.section}>
          <NewPersonnel />
        </View>
      </View>
    );
  }
}

// props validation
PersonnelPrompt.propTypes = {
  navigation: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  null
)(PersonnelPrompt);
