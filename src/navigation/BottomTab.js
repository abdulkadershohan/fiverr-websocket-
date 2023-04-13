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
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNetInfo} from '@react-native-community/netinfo';

// Navigators

import HomeStack from './HomeStack';
import NetworkStack from './NetworkStack';
import NetworkTopTab from './NetworkTopTab';
import MyUserProfileStack from './Profile/MyUserProfileStack';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Screen names
const HomeStackName = 'Home';
const NetworkStackName = 'Network Stack';
const profileName = 'Profile';
const MyUserProfileStackName = 'My Profile';

//Context
import {NotificationContext} from '../context/NotificationContext';
import {LoggedInUserContext} from '../context/LoggedInUserContext';

const Tab = createBottomTabNavigator();

function BottomTab() {
  const {sayHiNotif, chatNotif} = useContext(NotificationContext);
  const {serverState, chatServerState, notifServerState} =
    useContext(LoggedInUserContext);

  const netInfo = useNetInfo();

  function ServerStateColour() {
    if (notifServerState == false && chatServerState == true) {
      return 'pink';
    } else if (chatServerState == false && notifServerState == true) {
      return 'grey';
    } else if (chatServerState == false && notifServerState == false) {
      return 'red';
    } else if (chatServerState == true && notifServerState == true) {
      return '#0E0E2C';
    }
  }

  function ServerStateColour2() {
    if (netInfo.isConnected == false && netInfo.isInternetReachable == true) {
      return 'pink';
    } else if (
      netInfo.isInternetReachable == false &&
      netInfo.isConnected == true
    ) {
      return 'grey';
    } else if (
      netInfo.isConnected == false &&
      netInfo.isInternetReachable == false
    ) {
      return 'red';
    } else if (
      netInfo.isConnected == true &&
      netInfo.isInternetReachable == true
    ) {
      return '#0E0E2C';
    }
  }
  return (
    <Tab.Navigator
      initialRouteName={HomeStackName}
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: ServerStateColour(), //serverState == true ? '#0E0E2C' : 'red',
          paddingVertical: windowHeight * 0.03,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          /* route.name is the screen */
          let rn = route.name;

          /* if the user clicks on the home screen show the filled in home icon 
            otherwise let the home screen icon be the outline home icon */
          if (rn === HomeStackName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === NetworkStackName) {
            iconName = focused ? 'people' : 'people-outline';
          } else if (rn === profileName) {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3EBFDB', //'yellow',
        tabBarInactiveTintColor: 'white',
      })}>
      {/*Remove 'Home' Header*/}
      <Tab.Screen
        name={HomeStackName}
        options={{headerShown: false, tabBarShowLabel: false}}
        component={HomeStack}
      />
      {/*The header will appear on the screens below by default*/}
      <Tab.Screen
        options={
          chatNotif?.length > 0 || sayHiNotif?.length > 0
            ? {
                tabBarShowLabel: false,
                headerShown: false,
                ...styles.notification,
              }
            : {
                tabBarShowLabel: false,
                headerShown: false,
              }
        }
        name={NetworkStackName}
        component={NetworkStack}
      />
      <Tab.Screen
        options={{tabBarShowLabel: false, headerShown: false}}
        name={profileName}
        component={MyUserProfileStack}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  notification: {
    tabBarBadge: '',
    tabBarBadgeStyle: {
      minWidth: windowWidth * 0.025,
      minHeight: windowWidth * 0.025,
      maxWidth: windowWidth * 0.025,
      maxHeight: windowWidth * 0.025,
      borderRadius: 7,
      backgroundColor: '#F91F6D',
    },
  },
});
