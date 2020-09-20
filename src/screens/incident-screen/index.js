/**
 * IncidentScreen component
 *
 * Manages displaying the incident screen.
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  OptionBar,
  Group,
  Staging,
  NewPersonnel,
  Roster,
  InfoBar,
} from '../../components';
import { activeReport, getInitialEpoch, getTheme } from '../../redux/selectors';
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
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const GROUP_AREA = 'GROUP_AREA';
const PERSONNEL_AREA = 'PERSONNEL_AREA';
const PAGE_ONE = 'PAGE_ONE';
const PAGE_TWO = 'PAGE_TWO';
const PAGE_THREE = 'PAGE_THREE';

const pages = {
  PAGE_ONE: [
    GROUP_ONE,
    GROUP_TWO,
    GROUP_THREE,
    GROUP_FOUR,
    GROUP_FIVE,
    GROUP_SIX,
  ],
  PAGE_TWO: [
    GROUP_SEVEN,
    GROUP_EIGHT,
    GROUP_NINE,
    GROUP_TEN,
    GROUP_ELEVEN,
    GROUP_TWELVE,
  ],
  PAGE_THREE: [
    GROUP_THIRTEEN,
    GROUP_FOURTEEN,
    GROUP_FIFTEEN,
    GROUP_SIXTEEN,
    GROUP_SEVENTEEN,
    GROUP_EIGHTEEN,
  ],
};

class IncidentScreen extends Component {
  constructor() {
    super();
    this.state = {
      removeGroupMode: false,
      editGroupMode: false,
      addGroupMode: false,
      tab: GROUP_AREA,
      page: PAGE_ONE,
      groupIds: [],
    };
  }

  componentDidMount() {
    const { startIncident, activeReport } = this.props;
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

  onPagePressed = pageNumber => {
    console.log(this.state.page);
    console.log(pageNumber);
    this.setState({ page: pageNumber });
    console.log(this.state.page);
  };

  render() {
    console.log(pages[this.state.page]);
    const { activeReport, activeInitialEpoch, theme } = this.props;
    this.initialEpoch = Date.now();

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

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
                {pages[this.state.page].map(id => (
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
            <TouchableOpacity
              style={styles.buttonContainer}
              disabled={this.state.page === PAGE_ONE}
              onPress={() => this.onPagePressed(PAGE_ONE)}
            >
              <Text
                style={
                  this.state.page === PAGE_ONE
                    ? styles.icon
                    : styles.iconSelected
                }
              >
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              disabled={this.state.page === PAGE_TWO}
              onPress={() => this.onPagePressed(PAGE_TWO)}
            >
              <Text
                style={
                  this.state.page === PAGE_TWO
                    ? styles.icon
                    : styles.iconSelected
                }
              >
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              disabled={this.state.page === PAGE_THREE}
              onPress={() => this.onPagePressed(PAGE_THREE)}
            >
              <Text
                style={
                  this.state.page === PAGE_THREE
                    ? styles.icon
                    : styles.iconSelected
                }
              >
                3
              </Text>
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
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  activeReport: activeReport(state),
  activeInitialEpoch: getInitialEpoch(state),
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  {
    startIncident,
  }
)(IncidentScreen);
