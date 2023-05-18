'use strict'

import React, { Component } from "react";
import { ViroARScene } from "@viro-community/react-viro";
import ARPlaceInfoMarker from "./ARPlaceInfoMarker";


export default class ARMainScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
        }
    }

    newMarker = (data) => {
        this.setState((prev) => {
            markers: [...prev.markers, data]
        })
    }
    render() {
        return (
            <ViroARScene>
                {this.state.markers.map((data, index) => (
                    <ARPlaceInfoMarker
                        name={data.name}
                        score={data.score}
                        isOpen={data.isOpen}></ARPlaceInfoMarker>
                ))}
            </ViroARScene>
        )
    }
}