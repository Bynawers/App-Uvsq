import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons';

import BottomTabNavigation from './BottomTabNavigation';

import About from "../views/secondary/About.js"
import Notification from "../views/secondary/Notification.js"
import Event from "../views/secondary/Event.js"
import Library from "../views/secondary/Library.js"
import School from "../views/secondary/School.js"
import WelcomePage from "../views/secondary/WelcomePage.js"

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawer}>
      <Drawer.Screen options={{headerShown: false, swipeEnabled: true }} name="Home" component={BottomTabNavigation} />
      <Drawer.Screen  options={{headerShown: false}} name="About" component={About} />
      <Drawer.Screen  options={{headerShown: false}} name="Notification" component={Notification}/>
      <Drawer.Screen  options={{headerShown: false}} name="Event" component={Event}/>
      <Drawer.Screen  options={{headerShown: false}} name="Library" component={Library}/>
      <Drawer.Screen  options={{headerShown: false}} name="School" component={School}/>
      <Drawer.Screen  options={{headerShown: false}} name="WelcomePage" component={WelcomePage}/>
    </Drawer.Navigator>
  )
}

const CustomDrawer = ({navigation}) => {

  const [selectedPage, setSelectedPage] = useState("Acceuil");

  const lockWelcomePage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('welcomePageStore', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('welcomePageStore').then((value) => {
      if (JSON.parse(value) === false) {
        lockWelcomePage(true)
        navigation.navigate("WelcomePage");
      }
    });
  },[])

  return (
    <View style={[{ backgroundColor: "#69043D" }, styles.mainContainer]}>

      <TouchableOpacity style={styles.closeButton}
      onPress={() => navigation.closeDrawer()}>
        <Ionicons name="close-outline" color="white" size={50}/>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <View style={[{ height: 100, marginRight: "5%" }, styles.shadow]}>
          <Image source={require("../../assets/uvsq-logo.png")} style={[styles.image, styles.shadow]}/>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>EDT Uvsq</Text>
          <Text style={styles.subTitleText}>2022 - 2023</Text>
        </View>
      </View>

      <View style={styles.buttonList}>
        <NavigationButton navigation={navigation} navigationName="HomeStack" name="Acceuil" select={selectedPage} setSelect={setSelectedPage} icon="home" iconOutline="home-outline"/>
        <NavigationButton navigation={navigation} navigationName="Library" name="Bibliothèque" select={selectedPage} setSelect={setSelectedPage} icon="library" iconOutline="library-outline"/>
        <NavigationButton navigation={navigation} navigationName="School" name="Scolarité" select={selectedPage} setSelect={setSelectedPage} icon="school" iconOutline="school-outline"/>
        <NavigationButton navigation={navigation} navigationName="Notification" name="Notifications" select={selectedPage} setSelect={setSelectedPage} icon="notifications" iconOutline="notifications-outline"/>
        <NavigationButton navigation={navigation} navigationName="Bug" name="Signalez un bug" select={selectedPage} setSelect={setSelectedPage} icon="bug" iconOutline="bug-outline"/>
        <NavigationButton navigation={navigation} navigationName="About" name="A propos de l’app" select={selectedPage} setSelect={setSelectedPage} icon="information-circle" iconOutline="information-circle-outline"/>
      </View>
    </View>
  );
};

const NavigationButton = (props) => {

  const togglePage = () => {
    if (props.navigationName === "Bug") { 
      Linking.canOpenURL('mailto:bynawers.fratczak@gmail.com')
      .then(supported => {
        if (!supported) {
          console.log('Cant handle url')
        } else {
          return Linking.openURL('mailto:bynawers.fratczak@gmail.com')
            .catch(e => { console.log("error mail") })
        }
      })
      .catch(e => { console.log("error mail")})
    } else {
      props.navigation.navigate(props.navigationName, { screen: props.navigationName });
      props.setSelect(props.name);
    }
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
    flex: 1,
  },
  headerContainer: {
    height: 120, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center",
    marginBottom: "5%"
  },
  closeButton: {
    height: "13%", 
    justifyContent: "flex-end", 
    alignItems: "flex-end", 
    paddingRight: 20
  },
  
  title: {
    height: "100%", 
    justifyContent: "center", 
    alignItems: "center"
  },
  titleText: {
    color: "white", 
    fontSize: 20, 
    fontWeight:"500"
  },
  subTitleText: {
    color: "white", 
    fontSize: 18, 
    fontWeight:"200"
  },

  buttonList: {
    height: "80%", 
    alignItems: "center"
  },

  shadow: Platform.OS === 'ios' ? {
		shadowColor: '#171717',
		shadowOffset: {width: 0, height: 3},
		shadowOpacity: 0.4,
		shadowRadius: 2,
	  } : {
		elevation: 3,
	  },
  image: {
    height: 100, 
    width: 100, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#510a32",
  }
  
});


export default DrawerNavigator