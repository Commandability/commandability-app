import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Flatlist, Text, View, Image, Alert, StyleSheet, } from 'react-native';
import NavBar from '../common/NavBar';
//import Group from '../common/Group';
import NavBar from '../common/NavBar';
//import COLORS from '../common/Colors';

//<Group />
//<Group />
export default class IncidentPage extends Component {
    render() {
        return (
            <View style={styles.incidentPageLayout}>
                <NavBar />
                <View style={styles.pageLayout}>
                    <View style={styles.stagingArea}>
                        <View style={styles.stagingList}>

                        </View>
                        <View style={styles.personnelList}>

                        </View>
                    </View>
                    <View style={styles.groupArea}>
                        <View style={styles.subGroupArea}>
                            <Text> Testing! </Text>
                        </View>
                        <View style={styles.subGroupArea}>
                            
                        </View>
                        <View style={styles.subGroupArea}>
                            
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
    },
    navBar: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: .5
    },
    pageLayout: {
        flexDirection: 'row',
        flex: 10,
    },
    stagingArea: {
        flexDirection: 'column',
        flex: 1,
    },
    stagingList: {
        flex: 1,
    },
    personnelList: {
        flex: 1,
    },
    groupArea: {
        flexDirection: 'row',
        flex: 4,
    },
    subGroupArea: {
        flexDirection: 'column',
        flex: 1,
    },
})
