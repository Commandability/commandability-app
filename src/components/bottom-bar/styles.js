import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timer: {
      width: 100,
    },
    options: {
      flexDirection: 'row',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      width: 200,
      marginHorizontal: 12,
      marginVertical: 16,
      backgroundColor: colors.background.two,
    },
    optionContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      color: colors.text.main,
    },
  });
