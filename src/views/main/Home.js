import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';

import { useTheme } from 'react-native-paper';

import Header from "../../shared/Header.js";

export default function Home({ navigation }) {

  const theme = useTheme();

  useEffect(() => {
    console.log("Home")
  })

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.safeAreaStyle]}>
      <View style={[{ backgroundColor: theme.classic.primary }, styles.backgroundContainer]}>
        <Header theme={theme} navigation={navigation}/>
      </View>
      <View style={[{ backgroundColor: theme.classic.background }, styles.mainContainer]}>
        <View style={styles.titleContainer}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.title}>UFR des Sciences</Text>
          </View>
          <View style={{ height: 1, width: "80%", backgroundColor: "#D9D9D9"}}/>
        </View>

        <Text style={styles.subTitle}>Mes Applications</Text>
        <View style={[styles.contentAppContainer, styles.shadow]}>
          <LinkContainer type="app" name="ENT" image={require("../../../assets/ent.png")} url="https://www.uvsq.fr/etudiants"/>
          <LinkContainer type="app" name="Webmail" image={require("../../../assets/Partage.png")} url="https://webmail.partage.renater.fr/mail#1"/>
          <LinkContainer type="app" name="eCampus" image={require("../../../assets/ecampus.png")} url="https://ecampus.paris-saclay.fr/"/>
        </View>
       
        <Text style={styles.subTitle}>Mon dossier étudiant</Text>
        <View style={[styles.contentDossierContainer, styles.shadow]}>
          <LinkContainer type="dossier" name="📁  Notes et résultat" last={false} url="https://mondossierweb2.dsi.uvsq.fr/#!notesView"/>
          <LinkContainer type="dossier" name="📅  Calendrier Universitaire" last={false} url="https://www.uvsq.fr/calendriers-universitaires-de-lufr-des-sciences-2022-2023"/>
          <LinkContainer type="dossier" name="👤  Etat civil" last={true} url="https://mondossierweb2.dsi.uvsq.fr/#!etatCivilView"/>
        </View>

      </View>
    </View>
  );
}

const LinkContainer = (props) => {

  const openUrl = (url) => {
    Linking.openURL(url);
  }

  if (props.type === "app") {
    return(
      <View style={styles.linkContainer}>
        <TouchableOpacity style={[styles.shadow, styles.linkButton]}
        onPress={() => openUrl(props.url)}>
          <Image style={styles.image} source={props.image}/>
        </TouchableOpacity>
        <Text>{props.name}</Text>
      </View>
    );
  }
  else if (props.type === "dossier") {
    return(
      <View style={{ width: "100%" }}>
        <TouchableOpacity style={styles.dossierContainer} onPress={() => openUrl(props.url)}>
          <Text>{props.name}</Text>
        </TouchableOpacity>
        {!props.last && <View style={styles.line}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: "12%",
    width: "100%",
    alignItems: "center"
  },
  mainContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#f2f2f2"
  },
  titleContainer: {
    height: "7%",
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },
  titleTextContainer: {
    flex: 1, 
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center"
  },
  contentAppContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  contentDossierContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: "5%",
    marginRight: "5%",
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  linkContainer: {
    width: 100, 
    alignItems: "center", 
  },
  dossierContainer: {
    width: "90%",
    height: 50,
    justifyContent: "center"
  },

  title: {
    fontWeight: "100",
    fontSize: 25,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "300",
    paddingLeft: "10%",
    marginBottom: 10
  },

  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#D8D8D8",
    position: "absolute",
    bottom: 0
  },
  image: {
    height: "100%", 
    width: "100%", 
    borderRadius: 15
  },

  linkButton: {
    width: 100, 
    height: 100,
  },
});