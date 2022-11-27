import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

const CelcatElement = (props) => {

    let start = new Date(props.day+" "+props.dateStart);
    let end = new Date(props.day+" "+props.dateEnd);
    let difference = (end.getTime() - start.getTime())/(1000*60*60);

    let heightElement = difference <= 1.5 ? 1.7*60 : difference*60;

    let background = props.type === "CM" ? '#8CE5FF' : 
    props.type === "TD" ? "#70B6FF" :
    props.type === "TD Cartable Numérique" ? '#FDE6AD' : 
    props.type === "TP" ? "#81FF7A" :
    props.type === "Contrôle continu" ? "#FEA9FE" : "pink";

    const openDetail = () => {
      props.navigation.navigate("DetailStack", { type: props.type, course: props.course, room: props.room, group: props.group });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  
    return(
      <Pressable style={[{  backgroundColor: background, height: heightElement }, styles.shadow, styles.celcatElementContainer ]}
      onLongPress={() => openDetail()}>
        <Text style={{ flexShrink: 1}}>
            <Text style={{ fontWeight: "500" }}>{props.dateStart} - {props.dateEnd} - {props.type}{"\n"}</Text>
            <Text style={{ fontWeight: "500" }}>Cours : </Text>
            <Text style={{ flexShrink: 1, fontWeight: "300" }}>{props.course}{"\n"}</Text>
            <Text style={{ fontWeight: "500" }}>Salle : </Text>
            <Text style={{ flexShrink: 1, fontWeight: "300" }}>{props.room}{"\n"}</Text>
            <Text style={{ fontWeight: "500" }}>Groupe : </Text>
            <Text style={{ flexShrink: 1, fontWeight: "300" }}>{props.group}</Text>
        </Text>
      </Pressable>
    );
  }

const styles = StyleSheet.create({
    celcatElementContainer: { 
        width: "90%",  
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: "#858585", 
        marginTop: 10, 
        paddingLeft: 10, 
        paddingTop: 5,
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
});

export default CelcatElement;