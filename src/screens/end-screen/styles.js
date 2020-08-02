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
    justifyContent: 'center',
    backgroundColor: colors.background.dark.main,
    padding: 24,
  },
  label: {
    color: colors.primary.light,
    marginLeft: 24,
  },
  locationInput: {
    height: 48,
    color: colors.text.light,
    backgroundColor: colors.background.dark.highlight,
    margin: 24,
  },
  notesInput: {
    height: 144,
    textAlignVertical: 'top',
    color: colors.text.light,
    borderColor: colors.primary.light,
    backgroundColor: colors.background.dark.highlight,
    margin: 24,
  },
  row: {
    flexDirection: 'row',
  },
  opacity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.dark.highlight,
    padding: 48,
    margin: 24,
  },
  opacityText: {
    fontSize: 42,
    color: colors.text.light,
  },
});
