/**
 * GroupPrompt Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from "react";
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getGroupByLocation } from "../reducers";

import { removeGroup, editName } from "../actions";

class GroupPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  static navigationOptions = {
    title: "Edit Group"
  };

  _onRemovePressed = () => {
    const { navigation, removeGroup, local } = this.props;
    const { goBack } = navigation;
    removeGroup({ location: local });
    goBack();
  };

  _onEditPressed = () => {
    const { navigation, editName, local } = this.props;
    const { text } = this.state || {};
    const { goBack } = navigation;
    editName({ location: local, name: text });
    goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TextInput
            style={styles.buttonContainer}
            placeholder="Please enter a new group name"
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
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
  local: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const local = ownProps.navigation.getParam("local", "default");
  const { name, visibility } = getGroupByLocation(state, local);
  return {
    groupName: name,
    visibility,
    local
  };
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 1,
  },

});

export default connect(
  mapStateToProps,
  {
    removeGroup,
    editName
  }
)(GroupPrompt);
