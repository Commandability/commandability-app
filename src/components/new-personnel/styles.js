import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
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
  labelStyle: {
    fontSize: scaleFont(6),
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: colors.secondary.dark,
  },
  groupHeaderContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: 'center',
    color: colors.primary.text,
  },
});
