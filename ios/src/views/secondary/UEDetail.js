import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper';

export default function UEDetail({ navigation, route }) {

  const theme = useTheme();

  return (
    <View style={[{ backgroundColor: theme.classic.foreground }, styles.mainContainer]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{ flex: 1, left: "10%" }}
        onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" color={theme.classic.textDark} size={40}/>
        </TouchableOpacity>
        <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
          <Text style={[{color: theme.classic.textDark}, styles.title]}>{route.params.type}</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </View>

      <View style={styles.contentContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  title: {
    fontSize: 24, 
    fontWeight: "700",
  },
  text: {
    fontSize: 16, 
    fontWeight: "200",
    marginBottom: 20
  },
  headerContainer: {
    height: "20%", 
    alignItems: "center",
    width: "100%",
    flexDirection: "row"
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    paddingLeft: "10%",
    paddingRight : "10%",
  }
});