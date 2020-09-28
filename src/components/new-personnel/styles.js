import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
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
      paddingVertical: 22,
      marginVertical: 22,
    },
    opacityText: {
      fontSize: 16,
      color: colors.text.main,
    },
    icon: {
      fontSize: 20,
      color: colors.primary,
      marginRight: 30,
    },
  });
