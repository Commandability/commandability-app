import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  pageLayout: {
    flexDirection: 'row',
    flex: 10,
  },
  subPageLayout: {
    flexDirection: 'column',
    flex: 4,
  },
  navBar: {
    flexDirection: 'row',
    flex: 2,
    backgroundColor: colors.primary.dark,
  },
  stagingArea: {
    flexDirection: 'column',
    flex: 1,
  },
  toggleSelected: {
    color: colors.secondary.dark,
    fontWeight: 'bold',
  },
  groupArea: {
    flexDirection: 'column',
    flex: 9,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: colors.primary.dark,
  },
  container: {
    flex: 13,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
  },
  groupContainer: {
    flexDirection: 'column',
    flex: 13,
  },
  pageOption: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pageOptionContent: {
    fontSize: scaleFont(5),
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.primary.text,
  },
});
