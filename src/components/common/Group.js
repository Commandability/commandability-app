import React, {Component} from 'react';
import {AppRegistry, TouchableOpacity, Flatlist, Text, View, Image, Alert, StyleSheet, Dimensions, PixelRatio, Platform} from 'react-native';

export default class Group extends Component {
    render() {
        return (
            <View style={styles.groupLayout}>
                <View style={styles.groupHeader}>
                    <Text style={styles.groupHeaderContent}> Group Title </Text>
                </View>
                <View style={styles.groupList}>
                    
                </View>
            </View>
        )
    }
}

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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')
const scale = SCREEN_WIDTH / 400
  
scaleFont = (size) => {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.floor(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.floor(PixelRatio.roundToNearestPixel(newSize)) - 2
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
        flex: 1,
        padding: 5,
        backgroundColor: COLORS.secondary.dark,
    },
    groupHeaderContent: {
        fontSize: scaleFont(6),
        textAlign: 'center',
        color: COLORS.primary.text
    },
    groupList: {
        flex: 6,
        backgroundColor: COLORS.primary.dark
    },
})