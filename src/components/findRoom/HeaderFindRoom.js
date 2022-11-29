import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

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
      <Text style={[ { color: props.theme.classic.textLight }, styles.title ]}>Find Room</Text>
      <View style={[ styles.headerButtonContainer ]}>
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
      <Text style={{ fontSize: 10, color: props.batiment === props.name ? props.theme.classic.textLight : props.theme.classic.textDark }}>{props.name}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  headerButtonContainer: {
    marginTop: "4%",
    flexDirection: 'row',
    justifyContent: "space-between",
    width: "80%",
  },
  title: {
    marginTop: "15%",
    fontSize: 25,
    fontWeight: "800"
  },
  selectButton: {
    padding: 10,
    borderRadius: 10,
  },
  selectFind: {
    padding: 10,
    borderRadius: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 15
  }
  });

export default Header;