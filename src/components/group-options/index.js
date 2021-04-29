/**
 * GroupOptions Component
 *
 * Handles the add, remove, and edit group options at the top of the page area and above each page
 */

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View} from 'react-native';

import SmallButton from '../small-button';
import {selectSelectedGroupMode} from '../../redux/selectors';
import {toggleGroupMode} from '../../redux/actions';
import createStyleSheet from './styles';

const GroupOptions = () => {
  const dispatch = useDispatch();
  const selectedGroupMode = useSelector((state) =>
    selectSelectedGroupMode(state),
  );

  const onAddPressed = () => {
    dispatch(toggleGroupMode('add'));
  };

  const onRemovePressed = () => {
    dispatch(toggleGroupMode('remove'));
  };

  const onEditPressed = () => {
    dispatch(toggleGroupMode('edit'));
  };

  const styles = createStyleSheet();

  return (
    <View style={styles.container}>
      <SmallButton
        text="ADD GROUP"
        onPress={onAddPressed}
        type="selector"
        selected={selectedGroupMode === 'add'}
        style={styles.groupOption}
      />
      <SmallButton
        text="REMOVE GROUP"
        onPress={onRemovePressed}
        type="selector"
        selected={selectedGroupMode === 'remove'}
        style={styles.groupOption}
      />
      <SmallButton
        text="EDIT GROUP"
        onPress={onEditPressed}
        type="selector"
        selected={selectedGroupMode === 'edit'}
        style={styles.groupOption}
      />
    </View>
  );
};

export default GroupOptions;
