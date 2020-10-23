import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    headerContent: {
      fontSize: 18,
      textAlign: 'center',
      color: colors.text.main,
    },
    label: {
      color: colors.primary,
    },
    container: {
      justifyContent: 'center',
      backgroundColor: colors.background.one,
      padding: 24,
    },
    input: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      marginVertical: 8,
    },
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.two,
      paddingVertical: 48,
      marginVertical: 24,
    },
    opacityText: {
      fontSize: 42,
      color: colors.text.main,
    },
    icon: {
      fontSize: 42,
      color: colors.primary,
      marginRight: 30,
    },
  });
