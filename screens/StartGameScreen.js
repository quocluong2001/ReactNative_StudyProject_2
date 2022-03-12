import { React, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";

import Card from '../components/Card'
import Theme from "../Constants/Theme";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    let confirmedOutput

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <TitleText>You have selected</TitleText>
                <NumberContainer style={{ marginVertical: 10 }}>{selectedNumber}</NumberContainer>
                <MainButton
                    onPress={() => props.onStartGame(selectedNumber)}
                    buttonTextStyle={styles.buttonText}
                    buttonStyle={styles.startGameButton}
                >
                    START GAME
                </MainButton>
            </Card>
        )
    }

    const inputHandler = textInput => {
        setEnteredValue(textInput.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        resetSelectedNumber()
    }

    const resetSelectedNumber = () => {
        setSelectedNumber()
    }

    const confirmInputHandler = () => {
        const number = parseInt(enteredValue)
        if (isNaN(number) || number <= 0) {
            Alert.alert('Invalid number',
                'Accept 1 to 99 only',
                [{ text: 'Okay', style: 'cancel', onPress: resetInputHandler }])
            return
        }
        setConfirmed(true)
        setSelectedNumber(number)
        Keyboard.dismiss()
    }


    return (
        <KeyboardAvoidingView behavior="position">
            <ScrollView>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <TitleText style={{ marginVertical: 10 }}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Enter a Number</BodyText>
                            <Input style={styles.input}
                                blurOnSummit
                                autoCorrect={false}
                                autoCapitalize='none'
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={inputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <MainButton
                                    onPress={resetInputHandler}
                                    buttonStyle={styles.resetButton}
                                    buttonTextStyle={styles.buttonText}
                                >
                                    Reset
                                </MainButton>
                                <MainButton
                                    onPress={confirmInputHandler}
                                    buttonStyle={styles.confirmButton}
                                    buttonTextStyle={styles.buttonText}
                                >
                                    Confirm
                                </MainButton>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },

    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: Theme.color4,
        padding: 15,
    },

    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 10,
        marginTop: 10
    },

    input: {
        width: 50,
        textAlign: "center"
    },

    summaryContainer: {
        width: 200,
        marginVertical: 20,
        alignItems: "center",
        padding: 10
    },

    buttonText: {
        color: Theme.color4
    },

    startGameButton: {
        backgroundColor: Theme.color2,
        borderRadius: 20
    },

    resetButton: {
        backgroundColor: Theme.color1,
        borderRadius: 20,
        width: 94
    },

    confirmButton: {
        backgroundColor: Theme.color2,
        borderRadius: 20,
        width: 94
    }
})

export default StartGameScreen