'use strict'

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
    ViroText,
    ViroNode,
    ViroImage,
    ViroFlexView
} from '@viro-community/react-viro';


/*
name: placeName
score: star score
isOpen : 영업 여부
*/
export default class ARPlaceInfoMarker extends Component {
    constructor(props) {
        super(props);
    }

    _onClick = () => {

    };

    render() {
        return (
            <ViroNode position={this.props.position}>
                <ViroNode>
                    <ViroFlexView style={styles.Container} position={[0, 2, 0]} width={5} height={1.5}>
                        <ViroFlexView style={styles.TitleBox} >
                            <ViroText style={styles.TitleText} text={this.props.name} width={1} />
                        </ViroFlexView>
                        <ViroFlexView style={styles.ContentBox}>
                            <ViroText style={styles.ContentText} text={this.props.rating} width={1} />
                            <ViroText style={styles.ContentText} text={this.props.isOpen} width={1} />
                        </ViroFlexView>
                    </ViroFlexView>
                </ViroNode>
                <ViroImage
                    source={require('../res/marker.png')}
                    scale={[1, 1.5, 1]}
                />
            </ViroNode>
        )
    }
}

const styles = StyleSheet.create({
    TitleText: {
        fontFamily: "SamsungKorean, NotoSansCJK, Roboto",
        fontSize: 50,
        color: '#111111',
        textAlignVertical: "center",
        flexShrink:1,
        fontWeight:"bold",

        // textAlignVertical: 'center',
        // textAlign: 'center',
    },
    ContentText: {
        fontFamily: "Roboto, SamsungKorean, NotoSansCJK",
        fontSize: 30,
        color: '#111111',
    },
    Container: {
        backgroundColor: "#ffffffdd",
        flexDirection: "column",
        // padding: .01,
        // flexShrink: 2,
    },
    TitleBox: {
        flex:1,
        // backgroundColor: "#ff0000",
        flexDirection: "row",
        flexShrink:1,
    },
    ContentBox:{
        flex:1,
        // backgroundColor: "#00ff00",
        flexDirection:"row",
        flexShrink:1,
    },
});