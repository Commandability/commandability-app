import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';

export default StyleSheet.create({
  selectedItem: {
    color: colors.text.secondaryLight,
  },
  unselectedItem: {
    color: colors.text.primaryLight,
  },
});
