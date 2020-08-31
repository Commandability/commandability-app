/**
 * GroupPrompt Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setVisibility, setName } from '../../redux/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class GroupPrompt extends Component {
  constructor(props) {
    super(props);
    const {
      route: {
        params: {
          group: { name },
        },
      },
    } = props;
    this.state = {
      newName: name,
    };
  }

  _onSave = () => {
    if (this.state.newName) {
      const {
        navigation: { goBack },
        setName,
        route: {
          params: { group },
        },
      } = this.props;
      const { newName } = this.state || {};
      setName(group, newName);
      goBack();
    } else {
      Alert.alert('Error', 'Please enter a new name.', [
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
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Group name *</Text>
        <TextInput
          style={styles.nameInput}
          autoCapitalize="none"
          value={this.state.newName}
          onChangeText={newName => this.setState({ newName })}
        />
        <TouchableOpacity style={styles.opacity} onPress={this._onSave}>
          <Icon name="check" style={styles.icon} />
          <Text style={styles.opacityText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// props validation
GroupPrompt.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  setName: PropTypes.func,
  setVisibility: PropTypes.func,
  group: PropTypes.object,
};

export default connect(
  null,
  {
    setVisibility,
    setName,
  }
)(GroupPrompt);
