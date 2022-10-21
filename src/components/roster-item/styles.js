import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      borderBottomWidth: 1,
      borderBottomColor: colors.deemphasized,
      marginHorizontal: 8,
      paddingVertical: 4,
    },
    line: {
      flex: 1,
      flexDirection: 'row',
    },
    name: {
      flex: 1,
      textAlign: 'left',
      fontFamily: 'ClearSans-Regular',
      color: colors.text.main,
    },
    label: {
      textAlign: 'left',
      fontFamily: 'ClearSans-Regular',
      fontSize: 14,
      color: colors.text.disabled,
    },
  });
