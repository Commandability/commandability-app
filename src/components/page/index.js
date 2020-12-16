/**
 * Page Component
 *
 * Manages displaying all groups in a tab.
 */

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { pageLocationIds } from '../../modules/locations.js';
import Group from '../group';
import styles from './styles';

const Page = ({ route: { key }, groupMode, setGroupModeHandler }) => {
  return (
    <View style={styles.container}>
      {pageLocationIds[key].locationIds.map(id => (
        <Group
          key={id}
          locationId={id}
          groupMode={groupMode}
          setGroupModeHandler={setGroupModeHandler}
        />
      ))}
    </View>
  );
};

// props validation
Page.propTypes = {
  route: PropTypes.object,
  setGroupModeHandler: PropTypes.func,
  groupMode: PropTypes.string,
};

export default Page;
