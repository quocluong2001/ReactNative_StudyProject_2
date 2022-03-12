import { React } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    useWindowDimensions
} from "react-native";

import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import Theme from "../Constants/Theme";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {

    //! Responsive 
    const windowLayout = {
        height: useWindowDimensions().height,
        width: useWindowDimensions().width,
    }

    const imageContainerStyle = {
        ...styles.imageContainer,
        width: windowLayout.height > 320 ? 300 : windowLayout.height * 0.5,
        height: windowLayout.height > 320 ? 300 : windowLayout.height * 0.5,
        borderRadius: windowLayout.height / 2,
    }
    //! End resopnsive

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText style={{ fontSize: 20 }}>Game Over!</TitleText>
                <View style={imageContainerStyle}>
                    <Image
                        source={require('../assets/sloth.jpg')}
                        resizeMode="cover"
                        style={styles.image}
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        It takes <Text style={styles.hightlightText}>{props.guessRounds}</Text> rounds to guess the number <Text style={styles.hightlightText}>{props.guessNum}</Text>
                    </BodyText>
                </View>
                <MainButton
                    onPress={props.onRestart}
                    buttonStyle={styles.newGameButton}
                    buttonTextStyle={styles.newGameButtonText}
                >
                    NEW GAME
                </MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },

    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: Theme.color1,
        overflow: "hidden",
    },

    image: {
        width: '100%',
        height: '100%'
    },

    resultContainer: {
        width: '80%',
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    resultText: {
        fontSize: 18,
        textAlign: "center"
    },

    hightlightText: {
        fontFamily: 'open-sans-bold',
        color: Theme.color2
    },

    newGameButton: {
        backgroundColor: Theme.color2,
        borderRadius: 20
    },

    newGameButtonText: {
        color: Theme.color4
    }
})

export default GameOverScreen