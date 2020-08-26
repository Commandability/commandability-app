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
    paddingVertical: 2,
    margin: 12,
    backgroundColor: colors.background.dark.highlight,
    flex: 1,
  },
  optionContent: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.text.light,
  },
});
