import React from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../Constants/Theme";

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Theme.color4,
        padding: 20,

        //! IOS ONLY
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        
        //! ANDROID ONLY
        elevation: 10,
        borderRadius: 10,
    }
})

export default Card