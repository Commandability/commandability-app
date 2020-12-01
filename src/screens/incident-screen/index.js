/**
 * IncidentScreen component
 *
 * Manages displaying the incident screen.
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';

import {
  GroupOptions,
  GroupArea,
  BottomBar,
  PersonnelArea,
} from '../../components';
import { activeReport, getInitialEpoch, getTheme } from '../../redux/selectors';
import { startIncident, endIncident } from '../../redux/actions';

import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const IncidentScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => getTheme(state));
  const activeInitialEpoch = useSelector(state => getInitialEpoch(state));
  const _activeReport = useSelector(state => activeReport(state));

  const [removeGroupMode, setRemoveGroupMode] = useState(false);
  const [editGroupMode, setEditGroupMode] = useState(false);
  const [addGroupMode, setAddGroupMode] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ONE', title: 'PAGE ONE' },
    { key: 'TWO', title: 'PAGE TWO' },
    { key: 'THREE', title: 'PAGE THREE' },
  ]);
  const [initialEpoch] = useState(Date.now());

  useEffect(() => {
    // prevent start incident from wiping report when IncidentScreen is re-mounted after a crash
    if (!_activeReport) {
      dispatch(startIncident(initialEpoch));
    }
  }, []);

  const addGroup = () => {
    setAddGroupMode(prevAddGroupMode => !prevAddGroupMode);
    setRemoveGroupMode(false);
    setEditGroupMode(false);
  };

  const removeGroup = () => {
    setAddGroupMode(false);
    setRemoveGroupMode(prevRemoveGroupMode => !prevRemoveGroupMode);
    setEditGroupMode(false);
  };

  const editGroup = () => {
    setAddGroupMode(false);
    setRemoveGroupMode(false);
    setEditGroupMode(prevEditGroupMode => !prevEditGroupMode);
  };

  const groupSelected = () => {
    setAddGroupMode(false);
    setRemoveGroupMode(false);
    setEditGroupMode(false);
  };

  const onEndIncidentPressed = () => {
    dispatch(endIncident());
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  const renderScene = ({ route }) => (
    <GroupArea
      route={route}
      addGroupMode={addGroupMode}
      removeGroupMode={removeGroupMode}
      editGroupMode={editGroupMode}
      groupSelectedHandler={groupSelected}
    />
  );

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
          <PersonnelArea />
        </View>
        <View style={styles.incidentArea}>
          <GroupOptions
            initialEpoch={_activeReport ? activeInitialEpoch : initialEpoch}
            addGroupHandler={addGroup}
            removeGroupHandler={removeGroup}
            editGroupHandler={editGroup}
            addGroupMode={addGroupMode}
            removeGroupMode={removeGroupMode}
            editGroupMode={editGroupMode}
          />
          <View style={styles.groupArea}>
            <TabView
              navigationState={{
                index: index,
                routes,
              }}
              renderScene={renderScene}
              onIndexChange={index => setIndex(index)}
              tabBarPosition="bottom"
              renderTabBar={renderTabBar}
            />
          </View>
        </View>
      </View>
      <BottomBar
        endHandler={onEndIncidentPressed}
        initialEpoch={_activeReport ? activeInitialEpoch : initialEpoch}
      />
    </View>
  );
};

export default IncidentScreen;
