import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper';

export default function About({ navigation }) {

  const theme = useTheme();

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.mainContainer]}>

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.buttonBack}
        onPress={() => navigation.openDrawer()}>
          <Ionicons name="chevron-back" color={theme.classic.textLight} size={40}/>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: theme.classic.textLight}]}>A propos</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.text, { marginBottom: 20, color: theme.classic.textLight }]}>
          <Text>•</Text>
          <Text style={{ fontWeight: "400" }}>  Application non-officiel de l’UVSQ</Text>
          <Text> - Ufr des sciences réalisé par un étudiant en 3ème année d’informatique</Text>
        </Text>
        <Text style={[styles.text, { marginBottom: 20, color: theme.classic.textLight }]}>
          <Text>•</Text>
          <Text>  Pour toute suggestions, amélioration, n'hésitez pas à me contacter via l'adresse mail suivante :</Text>
        </Text>
        <View style={styles.mailContainer}>
          <Text style={{ fontWeight: "400", color: theme.classic.textLight }}> Bynawers.fratczak@gmail.com</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.githubButton}
      onPress={() => Linking.openURL("https://github.com/Bynawers/App-Uvsq")}>
        <Ionicons name="logo-github" color={theme.classic.textLight} size={50}/>
        <View style={styles.githubContainer}>
          <Text style={[styles.text, {color: theme.classic.textLight}]}>Projet Open Source</Text>
          <Text style={[styles.title, { fontSize: 15, color: theme.classic.textLight }]}>Bynawers</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  headerContainer: {
    height: "20%", 
    width: "100%",
    alignItems: "center",
    flexDirection: "row"
  },
  titleContainer: {
    flex: 5, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    paddingLeft: "10%",
    paddingRight : "10%",
  },
  githubContainer: {
    flexDirection: "column", 
    marginLeft: 15
  },
  mailContainer: {
    width: "100%",
    alignItems: "center"
  },

  title: {
    fontSize: 24, 
    fontWeight: "700"
  },
  text: {
    fontSize: 16, 
    fontWeight: "200",
  },

  githubButton: {
    position: "absolute", 
    bottom: 0, 
    marginBottom: "10%", 
    flexDirection: "row", 
    alignItems: "center"
  },
  buttonBack: {
    flex: 1, 
    left: "10%" 
  }
});