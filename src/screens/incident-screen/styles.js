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
      flex: 1,
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 16,
    },
    incidentArea: {
      flex: 3,
    },
    tabBar: {
      backgroundColor: colors.background.two,
      marginHorizontal: 16,
      marginTop: 8,
      marginBottom: 16,
      elevation: 0,
    },
    tabLabel: {
      color: colors.text.main,
    },
    indicator: {
      backgroundColor: colors.primary,
    },
  });
