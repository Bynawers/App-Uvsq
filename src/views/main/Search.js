import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios, * as others from 'axios';

import { useTheme } from 'react-native-paper';

import CelcatElement from '../../components/search/CelcatElement';
import GroupsModal from '../../components/search/GroupsModal';
import Header from '../../components/search/Header';

export default function Search({navigation}) {

  const theme = useTheme();

  const [modalGroups, setModalGroups] = useState(false);
  const [groupListVisible, setGroupListVisible] = useState(true);

  const [toggleType, setToggleType] = useState("day");
  const [pageLoad, setPageLoad] = useState(false);
  const [sorted, isSorted] = useState(false);
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timetable, setTimetable] = useState([]);

  const [listGroup, setListGroup] = useState([]);
  const [group, setGroup] = useState("");

  let dateWeekDisplay = true;

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('searchStore', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('searchStore')
      console.log(JSON.parse(jsonValue).list)
      console.log(JSON.parse(jsonValue).selected)
      setListGroup(jsonValue.list != [] ? JSON.parse(jsonValue).list : [])
      setGroup(jsonValue.selected != "" ? JSON.parse(jsonValue).selected : "")
    } catch(e) {
      console.log(e)
    }
  }

  const onPageLoad = () => {
    if (pageLoad === true) { return }
    setPageLoad(true); 
    getData();
    todayDate();
    getTimeTable();
  }

  useEffect(() => {
    let saveValue = { selected: group, list: listGroup }
    storeData(saveValue);
  }, [listGroup, group])

  useEffect(() => {
    refreshDateRendering(0);
  }, [toggleType])

  useEffect(() => {
    getTimeTable();
  }, [currentDate, group]);

  useEffect(() => {
    if (sorted === false) {
      let timetableSorted = [];
      let indexSorted = [];

      const dateComparison = (a, b) => {
        let date1 = new Date(a.date)
        let date2 = new Date(b.date)
        
        return date1 - date2;
      }
      timetable.map((item, index) => indexSorted.push({date: item.date, id: index}));
      indexSorted.sort(dateComparison);
      indexSorted.map(item => timetableSorted.push(timetable[item.id]));
      setTimetable(timetableSorted);
      isSorted(true);
    }
  }, [sorted]);

  const toggleModal = () => {
    setModalGroups(!modalGroups);
  }
  const todayDate = () => {
    setCurrentDate(new Date());
    refreshDateRendering(0);
  }

  const refreshDateRendering = (add) => {
    let new_currentDate;
    if (add === 444) {
      new_currentDate = new Date();
    }
    else {
      new_currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + add);
    }
    if (toggleType === "day") {
      setDay(dateToString(new_currentDate, "day"));
      setDate(new_currentDate.getDate()+" "+dateToString(new_currentDate, "month")+" "+new_currentDate.getFullYear());
      setCurrentDate(new_currentDate);
    }
    else {
      let tempStart = "lun " + getDayCurrentWeek(new_currentDate, 0).getDate();
      let tempEnd = "dim " + getDayCurrentWeek(new_currentDate, 6).getDate();
      setDay(tempStart+" - "+tempEnd);
      setDate(dateToString(new_currentDate, "month")+" "+new_currentDate.getFullYear());
      setCurrentDate(getDayCurrentWeek(new_currentDate, -7));
    }
  }
  const getDayCurrentWeek = (current, add) => {
    let today = current;
    const first = today.getDate() - today.getDay() + 1;
    const day = new Date(today.setDate(first + add));
    return day;
  }
  const dateToString = (date, type) => {
    switch(type){
      case "month": {
        const month = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "decembre"];
        return month[date.getMonth()];
      }
      case "day": {
        return date.toLocaleString("fr", { weekday: "long" })
      }
    }
  }
  const getMonthString = (date) => {
    let month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
  }  

  async function getTimeTable() {
    if (group !== "") {
      console.log("fetch...")
      let date = currentDate;
      let dateStart = date.getFullYear()+"-"+getMonthString(date)+"-"+date.getDate();
      let dateEnd = date.addDays(6);
      dateEnd = dateEnd.getFullYear()+"-"+getMonthString(dateEnd)+"-"+dateEnd.getDate();
      fetchTimetable(dateStart, toggleType === "day" ? dateStart : dateEnd, group);
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
    isSorted(false);
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
    let newDay = newDateStart[0];
    newDay = newDay.replaceAll('-', '/');
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
      heureFin: newDateEnd,
      day: newDay,
      date: newDay+" "+newDateStart
    }
  }
  
  onPageLoad();

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.mainContainer]}>
      <View style={[{ backgroundColor: theme.classic.primary }, styles.backgroundContainer]}>
        
        <View style={styles.headerContainer}>
          <Header theme={theme} toggleType={toggleType} setToggleType={setToggleType} todayDate={refreshDateRendering}/>
        </View>

        <View style={[ { backgroundColor: theme.classic.foreground }, styles.foregroundContainer]}>

          <View style={styles.selectContainer}>
            <TouchableOpacity style={styles.buttonChevronLeft} onPress={() => refreshDateRendering(toggleType === "day" ? -1 : -7)}>
              <Feather name="chevron-left" size={35} color={theme.classic.textDark}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateContainer}>
              <Text style={[{color: theme.classic.textDark}, styles.textDay]}>{day}</Text>
              <Text style={[{color: theme.classic.textDark}, styles.textDate]}>{date}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonChevronRight} onPress={() => refreshDateRendering(toggleType === "day" ? 1 : 7)}>
              <Feather name="chevron-right" size={35} color={theme.classic.textDark}/>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: groupListVisible ? 0 : 10 }}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }} onPress={() => setGroupListVisible(!groupListVisible)}>
              <Text style={{ fontSize: 20, fontWeight: "300", marginRight: 10 }}>Mes groupes</Text>
            </TouchableOpacity>
            {groupListVisible &&
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FlatList
                horizontal
                initialNumToRender={7}
                data={ listGroup }
                renderItem={({item}) => { return ( <GroupElement code={item.code} theme={theme} setGroup={setGroup} group={group}/>) }}  
                keyExtractor={(item, index) => index}
                ListHeaderComponent={<FooterGroupList toggleModal={toggleModal} theme={theme}/>}/>
              
            </View>}
          </View>
          
          <View style={ styles.line }/>

          <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={{ flex: 1, paddingBottom:  0, width: "100%" }}>
              <View style={{ alignItems: "center", paddingBottom: 300 }}>
                {timetable.map((item, index) => {

                  let date = new Date(item.date);
                  dateWeekDisplay = true;
                  if (index === 0) {}
                  else if (timetable[index].day == timetable[index - 1].day) {
                    dateWeekDisplay = false;
                  }
                  return(
                    <React.Fragment key={index}>
                      {toggleType === "week" && dateWeekDisplay && <Text style={styles.textTitleDay}>{dateToString(date, "day")} {date.getDate()} {dateToString(date, "month")} {date.getFullYear()}</Text>}
                      <CelcatElement navigation={navigation} time={1.5} course={item.matiere} group={item.groupe} room={item.salle} type={item.type} dateStart={item.heureDebut} dateEnd={item.heureFin} day={item.day}/>
                    </React.Fragment>
                  );
                })}
              </View>
            </ScrollView>
            
          </View>

        </View>
      
        <GroupsModal theme={theme} toggleModal={toggleModal} modalGroups={modalGroups} setListGroup={setListGroup} listGroup={listGroup} setGroup={setGroup} group={group} setTimetable={setTimetable}/>

      </View>
    </View>
  );
}

