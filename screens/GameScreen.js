import { React, useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import Theme from "../Constants/Theme";

const generateRandomNumberBtw = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randNum = Math.floor(Math.random() * (max - min) + min)
    if (randNum === exclude) {
        return generateRandomNumberBtw(min, max, exclude)
    }
    return randNum
}

const GameScreen = props => {
    const [guessNum, setGuessNum] = useState(
        generateRandomNumberBtw(1, 100, props.userNum)
    )
    const [rounds, setRounds] = useState(0)

    const currentLow = useRef(1)
    const currenHigh = useRef(100)

    const { userNum, onGameOver } = props

    useEffect(() => {
        if (guessNum === props.userNum) {
            props.onGameOver(rounds)
        }
    }, [guessNum, userNum, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && guessNum < props.userNum) ||
            (direction === 'greater' && guessNum > props.userNum)) {
            Alert.alert(
                "Be honest",
                "I know you\'re lying!",
                [{ text: "Okay", style: 'cancel' }]
            )
            return
        }
        if (direction === 'lower') {
            currenHigh.current = guessNum
        }
        else {
            currentLow.current = guessNum
        }
        const nextNum = generateRandomNumberBtw(
            currentLow.current,
            currenHigh.current,
            guessNum
        )
        setGuessNum(nextNum)
        setRounds(rounds + 1)
    }

    return (
        <View style={styles.screen}>
            <TitleText>Computer's Guess</TitleText>
            <NumberContainer>{guessNum}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton
                    onPress={() => nextGuessHandler('lower')}
                    buttonStyle={styles.lowerButton}
                    buttonTextStyle={{color: 'white'}}>
                    LOWER
                </MainButton>
                <MainButton
                    onPress={() => nextGuessHandler('greater')}
                    buttonStyle={styles.greaterButton}
                    buttonTextStyle={{color: 'white'}}>
                    GREATER
                </MainButton>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        width: 270,
        maxWidth: '80%',
    },

    lowerButton: {
        backgroundColor: Theme.color1,
        borderRadius: 20,
    },

    greaterButton: {
        backgroundColor: Theme.color2,
        borderRadius: 20,
    }
})

export default GameScreen