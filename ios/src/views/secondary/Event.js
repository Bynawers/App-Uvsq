import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper';

export default function Event({ navigation }) {

  const theme = useTheme();

  const data = require("../../data/notification.json");

  return (
    <View style={[{ backgroundColor: theme.classic.primary }, styles.mainContainer]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{ flex: 1, left: "10%" }}
        onPress={() => navigation.openDrawer()}>
          <Ionicons name="chevron-back" color="white" size={40}/>
        </TouchableOpacity>
        <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>Evènement</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </View>
      <ScrollView style={styles.contentContainer}>
        {data.map((item, index) => {
          return(
            <React.Fragment key={index}>
              <NotificationComponent title={item.title} date={item.date} content={item.content} theme={theme}/>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
}

const NotificationComponent = (props) => {
  return(
    <View style={styles.notificationContainer}>
      <Text style={{ color: props.theme.classic.textDark, fontSize: 14, marginBottom: "1%" }}>
        <Text style={{ fontWeight: "600" }}>{props.date}  </Text>
        <Text style={{ fontWeight: "300"}}>-  {props.title}</Text>
      </Text>
      <Text style={{ fontWeight: "300", fontSize: 12, paddingLeft: "5%" }}>
        {props.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(20), 
    fontWeight: "700",
    color: "white"
  },
  headerContainer: {
    height: "12%", 
    alignItems: "flex-end",
    width: "100%",
    flexDirection: "row",
    paddingBottom: 10,
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    paddingLeft: "5%",
    paddingRight : "5%",
  },
  notificationContainer: {
    height: 100,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    padding : 10,
    marginTop: 10
  }
});