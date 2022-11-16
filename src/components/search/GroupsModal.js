import React, { useState, useEffect, PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, Pressable, ScrollView, Modal, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios, * as others from 'axios';

const GroupsModal = (props) => {

  const [searchDataGroups, setSearchDataGroups] = useState([])
  const [totalGroup, setTotalGroup] = useState(0)

  const [currentSearch, setCurrentSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchGroups("new");
    console.log("attention")
  }, [currentSearch])

  async function fetchGroups(type) {

    if (currentSearch === "") {
      deleteSearch();
      return;
    }
    let number = type === "add" ? page + 1 : 1;
    if (type === "add") { setPage(page + 1) }

    let url = 'https://edt.uvsq.fr/Home/ReadResourceListItems?myResources=false&searchTerm='+currentSearch+'&pageSize=50&pageNumber='+number+'&resType=103'
    
    axios({
      method: "get",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
        var result = JSON.parse(JSON.stringify(response.data));
        setTotalGroup(result.total);
        if (type === "new") {
          setSearchDataGroups(result.results);
        } else if (type === "add") {
          console.log("GOOOOD " + number)
          setSearchDataGroups(searchDataGroups.concat(result.results));
        }
    })
    .catch(function (response) {
        console.log("error : " + response);
        return;
    });
  }

  function fetchMoreData() {
    if (totalGroup > searchDataGroups.length) {
      fetchGroups("add")
    }
  }

  const searchGroup = (text) => {
    setPage(1);
    setCurrentSearch(text.replaceAll(" ", "%20"));
  }

  const addGroup = (code, name) => {
    console.log("add : "+ code);
    let isExist = false;
    props.listGroup.map(item => { if (item.code === code) { isExist = true; }})
    if (!isExist) {
      props.setListGroup(oldArray => [...oldArray, { "code": code, "name": name }]);
    }
    props.toggleModal();
    props.setGroup(code)
    deleteSearch();
  }

  const deleteSearch = () => {
    setSearchDataGroups([]);
    setCurrentSearch("");
  }
  const deleteGroup = (code) => {
    if (code === props.group) {
      props.setTimetable([]);
      props.setGroup("");
    }
    props.setListGroup(props.listGroup.filter(item => item.code !== code));
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
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: props.theme.classic.textDark }}>Ajouter un groupe</Text>
          <TouchableOpacity style= {{flex: 1, alignItems: "flex-end"}} onPress={() => {deleteSearch(), props.toggleModal()}}>
            <Ionicons name="close" size={40} color={props.theme.classic.textDark}/>
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
              onChangeText={(word) => searchGroup(word, "new")}/>
              <View style={{ width: "100%"}}>
                {searchDataGroups.length > 0 && <Text style={[{ color: props.theme.classic.textDark }, styles.textTitleList]}>Recherche</Text>}
                {props.listGroup.length > 0 && searchDataGroups.length === 0 && <Text style={[{ color: props.theme.classic.textDark }, styles.textTitleList]}>Mes groupes</Text>}
              </View>
        
              <View style={{ height: "100%", width: "100%" }}>
                {currentSearch.length > 0 && 
                <FlatList
                  data={ searchDataGroups }
                  renderItem={({item}) => { return ( <GroupItem name={item.text} code={item.id} theme={props.theme} addGroup={addGroup}/>) }}  
                  keyExtractor={(item, index) => index}
                  ListFooterComponent={<RenderFooter totalGroup={totalGroup} searchDataGroups={searchDataGroups}/>}
                  onEndReached={() => fetchMoreData() }/>}

                {searchDataGroups.length === 0 && 
                  <FlatList
                    data={ props.listGroup }
                    renderItem={({item}) => { return ( <MyGroupsItem name={item.name} code={item.code} group={props.group} setGroup={props.setGroup} deleteGroup={deleteGroup} theme={props.theme}/>) }}                          keyExtractor={(item, index) => index}/>}

                {props.listGroup.length === 0 && currentSearch.length === 0 &&
                  <View style={{ alignItems: "center", height: "100%", marginTop: "10%"}}>
                    <Text style={[{ color: props.theme.classic.textDark }, styles.textButton]}>Vous n'avez pas de groupe</Text>
                  </View>
                }
              </View>
        
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const GroupItem = (props) => {
  return(
    <>
      <TouchableOpacity style={[{backgroundColor: props.theme.classic.foreground}, styles.buttonGroup, styles.shadow]}
      onPress={() => props.addGroup(props.code, props.name)}>
        <Text style={[{color: props.theme.classic.textDark}]}>{props.name}</Text>
      </TouchableOpacity>
      <View style={styles.line}/>
    </>
  );
}

const MyGroupsItem = (props) => {

  console.log("rende : "+ props.name)

  let isValue = props.group === props.code;

  return(
    <>
      <TouchableOpacity style={[{backgroundColor: isValue ? props.theme.classic.primary : props.theme.classic.foreground}, styles.buttonCurrentGroup, styles.shadow]}
      onPress={() => props.setGroup(props.code)}>
        <View style={{ flex: 1 }}>
          <Text style={[{color: isValue ? props.theme.classic.textLight : props.theme.classic.textDark}]}>{props.code}</Text>
        </View>
        <TouchableOpacity style={{ flex: .2}}
        onPress={() => {props.deleteGroup(props.code)}}>
          <Ionicons name="close" color={isValue ? props.theme.classic.textLight : props.theme.classic.textDark} size={30}/>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
}

const RenderFooter = (props) => {
  return(
    <View style={{height: 300, marginTop: 20, alignItems: "center"}}>
      {props.totalGroup > props.searchDataGroups.length && <ActivityIndicator/>}
      {props.totalGroup <= props.searchDataGroups.length && <Text style={{ fontWeight: "200"}}>Aucun autre groupe trouvé</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white", 
    height: "95%", 
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
    fontSize: 15,
  },
  textTitleList: {
    fontSize: 20,
    marginBottom: 10, 
    paddingLeft: 20
  },
  nextButton: {
    height: 50,
    width: "70%",
    borderRadius: 15,
    backgroundColor: "rgb(0,178,228)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 500,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: "5%",
    paddingLeft: 20,
    paddingRight: 20,
    color: "black",
    marginBottom: 10
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
    paddingLeft: "10%",
  },
  buttonCurrentGroup: {
    width: "90%", 
    height: 50,
    borderRadius: 15,
    marginBottom: 5,
    flexDirection: "row",
    paddingLeft: "10%",
    alignItems: 'center',
    marginLeft: "5%",

  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
},
});

export default GroupsModal;


/* RECHERCHE AVANCE
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
    setSearchDataGroups(output);*/