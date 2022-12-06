import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Header = (props) => {

    return(
      <View style={styles.mainContainer}> 
        <View style={{ flexDirection: "row", width: "100%", height: 70, alignItems:'center' }}>
          <TouchableOpacity style={{ flex: 1, left: 20 }} onPress={() => props.navigation.openDrawer()}>
            <Ionicons name="menu" size={40} color="white"/>
          </TouchableOpacity>
          <View style={{ height: "100%", alignItems: "center", alignContent: "center", justifyContent: "center"}}>
            <Text style={[ { color: props.theme.classic.textLight }, styles.title ]}>Acceuil</Text>
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
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  headerButtonContainer: {
    marginTop: "7%",
    flexDirection: 'row',
    justifyContent: "space-between",
    width: "100%"
  },
  title: {
    marginTop: "2%",
    fontSize: 25,
    fontWeight: "800"
  },
  });

export default Header;