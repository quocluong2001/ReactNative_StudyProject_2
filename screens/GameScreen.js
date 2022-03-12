import { React, useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import Theme from "../Constants/Theme";
import BodyText from "../components/BodyText";

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
    const generateInitial = generateRandomNumberBtw(1, 100, props.userNum)
    const [guessNum, setGuessNum] = useState(generateInitial)
    const [pastGuess, setPastGuess] = useState([generateInitial.toString()])
    const currentLow = useRef(1)
    const currenHigh = useRef(100)

    const { userNum, onGameOver } = props

    useEffect(() => {
        if (guessNum === userNum) {
            onGameOver(pastGuess.length)
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
            currentLow.current = guessNum + 1
        }
        const nextNum = generateRandomNumberBtw(
            currentLow.current,
            currenHigh.current,
            guessNum
        )
        setGuessNum(nextNum)
        setPastGuess([nextNum.toString(), ...pastGuess])
    }

    const renderListItem = (listLength, itemData) => {
        return (
            <View style={styles.listItem}>
                <BodyText>#{listLength - itemData.index}</BodyText>
                <BodyText>{itemData.item}</BodyText>
            </View>
        )
    }

    //! Responsive
    const windowLayout = {
        width: useWindowDimensions().width,
        height: useWindowDimensions().height,
    }

    const listContainerStyle = {
        ...styles.listContainer,
        width: windowLayout.width >= 320 ? '60%' : '80%',
    }

    if (windowLayout.width > 500) {
        return (
            <View style={styles.screen}>
                <TitleText>Computer's Guess</TitleText>
                <View style={styles.buttonContainerLandscape}>
                    <MainButton
                        onPress={() => nextGuessHandler('lower')}
                        buttonStyle={styles.lowerButton}
                        buttonTextStyle={{ color: 'white' }}
                    >
                        <Ionicons name="remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer style={{ marginVertical: 10 }}>{guessNum}</NumberContainer>
                    <MainButton
                        onPress={() => nextGuessHandler('greater')}
                        buttonStyle={styles.greaterButton}
                        buttonTextStyle={{ color: 'white' }}
                    >
                        <Ionicons name="add" size={24} color='white' />
                    </MainButton>
                </View>
                <View style={listContainerStyle}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={pastGuess}
                        renderItem={itemData => renderListItem(pastGuess.length, itemData)}
                        keyExtractor={(itemData) => itemData}
                    />
                </View>
            </View>
        )
    }

    //! Responsive end

    return (
        <View style={styles.screen}>
            <TitleText>Computer's Guess</TitleText>
            <NumberContainer style={{ marginVertical: 10 }}>{guessNum}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton
                    onPress={() => nextGuessHandler('lower')}
                    buttonStyle={styles.lowerButton}
                    buttonTextStyle={{ color: 'white' }}
                >
                    <Ionicons name="remove" size={24} color="white" />
                </MainButton>
                <MainButton
                    onPress={() => nextGuessHandler('greater')}
                    buttonStyle={styles.greaterButton}
                    buttonTextStyle={{ color: 'white' }}
                >
                    <Ionicons name="add" size={24} color='white' />
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={pastGuess}
                    renderItem={itemData => renderListItem(pastGuess.length, itemData)}
                    keyExtractor={(itemData) => itemData}
                />
            </View>
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
        width: 270,
        maxWidth: '80%',
    },

    buttonContainerLandscape: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: '80%'
    },

    lowerButton: {
        backgroundColor: Theme.color1,
        borderRadius: 20,
    },

    greaterButton: {
        backgroundColor: Theme.color2,
        borderRadius: 20,
    },

    listContainer: {
        flex: 1,
    },

    list: {
        flexGrow: 1,
        // alignItems: "center",
        justifyContent: "flex-end"
    },

    listItem: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Theme.color1,
        marginVertical: 10,
        padding: 10,
        justifyContent: "space-between",
        width: '100%'
    },
})

export default GameScreen