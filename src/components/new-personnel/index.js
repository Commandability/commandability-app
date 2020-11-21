/**
 * New Personnel Component
 *
 * Manages displaying the new personnel.
 */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewPersonnelList from '../new-personnel-list';
import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class NewPersonnel extends Component {
  render() {
    const { theme } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerContent}> NEW PERSONNEL </Text>
        </View>
        <NewPersonnelList />
      </View>
    );
  }
}

// props validation
NewPersonnel.propTypes = {
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  null
)(NewPersonnel);
