import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Header = (props) => {

    return(
      <View style={styles.mainContainer}> 
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{ flex: 1, left: 20 }} onPress={() => props.navigation.openDrawer()}>
            <Ionicons name="menu" size={40} color="white"/>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={[ { color: props.theme.classic.textLight }, styles.title ]}>Accueil</Text>
          </View>
          <View style={{ flex: 1 }}/>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  headerContainer: {
    flexDirection: "row", 
    width: "100%", 
    height: 70, 
    alignItems:'center'
  },
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: "100%"
  },
  titleContainer: {
    height: "100%", 
    alignItems: "center", 
    alignContent: "center", 
    justifyContent: "center"
  },

  title: {
    marginTop: "2%",
    fontSize: 25,
    fontWeight: "800"
  },

  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  });

export default Header;