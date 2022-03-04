import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        //! IOS ONLY
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        
        //! ANDROID ONLY
        elevation: 50,
        borderRadius: 15,
    }
})

export default Card