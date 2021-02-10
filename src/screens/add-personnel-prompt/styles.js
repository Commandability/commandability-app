import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.one,
      padding: 24,
      flexDirection: 'row',
    },
    backOpacity: {
      position: 'absolute',
      left: 24,
      top: 24,
    },
    backIcon: {
      color: colors.primary,
      fontSize: 42,
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
      padding: 8,
      width: Dimensions.get('window').width / 4,
      marginRight: 48,
      backgroundColor: colors.background.two,
      borderRadius: 5,
    },
    roster: {
      flex: 1,
      padding: 8,
      width: Dimensions.get('window').width / 4,
      marginLeft: 48,
      backgroundColor: colors.background.two,
      borderRadius: 5,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      paddingVertical: 4,
      marginHorizontal: 12,
      marginTop: 16,
      borderRadius: 5,
      backgroundColor: colors.primary,
      alignSelf: 'center',
    },
    optionContent: {
      paddingHorizontal: 2,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.alternate,
    },
  });
