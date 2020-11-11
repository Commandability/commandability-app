import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.one,
      padding: 24,
    },
    promptContainer: {
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
      paddingHorizontal: 16,
      width: Dimensions.get('window').width / 4,
      marginRight: 48,
    },
    roster: {
      flex: 1,
      paddingHorizontal: 16,
      width: Dimensions.get('window').width / 4,
      marginLeft: 48,
    },
    option: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginTop: 32,
      marginBottom: 8,
      backgroundColor: colors.background.two,
    },
    optionContent: {
      paddingHorizontal: 2,
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
      marginBottom: 48,
    },
  });
