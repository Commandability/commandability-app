import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    fontSize: scaleFont(8),
    textAlign: 'center',
    color: colors.text.light,
  },
  label: {
    color: colors.primary.light,
    marginLeft: 24,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.background.dark.main,
    padding: 24,
  },
  locationInput: {
    height: 24,
    color: colors.text.light,
    backgroundColor: colors.background.dark.highlight,
    margin: 8,
  },
  opacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.dark.highlight,
    padding: 48,
    margin: 24,
  },
  opacityText: {
    fontSize: 18,
    color: colors.text.light,
  },
  icon: {
    fontSize: 21,
    color: colors.primary.light,
    marginRight: 30,
  },
});
