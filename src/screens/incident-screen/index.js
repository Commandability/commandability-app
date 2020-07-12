/**
 * IncidentScreen component
 *
 * Manages displaying the incident screen.
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';

import {
  OptionBar,
  Group,
  Staging,
  NewPersonnel,
  Roster,
} from '../../components';
import { activeReport, getInitialEpoch } from '../../redux/selectors';
import { startIncident } from '../../redux/actions';
import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
} from '../../modules/location-ids.js';
import styles from './styles';

class IncidentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeGroupMode: false,
      editGroupMode: false,
      addGroupMode: false,
      toggle: true,
    };
  }

  componentDidMount() {
    const { startIncident, activeReport } = this.props;
    this.props.navigation.setParams({ userEmail: auth().currentUser.email });
    // prevent start incident from wiping report when IncidentScreen is re-mounted after a crash
    if (!activeReport) {
      startIncident(this.initialEpoch);
    }
  }

  addGroup = () => {
    this.setState(prevState => ({
      addGroupMode: !prevState.addGroupMode,
    }));
  };

  removeGroup = () => {
    this.setState(prevState => ({
      removeGroupMode: !prevState.removeGroupMode,
    }));
  };

  editGroup = () => {
    this.setState(prevState => ({
      editGroupMode: !prevState.editGroupMode,
    }));
  };

  _toggleGroupArea = () => {
    this.setState(() => ({
      toggle: true,
    }));
  };

  _togglePersonnelArea = () => {
    this.setState(() => ({
      toggle: false,
    }));
  };

  groupSelected = () => {
    this.setState(() => ({
      editGroupMode: false,
    }));
  };

  render() {
    const { activeReport, activeInitialEpoch } = this.props;
    this.initialEpoch = Date.now();

    const groupIds = [
      GROUP_ONE,
      GROUP_TWO,
      GROUP_THREE,
      GROUP_FOUR,
      GROUP_FIVE,
      GROUP_SIX,
    ];

    return (
      <View style={styles.pageLayout}>
        <View style={styles.stagingArea}>
          <Staging />
        </View>
        <View style={styles.subPageLayout}>
          <View style={styles.navBar}>
            <View style={styles.pageOption}>
              <TouchableOpacity onPress={this._toggleGroupArea}>
                <Text
                  style={[
                    styles.pageOptionContent,
                    this.state.toggle
                      ? styles.toggleSelected
                      : styles.toggleDeselected,
                  ]}
                >
                  {' '}
                  Toggle Group Area{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pageOption}>
              <TouchableOpacity onPress={this._togglePersonnelArea}>
                <Text
                  style={[
                    styles.pageOptionContent,
                    !this.state.toggle
                      ? styles.toggleSelected
                      : styles.toggleDeselected,
                  ]}
                >
                  {' '}
                  Toggle Personnel Area{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.toggle ? (
            <View style={styles.groupContainer}>
              <OptionBar
                initialEpoch={
                  activeReport ? activeInitialEpoch : this.initialEpoch
                }
                addGroupHandler={this.addGroup}
                removeGroupHandler={this.removeGroup}
                editGroupHandler={this.editGroup}
                addGroupMode={this.state.addGroupMode}
                removeGroupMode={this.state.removeGroupMode}
                editGroupMode={this.state.editGroupMode}
              />
              <View style={styles.groupArea}>
                {groupIds.map(id => (
                  <Group
                    key={id}
                    locationId={id}
                    addGroupMode={this.state.addGroupMode}
                    removeGroupMode={this.state.removeGroupMode}
                    editGroupMode={this.state.editGroupMode}
                    groupSelectedHandler={this.groupSelected}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.subContainer}>
                <Roster />
              </View>
              <View style={styles.subContainer}>
                <NewPersonnel />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

IncidentScreen.propTypes = {
  activeReport: PropTypes.bool,
  startIncident: PropTypes.func,
  activeInitialEpoch: PropTypes.number,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  activeReport: activeReport(state),
  activeInitialEpoch: getInitialEpoch(state),
});

export default connect(
  mapStateToProps,
  {
    startIncident,
  }
)(IncidentScreen);
