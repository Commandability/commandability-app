import { StyleSheet } from 'react-native';

import { scaleFont } from '../../modules/fonts';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    label: {
      textAlign: 'left',
      fontSize: scaleFont(4),
      color: colors.text.disabled,
    },
  });
