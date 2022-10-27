import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { useTheme } from 'react-native-paper';

export default function Search() {

  const theme = useTheme();

  useEffect(() => {
    initDate();
  });

  const [toggleType, setToggleType] = useState(true);
  const [date, setDate] = useState("7 septembre");
  const [day, setDay] = useState("lundi");

  let currentDate = new Date();

  const initDate = () => {
    setDay(dateToString(currentDate.getDate(), "day"));
    setDate(currentDate.getDate()+" "+dateToString(currentDate.getMonth(), "month"));
  }
  const dateToString = (date, type) => {
    switch(type){
      case "month": {
        const month = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "decembre"];
        return month[date];
      }
      case "day": {
        const day = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
        return day[date - getMondayOfCurrentWeek().getDate()]
      }
    }
  }
  function getMondayOfCurrentWeek() {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
  
    const monday = new Date(today.setDate(first));
    return monday;
  }

  const switchType = (type) => {
    if (type === "day" && !toggleType || type === "week" && toggleType ) {
      setToggleType(!toggleType)
    }
  }

  

  return (
    <SafeAreaView style={[{ backgroundColor: theme.classic.primary }, styles.safeAreaStyle]}>
      <View style={[{ backgroundColor: theme.classic.primary }, styles.backgroundContainer]}>

        <Header theme={theme} switchType={switchType} toggleType={toggleType}/>
        <View style={[ { backgroundColor: theme.classic.foreground }, styles.foregroundContainer]}>
          <View style={styles.selectContainer}>
            <TouchableOpacity style={{ marginLeft: '10%'}}>
              <AntDesign name="left" size={35} color={theme.classic.textDark}/>
            </TouchableOpacity>
            <View style={styles.dateContainer}>
              <Text style={[{color: theme.classic.textDark}, styles.textDay]}>{day}</Text>
              <Text style={[{color: theme.classic.textDark}, styles.textDate]}>{date}</Text>
            </View>
            <TouchableOpacity style={{ marginRight: '10%'}}>
              <AntDesign name="right" size={35} color={theme.classic.textDark}/>
            </TouchableOpacity>
          </View>
          <View style={[{ backgroundColor: theme.classic.background }, styles.bottomContainer]}>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Header = (props) => {
  return(
    <>
      <Text style={[ { color: props.theme.classic.textLight }, styles.title ]}>CELCAT Calendar</Text>
      <View style={[ styles.headerButtonContainer ]}>
        <View style={[{ backgroundColor: props.theme.classic.foreground }, styles.switchTypeContainer, styles.shadow ]}>
          <TouchableOpacity style={[{ backgroundColor: props.toggleType ? props.theme.classic.secondary : props.theme.classic.foreground }, styles.switchButton ]}
            onPress={() => props.switchType("day")}>
            <Text style={[{ color: props.toggleType ? props.theme.classic.textLight : props.theme.classic.textDark }, styles.text ]}>Jours</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ backgroundColor: props.toggleType ? props.theme.classic.foreground : props.theme.classic.secondary }, styles.switchButton ]}
            onPress={() => props.switchType("week")}>
            <Text style={[{ color: props.toggleType ? props.theme.classic.textDark : props.theme.classic.textLight}, styles.text ]}>Semaines</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[{ backgroundColor: props.theme.classic.foreground }, styles.todayButton, styles.shadow ]}>
          <Text style={[{ color: props.theme.classic.textDark}, styles.text ]}>Aujourd'hui</Text>
        </TouchableOpacity>
      </View>
    </>
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
  title: {
    marginTop: "2%",
    fontSize: 25,
    fontWeight: "800"
  },
  text: {
    fontSize: 15,
  },
  headerButtonContainer: {
    marginTop: "7%",
    flexDirection: 'row',
    justifyContent: "space-between",
    width: "100%"
  },
  todayButton: {
    justifyContent: 'center',
    padding: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
    marginRight: "10%",
  },
  switchTypeContainer: {
    flexDirection: "row",
    height: 33,
    borderRadius: 10,
    marginLeft: "10%",
    
  },
  switchButton: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    borderRadius: 10,
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

  bottomContainer: {
    height: "30%",
    width: "100%",
  }
});