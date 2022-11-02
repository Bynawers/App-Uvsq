import React, { useState, useEffect } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import axios, * as others from 'axios';

import { useTheme } from 'react-native-paper';

import CelcatElement from '../../components/search/CelcatElement';
import GroupsModal from '../../components/search/GroupsModal';
import Header from '../../components/search/Header';

export default function Search() {

  const theme = useTheme();

  const [modalGroups, setModalGroups] = useState(false);

  const [toggleType, setToggleType] = useState(true);
  const [pageLoad, setPageLoad] = useState(false);
  const [date, setDate] = useState("7 septembre");
  const [day, setDay] = useState("lundi");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timetable, setTimetable] = useState([]);

  const [listGroup, setListGroup] = useState([]);
  const [group, setGroup] = useState("");

  const onPageLoad = () => {
    if (pageLoad === true) { return }
    setPageLoad(true); 
    todayDate();
    getTimeTable();
  }

  useEffect(() => {
    setDay(dateToString(currentDate.getDate(), "day"));
    setDate(currentDate.getDate()+" "+dateToString(currentDate.getMonth(), "month")+" "+currentDate.getFullYear());
    getTimeTable();
  }, [currentDate, group]);

  const toggleModal = () => {
    setModalGroups(!modalGroups);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  const dateToString = (date, type) => {
    switch(type){
      case "month": {
        const month = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "decembre"];
        return month[date];
      }
      case "day": {
        return currentDate.toLocaleString("fr", { weekday: "long" })
      }
    }
  }

  const changeDate = (add) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + add));
  } 
  const todayDate = () => {
    setCurrentDate(new Date());
  }
  const getMonthString = (date) => {
    let month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
  }  

  const switchType = (type) => {
    if (type === "day" && !toggleType || type === "week" && toggleType ) {
      setToggleType(!toggleType)
    }
  }

  async function getTimeTable() {
    let date = currentDate.getFullYear()+"-"+getMonthString(currentDate)+"-"+currentDate.getDate();
    if (group !== "") {
      fetchTimetable(date, date, group);
    }
  }
  async function fetchTimetable(date_start, date_end, td) {
    let url = 'https://edt.uvsq.fr/Home/GetCalendarData'
    let data = { 'start':date_start,'end':date_end,'resType':'103','calView':'agendaDay','federationIds[]':td }

    axios({
      method: "post",
      url: url,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        var result = JSON.parse(JSON.stringify(response.data));
        return getDataCelcat(result);
      })
      .catch(function (response) {
        console.log("error : " + response);
        return;
      });
  }
  function getDataCelcat(data) {
    let output = [];
    for (let i = 0; i < data.length; i++) {
      let dataRecode = recode(data[i].description);
      output.push(newCelcatEvent(dataRecode, data[i].start, data[i].end, data[i].faculty))
    }
    setTimetable(output);
  }
  function recode( string ) {
    let new_string = string.replaceAll("&#233;", "é");
    new_string = new_string.replaceAll("&#39;", "'");
    new_string = new_string.replaceAll("&#224;", "à");
    new_string = new_string.replaceAll("&#232;", "è");
    new_string = new_string.replaceAll("&#244;", "ô");
    new_string = new_string.replaceAll("&#226;", "â");
    new_string = new_string.replaceAll('<br />', '$');
    new_string = new_string.replace(/(\r\n|\n|\r)/gm, "");
    return new_string;
  }
  function newCelcatEvent( string, dateStart, dateEnd, faculty ) {
    let new_string = string.split("$");
    let newDateStart = dateStart.split("T");
    newDateStart = newDateStart[1].split(":")
    newDateStart = newDateStart[0]+":"+newDateStart[1];
    let newDateEnd = dateEnd.split("T");
    newDateEnd = newDateEnd[1].split(":")
    newDateEnd = newDateEnd[0]+":"+newDateEnd[1];
    return {
      type: new_string[0],
      salle: new_string[1],
      matiere: new_string[2],
      groupe: new_string[3],
      heureDebut: newDateStart,
      heureFin: newDateEnd
    }
  }
  
  onPageLoad();

  return (
    <SafeAreaView style={[{ backgroundColor: theme.classic.primary }, styles.safeAreaStyle]}>
      <View style={[{ backgroundColor: theme.classic.primary }, styles.backgroundContainer]}>
        

        <Header theme={theme} switchType={switchType} toggleType={toggleType} todayDate={todayDate}/>

        <View style={[ { backgroundColor: theme.classic.foreground }, styles.foregroundContainer]}>
          <View style={styles.selectContainer}>
            <TouchableOpacity style={{ marginLeft: '10%', padding: 10}} onPress={() => changeDate(-1)}>
              <AntDesign name="left" size={35} color={theme.classic.textDark}/>
            </TouchableOpacity>
            <View style={styles.dateContainer}>
              <Text style={[{color: theme.classic.textDark}, styles.textDay]}>{day}</Text>
              <Text style={[{color: theme.classic.textDark}, styles.textDate]}>{date}</Text>
            </View>
            <TouchableOpacity style={{ marginRight: '10%', padding: 10}} onPress={() => changeDate(+1)}>
              <AntDesign name="right" size={35} color={theme.classic.textDark}/>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "300" }}>Mes groupes</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={styles.addGroups} onPress={() => toggleModal()}>
                <Ionicons name="add" color={theme.classic.textDark} size={35}/>
              </TouchableOpacity>
              {listGroup.map((item, index) => {
                return(
                  <React.Fragment key={index}>
                    <GroupElement code={item.code} theme={theme} setGroup={setGroup} group={group}/>
                  </React.Fragment>
                );
              })}
            </View>
          </View>
          
          <View style={ styles.line }/>

          <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <ScrollView style={[{ backgroundColor: "#f2f2f2" }, styles.timetableContainer]} contentContainerStyle={{ paddingBottom: 200 }}>
              <View style={{ alignItems: "center" }}>
                {timetable.map((item, index) => {
                  return(
                    <React.Fragment key={index}>
                      <CelcatElement time={1.5} course={item.matiere} room={item.salle} type={item.type} dateStart={item.heureDebut} dateEnd={item.heureFin}/>
                    </React.Fragment>
                  );
                })}
              </View>
            </ScrollView>
            
          </View>

        </View>
      
        <GroupsModal toggleModal={toggleModal} modalGroups={modalGroups} setListGroup={setListGroup} listGroup={listGroup}/>

      </View>
    </SafeAreaView>
  );
}

const GroupElement = (props) => {
  return(
    <TouchableOpacity style={[{ backgroundColor: props.group === props.code ? props.theme.classic.secondary : "#f2f2f2" }, styles.buttonGroup, styles.shadow]}
    onPress={() => { props.setGroup(props.code); }}>
      <Text style={{color: props.group === props.code ? props.theme.classic.textLight : props.theme.classic.textDark}}>{props.code}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  backgroundContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  foregroundContainer: {
    height: "100%",
    width: "100%",
    marginTop: "7%",
    borderRadius: 50,
  },
  text: {
    fontSize: 15,
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    height: "10%",
  },
  textDay: {
    fontSize: 25,
    fontWeight: '300',
  },
  textDate: {
    fontSize: 20,
    fontWeight: '100',
  },
  dateContainer: {
    alignItems: 'center'
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#e2e2e2"
  },
  addGroups: {
    padding: 10,
    alignSelf: 'flex-start'
  },

  timetableContainer: {
    flex: 1,
    width: "100%",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
  },
  buttonGroup: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  }
});