import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

const Header = (props) => {

    return(
      <View style={styles.mainContainer}>
        <View style={{ flex: 1.3, justifyContent: "flex-end" }}>
          <Text style={[ { color: props.theme.classic.textLight }, styles.title ]}>CELCAT Calendar</Text>
        </View>

        <View style={[ styles.headerButtonContainer ]}>

          <View style={[{ backgroundColor: props.theme.classic.foreground }, styles.switchTypeContainer, styles.shadow ]}>
            <TouchableOpacity style={[{ backgroundColor: props.toggleType === "day" ? props.theme.classic.secondary : props.theme.classic.foreground }, styles.switchButton ]}
              onPress={() => props.setToggleType("day")}>
              <Text style={[{ color: props.toggleType === "day" ? props.theme.classic.textLight : props.theme.classic.textDark }, styles.text ]}>Jours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ backgroundColor: props.toggleType === "day" ? props.theme.classic.foreground : props.theme.classic.secondary }, styles.switchButton ]}
              onPress={() => props.setToggleType("week")}>
              <Text style={[{ color: props.toggleType === "day" ? props.theme.classic.textDark : props.theme.classic.textLight}, styles.text ]}>Semaines</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[{ backgroundColor: props.theme.classic.foreground }, styles.todayButton, styles.shadow ]}
          onPress={() => props.todayDate(444)}>
            <Text style={[{ color: props.theme.classic.textDark}, styles.text ]}>Aujourd'hui</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  headerButtonContainer: {
    alignItems: "center",
    flexDirection: 'row',
    width: "100%",
    flex: 1,
  },
  switchTypeContainer: {
    flexDirection: "row",
    height: 33,
    borderRadius: 10,
    marginRight: "20%"
  },
  switchButton: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    borderRadius: 10,
  },
  todayButton: {
    justifyContent: 'center',
    height: 33,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },

  shadow: Platform.OS === 'ios' ? {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 5,
  } : 
  { 
    elevation: 3
  },

  title: {
    fontSize: RFValue(20),
    fontWeight: "800"
  },
  text: {
    fontSize: RFValue(10),
  },
});

export default Header;