/**
 * EndScreen component
 *
 * Manages exiting the incident without saving.
 */

import React, { Component } from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { resetIncident, toHomeStack } from '../../redux/actions';
import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class ExitIncidentPrompt extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  _exit = () => {
    const {
      currentUser: { email },
    } = auth();
    if (this.state.email === email) {
      const { resetIncident, toHomeStack } = this.props;
      resetIncident(); // reset personnel locations and group settings, remove all temporary personnel from state
      toHomeStack();
    } else {
      Alert.alert('Error', 'Incorrect organization email.', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  _onCancelPressed = () => {
    const {
      navigation: { goBack },
    } = this.props;
    goBack();
  };

  render() {
    const {
      currentUser: { email },
    } = auth();

    const { theme } = this.props;
    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          {Platform.OS === 'android' && (
            <View style={styles.backBar}>
              <TouchableOpacity onPress={this._onCancelPressed}>
                <Icon name="chevron-left" style={styles.backButton} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.promptContainer}>
            <View style={styles.prompt}>
              <Text style={styles.promptText}>
                {`Are you absolutely sure you want to exit without saving?`}
              </Text>
              <Text style={styles.promptText}>
                Please type <Text style={styles.email}>{email}</Text> to
                confirm.
              </Text>
            </View>
            <Text style={styles.label}>Organization email *</Text>
            <TextInput
              style={styles.emailInput}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TouchableOpacity style={styles.opacity} onPress={this._exit}>
              <Text style={styles.opacityText}>Exit Without Saving</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

ExitIncidentPrompt.propTypes = {
  resetIncident: PropTypes.func,
  toHomeStack: PropTypes.func,
  theme: PropTypes.string,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  {
    resetIncident,
    toHomeStack,
  }
)(ExitIncidentPrompt);
