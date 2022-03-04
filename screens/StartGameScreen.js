import { React, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";

import Card from '../components/Card'
import Theme from "../Constants/Theme";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    let confirmedOutput

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You have selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME"></Button>
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
        // resetInputHandler('')
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title}> Start a New Game! </Text>
                <Card style={styles.inputContainer}>
                    <Text> Enter a Number </Text>
                    <Input style={styles.input}
                        blurOnSummit autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={inputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                color={Theme.color2}
                                title="Reset"
                                onPress={resetInputHandler}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                color={Theme.color1}
                                title="Confirm"
                                onPress={confirmInputHandler}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },

    title: {
        fontSize: 20,
        marginVertical: 10
    },

    inputContainer: {
        width: 500,
        maxWidth: '80%',
        alignItems: 'center',
        backgroundColor: Theme.color4,
        padding: 15,
    },

    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10
    },

    button: {
        width: '35%'
    },

    input: {
        width: 50,
        textAlign: "center"
    },

    summaryContainer: {
        width: 150,
        backgroundColor: Theme.color4,
        marginVertical: 20,
        alignItems: "center",
        padding: 10
    }
})

export default StartGameScreen