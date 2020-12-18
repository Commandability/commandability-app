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
import { staticLocations } from '../../modules/locations';
import styles from './styles';

const { NEW_PERSONNEL } = staticLocations;

const NewPersonnelList = () => {
  const selectPersonnelByLocationId = useMemo(
    () => createSelectPersonnelByLocationId(NEW_PERSONNEL.locationId),
    []
  );
  const personnel = useSelector(state => selectPersonnelByLocationId(state));

  const renderItem = ({ item: { personId } }) => (
    <NewPersonnelItem personId={personId} />
  );

  const keyExtractor = item => item.personId;

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
