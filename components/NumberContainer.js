import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Theme from "../Constants/Theme";

const NumberContainer = props => {
    return (
        <View style={{...styles.container, ...props.style}}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: Theme.color1,
        borderRadius: 10,
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },

    number: {
        fontSize: 20
    }
})

export default NumberContainer