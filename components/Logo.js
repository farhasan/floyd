import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import * as Font from 'expo-font';

let customFonts = {
    'Righteous': require('../assets/fonts/Righteous-Regular.ttf'),
};

export default class App extends React.Component {
    state = {
        fontsLoaded: false,
    };
    
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    
    componentDidMount () {
        this._loadFontsAsync();
    }
    
    render() {
        if (this.state.fontsLoaded) {
            return (
                <View style={{ paddingTop: 25, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontFamily: "Righteous", color: "white", fontSize: this.props.size}}>{this.props.text}</Text>
                </View>
            );
        } else {
            return <View />;
        }
    }
}