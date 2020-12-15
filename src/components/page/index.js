/**
 * Page Component
 *
 * Manages displaying all groups in a tab.
 */

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  GROUP_ONE,
  GROUP_TWO,
  GROUP_THREE,
  GROUP_FOUR,
  GROUP_FIVE,
  GROUP_SIX,
  GROUP_SEVEN,
  GROUP_EIGHT,
  GROUP_NINE,
  GROUP_TEN,
  GROUP_ELEVEN,
  GROUP_TWELVE,
  GROUP_THIRTEEN,
  GROUP_FOURTEEN,
  GROUP_FIFTEEN,
  GROUP_SIXTEEN,
  GROUP_SEVENTEEN,
  GROUP_EIGHTEEN,
} from '../../modules/location-ids.js';
import Group from '../group';
import styles from './styles';

const routes = {
  ONE: [GROUP_ONE, GROUP_TWO, GROUP_THREE, GROUP_FOUR, GROUP_FIVE, GROUP_SIX],
  TWO: [
    GROUP_SEVEN,
    GROUP_EIGHT,
    GROUP_NINE,
    GROUP_TEN,
    GROUP_ELEVEN,
    GROUP_TWELVE,
  ],
  THREE: [
    GROUP_THIRTEEN,
    GROUP_FOURTEEN,
    GROUP_FIFTEEN,
    GROUP_SIXTEEN,
    GROUP_SEVENTEEN,
    GROUP_EIGHTEEN,
  ],
};

const Page = ({
  route: { key },
  groupMode,
  setGroupModeHandler,
}) => {
  return (
    <View style={styles.container}>
      {routes[key].map(id => (
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
