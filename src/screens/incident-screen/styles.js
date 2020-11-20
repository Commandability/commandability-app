import { StyleSheet } from 'react-native';

export default colors =>
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
      width: '25%',
      padding: 16,
    },
    incidentArea: {
      width: '72%',
      margin: 16,
      backgroundColor: colors.background.two,
      borderRadius: 5,
      paddingVertical: 8,
      // Horizontal padding handled in GroupArea and Group
    },
    groupArea: {
      flex: 1,
    },
    tabBar: {
      backgroundColor: colors.background.three,
      marginHorizontal: 8,
      marginTop: 0,
      elevation: 0,
    },
    tabLabel: {
      color: colors.text.main,
    },
    indicator: {
      backgroundColor: colors.primary,
    },
  });
