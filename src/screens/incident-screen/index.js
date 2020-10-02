/**
 * IncidentScreen component
 *
 * Manages displaying the incident screen.
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import PropTypes from 'prop-types';

import { GroupOptions, GroupArea, Staging, BottomBar } from '../../components';
import { activeReport, getInitialEpoch, getTheme } from '../../redux/selectors';
import { startIncident, endIncident } from '../../redux/actions';

import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class IncidentScreen extends Component {
  constructor() {
    super();
    this.state = {
      removeGroupMode: false,
      editGroupMode: false,
      addGroupMode: false,
      index: 0,
      routes: [
        { key: 'ONE', title: 'PAGE ONE' },
        { key: 'TWO', title: 'PAGE TWO' },
        { key: 'THREE', title: 'PAGE THREE' },
      ],
    };
  }

  componentDidMount() {
    const { startIncident, activeReport } = this.props;
    // prevent start incident from wiping report when IncidentScreen is re-mounted after a crash
    if (!activeReport) {
      startIncident(this.initialEpoch);
    }
  }

  _addGroup = () => {
    this.setState(prevState => ({
      addGroupMode: !prevState.addGroupMode,
    }));
  };

  _removeGroup = () => {
    this.setState(prevState => ({
      removeGroupMode: !prevState.removeGroupMode,
    }));
  };

  _editGroup = () => {
    this.setState(prevState => ({
      editGroupMode: !prevState.editGroupMode,
    }));
  };

  _groupSelected = () => {
    this.setState(() => ({
      addGroupMode: false,
      removeGroupMode: false,
      editGroupMode: false,
    }));
  };

  _onEndIncident = () => {
    endIncident();
  };

  render() {
    const { activeReport, activeInitialEpoch, theme } = this.props;
    this.initialEpoch = Date.now();

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    const renderScene = ({ route }) => {
      return (
        <GroupArea
          route={route}
          addGroupMode={this.state.addGroupMode}
          removeGroupMode={this.state.removeGroupMode}
          editGroupMode={this.state.editGroupMode}
          groupSelectedHandler={this._groupSelected}
        />
      );
    };

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        renderLabel={({ route }) => (
          <Text style={styles.tabLabel}>{route.title}</Text>
        )}
      />
    );

    return (
      <View style={styles.container}>
        <View style={styles.mainArea}>
          <View style={styles.sideBar}>
            <Staging />
          </View>
          <View style={styles.incidentArea}>
            <GroupOptions
              initialEpoch={
                activeReport ? activeInitialEpoch : this.initialEpoch
              }
              addGroupHandler={this._addGroup}
              removeGroupHandler={this._removeGroup}
              editGroupHandler={this._editGroup}
              addGroupMode={this.state.addGroupMode}
              removeGroupMode={this.state.removeGroupMode}
              editGroupMode={this.state.editGroupMode}
            />
            <View style={styles.groupArea}>
              <TabView
                navigationState={{
                  index: this.state.index,
                  routes: this.state.routes,
                }}
                renderScene={renderScene}
                onIndexChange={index => this.setState({ index })}
                tabBarPosition="bottom"
                renderTabBar={renderTabBar}
              />
            </View>
          </View>
        </View>
        <BottomBar
          endHandler={this._onEndIncident}
          initialEpoch={activeReport ? activeInitialEpoch : this.initialEpoch}
        />
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
