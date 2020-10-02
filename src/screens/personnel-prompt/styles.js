import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.background.one,
    },
    columns: {
      flex: 1,
      flexDirection: 'row',
    },
    leftCol: {
      flex: 1,
      alignItems: 'flex-end',
    },
    rightCol: {
      flex: 1,
      alignItems: 'flex-start',
    },
    newPersonnel: {
      flex: 1,
      padding: 24,
      marginRight: 72
    },
    roster: {
      flex: 1,
      padding: 24,
      paddingLeft: 72
    },
    option: {
      alignSelf: 'center',
      alignItems: 'center',
      width: 200,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginTop: 32,
      marginBottom: 8,
      backgroundColor: colors.background.two,
    },
    optionContent: {
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.main,
    },
    backButton: {
      color: colors.primary,
      fontSize: 42,
    },
    backBar: {
      alignSelf: 'flex-start',
    },
  });
