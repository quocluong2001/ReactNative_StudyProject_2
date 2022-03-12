import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.button, ...props.buttonStyle}}>
                <Text style={{...styles.buttonText, ...props.buttonTextStyle}}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    buttonText: {
        fontFamily: 'open-sans',
        textAlign: 'center'
    }
})

export default MainButton