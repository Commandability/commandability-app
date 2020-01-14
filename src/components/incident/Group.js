/**
 * Group Component
 *
 * props:
 *  - location: the current group's data location
 *
 * This component displays each of the six main groups, each group's relevant data
 * list and handles visibility control of groups
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';
import GroupList from './GroupList';
import { getGroupByLocation } from '../../reducers';
import { addGroup } from '../../actions';

class Group extends Component {
  constructor() {
    super();
  }

  _onAddPressed = () => {
    const { addGroup, group } = this.props;
    addGroup(group);
  };

  _onSettingsPressed = () => {
    const {
      navigation: { navigate },
      group: { location },
    } = this.props;
    navigate('GroupPrompt', { location });
  };

  render() {
    const { group: {name, visibility, location} } = this.props;
    if (visibility) {
      return (
        <View style={styles.groupLayout}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupHeaderContent}> {name} </Text>
            <TouchableOpacity
              style={styles.container}
              onPress={this._onSettingsPressed}
            >
              <Image
                style={styles.settingsIcon}
                source={require('../../assets/settings_icon.png')}
              ></Image>
            </TouchableOpacity>
          </View>
          <GroupList location={location} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.container}
            onPress={this._onAddPressed}
          >
            <Image
              style={styles.addButton}
              source={require('../../assets/add.png')}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

// props validation
Group.propTypes = {
  addGroup: PropTypes.func,
  navigation: PropTypes.object,
  group: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  return { group: getGroupByLocation(state, location) };
};

export default withNavigation(
  connect(mapStateToProps, {
    addGroup,
  })(Group)
);

var styles = StyleSheet.create({
  groupLayout: {
    flex: 1,
    flexDirection: 'column',
    padding: 4,
  },
  groupHeader: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: colors.secondary.dark,
  },
  groupHeaderContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: 'center',
    color: colors.primary.text,
  },
  settingsIcon: {
    flex: 1,
    padding: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});
