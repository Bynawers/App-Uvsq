import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

const Library = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  let currentDate = new Date();   
  
  useEffect(() => {
    let start = new Date(currentDate.toISOString().slice(0, 10).replace(/-/g, "/")+ " " +props.data[currentDate.getDay()].start);
    let end = new Date(currentDate.toISOString().slice(0, 10).replace(/-/g, "/")+ " " +props.data[currentDate.getDay()].end);
    let startLaunch = new Date(currentDate.toISOString().slice(0, 10).replace(/-/g, "/")+ " 12:30");
    let endLaunch = new Date(currentDate.toISOString().slice(0, 10).replace(/-/g, "/")+ " 13:30");

    if (props.type === "school") { 
      var openTemp = currentDate >= start && currentDate < end ? true : false;
      var launchTemp = currentDate > startLaunch && currentDate < endLaunch ? true : false
      openTemp = launchTemp && openTemp ? false : !launchTemp && openTemp ? true : false
    } else {
      var openTemp = currentDate >= start && currentDate < end ? true : false;
    }
    setIsOpen(openTemp)
  });

  return(
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Horaire</Text>
      <View style={styles.listContainer}>
        {props.data.map((item, index) => {  
          let currentDay = props.data[ currentDate.getDay() ].id === item.id; 
          let isWeekend = item.id === "samedi" || item.id === "dimanche";
          return(
            <React.Fragment key={index}>   
              { !isWeekend &&
              <View style={[{ backgroundColor: currentDay ? props.theme.classic.foreground : props.theme.classic.primary }, styles.dayContainer]}>
                <Text style={[{ color: currentDay ? props.theme.classic.textDark : props.theme.classic.textLight }, styles.textContent]}>{item.day}</Text>
                <Text style={[{ color: currentDay ? props.theme.classic.textDark : props.theme.classic.textLight }, styles.textHour]}>{item.start}</Text>
                <Text style={[{ color: currentDay ? props.theme.classic.textDark : props.theme.classic.textLight }, styles.textHour]}>-</Text>
                <Text style={[{ color: currentDay ? props.theme.classic.textDark : props.theme.classic.textLight }, styles.textHour]}>{item.end}</Text>
                {currentDay && <Text style={[{ color: isOpen ? "green" : "red" }, styles.textHour]}>{isOpen ? "OUVERT" : "FERME"}</Text>}
              </View>}
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
    fontSize: RFValue(15),
    paddingLeft: "10%",
    fontWeight: "500"
  },
  textContent: {
    fontWeight: '300',
    fontSize: RFValue(12)
  },
  textHour: {
    fontWeight: '200',
    fontSize: RFValue(11)
  }
});

export default Library;