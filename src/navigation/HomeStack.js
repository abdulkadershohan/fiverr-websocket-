import {React, useState, useContext, useEffect, useRef} from 'react';
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
  Dimensions,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

//Screens
import HomeTopTab from './HomeTopTab';
import EventsTopTab from './EventsTopTab';

import UserProfile from '../pages/Profile/UserProfile';
import UserPhotos from '../pages/Profile/UserPhotos';
import EventProfile from '../pages/Events/EventProfile';
import Conversation from '../pages/Network/Conversation';
import SaidHi from '../pages/Network/SaidHi';
import Chats from '../pages/Network/Chats';
import Subscription from '../pages/Home/Subscription';
import NetworkTopTab from './NetworkTopTab';

const NetworkTopTabName = 'Network';
const HomeTopTabName = 'HomeTop';
const EventsTopTabName = 'EventsTop';
const UserProfileName = 'User Profile';
const UserPhotosName = 'User Photos';
const EventProfileName = 'Event Profile';
const ConversationName = 'Conversation';
const SaidHiName = 'Said Hi';
const ChatsName = 'Chats';
const SubscriptionName = 'Subscription';

const Stack = createStackNavigator();

const HomeStack = () => {
  const isVisible = useIsFocused();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeTopTabName}
        component={HomeTopTab}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={NetworkTopTabName}
        component={NetworkTopTab}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={SubscriptionName}
        component={Subscription}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={'Business Events'}
        component={EventsTopTab}
        initialParams={{type: 'business'}}
        options={{
          //title: 'Business Events',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={'Fun Events'}
        component={EventsTopTab}
        initialParams={{type: 'fun'}}
        options={{
          //title: 'Fun Events',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={UserProfileName}
        component={UserProfile}
        //initialParams={{type: 'fun'}}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={UserPhotosName}
        component={UserPhotos}
        //initialParams={{type: 'fun'}}
        options={{
          //title: 'Fun Events',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={ConversationName}
        component={Conversation}
        //initialParams={{type: 'fun'}}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EventProfileName}
        component={EventProfile}
        //initialParams={{type: 'fun'}}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={SaidHiName}
        component={SaidHi}
        //initialParams={{type: 'fun'}}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={ChatsName}
        component={Chats}
        //initialParams={{type: 'fun'}}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
