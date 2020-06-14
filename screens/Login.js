import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const screenHeight = Dimensions.get('window').height;

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonPos}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button} >
                    <LinearGradient
                        colors={['#FF911F', '#FE5A40']}
                        style={styles.gradient}
                        start={{ x: 0.2, y: 0 }} end={{ x: 0.7, y: 1 }}>
                        <Text style={styles.text}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function elevationShadowStyle(elevation) {
    return {
        elevation,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * elevation },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * elevation
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    shadow: { ...elevationShadowStyle(13) },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 80 / 2,
    },
    button: {
        width: 280,
        height: 80,
    },
    buttonPos: {
        position: "relative",
        alignItems: "center",
        marginTop: screenHeight * 0.75,
    },
    text: {
        color: 'white',
        fontSize: 22,
        fontFamily: "OpenSans-Light",
    },
});