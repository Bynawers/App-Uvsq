import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../views/main/Home.js";
import Search from "../views/main/Search";
import Profile from "../views/main/Profile.js";

import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function MyTabs() {

    const theme = useTheme();

    return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) =>({

        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? 'home' : 'home-outline';
            } 
            else if (rn === "CELCAT") {
              iconName = focused ? 'ios-search' : 'search-outline';
            } 
            else if (rn === "Profile") {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={35} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: theme.classic.textDark,
        tabBarInactiveTintColor: theme.classic.textDark,
        tabBarShowLabel: true,
        tabBarStyle: { 
          backgroundColor: theme.classic.foreground,
          height: '10%',
          borderTopWidth: 1,
          position: 'absolute',
          overflow:'hidden',
        },
        
        })}>

      <Tab.Screen
        name="Home"
        component={ Home }
      />
      <Tab.Screen
        name="CELCAT"
        component={ Search }
      />
      <Tab.Screen
        name="Profile"
        component={ Profile }
      />
    </Tab.Navigator>
  );
}
