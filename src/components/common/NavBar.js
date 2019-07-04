import React, {Component} from 'react';
import {AppRegistry, TouchableOpacity, Flatlist, Text, View, Image, Alert, StyleSheet, Dimensions, PixelRatio, Platform} from 'react-native';

export default class NavBar extends Component {
    render() {
        return (
            <View style={styles.navBar}>
                    <View style={styles.timerLayout}>
                        <View style={styles.timer}>
                            <Text style={styles.timerContent}>Time:</Text>
                        </View>
                        <View style={styles.timer}>
                            <Text style={styles.timerContent}>Elapsed:</Text>
                        </View>
                    </View>
                    <View style={styles.pageTabs}>

                    </View>
                    <View style={styles.pageOptions}>
                        <Text style={styles.pageOptionContent}> Options </Text>
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
    navBar: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS.primary.dark,
    },
    timerLayout: {
        flexDirection: 'column',
        flex: 1,
    },
    timer: {
        flex: 1,
        justifyContent: 'center',
    },
    timerContent: {
        fontSize: scaleFont(5),
        textAlignVertical: 'center',
        textAlign: 'center',
        color: COLORS.primary.text
    },
    pageTabs: {
        flexDirection: 'row',
        flex: 6,
    },
    pageOptions: {
        flex: 1,
        justifyContent: 'center',
    },
    pageOptionContent: {
        fontSize: scaleFont(5),
        textAlignVertical: 'center',
        textAlign: 'center',
        color: COLORS.primary.text,
    }
})