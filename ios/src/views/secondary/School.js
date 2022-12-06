import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import WeekList from "../../components/shared/WeekList.js"
import ModalFindContact from "../../components/shared/ModalFindContact";

import { useTheme } from 'react-native-paper';

export default function School({ navigation }) {

  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
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
        <Text style={[{color: theme.classic.textLight}, styles.lightText]}>ATTENTION : Fermé tout les jours de 12:30 à 13:30</Text>
      </View>
    </View>
  );
}

const FindContact = (props) => {

  return(
    <View style={styles.finderContainer}>
      <Text style={[{ paddingLeft: "10%", color: props.theme.classic.textLight }, styles.subTitle]}>Responsable Scolarité</Text>
      <TouchableOpacity style={[{ backgroundColor: props.theme.classic.foreground }, styles.findContactButton ]}
      onPress={() => props.setModalVisible(true)}>
        <Text style={[{ color: props.theme.classic.textDark }, styles.findContactText]}>Find Contact</Text>
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
  lightText: {
    fontSize: 12,
    fontWeight: "200",
  },
  
  findContactButton: {
    height: "25%", 
    width: "40%", 
    alignSelf: "center", 
    borderRadius: 20,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    flex: 1, 
    left: "10%",
  },
});

// <FindContact theme={theme} setModalVisible={setModalVisible}/>
// <ModalFindContact isVisible={modalVisible} setIsVisible={setModalVisible} theme={theme}/>