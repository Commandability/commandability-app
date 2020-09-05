import { StyleSheet } from 'react-native';

import { scaleFont } from '../../modules/fonts';

export default colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    option: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%',
      paddingVertical: 4,
      margin: 12,
      backgroundColor: colors.background.two,
    },
    optionContent: {
      fontSize: scaleFont(5),
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.main,
    },
    selected: {
      color: colors.primary,
    },
    deselected: {
      color: colors.text.main,
    },
  });
