import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  queryInput: {
    height: 40,
    color: colors.text.light,
    borderColor: colors.primary.light,
    borderBottomWidth: 1,
    marginBottom: 8,
    marginTop: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    color: colors.text.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    fontSize: scaleFont(6),
    color: colors.text.light,
  },
});
