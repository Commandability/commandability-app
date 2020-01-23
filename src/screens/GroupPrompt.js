/**
 * GroupPrompt Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGroupByLocation } from '../reducers';
import { removeGroup, editName } from '../actions';


class GroupPrompt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newName: '',
    };
  }

  static navigationOptions = {
    title: 'Edit Group',
  }

  _onRemovePressed = () => {
    const {
      navigation: { goBack },
      removeGroup,
      group
    } = this.props;
    removeGroup(group);
    goBack();
  };

  _onEditPressed = () => {
    const {
      navigation: { goBack },
      editName,
      group,
    } = this.props;
    const { newName } = this.state || {};
    editName(group, newName);
    goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TextInput
            style={styles.buttonContainer}
            placeholder="Please enter a new group name"
            value={this.state.newName}
            onChangeText={newName => this.setState({ newName })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._onEditPressed}>
            <Text>Save name change and exit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._onRemovePressed}>
            <Text>Delete Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// props validation
GroupPrompt.propTypes = {
  logRemoveGroup: PropTypes.func,
  navigation: PropTypes.object,
  editName: PropTypes.func,
  removeGroup: PropTypes.func,
  group: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const location = ownProps.navigation.getParam('location', 'default');
  return { group: getGroupByLocation(state, location) };
};

export default connect(mapStateToProps, {
  removeGroup,
  editName,
})(GroupPrompt);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 1,
  },
});
