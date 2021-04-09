/**
 * StagingList Component
 *
 * Manages displaying personnel in the staging list, as well as  adding selected personnel to
 * the list when it is selected.
 */

import React, {useMemo} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';

import {createSelectPersonnelByLocationId} from '../../redux/selectors';
import IncidentItem from '../incident-item';
import {staticLocations} from '../../utils/locations';
import styles from './styles';

const {STAGING} = staticLocations;

const StagingList = () => {
  const selectPersonnelByLocationId = useMemo(
    () => createSelectPersonnelByLocationId(STAGING.locationId),
    [],
  );
  const personnel = useSelector((state) => selectPersonnelByLocationId(state));

  const renderItem = ({item: {personId}}) => (
    <IncidentItem locationId={STAGING.locationId} personId={personId} />
  );

  const keyExtractor = (item) => item.personId;

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
