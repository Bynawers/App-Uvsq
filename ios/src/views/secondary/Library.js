import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import WeekList from "../../components/shared/WeekList.js"

import { useTheme } from 'react-native-paper';

export default function Library({ navigation }) {

  const theme = useTheme();

  const dataHorraire = require("../../data/dataHorraire.json");

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.mainContainer]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.openDrawer()}>
          <Ionicons name="chevron-back" color="white" size={40}/>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[{color: theme.classic.textLight}, styles.title]}>BU Versailles</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </View>
      <View style={styles.mainContainer}>
        <WeekList data={dataHorraire.library} theme={theme} type="library"/>
        <Affluence theme={theme}/>
      </View>
    </View>
  );
}

const Affluence = (props) => {

  const link = 'itms-apps://apps.apple.com/id/app/affluences/id869919405';

  const openAffluence = () => {
    Linking.canOpenURL(link).then(supported => {
      supported && Linking.openURL(link);
    }, (err) => console.log(err));
  }

  return(
    <View style={styles.affluenceContainer}>
      <Text style={[{ color: props.theme.classic.textLight }, styles.subTitle]}>Réservez une salle</Text>
      <TouchableOpacity style={[{ backgroundColor: props.theme.classic.textLight }, styles.affluenceButton]}
      onPress={() => openAffluence()}>
        <Image source={require("../../../assets/affluences-logo.png")} style={styles.affluenceImage}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    flex: 5, 
    justifyContent: "center", 
    alignItems: "center",
    marginBottom: 10
  },
  affluenceContainer: {
    width: "100%", 
    margin: 10
  },
  headerContainer: {
    height: "12%", 
    alignItems: "flex-end",
    width: "100%",
    flexDirection: "row",
    paddingBottom: 10,
  },

  title: { 
    fontSize: 20,
    paddingLeft: "10%",
    fontWeight: "700"
  },
  subTitle: { 
    fontSize: 20,
    paddingLeft: "10%",
    fontWeight: "500"
  },

  affluenceButton: {
    height: "25%", 
    width: "40%", 
    alignSelf: "center", 
    borderRadius: 15,
    marginTop: 10,
  },
  backButton: {
    flex: 1, 
    left: "10%"
  },

  affluenceImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  }
});