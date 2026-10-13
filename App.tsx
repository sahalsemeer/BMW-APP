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
import LoginScreen from './src/features/auth/screen/LoginScreen';

function App() {
  

  return (
    <SafeAreaProvider>
      <StatusBar  />
      <View style={styles.container}>
      <LoginScreen />
    </View>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
