/**
 * GroupList Component
 *
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  selectTheme,
  createSelectPersonnelByLocationId,
} from '../../redux/selectors';
import IncidentItem from '../incident-item';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const GroupList = ({ locationId }) => {
  const theme = useSelector(state => selectTheme(state));
  const selectPersonnelByLocationId = useMemo(
    createSelectPersonnelByLocationId,
    []
  );
  const personnel = useSelector(state =>
    selectPersonnelByLocationId(state, locationId)
  );

  const renderItem = ({ item: { personId } }) => (
    <IncidentItem personId={personId} />
  );

  const keyExtractor = item => item.personId;

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

export default React.memo(GroupList);
