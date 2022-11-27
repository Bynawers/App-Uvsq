import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';

const Library = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let currentDate = new Date();
    let start = new Date(currentDate.toISOString().slice(0, 10).replaceAll("-", "/")+ " " +props.data[getDayIndex(new Date())].start);
    let end = new Date(currentDate.toISOString().slice(0, 10).replaceAll("-", "/")+ " " +props.data[getDayIndex(new Date())].end);
    let startLaunch = new Date(currentDate.toISOString().slice(0, 10).replaceAll("-", "/")+ " 12:30");
    let endLaunch = new Date(currentDate.toISOString().slice(0, 10).replaceAll("-", "/")+ " 13:30");

    if (props.type === "school") { 
      var openTemp = currentDate >= start && currentDate < end ? true : false;
      var launchTemp = currentDate > startLaunch && currentDate < endLaunch ? true : false
      openTemp = launchTemp && openTemp ? false : !launchTemp && openTemp ? true : false
    } else {
      var openTemp = currentDate >= start && currentDate < end ? true : false;
    }
    setIsOpen(openTemp)
  });

  const getDayIndex = () => {
    const current = new Date()
    const index = current.toLocaleString("fr", { weekday: "long" })
    const week = {
      "lundi": 0,
      "mardi": 1,
      "mercredi": 2,
      "jeudi": 3,
      "vendredi": 4,
      "samedi": 5,
      "dimanche": 6
    }
    console.log(week[index])
    return week[index];
  }

  return(
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Horraire</Text>
      <View style={styles.listContainer}>
        {props.data.map((item, index) => {     
          let currentDay = props.data[ getDayIndex() ].id === item.id; 
          return(
            <React.Fragment key={index}>   
              <View style={[{ backgroundColor: currentDay ? props.theme.classic.foreground : props.theme.classic.primary }, styles.dayContainer]}>
                <Text style={[{ color: currentDay ? props.theme.classic.textDark : props.theme.classic.textLight }, styles.textContent]}>{item.day}</Text>
                <Text style={[{ color: currentDay ? props.theme.classic.textDark : props.theme.classic.textLight }, styles.textHour]}>{item.start}</Text>
                <Text style={[{ color: currentDay ? props.theme.classic.textDark : props.theme.classic.textLight }, styles.textHour]}>-</Text>
                <Text style={[{ color: currentDay ? props.theme.classic.textDark : props.theme.classic.textLight }, styles.textHour]}>{item.end}</Text>
                {currentDay && <Text style={[{ color: isOpen ? "green" : "red" }, styles.textHour]}>{isOpen ? "OUVERT" : "FERME"}</Text>}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  listContainer: {
    width: "100%", 
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  dayContainer: {
    width: "17%",
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5, 
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 15,
    alignItems: "center"
  },
  title: {
    color: "white", 
    fontSize: 20,
    paddingLeft: "10%",
    fontWeight: "500"
  },
  textContent: {
    fontWeight: '300',
    fontSize: 15
  },
  textHour: {
    fontWeight: '200',
    fontSize: 12
  }
});

export default Library;