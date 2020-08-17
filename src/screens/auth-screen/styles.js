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
    padding: 24,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    color: colors.primary.light,
    marginLeft: 24,
  },
  textInput: {
    height: 48,
    color: colors.text.light,
    backgroundColor: colors.background.dark.highlight,
    margin: 24,
  },
  opacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.dark.highlight,
    padding: 48,
    margin: 24,
  },
  icon: {
    fontSize: 42,
    color: colors.primary.light,
    marginRight: 30,
  },
  iconText: {
    fontSize: 42,
    color: colors.text.light,
  },
});
