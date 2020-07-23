import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  OptionBar: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.background.dark.highlight,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageOption: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pageOptionContent: {
    fontSize: scaleFont(5),
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.text.light,
  },
  selected: {
    color: colors.primary.light,
  },
  deselected: {
    color: colors.text.light,
  },
});
