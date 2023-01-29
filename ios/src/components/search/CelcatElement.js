import React from 'react';
import { StyleSheet, Text, Pressable, Platform, Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
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
      
      let heure = props.dateStart +" - "+ props.dateEnd;
      props.setFocusData({ type: props.type, course: props.course, date: heure, room: props.room, group: props.group, background: background });
      props.setModalSeeMore(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  
    return(
      <Pressable style={[{  backgroundColor: background, height: heightElement }, styles.shadow, styles.celcatElementContainer ]}
      onLongPress={() => openDetail()}>
        <Text style={{ flexShrink: 1}}>
            <Text style={styles.titleComponentText}>{props.dateStart} - {props.dateEnd} - {props.type}{"\n"}</Text>
            <Text style={styles.titleComponentText}>Cours : </Text>
            <Text style={styles.contentText}>{props.course}{"\n"}</Text>
            <Text style={styles.titleComponentText}>Salle : </Text>
            <Text style={styles.contentText}>{props.room}{"\n"}</Text>
            <Text style={styles.titleComponentText}>Groupe : </Text>
            <Text style={styles.contentText}>{props.group}</Text>
        </Text>
      </Pressable>
    );
  }

const styles = StyleSheet.create({
    celcatElementContainer: { 
        width: Dimensions.get('window').width - Dimensions.get('window').width*0.1,  
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: "#858585", 
        marginTop: 10, 
        paddingLeft: 10, 
        paddingTop: 5,
        paddingBottom: 5
    },
    shadow: Platform.OS === 'ios' ? {
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.4,
      shadowRadius: 2,
    } : {
      elevation: 3,
    },
    titleComponentText: {
      fontWeight: "500", 
      fontSize: RFValue(12)
    },
    contentText: {
      fontSize: RFValue(10),
      flexShrink: 1, 
      fontWeight: "300"
    }
});

export default CelcatElement;