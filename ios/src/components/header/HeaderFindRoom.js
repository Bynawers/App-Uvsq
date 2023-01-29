import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

const Header = (props) => {

  const toggleBatiment = (nameChange) => {
    if (props.batiment === nameChange) {
      props.setBatiment("");
    }
    else {
      props.setBatiment(nameChange);
    }
  }

  return(
    <View style={styles.mainContainer}>
      <View style={{ flex: 1.3, justifyContent: 'flex-end' }}>
        <Text style={[ { color: props.theme.classic.textLight }, styles.title ]}>Find Room</Text>
      </View>
      <View style={styles.headerButtonContainer}>
        <BatimentButton name="FERMAT" theme={props.theme} batiment={props.batiment} toggleBatiment={toggleBatiment}/>
        <BatimentButton name="BUFFON" theme={props.theme} batiment={props.batiment} toggleBatiment={toggleBatiment}/>
        <BatimentButton name="GERMAIN" theme={props.theme} batiment={props.batiment} toggleBatiment={toggleBatiment}/>
        <BatimentButton name="DESCARTES" theme={props.theme} batiment={props.batiment} toggleBatiment={toggleBatiment}/>
    </View>
    </View>
  );
}

const BatimentButton = (props) => {
  return(
    <TouchableOpacity style={[{ backgroundColor: props.batiment === props.name ? props.theme.classic.secondary : props.theme.classic.foreground }, styles.selectButton ]}
    onPress={() => props.toggleBatiment(props.name)}>
      <Text style={{ fontSize: RFValue(8), color: props.batiment === props.name ? props.theme.classic.textLight : props.theme.classic.textDark }}>{props.name}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  headerButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "85%"
  },
  title: {
    fontSize: RFValue(19),
    fontWeight: "800"
  },
  text: {
    fontSize: RFValue(10),
  },
  selectButton: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 30,
    justifyContent: "center",
    borderRadius: 10,
  },
  });

export default Header;