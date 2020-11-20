import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingRight: 16,
    },
    timer: {
      width: 100,
    },
    options: {
      flexDirection: 'row',
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 225,
      paddingVertical: 4,
      marginHorizontal: 12,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    optionContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.background.one,
    },
  });
