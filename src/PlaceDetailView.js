'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput, Modal, Text, Pressable } from 'react-native';


export default class PlaceDetailView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { modalVisible, closeModal, place } = this.props;
        console.log("place :", place);
        return (
            <Modal visible={modalVisible}
                animationType='slide'
                presentationStyle='overFullScreen'
                transparent={true}
            >
                <Pressable
                    style={styles.paddingSpace}
                    onPress={closeModal}
                />
                <View style={styles.modal}>
                    <Text>{place.name}</Text>

                    <Button
                        title="Hide Modal"
                        onPress={closeModal}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    paddingSpace: {
        flex: 2,
        backgroundColor: 'transparent',
    },
    modal: {
        flex: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginLeft: '4%',
        marginRight: '4%',
        paddingTop: 50,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
    },
})