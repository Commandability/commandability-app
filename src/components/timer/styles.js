import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  timerLayout: {
    flexDirection: 'column',
    flex: 1,
  },
  timer: {
    flex: 1,
    justifyContent: 'center',
  },
  timerContent: {
    fontSize: scaleFont(5),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.text.light,
  },
});
