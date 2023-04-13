import * as React from 'react';
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
import NetworkTopTab from './NetworkTopTab';
import UserProfile from '../pages/Profile/UserProfile';
import Conversation from '../pages/Network/Conversation';
import UserPhotos from '../pages/Profile/UserPhotos';
import Subscription from '../pages/Home/Subscription';

const NetworkTopTabName = 'Network';
const UserProfileName = 'User Profile';
const UserPhotosName = 'User Photos';
const ConversationName = 'Conversation';
const SubscriptionName = 'Subscription';

const Stack = createStackNavigator();

const NetworkStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NetworkTopTabName}
        component={NetworkTopTab}
        options={{
          //title: '',
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
        name={SubscriptionName}
        component={Subscription}
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
        name={ConversationName}
        component={Conversation}
        //initialParams={{type: 'fun'}}
        options={{
          title: null,
          headerLeft: () => null,
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

export default NetworkStack;
