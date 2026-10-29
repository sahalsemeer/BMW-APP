/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import HomeScreen from './src/features/home/screen/HomeScreen';
import store from './src/redux/store';

function App() {
  

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar />
        <View style={styles.container}>
          <HomeScreen />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
