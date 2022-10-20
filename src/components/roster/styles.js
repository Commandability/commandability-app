import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      color: colors.text.main,
      backgroundColor: colors.background.three,
      borderRadius: 8,
      margin: 8,
    },
    queryInput: {
      height: 40,
      color: colors.text.main,
      borderColor: colors.primary,
      borderBottomWidth: 1,
      marginHorizontal: 8,
      marginBottom: 8,
    },
    header: {
      alignItems: 'center',
      margin: 4,
    },
    headerContent: {
      fontSize: 14,
      color: colors.text.main,
      letterSpacing: 0.5,
    },
  });
