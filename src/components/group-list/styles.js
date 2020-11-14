import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.two,
      flex: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
  });
