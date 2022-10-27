import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigation from './src/containers/BottomTabNavigation.js';

const themes = require("./src/shared/themes.json");

export default function App() {
  return (
    <PaperProvider theme={themes}>
      <NavigationContainer>
        <BottomTabNavigation/>
      </NavigationContainer>
      <StatusBar style="light" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
});
