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
        console.log(this.state.places);
    }
    render() {
        const selectPlace = this.props.sceneNavigator.viroAppProps.openDetailView;
        return (
            <ViroARScene>
                {
                    Array.from(this.state.places.values()).map((data, index) => {
                        console.log(data);
                        return (
                            <ARPlaceInfoMarker
                                position={[0, -3, -10]}
                                key={data.place_id}
                                name={data.name}
                                rating={`${data.rating}`}
                                clickEvent={()=> {selectPlace(data.place_id)}}
                            />
                        )
                    })

                }
            </ViroARScene>
        )
    }
}

