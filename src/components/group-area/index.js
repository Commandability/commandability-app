/**
 * GroupArea Component
 *
 * Manages displaying all groups in a tab.
 */

import React from 'react';
import { View } from 'react-native';
// import { connect } from 'react-redux';
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

class GroupArea extends React.PureComponent {
  render() {
    const {
      route: { key },
      addGroupMode,
      removeGroupMode,
      editGroupMode,
      groupSelectedHandler,
    } = this.props;

    return (
      <View style={styles.container}>
        {routes[key].map(id => (
          <Group
            key={id}
            locationId={id}
            addGroupMode={addGroupMode}
            removeGroupMode={removeGroupMode}
            editGroupMode={editGroupMode}
            groupSelectedHandler={groupSelectedHandler}
          />
        ))}
      </View>
    );
  }
}

// props validation
GroupArea.propTypes = {
  route: PropTypes.object,
  addGroupMode: PropTypes.bool,
  removeGroupMode: PropTypes.bool,
  editGroupMode: PropTypes.bool,
  groupSelectedHandler: PropTypes.func,
  theme: PropTypes.string,
};

export default GroupArea;

// const mapStateToProps = (state) => {
//   return {
//     theme: getTheme(state),
//   };
// };

// export default connect(
//   mapStateToProps,
//   null
// )(GroupArea);
