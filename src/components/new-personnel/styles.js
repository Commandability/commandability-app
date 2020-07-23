import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background.dark.highlight,
  },
  firstNameStyle: {
    flex: 1,
  },
  lastNameStyle: {
    flex: 1,
  },
  badgeNumberStyle: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 0.5,
  },
  buttonContent: {
    color: colors.text.light,
  },
  labelStyle: {
    fontSize: scaleFont(6),
    flex: 1,
    color: colors.text.light,
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: colors.background.dark.highlight,
  },
  headerContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: 'center',
    color: colors.text.light,
  },
});
