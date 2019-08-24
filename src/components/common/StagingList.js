import React, {Component} from 'react';
import {AppRegistry, TouchableOpacity, Flatlist, Text, View, Image, Alert, StyleSheet, Dimensions, PixelRatio, Platform} from 'react-native';
import COLORS from '../common/Colors';
import {scaleFont} from '../common/Fonts';
import GroupList from './GroupList';

export default class StagingList extends Component {
    render() {
        return (
            <View style={styles.groupLayout}>
                <View style={styles.groupHeader}>
                    <Text style={styles.groupHeaderContent}> Staging </Text>
                </View>
                <GroupList groupName={this.props.groupName} />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    groupLayout: {
        flex: 1,
        flexDirection: 'column',
    },
    groupHeader: {
        flexDirection: 'row',
        flex: 1,
        padding: 5,
        backgroundColor: COLORS.secondary.dark,
    },
    groupHeaderContent: {
        flex: 5,
        fontSize: scaleFont(6),
        textAlign: 'center',
        color: COLORS.primary.text
    },
    groupList: {
        flex: 7,
        backgroundColor: COLORS.primary.dark
    },
})