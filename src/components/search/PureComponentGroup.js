import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const GroupItem = (props) => {
  return(
    <>
      <TouchableOpacity style={[{backgroundColor: props.theme.classic.foreground}, styles.buttonGroup, styles.shadow]}
      onPress={() => props.addGroup(props.code, props.name)}>
        <Text style={[{color: props.theme.classic.textDark}]}>{props.name}</Text>
      </TouchableOpacity>
      <View style={styles.line}/>
    </>
  );
}


const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#e2e2e2",
  },
  buttonGroup: {
    width: "100%", 
    height: 50,
    justifyContent: "center",
    paddingLeft: "10%",
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
	},
});
    
export default memo(GroupItem);