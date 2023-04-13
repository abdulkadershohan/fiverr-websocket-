import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Navigators

//Screens

import SignUp from '../pages/SignUp';
import SignUp2 from '../pages/SignUp2';
import SignUp3 from '../pages/SignUp3';
import SignUp4 from '../pages/SignUp4';
import SignUp5 from '../pages/SignUp5';
import SignUp6 from '../pages/SignUp6';
import VerifyEmail from '../pages/VerifyEmail';
import Login from '../pages/Login';
import Home from '../pages/Home';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
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
        name="Verify Email"
        component={VerifyEmail}
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
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
