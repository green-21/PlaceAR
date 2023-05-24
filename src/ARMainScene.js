'use strict'

import React, { Component } from "react";
import { ViroARScene, ViroText, ViroButton } from "@viro-community/react-viro";
import ARPlaceInfoMarker from "./ARPlaceInfoMarker";


export default class ARMainScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: this.props.sceneNavigator.viroAppProps.places,
        }
        this.lat = 0;
        this.lng = 0;
    }

    // from ViroCommunity/geoar
    GPSToMerc = (latDeg, longDeg) => {
        // From: https://gist.github.com/scaraveos/5409402 
        const longRad = (longDeg / 180.0) * Math.PI;
        const latRad = (latDeg / 180.0) * Math.PI;
        const smA = 6378137.0;
        const xmeters = smA * longRad;
        const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
        return { x: xmeters, y: ymeters };
    };

    // from ViroCommunity/geoar
    GpsToAR = (lat, lng) => {
        const isAndroid = Platform.OS === 'android';
        const latObj = lat;
        const longObj = lng;
        const latMobile = this.lat;
        const longMobile = this.lng;
        const deviceObjPoint = this.GPSToMerc(latObj, longObj);
        const mobilePoint = this.GPSToMerc(latMobile, longMobile);
        const objDeltaY = deviceObjPoint.y - mobilePoint.y;
        const objDeltaX = deviceObjPoint.x - mobilePoint.x;

        if (isAndroid) {
            let degree = this.props.sceneNavigator.viroAppProps.heading;
            let angleRadian = (degree * Math.PI) / 180;
            let newObjX = objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
            let newObjY = objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);
            return { x: newObjX, z: -newObjY };

        }

        return { x: objDeltaX, z: -objDeltaY };
    };

    render() {
        const selectPlace = this.props.sceneNavigator.viroAppProps.openDetailView;
        if (this.props.sceneNavigator.viroAppProps.gps.Availbale()) {
            const { lat, lng } = this.props.sceneNavigator.viroAppProps.gps.Get();
            this.lat = lat;
            this.lng = lng;
        }

        const markers = [];
        this.state.places.forEach((data, key) => {
            let {x,z} = this.GpsToAR(data.lat, data.lng);
            if(Math.abs(x) + Math.abs(z) > 100) {
                return;
            }
            if (z < 0  && z > -10) {
                 z -= 10+z;
            }
            console.log(`${data.name} : (${x}, ${z})`)
            markers.push(
                <ARPlaceInfoMarker
                position={[x, -1, z]}
                key={data.place_id}
                name={data.name}
                rating={`${data.rating}`}
                clickEvent={() => { selectPlace(data.place_id) }}
                visible ={this.props.sceneNavigator.viroAppProps.isARVisible}
            />
            )
        })
        return (
            <ViroARScene>
                {markers}
            </ViroARScene>
        )
    }
}

