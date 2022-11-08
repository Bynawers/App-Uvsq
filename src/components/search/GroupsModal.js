import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, Pressable, FlatList, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper';

const GroupsModal = (props) => {

  const theme = useTheme();

  const [searchDataGroups, setSearchDataGroups] = useState([])
  const [selectGroup, setSelectGroup] = useState("");

  let dataGroups = require("../../data/groups.json");

  const searchList = (text) => {

    setSelectGroup("");

    let keyHighlight = [];
    let output = [];

    text.toUpperCase().split(" ").map((item, index) => {
      if (item.match(/[a-z0-9]/i)) { 
        keyHighlight.push(item);
      }
    })

    if (keyHighlight.length === 0) { return; }
    
    for (let i = 0; i < dataGroups.length; i++) {

      let hasKeyword = true;
      let hasLastKey = false;
      let group = dataGroups[i].name.split(" ");
      group.map((item, index) => { 
        group[index] = item.toUpperCase();
        if (group[index].startsWith(keyHighlight[keyHighlight.length - 1].toUpperCase()) === true) {
          hasLastKey = true;
        }
      })
      
      keyHighlight.map((item, index) => { 
        if (index !== keyHighlight.length - 1) {
          if (group.includes(item) === false) {
            hasKeyword = false;
          }
        }
      });

      if (hasKeyword && hasLastKey) {
        output.push(dataGroups[i]);
      }
    }
    setSearchDataGroups(output);
  }

  const addGroup = (code) => {
    let isExist = false;
    props.listGroup.map(item => { if (item.code === code) { isExist = true; }})
    if (!isExist) {
      props.setListGroup(oldArray => [...oldArray, { "code": code }]);
    }
    props.toggleModal();
    props.setGroup(code)
  }

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
      visible={props.modalGroups}
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
        
        <Pressable style={styles.listGroup}
        onPress={() => Keyboard.dismiss()}>
          <View style={{ width: "100%", alignItems: "center"}}>
            <TextInput
              style={[styles.input, styles.shadow]}
              placeholder="chercher un groupe"
              placeholderTextColor="#919191" 
              onChangeText={(word) => searchList(word)}/>
              <View style={{ height: "100%", width: "100%" }}>
                <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1, paddingBottom: 150 }}>
                  <View onStartShouldSetResponder={() => true} style={{ marginTop: 30 }}>
                    {searchDataGroups.map((item, index) => {
                      return(
                        <React.Fragment key={index}> 
                          <GroupItem name={item.name} code={item.code} setSelectGroup={setSelectGroup} selectGroup={selectGroup} theme={theme}/>
                        </React.Fragment>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
                {selectGroup &&
                <TouchableOpacity style={styles.nextButton}
                onPress={() => addGroup(selectGroup) }>
                  <Text style={styles.textButton}>Add group</Text>
                </TouchableOpacity>}
            </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const GroupItem = (props) => {
  return(
    <>
      <TouchableOpacity style={[{backgroundColor: props.selectGroup === props.code ? props.theme.classic.secondary : props.theme.classic.foreground}, styles.buttonGroup]}
      onPress={() => props.setSelectGroup(props.code)}>
        <Text style={[{color: props.selectGroup === props.code ? props.theme.classic.textLight : props.theme.classic.textDark}]}>{props.name}</Text>
      </TouchableOpacity>
      <View style={styles.line}/>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white", 
    height: "88%", 
    width: "100%", 
    position: 'absolute', 
    bottom: 0, 
    borderRadius: 50,
    alignItems: "center"
  },
  titleContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    margin: 20, 
    alignItems: "center"
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#e2e2e2",
  },
  textButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  nextButton: {
    height: 50,
    width: "70%",
    borderRadius: 15,
    backgroundColor: "rgb(0,178,228)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 70,
    marginBottom: "10%"
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: "5%",
    paddingLeft: 20,
    paddingRight: 20,
    color: "black"
  },
  listGroup: {
    backgroundColor: "#f2f2F2", 
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  buttonGroup: {
    width: "100%", 
    height: 50,
    justifyContent: "center",
    paddingLeft: "10%"
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
},
});

export default GroupsModal;

