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
      paddingVertical: 2,
      margin: 12,
      backgroundColor: colors.background.two,
      flex: 1,
      flexDirection: 'row',
    },
    optionContent: {
      fontSize: scaleFont(5),
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.main,
    },
  });
