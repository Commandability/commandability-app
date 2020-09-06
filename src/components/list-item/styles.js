import { StyleSheet } from 'react-native';

import { scaleFont } from '../../modules/fonts';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    selected: {
      backgroundColor: colors.background.three,
    },
    content: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.text.disabled,
      marginHorizontal: 8,
      paddingVertical: 4,
    },
    mainLine: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    line: {
      flex: 1,
      flexDirection: 'row',
    },
    name: {
      flex: 1,
      textAlign: 'left',
      color: colors.text.main,
    },
    time: {
      flex: 1,
      textAlign: 'right',
      color: colors.text.disabled,
    },
    timeWarning: {
      color: colors.primary,
    },
    badge: {
      textAlign: 'left',
      fontSize: scaleFont(4),
      color: colors.text.disabled,
    },
    shift: {
      textAlign: 'left',
      fontSize: scaleFont(4),
      color: colors.text.disabled,
    },
  });
