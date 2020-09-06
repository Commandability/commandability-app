/**
 * OptionBar Component
 *
 * This component handles the OptionBar above the incident screen, including:
 *  - the incident timer
 *  - the edit group, remove group, and end incident buttons
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { getTheme } from '../../redux/selectors';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class OptionBar extends Component {
  _onAddGroupPressed = () => {
    this.props.addGroupHandler();
  };

  _onRemoveGroupPressed = () => {
    this.props.removeGroupHandler();
  };

  _onEditGroupPressed = () => {
    this.props.editGroupHandler();
  };

  render() {
    const { addGroupMode, removeGroupMode, editGroupMode, theme } = this.props;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.option}
          onPress={this._onAddGroupPressed}
          disabled={editGroupMode || removeGroupMode}
        >
          <Text
            style={[
              styles.optionContent,
              addGroupMode
                ? styles.selected
                : (editGroupMode || removeGroupMode) && styles.deselected,
            ]}
          >
            {' '}
            ADD GROUP{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={this._onRemoveGroupPressed}
          disabled={editGroupMode || addGroupMode}
        >
          <Text
            style={[
              styles.optionContent,
              removeGroupMode
                ? styles.selected
                : (editGroupMode || addGroupMode) && styles.deselected,
            ]}
          >
            {' '}
            REMOVE GROUP{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={this._onEditGroupPressed}
          disabled={removeGroupMode || addGroupMode}
        >
          <Text
            style={[
              styles.optionContent,
              editGroupMode
                ? styles.selected
                : (removeGroupMode || addGroupMode) && styles.deselected,
            ]}
          >
            {' '}
            EDIT GROUP{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// props validation
OptionBar.propTypes = {
  addGroupHandler: PropTypes.func,
  removeGroupHandler: PropTypes.func,
  editGroupHandler: PropTypes.func,
  addGroupMode: PropTypes.bool,
  removeGroupMode: PropTypes.bool,
  editGroupMode: PropTypes.bool,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  theme: getTheme(state),
});

export default connect(
  mapStateToProps,
  null
)(OptionBar);
