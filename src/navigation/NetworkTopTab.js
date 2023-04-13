import {React, useState, useContext, useEffect, useRef} from 'react';
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
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//Context
import {NotificationContext} from '../context/NotificationContext';

// Screens
import SaidHi from '../pages/Network/SaidHi';
import Chats from '../pages/Network/Chats';

//Screen names
const saidHiName = 'Said Hi';
const chatsName = 'Chats';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();

function NetworkTopTab() {
  return (
    <Tab.Navigator
      style={styles.screen}
      screenOptions={{
        //makes background colour of tabs transparent
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          //marginHorizontal: 0.1 * windowWidth,
          padding: 3,
        },
        headerStyle: {
          backgroundColor: '#0E0E2C',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#BBBBBB',
      }}>
      {/*tabBarOptions={{
        tabBarOptions
        activeTintColor: 'white',
        inactiveTintColor: '#BBBBBB',
       headerStyle: {
          backgroundColor: '#0E0E2C',
        },
      }}>*/}
      <Tab.Screen name={saidHiName} component={SaidHi} />
      <Tab.Screen name={chatsName} component={Chats} />
    </Tab.Navigator>
  );
}

export default NetworkTopTab;

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    paddingVertical: 10,
    headerStyle: {
      backgroundColor: '#0E0E2C',
    },
  },
  notification: {
    tabBarBadge: '',
    tabBarBadgeStyle: {
      minWidth: windowWidth * 0.025,
      minHeight: windowWidth * 0.025,
      maxWidth: windowWidth * 0.025,
      maxHeight: windowWidth * 0.025,
      borderRadius: 7,
      //color : 'white',
    },
  },
});
