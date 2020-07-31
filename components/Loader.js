import React, { Component } from "react";
import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";

import LottieView from "lottie-react-native";

export default class App extends React.Component {
    fadeVal = new Animated.Value(0); 

    render() {
        if (!this.props.fade) {
            return (
                <Animated.View
                    style={{ 
                        ...StyleSheet.absoluteFillObject,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "darkorange"
                }}
                >
                    <LottieView 
                        style={{width: 200, height: 200}} 
                        source={require('../assets/loading2.json')} 
                        autoPlay 
                        loop 
                    />
                </Animated.View>
            );
        }
        else {
            Animated.timing(this.fadeVal, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }).start();

            return (
                <Animated.View
                    style={{ 
                        ...StyleSheet.absoluteFillObject,
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: this.fadeVal.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                            extrapolate: "clamp"
                        }),
                        backgroundColor: "darkorange"
                }}
                >
                    <LottieView 
                        style={{width: 200, height: 200}} 
                        source={require('../assets/loading2.json')} 
                        autoPlay 
                    />
                </Animated.View>
            );
        }
        
    }
}