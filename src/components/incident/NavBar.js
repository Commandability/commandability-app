/**
 * NavBar Component
 *
 * This component handles the NavBar above the incident screen, including:
 *  - the incident timer
 *  - the edit group, remove group, and end incident buttons
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { scaleFont } from '../../modules/fonts';
import colors from '../../modules/colors';
import Timer from './Timer';

class NavBar extends Component {
  _onEndPressed = () => {
    this.props.navigation.navigate('EndScreen');
  };

  _onTogglePressed = () => {
    const { toggle } = this.props;
    if(toggle){
      console.log('true');
    }
    else {
      console.log('false');
    }
  }

  _onAddGroupPressed = () => {
    this.props.addGroupHandler();
  };

  _onRemoveGroupPressed = () => {
    this.props.removeGroupHandler();
  };

  _onEditGroupPressed = () => {
    this.props.editGroupHandler();
  };

  render() {
    const {
      initialEpoch,
      addGroupMode,
      removeGroupMode,
      editGroupMode,
    } = this.props;

    return (
      <View style={styles.navBar}>
        <Timer initialEpoch={initialEpoch} />
        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onAddGroupPressed}
            disabled={editGroupMode || removeGroupMode}
          >
            <Text style={styles.pageOptionContent}> Add Group </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onRemoveGroupPressed}
            disabled={editGroupMode || addGroupMode}
          >
            <Text style={styles.pageOptionContent}> Remove Group </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onEditGroupPressed}
            disabled={removeGroupMode || addGroupMode}
          >
            <Text style={styles.pageOptionContent}> Edit Group </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onTogglePressed}
          >
            <Text style={styles.pageOptionContent}> Toggle Group Area </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.pageOptions}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onEndPressed}
          >
            <Text style={styles.pageOptionContent}> End </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// props validation
NavBar.propTypes = {
  navigation: PropTypes.object,
  initialTime: PropTypes.number,
  report: PropTypes.object,
  toggle: PropTypes.bool,
  initialEpoch: PropTypes.number,
  addGroupHandler: PropTypes.func,
  removeGroupHandler: PropTypes.func,
  editGroupHandler: PropTypes.func,
  addGroupMode: PropTypes.bool,
  removeGroupMode: PropTypes.bool,
  editGroupMode: PropTypes.bool,
};

export default withNavigation(NavBar);

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.primary.dark,
    borderWidth: 0.5,
  },
  pageOptions: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
  },
  pageOptionContent: {
    fontSize: scaleFont(5),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.primary.text,
  },
  container: {
    flex: 1,
  },
});
