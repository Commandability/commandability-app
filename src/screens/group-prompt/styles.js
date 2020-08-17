import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.background.dark.main,
    padding: 24,
  },
  label: {
    color: colors.primary.light,
    marginLeft: 24,
  },
  nameInput: {
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
  opacityText: {
    fontSize: 42,
    color: colors.text.light,
  },
  icon: {
    fontSize: 42,
    color: colors.primary.light,
    marginRight: 30,
  },
  backButton: {
    color: colors.primary.light,
    fontSize: 44,
  },
  backBar: {
    marginBottom: 14,
    marginLeft: 12,
  },
  buttonContainer: {
    width: "3%",
  },
  promptContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});
