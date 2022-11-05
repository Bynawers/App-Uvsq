import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Header = (props) => {

    return(
      <>
        <Text style={[ { color: props.theme.classic.textLight }, styles.title ]}>CELCAT Calendar</Text>
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
      </>
    );
}


const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.4,
      shadowRadius: 2,
    },
    headerButtonContainer: {
        marginTop: "7%",
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "100%"
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
    todayButton: {
        justifyContent: 'center',
        padding: 10,
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 10,
        marginRight: "10%",
      },
      title: {
        marginTop: "2%",
        fontSize: 25,
        fontWeight: "800"
      },
  });

export default Header;