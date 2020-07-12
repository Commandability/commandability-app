import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  groupSelect: {
    backgroundColor: `rgb(12, 12, 12)`,
    position: 'absolute',
    top: 4,
    left: 4,
    zIndex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  groupLayout: {
    height: '50%',
    width: '33%',
    flexDirection: 'column',
    padding: 4,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    width: '100%',
    backgroundColor: colors.secondary.dark,
  },
  groupHeaderContent: {
    fontSize: scaleFont(6),
    color: colors.primary.text,
  },
});
