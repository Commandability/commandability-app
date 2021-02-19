import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background.one,
      padding: 24,
    },
    label: {
      color: colors.primary,
      marginLeft: 24,
    },
    input: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      margin: 24,
      borderRadius: 5,
      paddingLeft: 16,
    },
  });
