/**
 * AddPersonPrompt Component
 *
 * Provides functionality for adding temporary personnel to the incident.
 */

import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NewPerson } from '../../components';
import { setPersonLocationId, addPerson } from '../../redux/actions';
import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class AddPersonPrompt extends Component {
  render() {
    const { theme } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
        <View style={styles.container}>
            <NewPerson />
        </View>
    );
  }
}

// props validation
AddPersonPrompt.propTypes = {
  navigation: PropTypes.object,
  personnel: PropTypes.array,
  setPersonLocationId: PropTypes.func,
  theme: PropTypes.string,
  addPerson: PropTypes.func,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

const ConnectWrapper = connect(
  mapStateToProps,
  {
    setPersonLocationId,
    addPerson,
  }
)(AddPersonPrompt);

// Wrap and export
export default function NavigationWrapper(props) {
  const navigation = useNavigation();

  return <ConnectWrapper {...props} navigation={navigation} />;
}
