import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SearchStackNavigator, HomeStackNavigator, FindRoomStackNavigator } from "./StackNavigation.js"

import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function MyTabs() {

    const theme = useTheme();

    return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={({ route }) =>({

        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Accueil") {
              iconName = focused ? 'home' : 'home-outline';
            } 
            else if (rn === "CELCAT") {
              iconName = focused ? 'book' : 'book-outline';
            } 
            else if (rn === "FindRoom") {
              iconName = focused ? 'ios-search' : 'search-outline';
            }
            return <Ionicons name={iconName} size={30} color={color} />;
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
        name="Accueil"
        component={ HomeStackNavigator }
      />
      <Tab.Screen
        name="CELCAT"
        component={ SearchStackNavigator }
      />
      <Tab.Screen
        name="FindRoom"
        component={ FindRoomStackNavigator }
      />
    </Tab.Navigator>
  );
}
