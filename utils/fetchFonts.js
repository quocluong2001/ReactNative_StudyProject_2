import * as Font from 'expo-font';

const fetchFonts = async () => {
    await Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf')
    })
  }

export default fetchFonts