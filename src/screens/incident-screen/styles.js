import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.dark.main,
  },
  stagingArea: {
    flex: 1,
  },
  mainArea: {
    flexDirection: 'column',
    flex: 3,
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
    fontSize: scaleFont(5),
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.text.light,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.light,
  },
  selectedTabContent: {
    color: colors.primary.light,
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
  },
  personnelArea: {
    flex: 1,
    flexDirection: 'row',
  },
  personnelAreaContainer: {
    flex: 1,
  },
});
