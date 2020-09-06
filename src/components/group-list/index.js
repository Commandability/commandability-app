/**
 * GroupList Component
 *
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPersonnelByLocationId, getTheme } from '../../redux/selectors';
import ListItem from '../list-item';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

class GroupList extends React.PureComponent {
  renderItem = ({ item }) => {
    const { locationId } = this.props;
    return <ListItem locationId={locationId} item={item} />;
  };

  keyExtractor = item => item.id;

  render() {
    const { personnel, theme } = this.props;

    const colors = themeSelector(theme);
    const styles = createStyleSheet(colors);

    return (
      <View style={styles.container}>
        <FlatList
          data={personnel}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={this.props}
        />
      </View>
    );
  }
}

// props validation
GroupList.propTypes = {
  locationId: PropTypes.string,
  personnel: PropTypes.array,
  theme: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { locationId } = ownProps;
  return {
    personnel: getPersonnelByLocationId(state, locationId),
    theme: getTheme(state),
  };
};

export default connect(
  mapStateToProps,
  null
)(GroupList);
