/**
 * GroupList Component
 *
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getPersonnelByLocationId, getTheme } from '../../redux/selectors';
import ListItem from '../list-item';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const GroupList = ({ locationId }) => {
  const theme = useSelector(state => getTheme(state));
  const personnel = useSelector(state =>
    getPersonnelByLocationId(state, locationId)
  );

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => {
    return <ListItem locationId={locationId} item={item} />;
  };

  // eslint-disable-next-line react/prop-types
  const keyExtractor = item => item.id;

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <FlatList
        data={personnel}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

// props validation
GroupList.propTypes = {
  locationId: PropTypes.string,
};

export default GroupList;
