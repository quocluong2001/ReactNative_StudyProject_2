import React from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../Constants/Theme";
import TitleText from "./TitleText";

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 10,
        backgroundColor: Theme.color0,
        alignItems: "center",
        justifyContent: "center"
    },

    headerTitle: {
        fontSize: 18
    }
})

export default Header