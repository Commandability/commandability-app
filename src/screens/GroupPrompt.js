/**
 * GroupPrompt Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from 'react';
import {
  TextInput,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGroupByLocationId } from '../reducers';
import { setVisibility, setName } from '../actions';
import colors from '../modules/colors';

class GroupPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
    };
  }

  static navigationOptions = {
    title: 'Edit Group',
  };

  _onSave = () => {
    const {
      navigation: { goBack },
      setName,
      group,
    } = this.props;
    const { newName } = this.state || {};
    setName(group, newName);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
  nameInput: {
    height: 40,
    color: colors.text.primaryLight,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
});
