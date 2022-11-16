import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from "./src/containers/DrawerNavigation.js";

const themes = require("./src/shared/themes.json");

export default function App() {
  return (
    <PaperProvider theme={themes}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
});
