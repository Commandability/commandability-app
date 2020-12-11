/**
 * StagingList Component
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the list when it is selected.
 */

import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { createSelectPersonnelByStaticLocationId } from '../../redux/selectors';
import ListItem from '../list-item';
import { STAGING } from '../../modules/location-ids';
import styles from './styles';

const StagingList = () => {
  const selectPersonnelByLocationId = useMemo(() => createSelectPersonnelByStaticLocationId(STAGING), []);
  const personnel = useSelector(state =>
    selectPersonnelByLocationId(state)
  );
  const renderItem = ({ item }) => {
    return <ListItem locationId={STAGING} item={item} />;
  };

  renderItem.propTypes = {
    item: PropTypes.object,
  };

  const keyExtractor = item => item.id;

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

export default StagingList;
