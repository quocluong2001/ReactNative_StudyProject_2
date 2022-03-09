import { React, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import fetchFonts from './utils/fetchFonts';

const useFont = async () => {
  await fetchFonts()
}

export default function App() {
  const [userNum, setUserNum] = useState()
  const [rounds, setRounds] = useState(0)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={useFont}
        onFinish={() => setIsDataLoaded(true)}
        onError={error => console.log(error)}
      />
    )
  }

  const newGameHandler = () => {
    setUserNum(null)
    setRounds(0)
  }

  const startGameHandler = (selectedNum) => {
    setUserNum(selectedNum)
  }

  const gameOverHandler = numOfRounds => {
    setRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNum && rounds == 0) {
    content = <GameScreen userNum={userNum} onGameOver={gameOverHandler} />
  }
  else if (rounds > 0) {
    content = <GameOverScreen
      guessNum={userNum}
      guessRounds={rounds}
      onRestart={newGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
