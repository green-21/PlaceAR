'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {
    ViroTrackingStateConstants,
    ViroARSceneNavigator,
} from '@viro-community/react-viro';

import ARMainScene from './src/ARMainScene';
import GPSUtil from './src/GPSUtil';
import PlaceAPIUtil from './src/PlaceAPIUtil';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.placeAPI = new PlaceAPIUtil("192.168.0.25:8080");
        this.state = {
            isDisabled: false,
            places: new Map(),
        };
        this._navigator = undefined;
        this.gps = new GPSUtil();
    }

    componentDidMount() {
        this.gps.Start();
    }

    componentWillUnmount() {
        this.gps.Clear();
    }

    _setNavigatorRef = (navigator) => {
        this._navigator = navigator;
    };

    _takePhoto = async () => {
        await new Promise(resolve => { this.setState({ isDisabled: true }, resolve) });
        const result = await this._navigator._takeScreenshot('photo', false);
        this.setState({ isDisabled: false });
        if (result.success) {
            return "file://" + result.url;
        }
        return "";
    };

    _onButtonClick = async () => {
        if (!this.gps.Availbale) {
            console.log("아직 준비가 되지 않았음.");
            return;
        }
        try {
            console.log("[버튼] 이벤트 실행");
            const gps = this.gps.Get();
            console.log('[버튼] gps를 얻었음 :', gps);
            const imageURL = await this._takePhoto();
            console.log('[버튼] 사진을 얻었음 :', imageURL);
            this.placeAPI.SetData(imageURL, gps.lat, gps.lng);
            let data = await this.placeAPI.GetPlace();
            if (!data) {
                console.log('[버튼] 인식에 실패해 인접 장소를 검색함');
                data = await this.placeAPI.GetPlaceList();
                this._appendPlaces(data);
                return
            }
            console.log('[버튼] Place를 얻었음');
            this._appendPlace(data);
        } catch (err) {
            console.log('[버튼] 모종의 이유로 실패함.', err);
        }
        /*
            1. 모든 ar 컴포넌트를 감춘다.
            2. 사진을 찍는다.
            3. ar 컴포넌트를 띄운다.
            4. 사진을 전송한다.
        */
    };

    _appendPlace = (place) => {
        this.setState((prev) => {
            // const newPlaces = new Map();
            prev.places.set(place.place_id, place);
            return { places: prev.places, }
        }, () => {
            console.log("플레이스가 추가 되었음 !!", place.place_id);
        })
    }

    _appendPlaces = (data) => {

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
                    styles={styles.absol}
                    onPress={this._onButtonClick}
                    title="탐색"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flex1: { flex: 1 },
    absol: { position: "absolute" },
})