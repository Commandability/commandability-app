/**
 * IncidentScreen component
 *
 * Manages displaying the incident screen.
 */

import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';

import {
  OptionBar,
  Group,
  Staging,
  NewPersonnel,
  Roster,
} from '../components/incident';
import colors from '../modules/colors';
import { activeReport, getInitialEpoch } from '../reducers';
import { startIncident } from '../actions';
import { scaleFont } from '../modules/fonts';
import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
} from '../modules/locationIds.js';

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
                <Text style={styles.pageOptionContent}> Toggle Group Area </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pageOption}>
              <TouchableOpacity onPress={this._togglePersonnelArea}>
                <Text style={styles.pageOptionContent}> Toggle Personnel Area </Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.toggle ? (
            <View style={styles.groupContainer}>
              <OptionBar
                initialEpoch={activeReport ? activeInitialEpoch : this.initialEpoch}
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

const styles = StyleSheet.create({
  pageLayout: {
    flexDirection: 'row',
    flex: 10,
  },
  subPageLayout: {
    flexDirection: 'column',
    flex: 4,
  },
  navBar: {
    flexDirection: 'row',
    flex: 2,
    backgroundColor: colors.primary.dark,
  },
  stagingArea: {
    flexDirection: 'column',
    flex: 1,
  },
  groupArea: {
    flexDirection: 'column',
    flex: 9,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: colors.primary.dark,
  },
  container: {
    flex: 13,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
  },
  groupContainer: {
    flexDirection: 'column',
    flex: 13,
  },
  pageOption: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pageOptionContent: {
    fontSize: scaleFont(5),
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.primary.text,
  },
});
