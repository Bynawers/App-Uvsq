import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CelcatElement = (props) => {

    let heightElement = props.type === "CM" ? 1.5*60 : 3*60;
    let background = props.type === "CM" ? '#8CE5FF' : 
    props.type === "TD" ? "#70B6FF" : 
    props.type === "TD Cartable Numérique" ? '#FDE6AD' : 
    props.type === "TP" ? "#81FF7A" :
    props.type === "Contrôle continu" ? "#FEA9FE" : "pink";
  
    return(
      <View style={[{  backgroundColor: background, height: heightElement }, styles.shadow, styles.celcatElementContainer ]}>
        <Text>{props.type}</Text>
        <Text>{props.course}</Text>
        <Text>{props.room}</Text>
        <Text style={{flex: 1, flexWrap: 'wrap'}}>{props.dateStart} - {props.dateEnd}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
    celcatElementContainer: { 
        width: "85%",  
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: "#858585", 
        marginTop: 10, 
        paddingLeft: 10, 
        paddingTop: 5 
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
});

export default CelcatElement;