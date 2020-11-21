/**
 * PersonnelArea Component
 *
 * This component handles the personnel area, including the staging list, add personnel button, and remove personnel area
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';
import { Staging, RemovePersonnel } from '..';

class PersonnelArea extends Component {
  _onAddPersonnelPressed = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('PersonnelPrompt');
  };

  render() {
    const { theme } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.option}
          onPress={this._onAddPersonnelPressed}
        >
          <Text style={styles.optionContent} >ADD PERSONNEL</Text>
          <Icon name="arrow-right" style={styles.optionContent} />
        </TouchableOpacity>
        <Staging />
        <RemovePersonnel />
      </View>
    );
  }
}

// props validation
PersonnelArea.propTypes = {
  navigation: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

const ConnectWrapper = connect(
  mapStateToProps,
  null
)(PersonnelArea);

// Wrap and export
export default function NavigationWrapper(props) {
  const navigation = useNavigation();

  return <ConnectWrapper {...props} navigation={navigation} />;
}
