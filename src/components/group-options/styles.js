import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    option: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginTop: 16,
      marginBottom: 8,
      backgroundColor: colors.background.two,
    },
    optionContent: {
      fontSize: 14,
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
