import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../views/main/Home.js"
import Search from "../views/main/Search.js";
import FindRoom from "../views/main/FindRoom.js";

import Detail from "../views/secondary/UEDetail"


const Stack = createStackNavigator();

const screenOptionStyle = {
	headerShown: false,
  reactNativeScreen: false,
  animationEnabled: true,
  animationTypeForReplace: 'pop',
  gestureEnabled: true
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="HomeStack" component={Home}/>
    </Stack.Navigator>
  );
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SearchStack" component={Search}/>
      <Stack.Screen name="DetailStack" component={Detail}/>
    </Stack.Navigator>
  );
}

const FindRoomStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="FindRoomStack" component={FindRoom}/>
    </Stack.Navigator>
  );
}

export { SearchStackNavigator, HomeStackNavigator, FindRoomStackNavigator };