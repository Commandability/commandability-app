import { StyleSheet } from 'react-native';

import { scaleFont } from '../../modules/fonts';

export default colors =>
  StyleSheet.create({
    container: {
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
      color: colors.text.main,
    },
  });
