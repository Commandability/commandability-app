import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    paddingVertical: 4,
    margin: 12,
    backgroundColor: colors.background.dark.highlight,
  },
  optionContent: {
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
