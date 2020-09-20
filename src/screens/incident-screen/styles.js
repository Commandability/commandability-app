import { StyleSheet } from 'react-native';

import { scaleFont } from '../../modules/fonts';

export default colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.background.one,
      flex: 1,
    },
    sideBar: {
      flex: 1,
      flexDirection: 'column',
    },
    mainArea: {
      flex: 3,
      flexDirection: 'column',
    },
    mainAreaTabs: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 14,
    },
    tabContent: {
      fontSize: scaleFont(6),
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.disabled,
    },
    selectedTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    selectedTabContent: {
      color: colors.primary,
    },
    incidentArea: {
      flexDirection: 'column',
      flex: 1,
    },
    groupArea: {
      flexDirection: 'column',
      flex: 1,
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      paddingHorizontal: 8,
    },
    personnelArea: {
      flex: 1,
      flexDirection: 'row',
    },
    personnelAreaContainer: {
      flex: 1,
      padding: 24,
    },
    pageTabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 2,
      margin: 12,
      marginHorizontal: 48,
    },
    icon: {
      fontSize: 16,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.text.main,
    },
    iconSelected: {
      fontSize: 16,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.primary,
    },
  });
