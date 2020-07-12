/**
 * GroupPrompt Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from 'react';
import { Alert, TextInput, Button, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGroupByLocationId } from '../../redux/selectors';
import { setVisibility, setName } from '../../redux/actions';
import colors from '../../modules/colors';
import styles from './styles';

class GroupPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
    };
  }

  _onSave = () => {
    if (this.state.newName) {
      const {
        navigation: { goBack },
        setName,
        group,
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
        <TextInput
          style={styles.nameInput}
          autoCapitalize="none"
          placeholder="New group name"
          placeholderTextColor={colors.primary.light}
          value={this.state.newName}
          onChangeText={newName => this.setState({ newName })}
        />
        <Button
          onPress={this._onSave}
          title="Save"
          color={colors.primary.light}
        />
      </View>
    );
  }
}

// props validation
GroupPrompt.propTypes = {
  navigation: PropTypes.object,
  setName: PropTypes.func,
  setVisibility: PropTypes.func,
  group: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const locationId = ownProps.navigation.getParam('locationId', 'default');
  return { group: getGroupByLocationId(state, locationId) };
};

export default connect(
  mapStateToProps,
  {
    setVisibility,
    setName,
  }
)(GroupPrompt);