import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 8,
      marginHorizontal: 8,
      backgroundColor: colors.background.two,
      borderRadius: 5,
    },
    addPersonnelButton: {
      alignSelf: 'center',
      margin: 8,
    },
  });
