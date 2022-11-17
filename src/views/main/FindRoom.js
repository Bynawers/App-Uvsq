import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import axios, * as others from 'axios';

import { useTheme } from 'react-native-paper';

import Header from "../../components/findRoom/HeaderFindRoom.js";
import { parseDataCelcat, isEmptyRoom } from "../../data/FetchCelcat.js"

export default function FindRoom() {

  const theme = useTheme();

  const room = require("../../data/room.json");
  const example = require("../../data/roomExample.json");
  const allBatiments = ["FERMAT", "BUFFON", "GERMAIN", "DESCARTES" ];

  const [batiment, setBatiment] = useState(["FERMAT"]);
  const [dataSize, setDataSize] = useState(0);
  const [data, setData] = useState([]);
  const [findRoom, setFindRoom] = useState([]);

  useEffect(() => {
    if (data.length === dataSize) {
      const sorted = [...data].sort((a, b) => {
        return b.room < a.room;
      });  
      setFindRoom(sorted);
    }
  }, [data])

  function getRoom(room, batiment) {
    let date = new Date();
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


  function fetchSelectedRoom() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    let size = 0;
    batiment.map(item => { size += room[item].length })

    setDataSize(size)
    setData([]);

    if (isSunday()) {
      return;
    }
    
    batiment.map(batiment => {
      room[batiment].map(item => {
        console.log(item)
        getRoom(item, batiment);
      })
    })
  }
  function isSunday(date = new Date()) {
    return date.getDay() % 7 === 0;
  }

  return (
    <View style={[{ backgroundColor: theme.classic.primary }]}>
      <View style={[{ backgroundColor: theme.classic.primary }, styles.backgroundContainer]}>
        <Header theme={theme} setBatiment={setBatiment} batiment={batiment} getAllRoom={fetchSelectedRoom}/>
      </View>
      <View style={[{ backgroundColor: theme.classic.background }, styles.mainContainer]}>
        <View style={styles.headerScrollList}>
          <Text style={{ fontSize: 25, fontWeight: "200"}}>Salles disponibles</Text>
        </View>
        <View style={[{ backgroundColor: "#e2e2e2", height: 1, width: "100%", }]}/>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={{ flex: 1, paddingBottom:  0, width: "100%"}}>
          <View style={{ paddingBottom: 500}}>
            {allBatiments.map((bat, index) => {
              let numberRooms = findRoom.filter(item => item.batiment === bat && item.empty === true).length;
              return(
                <React.Fragment key={index}>

                  {numberRooms !== 0 && 
                    <View style={styles.titleContainer}>
                      <Text style={{ fontSize: 25, fontWeight: '300' }}>{bat}</Text>
                      <Text style={{ fontSize: 15, fontWeight: '200' }}> - {numberRooms} salle{numberRooms !== 1 ? "s" : ""} disponible{numberRooms !== 1 ? "s" : ""}</Text>
                    </View>}
                  <View style={[{ width: "100%" }, styles.shadow]}>
                    <BatimentRoomList data={findRoom} bat={bat} theme={theme}/>  
                  </View>

                  {isSunday() && index === 0 &&
                  <View style={{ flex :1, justifyContent: "center" }}>
                    <Text>UFR des Sciences est fermé le dimanche</Text>
                  </View>
                  }
                  
                  {!isSunday() && index === 0 && allBatiments.length === 0 &&
                  <View style={{ flex :1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Pas de salle disponible...</Text>
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
  return(
    <>
      {props.data.filter((item) => item.empty === true && item.batiment === props.bat).map((item, index, row) => {
        return(
          <React.Fragment key={index}>
            <RoomComponent room={item.room} until={item.until} theme={props.theme} first={index === 0 ? true : false} last={index + 1 === row.length ? true : false}/>
          </React.Fragment>
        );
      })}
    </>
  );
}

const RoomComponent = (props) => {

  let hasLine = !props.last;

  return(
    <View style={[{ backgroundColor: "white", borderTopLeftRadius: props.first ? 20 : 0, borderTopRightRadius: props.first ? 20 : 0, borderBottomLeftRadius: props.last ? 20 : 0, borderBottomRightRadius: props.last ? 20 : 0 }, styles.roomContainer]}>
      <View style={[{ backgroundColor: "#91CD6D", borderTopLeftRadius: props.first ? 20 : 0, borderBottomLeftRadius: props.last ? 20 : 0 }, styles.checkIndicator ]}>
        <Ionicons name="checkmark" size={30} color="white"/>
        {hasLine && <View style={[{backgroundColor: "#7EBC59" }, styles.line]}/>}
      </View>
      <View style={styles.roomIndicator}>
        <Text style={{ color: props.theme.classic.textDark, marginLeft: 10, fontSize: 10 }}>Salle {props.room}</Text>
        {hasLine && <View style={[{backgroundColor: "#E3E3E3" }, styles.line]}/>}
      </View>
      <View style={[{ backgroundColor: "#0092BB", borderTopRightRadius: props.first ? 20 : 0, borderBottomRightRadius: props.last ? 20 : 0 }, styles.untilIndicator]}>
        <Text style={{ color: props.theme.classic.textLight, fontSize: 10 }}>{props.until}</Text>
        {hasLine && <View style={[{backgroundColor: "#0188AE" }, styles.line]}/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: "21%",
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
  checkIndicator: {
    height: "100%",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  untilIndicator: {
    height: "100%",
    width: 100,
    right: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  roomIndicator: {
    flexDirection: "column", 
    flex: 1, 
    height: "100%", 
    justifyContent: "center"
  },
  line: {
    height: 1,
    width: "100%",
    bottom: 0,
    position: "absolute"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center", 
    marginBottom: 10,
    width: "100%",
    marginTop: 20
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 5,
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