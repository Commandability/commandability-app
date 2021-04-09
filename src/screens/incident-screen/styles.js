import {StyleSheet} from 'react-native';

export default (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.one,
      flex: 1,
    },
    mainArea: {
      flex: 1,
      flexDirection: 'row',
    },
    sideBar: {
      width: '25.5%',
      paddingVertical: 16,
      paddingLeft: 16,
      marginRight: 0,
    },
    pageArea: {
      width: '72%',
      margin: 16,
      backgroundColor: colors.background.two,
      borderRadius: 5,
      paddingVertical: 8,
      // Horizontal padding handled in Page and Group
    },
  });
