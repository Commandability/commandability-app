import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    queryInput: {
      height: 40,
      color: colors.text.main,
      borderColor: colors.primary,
      borderBottomWidth: 1,
      marginBottom: 16,
      marginTop: 8,
      marginHorizontal: 8,
    },
    container: {
      flex: 1,
      color: colors.text.main,
      backgroundColor: colors.background.two,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    headerContent: {
      fontSize: 18,
      color: colors.text.main,
    },
  });
