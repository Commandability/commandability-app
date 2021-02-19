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
    locationInput: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      margin: 24,
      paddingLeft: 16,
      borderRadius: 5,
    },
    notesInput: {
      height: 144,
      textAlignVertical: 'top',
      color: colors.text.main,
      borderColor: colors.primary,
      backgroundColor: colors.background.two,
      margin: 24,
      paddingLeft: 16,
      borderRadius: 5,
    },
  });
