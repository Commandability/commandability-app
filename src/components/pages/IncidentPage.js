import React, {Component} from 'react';
import {AppRegistry, TouchableOpacity, Flatlist, Text, View, Image, Alert, stylestyleSheet} from 'react-native';

export default class IncidentPage extends React.PureComponent{
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
                            <View style={styles.group}>

                            </View>
                            <View style={styles.group}>
                                
                            </View>
                        </View>
                        <View style={styles.subGroupArea}>
                            <View style={styles.group}>

                            </View>
                            <View style={styles.group}>
                                
                            </View>
                        </View>
                        <View style={styles.subGroupArea}>
                            <View style={styles.group}>

                            </View>
                            <View style={styles.group}>
                                
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}