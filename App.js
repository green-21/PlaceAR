'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import {
    ViroTrackingStateConstants,
    ViroARSceneNavigator,
} from '@viro-community/react-viro';

import ARMainScene from './src/ARMainScene';
import GPSUtil from './src/GPSUtil';
import PlaceAPIUtil from './src/PlaceAPIUtil';
import PlaceDetailView from './src/PlaceDetailView';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isARVisible: true,
            isProcessing: false,
            places: new Map(),
            host: "192.168.0.2:8080",//"hsj3925.iptime.org:8080",
            
            modalVisible: false,
            selectedPlace: {},

            openDetailView: (placeID) => {
                console.log("placeID : ", placeID);
                console.log("place list :", this.state.places);
                this.setState({ 
                    selectedPlace: this.state.places.get(placeID),
                    modalVisible: true,
                });
            },
        };
        this.placeAPI = new PlaceAPIUtil();
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
        this._natigator = this.selectPlace
    };

    _takePhoto = async () => {
        await new Promise(resolve => {
            this.setState({
                isARVisible: false,
                isProcessing: true,
            }, resolve)
        });
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
            this.placeAPI.host = this.state.host;
            console.log("[버튼] 이벤트 실행");
            const gps = this.gps.Get();
            console.log('[버튼] gps를 얻었음 :', gps);
            const imageURL = await this._takePhoto();
            console.log('[버튼] 사진을 얻었음 :', imageURL);
            this.placeAPI.SetData(imageURL, gps.lat, gps.lng);
            let data = await this.placeAPI.GetPlace();
            // let data = await this.placeAPI.GetPlaceList();

            if (!data) {
                console.log('[버튼] 인식에 실패해 인접 장소를 검색함');
                data = await this.placeAPI.GetPlaceList();
                this._appendPlaces(data);
            } else {
                console.log('[버튼] Place를 얻었음');
                this._appendPlace(data);
            }
        } catch (err) {
            console.log('[버튼] 모종의 이유로 실패함.', err);
        } finally {

            console.log("모든 작업이 완료되었음")
            this.setState({ isProcessing: false, })
        }
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

    _appendPlaces = (places) => {
        this.setState((prev) => {
            for(const place of places) {
                prev.places.set(place.place_id, place);
            }
            return {places: prev.places}
        }, () => {console.log(`${places.length} 개의 플레이스 데이터를 응답 받았음`)})
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
                <TextInput 
                    value={this.state.host}
                    onChangeText={(text) => this.setState({ host: text })}
                />
                <Button
                    styles={styles.absol}
                    onPress={this._onButtonClick}
                    disabled={this.state.isProcessing}
                    title="탐색"
                />
                <PlaceDetailView
                    modalVisible={this.state.modalVisible}
                    closeModal={() => { this.setState({ modalVisible: false }) }}
                    place={this.state.selectedPlace}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flex1: { flex: 1 },
    absol: { position: "absolute" },
})