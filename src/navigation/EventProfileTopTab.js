import {React, useState, useContext, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ListItem,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//My Components

// Screens
import EventAbout from '../pages/Events/EventAbout';
import EventWhosGoing from '../pages/Events/EventWhosGoing';

//Screen names
const EventAboutName = 'About';
const EventWhosGoingName = "Who's Going";

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
Entypo.loadFont();

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();

export default function EventProfileTopTab({id, navigation}) {
  return (
    <Tab.Navigator
      style={styles.tabStyle}
      screenOptions={{
        
        //makes background colour of tabs transparent
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          textTransform: 'none'
        },

        tabBarItemStyle: {
          //padding: 3,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#BBBBBB',
      }}
      /*tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#BBBBBB',
      }}*/>
      <Tab.Screen
        name={EventAboutName}
        component={EventAbout}
        initialParams={{id: id}}
      />
      <Tab.Screen
        name={EventWhosGoingName}
        component={EventWhosGoing}
        initialParams={{id: id}}  
      />
      {/*<Tab.Screen name={'Reviews'} component={EventWhosGoing} />*/}
    </Tab.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    paddingTop: 0,
    Height: windowHeight * 0.038,
  },
  eventTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendInterestedSection: {
    paddingTop: 0,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabStyle: {
    backgroundColor: '#0E0E2C',
  },
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#2AAFCC',
    width: windowWidth * 0.25,
    height: windowHeight * 0.035,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  Title: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  jobLocation: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 30,
    paddingBottom: 5,
  },
  icons: {
    marginLeft: windowWidth * 0.62,
    //marginRight: 0,
    paddingTop: 20,
    paddingBottom: 30,
  },
});
