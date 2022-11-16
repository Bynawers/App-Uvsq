import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper';

export default function About({ navigation }) {

  const theme = useTheme();

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.mainContainer]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{ flex: 1, left: "10%" }}
        onPress={() => navigation.openDrawer()}>
          <Ionicons name="chevron-back" color="white" size={40}/>
        </TouchableOpacity>
        <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>A propos</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          <Text>•</Text>
          <Text>  Application non-officiel de l’UVSQ - Ufr des sciences réalisé par un étudiant en 3ème année d’informatique</Text>
        </Text>
        <Text style={styles.text}>
          <Text>•</Text>
          <Text>  Pour toute suggestions, idées, amélioration; n'hésitez pas à me contacter via l'adresse mail suivante :</Text>
        </Text>
        <Text style={styles.text}>
          <Text>•</Text>
          <Text>  Projet open-source : github.com/Bynawers/App-Uvsq</Text>
        </Text>
      </View>
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
    color: "white"
  },
  text: {
    fontSize: 16, 
    fontWeight: "200",
    color: "white",
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