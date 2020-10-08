import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      height: '20%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    option: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 4,
      marginTop: 16,
      backgroundColor: colors.background.two,
      flex: 1,
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
