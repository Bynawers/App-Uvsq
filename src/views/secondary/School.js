import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import WeekList from "../../components/shared/WeekList.js"

import { useTheme } from 'react-native-paper';

export default function School({ navigation }) {

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
          <Text style={[{ color: theme.classic.textLight}, styles.title]}>Scolarité</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </View>
      <View style={styles.mainContainer}>
        <WeekList data={dataHorraire.school} theme={theme} type="school"/>
        <FindContact theme={theme}/>
      </View>
    </View>
  );
}

const FindContact = (props) => {

  const openFinder = () => {
  }

  return(
    <View style={styles.finderContainer}>
      <Text style={[{ paddingLeft: "10%", color: props.theme.classic.textLight }, styles.subTitle]}>Responsable Scolarité</Text>
      <TouchableOpacity style={[{ backgroundColor: props.theme.classic.secondary }, styles.findContactButton ]}
      onPress={() => openFinder()}>
        <Text style={[{ color: props.theme.classic.textLight }, styles.findContactText]}>Find Contact</Text>
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
  headerContainer: {
    height: "12%", 
    alignItems: "flex-end",
    width: "100%",
    flexDirection: "row",
    paddingBottom: 10,
  },
  finderContainer: {
    width: "100%", 
    margin: 10
  },

  title: {
    fontSize: 20, 
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 20, 
    fontWeight: "400",
  },
  findContactText: {
    fontSize: 20, 
    fontWeight: "300"
  },
  
  findContactButton: {
    height: "25%", 
    width: "40%", 
    alignSelf: "center", 
    borderRadius: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    flex: 1, 
    left: "10%",
  },
});