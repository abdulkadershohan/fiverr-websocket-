import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Navigators
import HomeStack from './HomeStack';
//import NetworkTopTab from './NetworkTopTab';
import BottomTab from './BottomTab';
//Screens

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
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
