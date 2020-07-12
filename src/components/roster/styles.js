import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  queryInput: {
    height: 40,
    color: colors.text.primaryLight,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
  groupLayout: {
    flex: 1,
    flexDirection: 'column',
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
