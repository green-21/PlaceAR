'use strict'

import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {
    ViroTrackingStateConstants,
    ViroARSceneNavigator,
} from '@viro-community/react-viro';
import ARMainScene from './src/ARMainScene';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.host = "http://localhost:8080";
        this.state = {};
    }
    render() {
        return (
            <View style={styles.flex1}>
                <ViroARSceneNavigator
                    style={styles.flex1}
                    autofocus={true}
                    ref={this._setNavigatorRef}
                    initialScene={{ scene: ARMainScene }}
                    viroAppProps={this.state}
                />
                <Button
                    styles= {styles.absol}
                    onPress={this._onButtonClick}
                    title="탐색"
                />
            </View>
        )
    }
    _takePhoto = () => {
        
    }
    _onButtonClick = () => {
        /* 
        1. 모든 ar 컴포넌트를 감춘다.
        2. 사진을 찍는다.
        3. ar 컴포넌트를 띄운다.
        4. 사진을 전송한다.
        5.  
        */

    }
}

const styles = StyleSheet.create({
    flex1: {flex:1},
    absol: {position: "absolute"},
})