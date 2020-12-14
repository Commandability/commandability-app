/**
 * NewPersonnelList Component
 *
 * Manages displaying personnel in the new personnel list.
 */

import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { createSelectPersonnelByLocationId } from '../../redux/selectors';
import NewPersonnelItem from '../new-personnel-item';
import { NEW_PERSONNEL } from '../../modules/location-ids';
import styles from './styles';

const NewPersonnelList = () => {
  const selectPersonnelByLocationId = useMemo(() => createSelectPersonnelByLocationId(NEW_PERSONNEL), []);
  const personnel = useSelector(state =>
    selectPersonnelByLocationId(state)
  );

  const renderItem = ({ item: { id } }) => <NewPersonnelItem id={id} />;

  const keyExtractor = item => item.id;

  return (
    <FlatList
      style={styles.container}
      data={personnel}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default React.memo(NewPersonnelList);
