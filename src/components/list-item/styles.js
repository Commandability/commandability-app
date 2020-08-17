import { StyleSheet } from 'react-native';

import { scaleFont } from '../../modules/fonts';
import colors from '../../modules/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  selected: {
    backgroundColor: colors.background.dark.highlightLight,
  },
  content: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.text.gray,
    marginHorizontal: 8,
    paddingVertical: 4,
  },
  mainLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    flex: 1,
    textAlign: 'left',
    color: colors.text.light,
  },
  time: {
    flex: 1,
    textAlign: 'right',
    color: colors.text.gray,
  },
  timeWarning: {
    color: colors.primary.light,
  },
  label: {
    textAlign: 'left',
    fontSize: scaleFont(4),
    color: colors.text.gray,
  },
});
