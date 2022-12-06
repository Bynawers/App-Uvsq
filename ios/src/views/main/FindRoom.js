import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import axios, * as others from 'axios';

import { useTheme } from 'react-native-paper';

import Header from "../../components/header/HeaderFindRoom.js";
import { parseDataCelcat, isEmptyRoom } from "../../data/FetchCelcat.js"

export default function FindRoom() {

  const theme = useTheme();

  const room = require("../../data/room.json");
  const allBatiments = ["FERMAT", "BUFFON", "GERMAIN", "DESCARTES" ];

  const [isClose, setIsClose] = useState(false);
  const [batiment, setBatiment] = useState("");
  const [dataSize, setDataSize] = useState(0);
  const [data, setData] = useState([]);
  const [findRoom, setFindRoom] = useState([]);

  useEffect(() => {
    fetchSelectedRoom();
  }, [batiment])

  useEffect(() => {
    if (data.length === dataSize) {
      const sorted = [...data].sort((a, b) => {
        return b.room < a.room;
      });  
      setFindRoom(sorted);
    }
  }, [data])

  useEffect(() => {
    let currentDate = new Date("2022/11/24 13:54");
    let facStart = new Date(currentDate.toISOString().slice(0, 10).replace(/-/g, "/")+ " 07:30");
    let facEnd = new Date(currentDate.toISOString().slice(0, 10).replace(/-/g, "/")+ " 19:00");
    if (currentDate < facStart || currentDate > facEnd) {
      setIsClose(true);
    } else if (isSunday()) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
  });


  function fetchSelectedRoom() {
    let size = 0;

    if (batiment === "") { return }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    size = room[batiment].length;

    setDataSize(size)
    setData([]);

    if (isSunday()) {
      return;
    }
    
    room[batiment].map(item => {
      getRoom(item, batiment);
    })
  }

  function getRoom(room, batiment) {

    if (isClose) { return; }

    let date = new Date("2022/11/24 13:54");
    let url = 'https://edt.uvsq.fr/Home/GetCalendarData'
    let data = { 'start':date,'end':date,'resType':'102','calView':'agendaDay','federationIds[]':room }

    axios({
        method: "post",
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) { 
        var result = JSON.parse(JSON.stringify(response.data));
        var data = parseDataCelcat(result);
        var roomInfo = isEmptyRoom(room, data, batiment);
        setData(oldArray => [...oldArray, roomInfo]);
    })
    .catch(function (response) {
        console.log("error : " + response);
    });
  }

  function isSunday(date = new Date()) {
    return date.getDay() % 7 === 0;
  }

  return (
    <View style={[{ backgroundColor: theme.classic.primary }]}>
      <View style={[{ backgroundColor: theme.classic.primary }, styles.backgroundContainer]}>
        <Header theme={theme} setBatiment={setBatiment} batiment={batiment} fetchSelectedRoom={fetchSelectedRoom}/>
      </View>
      <View style={[{ backgroundColor: theme.classic.background }, styles.mainContainer]}>
        <View style={styles.headerScrollList}>
          <Text style={styles.h1Light}>Salles disponibles</Text>
        </View>
        <View style={[{ backgroundColor: "#e2e2e2", height: 1, width: "100%", }]}/>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={{ flex: 1, paddingBottom:  0, width: "100%"}}>
          <View style={{ paddingBottom: 500 }}>

            {allBatiments.map((bat, index) => {
              let numberRooms = findRoom.filter(item => item.batiment === bat && item.empty === true).length;

              return(
                <React.Fragment key={index}>

                  {!isClose && numberRooms !== 0 && 
                    <View style={styles.titleContainer}>
                      <Text style={styles.h1}>{bat}</Text>
                      <Text style={styles.h2Light}> - {numberRooms} salle{numberRooms !== 1 ? "s" : ""} disponible{numberRooms !== 1 ? "s" : ""}</Text>
                    </View>}
                  {!isClose && 
                  <View style={[{ width: "100%" }, styles.shadow]}>
                    <BatimentRoomList data={findRoom} bat={bat} theme={theme}/>  
                  </View>}
                  
                  {!isSunday() && index === 0 && allBatiments.length === 0 &&
                  <View style={{ flex :1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Pas de salle disponible...</Text>
                  </View>
                  }

                  {isClose && index === 0 &&
                  <View style={{ flex :1, justifyContent: "center", alignItems: "center" }}>
                    <Text>L'UFR Des Sciences est fermé</Text>
                  </View>
                  }
                </React.Fragment> 
              );
            })}

          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const BatimentRoomList = (props) => {

  let previousType = null;

  const hasSameType = (current) => {
    if (previousType === null) { 
      return false; 
    }
    else if (previousType === current.type) {
      return true;
    }
    else {
      return false;
    }
  }

  return(
    <>
      {props.data.filter((item) => item.empty === true && item.batiment === props.bat).map((item, index, row) => {
        let sameType = hasSameType(item);

        previousType = item.type;
        return(
          <React.Fragment key={index}>
            {!sameType && <TitleComponent type={item.type}/>}
            <RoomComponent room={item.room} until={item.until} theme={props.theme} first={index === 0 ? true : false} last={index + 1 === row.length ? true : false} type={item.type}/>
          </React.Fragment>
        );
      })}
    </>
  );
}

const RoomComponent = (props) => {

  let hasLine = !props.last;

  return(
    <View style={[{ backgroundColor: "white" }, styles.roomContainer]}>
      <View style={[{ backgroundColor: "#91CD6D" }, styles.checkIndicator ]}>
        <Ionicons name="checkmark" size={30} color="white"/>
        {hasLine && <View style={[{backgroundColor: "#7EBC59" }, styles.line]}/>}
      </View>
      <View style={styles.roomIndicator}>
        <Text style={[{ color: props.theme.classic.textDark }, styles.text]}>{ props.type !== "Amphithéatre" ? "Salle" : ""} {props.room}</Text>
        {hasLine && <View style={[{backgroundColor: "#E3E3E3" }, styles.line]}/>}
      </View>
      <View style={[styles.untilIndicator]}>
        <Text style={[{ color: props.theme.classic.textLight}, styles.text]}>{props.until}</Text>
        {hasLine && <View style={[{backgroundColor: "#0188AE" }, styles.line]}/>}
      </View>
    </View>
  );
}
const TitleComponent = (props) => {

  return(
    <View style={[styles.titleListContainer]}>
      {<Text style={styles.h3Light}>{props.type}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: "16%",
    width: "100%",
    alignItems: "center",
  },
  mainContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
    alignItems: 'center',
  },
  roomContainer: {
    height: 40,
    width: "85%",
    flexDirection: "row",
    alignItems: "center"
  },
  titleListContainer: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "5%"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center", 
    marginBottom: 10,
    width: "100%",
    marginTop: 20,
  },

  checkIndicator: {
    height: "100%",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  untilIndicator: {
    height: "100%",
    width: 100,
    right: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#0092BB"
  },
  roomIndicator: {
    flexDirection: "column", 
    flex: 1, 
    height: "100%", 
    justifyContent: "center",
    paddingLeft: "5%"
  },

  h1Light: {
    fontSize: RFValue(20), 
    fontWeight: "200"
  },
  h1: {
    fontSize: RFValue(20), 
    fontWeight: "300"
  },
  h2Light: {
    fontSize: RFValue(15), 
    fontWeight: "200"
  },
  h2: {
    fontSize: RFValue(15), 
    fontWeight: "400"
  },
  h3Light: {
    fontSize: RFValue(12), 
    fontWeight: "200"
  },
  h3: {
    fontSize: RFValue(12), 
    fontWeight: "400"
  },
  text: {
    fontSize: RFValue(9)
  },

  line: {
    height: 1,
    width: "100%",
    bottom: 0,
    position: "absolute"
  },
  shadow: Platform.OS === 'ios' ? {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  } : {
    elevation: 3
  },
  headerScrollList: {
    backgroundColor: "white", 
    width: "100%", 
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center"
  }
  
});