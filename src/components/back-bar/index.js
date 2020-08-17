/**
 * Back bar Component
 *
 * Displays the options for editing a group. Can take user input for a new group name, or remove the group
 */

import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import navigation from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class BackBar extends Component {

    onBackPressed = () => {
        navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.onBackPressed}>
                    <Icon name="arrow-left-thick" style={styles.icon}/>
                </TouchableOpacity>      
            </View>
        );
    }
}

// props validation
BackBar.propTypes = {
    navigation: PropTypes.object,
};

export default BackBar;
