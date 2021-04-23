/**
 * PageArea Component
 *
 * Handles group options and the tab view that holds each page component
 */

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import PropTypes from 'prop-types';

import {selectTheme, selectAlertedGroups} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';
import GroupOptions from '../group-options';
import Page from '../page';
import {pageLocations} from '../../utils/locations.js';

const PageArea = () => {
  const theme = useSelector((state) => selectTheme(state));
  const alertedGroups = useSelector((state) => selectAlertedGroups(state));

  const [index, setIndex] = useState(0);
  const [alertedPages, setAlertedPages] = useState([]);
  const [routes] = useState(
    Object.keys(pageLocations).map((page) => ({
      key: pageLocations[page].pageId,
      title: pageLocations[page].name,
    })),
  );

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  const renderScene = ({route}) => <Page route={route} />;

  useEffect(() => {
    setAlertedPages([]);
    Object.keys(pageLocations).forEach((key) => {
      if (
        pageLocations[key].locationIds.some((locationId) =>
          alertedGroups.includes(locationId),
        )
      ) {
        setAlertedPages((prevPages) => [
          ...prevPages,
          pageLocations[key].pageId,
        ]);
      }
    });
  }, [alertedGroups]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      renderLabel={({route}) => (
        <Text
          style={
            alertedPages.includes(route.key)
              ? styles.tabAlertLabel
              : styles.tabLabel
          }>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <GroupOptions />
      <View style={styles.page}>
        <TabView
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          onIndexChange={(_index) => setIndex(_index)}
          tabBarPosition="bottom"
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

PageArea.propTypes = {
  initialEpoch: PropTypes.number,
};

export default React.memo(PageArea);
