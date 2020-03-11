/**
 * Group Component
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
import { getGroupByLocationId } from '../../reducers';
import { setVisibility } from '../../actions';

class Group extends Component {
  constructor() {
    super();
  }

  _onAddPressed = () => {
    const { setVisibility, group } = this.props;
    setVisibility(group, true);
  };

  _onSettingsPressed = () => {
    const {
      navigation: { navigate },
      group: { locationId },
    } = this.props;
    navigate('GroupPrompt', { locationId });
  };

  render() {
    const {
      group: { name, visibility, locationId },
    } = this.props;
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
          <GroupList locationId={locationId} />
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
  setVisibility: PropTypes.func,
  navigation: PropTypes.object,
  group: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { locationId } = ownProps;
  return { group: getGroupByLocationId(state, locationId) };
};

export default withNavigation(
  connect(mapStateToProps, {
    setVisibility,
  })(Group)
);

const styles = StyleSheet.create({
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
