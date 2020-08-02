import { StyleSheet } from 'react-native';

import colors from '../../modules/colors';
import { scaleFont } from '../../modules/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    color: colors.text.light,
  },
  labelStyle: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 0.5,
    backgroundColor: colors.primary.dark,
  },
  buttonContainerDisabled: {
    tintColor: colors.design.disabled,
  },
  buttonContent: {
    textAlign: 'center',
    alignItems: 'center',
    color: colors.primary.text,
  },
  buttonContentDisabled: {
    color: colors.design.disabledFont,
  },
  labelContentStyle: {
    fontSize: scaleFont(6),
    flex: 2,
    color: colors.text.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 5,
    fontSize: scaleFont(6),
    textAlign: 'center',
    color: colors.text.light,
  },
});
