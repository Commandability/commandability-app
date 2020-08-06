import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  headerContent: {
    fontSize: scaleFont(6),
    textAlign: 'center',
    color: colors.text.light,
  },
  label: {
    color: colors.primary.light,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.background.dark.main,
  },
  input: {
    height: 48,
    color: colors.text.light,
    backgroundColor: colors.background.dark.highlight,
    marginVertical: 8,
  },
  opacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.dark.highlight,
    paddingVertical: 22,
    marginVertical: 22,
  },
  opacityText: {
    fontSize: 16,
    color: colors.text.light,
  },
  icon: {
    fontSize: 21,
    color: colors.primary.light,
    marginRight: 30,
  },
});
