import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  overlay: {
    backgroundColor: colors.overlay.dark,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  queryInput: {
    height: 40,
    color: colors.text.light,
    borderColor: colors.primary.light,
    borderBottomWidth: 1,
    marginBottom: 16,
    marginTop: 8,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    color: colors.text.light,
    backgroundColor: colors.background.dark.highlight,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  headerContent: {
    fontSize: scaleFont(8),
    color: colors.text.light,
  },
});
