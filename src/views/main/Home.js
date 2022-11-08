import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

import { useTheme } from 'react-native-paper';

import Header from "../../shared/Header.js";

export default function Home() {

  const theme = useTheme();

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.safeAreaStyle]}>
      <View style={[{ backgroundColor: theme.classic.primary }, styles.backgroundContainer]}>
        <Header theme={theme}/>
      </View>
      <View style={[{ backgroundColor: theme.classic.background }, styles.mainContainer]}>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: "12%",
    width: "100%",
    alignItems: "center"
  },
  safeAreaStyme: {
    alignItems: 'center', 
    flex: 1
  },
  mainContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#f2f2f2"
  }
  
});