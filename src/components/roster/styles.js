import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  queryInput: {
    height: 40,
    color: colors.text.light,
    borderColor: colors.primary.light,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background.dark.highlight,
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
