import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons';

import BottomTabNavigation from './BottomTabNavigation';

import About from "../views/secondary/About.js"
import Notification from "../views/secondary/Notification.js"
import Bug from "../views/secondary/Bug.js"
import Event from "../views/secondary/Event.js"


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawer}>
      <Drawer.Screen options={{headerShown: false}} name="Home" component={BottomTabNavigation} />
      <Drawer.Screen  options={{headerShown: false}} name="About" component={About}/>
      <Drawer.Screen  options={{headerShown: false}} name="Notification" component={Notification}/>
      <Drawer.Screen  options={{headerShown: false}} name="Bug" component={Bug}/>
      <Drawer.Screen  options={{headerShown: false}} name="Event" component={Event}/>
    </Drawer.Navigator>
  )
}

const CustomDrawer = ({navigation}) => {

  const [selectedPage, setSelectedPage] = useState("Acceuil");

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.closeButton}
      onPress={() => navigation.closeDrawer()}>
        <Ionicons name="close-outline" color="white" size={50}/>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>UVSQ Mobile</Text>
      </View>
      <View style={styles.buttonList}>
        <NavigationButton navigation={navigation} navigationName="HomeStack" name="Acceuil" select={selectedPage} setSelect={setSelectedPage} icon="home" iconOutline="home-outline"/>
        <NavigationButton navigation={navigation} navigationName="Event" name="Evénement à venir" select={selectedPage} setSelect={setSelectedPage} icon="ios-rocket" iconOutline="ios-rocket-outline"/>
        <NavigationButton navigation={navigation} navigationName="Notification" name="Notifications" select={selectedPage} setSelect={setSelectedPage} icon="notifications" iconOutline="notifications-outline"/>
        <NavigationButton navigation={navigation} navigationName="Bug" name="Signalez un bug" select={selectedPage} setSelect={setSelectedPage} icon="bug" iconOutline="bug-outline"/>
        <NavigationButton navigation={navigation} navigationName="About" name="A propos de l’app" select={selectedPage} setSelect={setSelectedPage} icon="information-circle" iconOutline="information-circle-outline"/>
      </View>
    </View>
  );
};

const NavigationButton = (props) => {

  const togglePage = () => {
    props.navigation.navigate(props.navigationName, { screen: props.navigationName });
    props.setSelect(props.name);
  }


  return(
    <TouchableOpacity style={{ backgroundColor: props.select === props.name ? "white" : "#69043d", width: "75%", borderRadius: 10, flexDirection: "row", padding: 10, alignItems: "center", marginBottom: 20 }}
    onPress={() => togglePage()}>
      <Ionicons name={props.select === props.name ? props.icon : props.iconOutline} color={props.select === props.name ? "black" : "white"} size={20}/>
      <Text style={{ color: props.select === props.name ? "black" : "white", marginLeft: 10 }}>{props.name}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#69043d", 
    flex: 1
  },
  closeButton: {
    height: "13%", 
    justifyContent: "flex-end", 
    alignItems: "flex-end", 
    paddingRight: 20
  },
  title: {
    height: "10%", 
    justifyContent: "center", 
    alignItems: "center"
  },
  titleText: {
    color: "white", 
    fontSize: 20, 
    fontWeight:"500"
  },
  buttonList: {
    height: "80%", 
    alignItems: "center"
  }
  
});


export default DrawerNavigator