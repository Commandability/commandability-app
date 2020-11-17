import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginTop: 8,
      marginBottom: 8,
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
    selected: {
      color: colors.primary,
    },
    deselected: {
      color: colors.text.main,
    },
  });
