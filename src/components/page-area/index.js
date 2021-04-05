/**
 * PageArea Component
 *
 * This component handles the group area, including groups and group options
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import PropTypes from 'prop-types';

import { selectTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';
import GroupOptions from '../group-options';
import Page from '../page';
import { pageLocationIds } from '../../modules/locations.js';

const PageArea = ({ initialEpoch }) => {
  const theme = useSelector(state => selectTheme(state));

  const [index, setIndex] = useState(0);
  const [pageAlerts, setPageAlerts] = useState([]);
  const [routes] = useState(
    Object.keys(pageLocationIds).map(page => ({
      key: pageLocationIds[page].pageId,
      title: pageLocationIds[page].title,
    }))
  );



  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  const renderScene = ({ route }) => <Page route={route} />;

  useEffect(() => {
    let alertFlag = false;
    let tempArray = [];
    pageLocationIds.forEach(page => {
      page[2].forEach(locationId => {
        if (alertedGroups.includes(locationId)){
          alertFlag = true;
        }
      if (alertFlag){
        tempArray.push(page);
      }
      alertFlag = false;
      });
    });
    setPageAlerts(tempArray);
  }, [alertedGroups]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      renderLabel={({ route }) => (
        <Text style={pageAlerts.includes(route.key) ? styles.tabAlertLabel : styles.tabLabel}>{route.title}</Text>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <GroupOptions initialEpoch={initialEpoch} />
      <View style={styles.page}>
        <TabView
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          onIndexChange={index => setIndex(index)}
          tabBarPosition="bottom"
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

// props validation
PageArea.propTypes = {
  initialEpoch: PropTypes.number,
};

export default React.memo(PageArea);
