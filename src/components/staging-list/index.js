/**
 * StagingList Component
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the list when it is selected.
 */

import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

import { createSelectPersonnelByLocationId } from '../../redux/selectors';
import IncidentItem from '../incident-item';
import { incidentLocations } from '../../modules/locations';
import styles from './styles';

const { STAGING } = incidentLocations;

const StagingList = () => {
  const selectPersonnelByLocationId = useMemo(
    () => createSelectPersonnelByLocationId(STAGING.locationId),
    []
  );
  const personnel = useSelector(state => selectPersonnelByLocationId(state));

  const renderItem = ({ item: { id } }) => (
    <IncidentItem locationId={STAGING.locationId} id={id} />
  );

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

export default React.memo(StagingList);
