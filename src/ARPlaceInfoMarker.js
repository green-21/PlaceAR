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
        const clickEvent = this.props.clickEvent;
        console.log('clickEvent를 보자 :', clickEvent)
        return (
            <ViroNode position={this.props.position} onClick={clickEvent}>
                <ViroNode>
                    <ViroFlexView style={styles.Container} position={[0, 2, 0]} width={5} height={1.5}>
                        <ViroFlexView style={styles.TitleBox} >
                            <ViroText style={styles.TitleText} text={this.props.name} width={1} />
                        </ViroFlexView>
                        <ViroFlexView style={styles.ContentBox}>
                            <ViroImage source={require('../res/icon/star-full.png')} style={styles.StarIcon} scale={[1,1,1]} />
                            <ViroText style={styles.ContentText} text={`${this.props.rating} / 5.0`} width={1.5} />
                            <ViroText style={styles.ContentText} text={"영업중"} width={1} />
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
        flexShrink: 1,
        fontWeight: "bold",

        // textAlignVertical: 'center',
        // textAlign: 'center',
    },
    StarIcon: {
        width: 0.3,
        height: 0.3,
    },
    ContentText: {
        fontFamily: "Roboto, SamsungKorean, NotoSansCJK",
        fontSize: 30,
        color: '#111111',
    },
    Container: {
        backgroundColor: "#ffffffdd",
        flexDirection: "column",
        flexWrap: 'wrap',
        // justifyContent: 'center',
        padding: .2,
        // flexShrink: 2,
    },
    TitleBox: {
        flex: 1,
        // backgroundColor: "#ff0000",
        flexDirection: "row",
        flexShrink: 1,
    },
    ContentBox: {
        flex: 1,
        // backgroundColor: "#00ff00",
        flexDirection: "row",
        // flexShrink:1,
        textAlignVertical: 'center',
        alignContent: 'center',
    },
});