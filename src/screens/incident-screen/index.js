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
  InfoBar,
} from '../../components';
import { activeReport, getInitialEpoch } from '../../redux/selectors';
import { startIncident, endIncident } from '../../redux/actions';
import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
  GROUP_SEVEN,
  GROUP_EIGHT,
  GROUP_NINE,
  GROUP_TEN,
  GROUP_ELEVEN,
  GROUP_TWELVE,
  GROUP_THIRTEEN,
  GROUP_FOURTEEN,
  GROUP_FIFTEEN,
  GROUP_SIXTEEN,
  GROUP_SEVENTEEN,
  GROUP_EIGHTEEN,
} from '../../modules/location-ids.js';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GROUP_AREA = 'GROUP_AREA';
const PERSONNEL_AREA = 'PERSONNEL_AREA';
const PAGE_ONE = 'PAGE_ONE';
const PAGE_TWO = 'PAGE_TWO';
const PAGE_THREE = 'PAGE_THREE';

class IncidentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeGroupMode: false,
      editGroupMode: false,
      addGroupMode: false,
      tab: GROUP_AREA,
      page: PAGE_ONE,
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

  _onEndIncident = () => {
    endIncident();
  };

  editGroup = () => {
    this.setState(prevState => ({
      editGroupMode: !prevState.editGroupMode,
    }));
  };

  _toggleGroupArea = () => {
    this.setState(() => ({
      tab: GROUP_AREA,
    }));
  };

  _togglePersonnelArea = () => {
    this.setState(() => ({
      tab: PERSONNEL_AREA,
    }));
  };

  groupSelected = () => {
    this.setState(() => ({
      addGroupMode: false,
      removeGroupMode: false,
      editGroupMode: false,
    }));
  };

  onPagePressed = (pageNumber) => {
    this.setState.page = pageNumber;
  }

  onNavigatePagePressed = (direction) => {
    if (direction == 'right'){
      if (this.state.page === PAGE_ONE){
        this.setState.page = PAGE_TWO;
      }
      else {
        this.setState.page = PAGE_THREE;
      }
    }
    else {
      if (this.state.page === PAGE_TWO) {
        this.setState.page = PAGE_ONE;
      }
      else {
        this.setState.page = PAGE_TWO;
      }
    }
  }

  render() {
    const { activeReport, activeInitialEpoch } = this.props;
    this.initialEpoch = Date.now();

    const pageOneIds = [
      GROUP_ONE,
      GROUP_TWO,
      GROUP_THREE,
      GROUP_FOUR,
      GROUP_FIVE,
      GROUP_SIX,
    ];

    const pageTwoIds = [
      GROUP_SEVEN,
      GROUP_EIGHT,
      GROUP_NINE,
      GROUP_TEN,
      GROUP_ELEVEN,
      GROUP_TWELVE,
    ];

    const pageThreeIds = [
      GROUP_THIRTEEN,
      GROUP_FOURTEEN,
      GROUP_FIFTEEN,
      GROUP_SIXTEEN,
      GROUP_SEVENTEEN,
      GROUP_EIGHTEEN,
    ];

    let groupIds = [];

    if (this.state.page == PAGE_ONE) {
      groupIds = pageOneIds;
    }
    if (this.state.page == PAGE_TWO) {
      groupIds = pageTwoIds;
    }
    if (this.state.page == PAGE_THREE) {
      groupIds = pageThreeIds;
    }

    return (
      <View style={styles.container}>
        <View style={styles.sideBar}>
          <Staging />
          <InfoBar
            endHandler={this._onEndIncident}
            initialEpoch={activeReport ? activeInitialEpoch : this.initialEpoch}
          />
        </View>
        <View style={styles.mainArea}>
          <View style={styles.mainAreaTabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                this.state.tab === GROUP_AREA && styles.selectedTab,
              ]}
              onPress={this._toggleGroupArea}
            >
              <Text
                style={[
                  styles.tabContent,
                  this.state.tab === GROUP_AREA && styles.selectedTabContent,
                ]}
              >
                {' '}
                GROUPS{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                this.state.tab === PERSONNEL_AREA && styles.selectedTab,
              ]}
              onPress={this._togglePersonnelArea}
            >
              <Text
                style={[
                  styles.tabContent,
                  this.state.tab === PERSONNEL_AREA &&
                    styles.selectedTabContent,
                ]}
              >
                {' '}
                PERSONNEL{' '}
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.tab === GROUP_AREA ? (
            <View style={styles.incidentArea}>
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
            <View style={styles.personnelArea}>
              <View style={styles.personnelAreaContainer}>
                <Roster />
              </View>
              <View style={styles.personnelAreaContainer}>
                <NewPersonnel />
              </View>
            </View>
          )}
          <View style={styles.pageTabContainer}>
            <TouchableOpacity style={styles.buttonContainer} disabled={this.state.page === PAGE_ONE} onPress={() => this.onNavigatePagePressed('left')}>
              <Icon name="arrow-left-thick"></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} disabled={this.state.page === PAGE_ONE} onPress={() => this.onPagePressed(PAGE_ONE)}>
              <Icon name="numeric-1"></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} disabled={this.state.page === PAGE_TWO} onPress={() => this.onPagePressed(PAGE_TWO)}>
              <Icon name="numeric-2"></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} disabled={this.state.page === PAGE_THREE} onPress={() => this.onPagePressed(PAGE_THREE)}>
              <Icon name="numeric-3"></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} disabled={this.state.page === PAGE_THREE} onPress={() => this.onNavigatePagePressed('right')}>
              <Icon name="arrow-right-thick"></Icon>
            </TouchableOpacity>

          </View>
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
