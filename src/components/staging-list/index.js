/**
 * StagingList Component
 *
 * Displays all personnel in the staging list
 */

import React, {useMemo} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {createSelectPersonnelByLocationId} from '../../redux/selectors';
import IncidentItem from '../incident-item';
import {staticLocations} from '../../utils/locations';

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
    <FlatList
      data={personnel}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default React.memo(StagingList);