const GroupElement = (props) => {
  return(
    <View style={{ flex: 1, justifyContent: "center", marginRight: 10 }}>
      <TouchableOpacity style={[{ backgroundColor: props.group === props.code ? props.theme.classic.secondary : "#f2f2f2" }, styles.buttonGroup, styles.shadow]}
      onPress={() => { props.setGroup(props.code); }}>
        <Text style={{color: props.group === props.code ? props.theme.classic.textLight : props.theme.classic.textDark}}>{props.code}</Text>
      </TouchableOpacity>
    </View>
  );
}

const FooterGroupList = (props) => {
  return(
    <TouchableOpacity style={styles.buttonAddGroups} onPress={() => props.toggleModal()}>
      <Ionicons name="add" color={props.theme.classic.textDark} size={35}/>
    </TouchableOpacity>
  );
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
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
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    height: "10%",
  },
  dateContainer: {
    alignItems: 'center'
  },
  timetableContainer: {
    flex: 1,
    width: "100%",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    height: "15%", 
    alignItems: "center", 
    alignSelf: "center"
  },

  text: {
    fontSize: 15,
  },
  textDay: {
    fontSize: 25,
    fontWeight: '300',
  },
  textDate: {
    fontSize: 20,
    fontWeight: '100',
  },
  textTitleDay: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: '600'
  },


  buttonAddGroups: {
    padding: 10,
    alignSelf: 'flex-start'
  },
  buttonGroup: {
    height: 30,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonChevronLeft: {
    marginLeft: '10%', 
    padding: 10
  },
  buttonChevronRight: {
    marginRight: '10%', 
    padding: 10
  },

  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#e2e2e2"
  },
});