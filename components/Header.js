import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

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
        marginTop: Dimensions.get('window').height > 550 ? 33 : 21 ,
        backgroundColor: Theme.color0,
        alignItems: "center",
        justifyContent: "center"
    },

    headerTitle: {
        fontSize: 18
    }
})

export default Header