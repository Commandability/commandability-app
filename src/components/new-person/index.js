/**
 * NewPerson Component
 *
 * Manages adding a new person to the new personnel component.
 */

import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { getTheme } from '../../redux/selectors';
import { addPerson } from '../../redux/actions';
import { NEW_PERSONNEL } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      badge: '',
      organization: '',
    };
  }

  _onAddPersonPressed = () => {
    const { addPerson, navigation: { navigate } } = this.props;
    const person = {
      badge: this.state.badge,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      organization: this.state.organization,
    };
    this.setState({ firstName: '', lastName: '', badge: '', organization: '' });

    addPerson(person, NEW_PERSONNEL);

    navigate('PersonnelPrompt');
  };

  render() {
    const { theme } = this.props;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>First Name*</Text>
          <TextInput
            style={styles.input}
            maxLength={36}
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
          <Text style={styles.label}>Last Name*</Text>
          <TextInput
            style={styles.input}
            maxLength={36}
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />
          <Text style={styles.label}>Badge Number</Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            maxLength={10}
            value={this.state.badge}
            onChangeText={badge => this.setState({ badge })}
          />
          <Text style={styles.label}>Organization</Text>
          <TextInput
            style={styles.input}
            maxLength={36}
            value={this.state.organization}
            onChangeText={organization => this.setState({ organization })}
          />
          <TouchableOpacity
            style={styles.opacity}
            onPress={this._onAddPersonPressed}
            disabled={this.state.firstName === '' || this.state.lastName === ''}
          >
            <Icon name="account-plus" style={styles.icon} />
            <Text style={styles.opacityText}> Add Person </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

NewPerson.propTypes = {
  addPerson: PropTypes.func,
  theme: PropTypes.string,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

const ConnectWrapper = connect(
  mapStateToProps,
  {
    addPerson,
  }
)(NewPerson);

// Wrap and export
export default function NavigationWrapper(props) {
  const navigation = useNavigation();

  return <ConnectWrapper {...props} navigation={navigation} />;
}
