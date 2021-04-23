/**
 * IncidentScreen component
 */

import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {ErrorBoundary} from 'react-error-boundary';

import ErrorFallbackScreen from '../error-fallback-screen';
import {PageArea, PersonnelArea, BottomBar} from '../../components';
import {selectTheme} from '../../redux/selectors';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const IncidentScreen = () => {
  const theme = useSelector((state) => selectTheme(state));

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackScreen}>
      <View style={styles.container}>
        <View style={styles.mainArea}>
          <View style={styles.sideBar}>
            <PersonnelArea />
          </View>
          <View style={styles.pageArea}>
            <PageArea />
          </View>
        </View>
        <BottomBar />
      </View>
    </ErrorBoundary>
  );
};

export default IncidentScreen;
