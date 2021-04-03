import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background.one,
      padding: 24,
    },
    promptContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    label: {
      color: colors.primary,
      marginLeft: 24,
    },
    nameInput: {
      height: 48,
      color: colors.text.main,
      backgroundColor: colors.background.two,
      margin: 24,
      borderRadius: 5,
      paddingLeft: 16,
    },
    opacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.two,
      padding: 48,
      margin: 24,
      borderRadius: 5,
    },
    opacityText: {
      fontSize: 42,
      color: colors.text.main,
    },
    icon: {
      fontSize: 42,
      color: colors.primary,
      marginRight: 30,
    },
    backButton: {
      color: colors.primary,
      fontSize: 42,
    },
    backBar: {
      alignSelf: 'flex-start',
      marginBottom: 48,
    },
    pickerContainer: {
      borderRadius: 5,
      margin: 24,
      height: 48,
      width: 300,
      alignItems: "flex-start",
      backgroundColor: colors.background.two,
    },
    picker: {
      width: 300,
      color: colors.text.main,
      
    },
    pickerItem: {
      color: colors.primary,
    },
  });
