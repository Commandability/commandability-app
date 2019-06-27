import React, {Component} from 'react';
import {AppRegistry, TouchableOpacity, Flatlist, Text, View, Image, Alert, StyleSheet} from 'react-native';
import {Group} from '../common/Group';

export default class IncidentPage extends Component {
    render() {
        return (
            <View style={styles.incidentPageLayout}>
                <View style={styles.navBar}>

                </View>
                <View style={styles.pageLayout}>
                    <View style={styles.stagingArea}>
                        <View style={styles.stagingList}>

                        </View>
                        <View style={styles.personnelList}>

                        </View>
                    </View>
                    <View style={styles.groupArea}>
                        <View style={styles.subGroupArea}>
                            <Group/>
                            <Group/>
                        </View>
                        <View style={styles.subGroupArea}>
                            <Group/>
                            <Group/>
                        </View>
                        <View style={styles.subGroupArea}>
                            <Group/>
                            <Group/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    incidentPageLayout: {
        flexDirection: 'column',
        flex: 1,
        borderWidth: 1
    },
    navBar: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1
    },
    pageLayout: {
        flexDirection: 'row',
        flex: 4,
        borderWidth: 1
    },
    stagingArea: {
        flexDirection: 'column',
        flex: 1,
        borderWidth: 1        
    },
    stagingList: {
        flex: 1,
        borderWidth: 1
    },
    personnelList: {
        flex: 1,
        borderWidth: 1
    },
    groupArea: {
        flexDirection: 'row',
        flex: 4,
        borderWidth: 1
    },
    subGroupArea: {
        flexDirection: 'column',
        flex:1,
        borderWidth: 1
    },
})

const COLORS = {
    primary: {
        main: '#757575',
        light: '#909090',
        dark: '#494949',
        text: '#ffffff'
    },
    secondary: {
        main: '#c62828',
        light: '#9b2828',
        dark: '#5a0000',
        text: '#ffffff'
    }
}