import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      color: colors.text.main,
      backgroundColor: colors.background.three,
      borderRadius: 5,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
    },
    headerContent: {
      fontSize: 14,
      color: colors.text.main,
    },
  });
