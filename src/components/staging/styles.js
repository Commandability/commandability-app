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
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background.dark.highlight,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  headerContent: {
    fontSize: scaleFont(6),
    color: colors.text.light,
  },
});
