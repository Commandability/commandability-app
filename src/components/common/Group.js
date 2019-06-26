import React, {Component} from 'react';
import {AppRegistry, TouchableOpacity, Flatlist, Text, View, Image, Alert, stylestyleSheet} from 'react-native';

export default class IncidentPage extends React.PureComponent{
    constructor(){

    }
    render() {
        return (
            <View style={styles.groupLayout}>
                <View style={styles.groupHeader}>
                    <Text style={styles.groupHeaderContent}></Text>
                </View>
                <Flatlist
                    style={styles.groupList}

                    >
                </Flatlist>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    groupLayout: {
        flex: 1,
        flexDirection: 'column',
        padding: 4,
    },
    groupHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: COLORS.secondary.dark
    },
    groupHeaderContent: {
        flex: 3,
        fontSize: scaleFont(6),
        textAlign: 'center',
        color: COLORS.primary.text
    },
    groupList: {
        flex: 1,
        backgroundColor: COLORS.primary.dark
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