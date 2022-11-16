import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';

import { useTheme } from 'react-native-paper';

export default function Bug({ navigation }) {

  const theme = useTheme();

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.mainContainer]}>
        <Text style={{ fontSize: 20, color: "white"}}>Bug Report</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});