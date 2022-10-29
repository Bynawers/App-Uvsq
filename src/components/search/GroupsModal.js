import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";

import { useTheme } from 'react-native-paper';

const GroupsModal = (props) => {

  const theme = useTheme();

  const [groups, getGroups] = useState([])

  return (
    <Modal
      hasBackdrop={true}
      backdropOpacity={0.5}
      backdropColor="black"
      animationType="slide"
      transparent={true}
      onRequestClose={() => props.toggleModal() }
      onBackdropPress={() => props.toggleModal() }
      onSwipeComplete={() => props.toggleModal() }
      backdropTransitionOutTiming={0}
      useNativeDriverForBackdrop
      swipeDirection={['down']}
      backdropTransitionInTiming={2000}
      animationIn="zoomInDown"
      isVisible={props.modalGroups}
      style={{ margin: 0 }}>
      <View style={ styles.modalContainer }>
        <View style={styles.titleContainer}>
          <View style={{flex: 1}}/>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.classic.textDark }}>Ajouter un groupe</Text>
          <TouchableOpacity style= {{flex: 1, alignItems: "flex-end"}} onPress={() => props.toggleModal()}>
            <Ionicons name="close" size={40} color={theme.classic.textDark}/>
          </TouchableOpacity>
        </View>
        <View style={styles.line}/>
        <View style={{ alignItems: "center", backgroundColor: "#f2f2F2", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={groups}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"/>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.textButton}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white", 
    height: "40%", 
    width: "100%", 
    position: 'absolute', 
    bottom: 0, 
    borderRadius: 50
  },
  titleContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    margin: 20, 
    alignItems: "center"
  },
  line: {
    height: 1,
    backgroundColor: "#e2e2e2",
  },
  textButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  nextButton: {
    height: 60,
    width: "80%",
    borderRadius: 15,
    backgroundColor: "rgb(0,178,228)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: "10%"
  }
});

export default GroupsModal;

