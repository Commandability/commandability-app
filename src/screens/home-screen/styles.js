import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';

export default StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background.dark.main,
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  opacity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.dark.highlight,
    margin: 24
  },
  icon: {
    fontSize: 50,
    color: colors.primary.light,
    marginRight: 30
  },
  iconText: {
    fontSize: 50,
    color: colors.text.light
  }
});
