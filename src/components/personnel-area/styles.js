import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 8,
      backgroundColor: colors.background.two,
      borderRadius: 4,
    },
    addPersonnelButton: {
      alignSelf: 'center',
      margin: 8,
    },
  });
