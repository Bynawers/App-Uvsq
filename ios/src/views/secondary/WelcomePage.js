import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { useTheme } from 'react-native-paper';

export default function WelcomePage({ navigation }) {

  const theme = useTheme();

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.mainContainer]}>

      <View style={styles.headerContainer}>
        <View style={[{ height: 100, marginRight: "5%" }, styles.shadow]}>
          <Image source={require("../../../assets/uvsq-logo.png")} style={[styles.image, styles.shadow]}/>
        </View>
        <View style={styles.title}>
          <Text style={[{color: theme.classic.textLight}, styles.titleText]}>EDT Uvsq</Text>
          <Text style={[{color: theme.classic.textLight}, styles.subTitleText]}>2022 - 2023</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[{color: theme.classic.textLight, alignSelf: "center", marginBottom: "20%"}, styles.title ]}>Bienvenue</Text>
          <Text style={[styles.text, { marginBottom: "20%", alignSelf: "flex-start", color: theme.classic.textLight }]}>Trouves ton emploi du temps</Text>
          <Text style={[styles.text, { marginBottom: "20%", alignSelf: "flex-end", color: theme.classic.textLight }]}>Cherches une salle vide</Text>
          <Text style={[styles.text, { marginBottom: "20%", alignSelf: "flex-start", color: theme.classic.textLight }]}>Centralises toutes tes données</Text>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity style={[{ backgroundColor: theme.classic.textLight}, styles.nextButton]}
          onPress={() => navigation.navigate("HomeStack")}>
            <Text style={[{color: theme.classic.textDark}, styles.nextText]}>Suivant</Text>
          </TouchableOpacity>
          <Text style={[{color: theme.classic.textLight}, styles.madeByText]}>Made by Bynawers</Text>
        </View>
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
  headerContainer: {
    height: "30%", 
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  titleContainer: {
    flex: 5, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    paddingLeft: "10%",
    paddingRight : "10%",
  },

  titleText: {
    fontSize: 20, 
    fontWeight:"500"
  },
  subTitleText: {
    fontSize: 18, 
    fontWeight:"200"
  },
  title: {
    fontSize: 50, 
    fontWeight: "200"
  },
  text: {
    fontSize: 16, 
    fontWeight: "200",
  },
  nextText: {
    fontSize: 20,
    fontWeight: "300"
  },
  madeByText: {
    fontSize: 15,
    fontWeight: "200",
    position: "absolute",
    bottom: "15%",
    alignSelf: "center"
  },

  image: {
    height: 100, 
    width: 100, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#510a32",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  nextButton: {
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    position:"absolute",
    bottom : '30%',
    justifyContent: "center"
  }
});