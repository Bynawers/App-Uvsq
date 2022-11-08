import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Header = (props) => {

    return(
      <View style={styles.mainContainer}>
        <Text style={[ { color: props.theme.classic.textLight }, styles.title ]}>Acceuil</Text>
        <View style={[ styles.headerButtonContainer ]}>
          <TouchableOpacity>

          </TouchableOpacity>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
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
  title: {
    marginTop: "2%",
    fontSize: 25,
    fontWeight: "800"
  },
  });

export default Header;